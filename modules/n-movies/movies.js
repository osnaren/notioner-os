import notion from "#utils/notionEndpoints.js";
import { MOVIES_DB_ID, COLLECTION_DB_ID } from "#utils/constants.js";
import { MOVIE_PROPERTIES } from "#modules/n-movies/movie-config.js";

import {
  createRichText,
  createMultiSelect,
  createSelect,
  createNumber,
  createDate,
  createStatus,
  createFiles,
  createExternalFile,
  createDatabaseId,
  createFilesProperty,
  createRichTextProperty,
  createRelation,
  createTitleProperty,
} from "#utils/createNotionProperties.js";

const fetchNewMovies = async (requestTime) => {
  const before = new Date(requestTime);
  const after = new Date(requestTime);
  after.setMinutes(before.getMinutes() - 7);
  const query = {
    filter: {
      and: [
        {
          property: "timestamp",
          created_time: {
            after: after.toISOString(),
          },
        },
        {
          property: "timestamp",
          created_time: {
            before: before.toISOString(),
          },
        },
      ],
    },
  };
  const response = await notion.queryDatabase(MOVIES_DB_ID, query);
  if (response.results.length > 0) {
    return await processNewMoviesResult(response.results);
  }
  return [];
};

const processNewMoviesResult = async (data) => {
  let newMovies = [];
  for (var moviePage of data) {
    var pageId = moviePage.id;
    var title = await notion.retrievePageProperty(pageId, "title");
    var year = await notion.retrievePageProperty(
      pageId,
      MOVIE_PROPERTIES.Year.id
    );
    newMovies.push({
      id: id,
      title: title.results[0].title.plain_text,
      year: year[MOVIE_PROPERTIES.Year.type] || "",
    });
  }
  return newMovies;
};

let movieData;

const writeNewMovie = async (data) => {
  movieData = data;
  const processedMovieProperties = await processMovieProperties(movieData);
  const pageId = movieData["Item ID"];
  const moviePageData = {
    cover: {
      type: "external",
      external: {
        url: `${movieData["Back Drop"]}`,
      },
    },
    icon: {
      type: "external",
      external: {
        url: `${movieData["Icon"]}`,
      },
    },
    properties: processedMovieProperties,
  };
  await notion.updatePageProperties(pageId, moviePageData);
};

const processMovieProperties = async () => {
  const movieProperties = { ...MOVIE_PROPERTIES };
  const keys = Object.keys(movieProperties);
  for (const key of keys) {
    const fillData = movieData[key];
    if (fillData !== undefined) {
      const value = movieProperties[key];
      const type = value.type;
      value[type] = await handlePropertyType(type, fillData, movieData);
    } else {
      delete movieProperties[key];
    }
  }
  return movieProperties;
};

// const handlePropertyType = async (type, value) => {
//   const title = movieData.Title;
//   switch (type) {
//     case "rich_text":
//       return createRichText(value);
//     case "multi_select":
//       return createMultiSelect(value);
//     case "select":
//       return createSelect(value);
//     case "relation":
//       return await createMovieRelation(value);
//     case "number":
//       return createNumber(value);
//     case "url":
//       return value;
//     case "date":
//       return createDate(value);
//     case "status":
//       return createStatus(value);
//     case "files":
//       return createFiles(value, title);
//   }
// };

const handlePropertyType = async (type, value) => {
  const title = movieData.Title;
  const propertyHandlers = {
    rich_text: createRichText,
    multi_select: createMultiSelect,
    select: createSelect,
    relation: createMovieRelation,
    number: createNumber,
    url: (value) => value,
    date: createDate,
    status: createStatus,
    files: (value) => createFiles(value, title),
  };

  const propertyHandler = propertyHandlers[type];
  if (propertyHandler) {
    return await propertyHandler(value);
  }
};

const createMovieRelation = async (value) => {
  let relationId;
  switch (value) {
    case "Movie":
      relationId = MOVIES_RELATION_ID;
      break;
    case "Series":
      relationId = SERIES_RELATION_ID;
      break;
    default:
      relationId = await checkAndCreateMovieCollection(value);
      break;
  }
  return [{ id: relationId }];
};

const checkAndCreateMovieCollection = async (collectionName) => {
  const response = await notion.queryDatabase({
    database_id: COLLECTION_DB_ID,
    filter: {
      property: "Name",
      title: {
        equals: collectionName,
      },
    },
  });
  if (response.results.length > 0) {
    return response.results[0].id;
  }

  const collectionPageData = {
    cover: createExternalFile(movieData["CBackdrop"]),
    icon: createExternalFile(movieData["CPoster"]),
    parent: createDatabaseId(COLLECTION_DB_ID),
    properties: {
      Poster: createFilesProperty(collectionName, movieData["CPoster"]),
      "Collection ID": createRichTextProperty(movieData["CID"]),
      Movies: createRelation(movieData["Item ID"]),
      Name: createTitleProperty(collectionName),
    },
  };
  const newCollectionResponse = await notion.createPage(collectionPageData);
  return newCollectionResponse.id;
};

export default {
  fetchNewMovies,
  writeNewMovie,
};
