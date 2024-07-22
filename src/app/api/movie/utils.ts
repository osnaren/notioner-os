import {
  MovieTitleYear,
  MovieData,
  NotionProperties,
  NotionPropertyItemObjectResponse,
  NotionMovieProperties,
  RelationPropertyItemObjectResponse,
} from "@ctypes/movie-type";
import { CreatePageParameters, UpdatePageParameters } from "@notionhq/client/build/src/api-endpoints";

import { MOVIES_DB_ID, COLLECTION_DB_ID, MOVIES_RELATION_ID, SERIES_RELATION_ID } from "@config/constants";

import notion from "@utils/notion";
import { getMovieDataByTitle } from "@utils/omdb";
import { getTMDBMovieDataByIMDBId } from "@utils/tmdb";
import {
  createRichText,
  createMultiSelect,
  createSelect,
  createNumber,
  createDate,
  createStatus,
  createFiles,
  createExternalFile,
  createRelation,
  createTitle,
  createDatabaseId,
  createUrl,
} from "@utils/notion-helpers";
import { MOVIE_PROPERTIES, prepareMovieData } from "@utils/movie-helpers";

/**
 * Asynchronously gathers movie data by title and year using the OMDB and TMDB APIs.
 *
 * @param {MovieTitleYear} titleYear - An object containing the movie title and year.
 * @return {Promise<MovieData>} A promise that resolves to the prepared movie data.
 */
export const gatherMovieData = async ({ title, year }: MovieTitleYear) => {
  const omdbMovieData = await getMovieDataByTitle({ title, year });

  const tmdbMovieData = await getTMDBMovieDataByIMDBId(omdbMovieData.imdbID);
  const movieData = prepareMovieData(omdbMovieData, tmdbMovieData);

  return movieData;
};

let globalMovieData: MovieData = {} as MovieData;
let globalItemID = "";

/**
 * Updates a Notion page with the given movie data.
 *
 * @param {MovieData} movieData - The movie data to update the page with.
 * @param {string} itemID - The ID of the page to update. If not provided, a new page will be created.
 * @return {Promise<UpdatePageResponse | CreatePageResponse>} A promise that resolves to the response of the update or create operation.
 */
export const updateNotionPage = async (movieData: MovieData, itemID: string) => {
  globalMovieData = movieData;
  globalItemID = itemID;

  const { Icon, "Back Drop": BackDrop, Collection } = movieData;

  const movieProperties = await processMovieProperties(movieData);
  const moviePageData = {
    ...(BackDrop && { cover: createExternalFile(BackDrop) }),
    ...(Icon && { icon: createExternalFile(Icon) }),
    properties: movieProperties,
  };

  let response;
  if (itemID) {
    const moviePageDataWithId = { ...moviePageData, page_id: itemID };
    response = await notion.updatePageProperties(moviePageDataWithId as UpdatePageParameters);
  } else {
    const collectionId = await checkAndCreateMovieCollection(Collection);
    const moviePageDataWithId = {
      ...moviePageData,
      parent: { database_id: MOVIES_DB_ID },
      properties: { ...movieProperties, Collection: createRelation(collectionId) },
    };
    response = await notion.createPage(moviePageDataWithId as CreatePageParameters);
  }
  return response;
};

/**
 * Process movie properties based on the provided movie data.
 *
 * @param {MovieData} movieData - The data of the movie to process properties for.
 * @return {NotionMovieProperties} The processed movie properties.
 */
export const processMovieProperties = async (movieData: MovieData): Promise<NotionMovieProperties> => {
  const movieProperties: { [key: string]: any } = { ...MOVIE_PROPERTIES };
  const moviePropertiesKeys = Object.keys(movieProperties) as [];
  for (const moviePropertyKey of moviePropertiesKeys) {
    const moviePropertyValue = movieData[moviePropertyKey as keyof MovieData];
    if (moviePropertyValue !== undefined && moviePropertyValue !== "") {
      const value = movieProperties[moviePropertyKey] as any;
      const { id: propertyId, type: propertyType } = value;
      const moviePropertyTypeValue = await handlePropertyType(moviePropertyKey, propertyId, propertyType, movieData);
      movieProperties[moviePropertyKey] = moviePropertyTypeValue;
    } else {
      movieProperties.delete(moviePropertyKey);
    }
  }
  return movieProperties as NotionMovieProperties;
};

/**
 * Handles different property types for a movie.
 *
 * @param {string} key - The key of the property.
 * @param {string} id - The ID of the property.
 * @param {string} type - The type of the property.
 * @param {MovieData} movieData - The movie data object.
 * @return {NotionPropertyItemObjectResponse} The value of the property after handling.
 */
const handlePropertyType = async (
  key: string,
  id: string,
  type: string,
  movieData: MovieData
): Promise<NotionPropertyItemObjectResponse> => {
  const propertyHandlers: { [key in NotionProperties]: any } = {
    rich_text: createRichText,
    multi_select: createMultiSelect,
    select: createSelect,
    relation: createMovieRelation,
    number: createNumber,
    url: createUrl,
    date: createDate,
    status: createStatus,
    files: (value: string) => createFiles(value, movieData.Title),
    title: createTitle,
    id: undefined,
    checkbox: undefined,
    email: undefined,
  };

  const propertyHandler = propertyHandlers[type as keyof typeof propertyHandlers];
  if (propertyHandler) {
    const propertyValue = await propertyHandler(movieData[key as keyof MovieData], id);
    return propertyValue;
  }
  throw new Error(`Unsupported property type: ${type}`);
};

/**
 * Creates a movie relation based on the media type and property ID.
 *
 * @param {string} mediaType - The type of media ('movie' or 'Series').
 * @param {string} propertyId - The ID of the property.
 * @return {Promise<RelationPropertyItemObjectResponse>} The created relation.
 */
const createMovieRelation = async (
  mediaType: string,
  propertyId: string
): Promise<RelationPropertyItemObjectResponse> => {
  let relationId = "";
  switch (mediaType) {
    case "movie":
      relationId = MOVIES_RELATION_ID;
      break;
    case "Series":
      relationId = SERIES_RELATION_ID;
      break;
    default:
      relationId = await checkAndCreateMovieCollection(mediaType, globalItemID);
      break;
  }
  return createRelation(relationId, propertyId);
};

/**
 * Checks if a movie collection exists and creates a new collection if it doesn't exist.
 *
 * @param {string} collectionName - The name of the collection to check or create.
 * @param {string} itemID - The ID of the item associated with the collection.
 * @return {Promise<string>} The ID of the existing or newly created collection.
 */
const checkAndCreateMovieCollection = async (collectionName: string, itemID = ""): Promise<string> => {
  if (!collectionName) return "";

  const [response] = await Promise.all([
    notion.queryDatabase({
      database_id: COLLECTION_DB_ID,
      filter: {
        property: "Name",
        title: {
          equals: collectionName,
        },
      },
    }),
  ]);

  const collectionExists = response && response?.results.length > 0;
  const collectionID = collectionExists ? response.results[0].id : "";

  if (!collectionID) {
    const { CBackdrop, CPoster, CID } = globalMovieData;
    const collectionPageData = {
      ...(CBackdrop && { cover: createExternalFile(CBackdrop) }),
      ...(CPoster && { icon: createExternalFile(CPoster) }),
      parent: createDatabaseId(COLLECTION_DB_ID),
      properties: {
        Poster: createFiles(collectionName, CPoster),
        "Collection ID": createNumber(CID),
        Name: createTitle(collectionName),
        ...(itemID && { Movies: createRelation(itemID) }),
      },
    };
    const newCollectionResponse = await notion.createPage(collectionPageData as unknown as CreatePageParameters);
    return newCollectionResponse?.id || "";
  }

  return collectionID;
};
