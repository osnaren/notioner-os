var movie_properties = {
  Genre: {
    id: "%3B%5Dh%5D",
    type: "multi_select",
    multi_select: [null],
  },
  Type: {
    id: "%3Bo%40H",
    type: "relation",
    relation: [null],
  },
  imdbID: {
    id: "%3EGep",
    type: "rich_text",
    rich_text: [null],
  },
  // Watched: {
  //   id: "AK_Z",
  //   type: "status",
  //   status: {
  //     name: "Watched",
  //   },
  // },
  "Run Time": {
    id: "Ae%3Dr",
    type: "rich_text",
    rich_text: [null],
  },
  Rated: {
    id: "B%7CUh",
    type: "select",
    select: [null],
  },
  "Watched On": {
    id: "HM%7BB",
    type: "date",
    date: [null],
  },
  "TMDB ID": {
    id: "Hsg~",
    type: "number",
    number: 499726,
  },
  Tagline: {
    id: "MOuF",
    type: "rich_text",
    rich_text: [],
  },
  "My Rating": {
    id: "NKPU",
    type: "select",
    select: [null],
  },
  Trailer: {
    id: "WM%3B%3E",
    type: "url",
    url: "MILF",
  },
  Poster: {
    id: "YjNK",
    type: "files",
    files: [null],
  },
  Language: {
    id: "%5B%5BqA",
    type: "multi_select",
    multi_select: [null],
  },
  Director: {
    id: "%5DxE%5D",
    type: "multi_select",
    multi_select: [null],
  },
  Cast: {
    id: "%60dIw",
    type: "multi_select",
    multi_select: [null],
  },
  Plot: {
    id: "hmoW",
    type: "rich_text",
    rich_text: [null],
  },
  "Where To Watch": {
    id: "q%3Cxq",
    type: "url",
    url: "https://www.themoviedb.org/movie/499726/watch?locale=IN",
  },
  Year: {
    id: "vqvH",
    type: "number",
    number: 2018,
  },
  "Watch Count": {
    id: "wEA%5D",
    type: "number",
    number: null,
  },
  "IMDB Rating": {
    id: "%7CElo",
    type: "number",
    number: 4.8,
  },
  "Box Office": {
    id: "%7CIf%40",
    type: "number",
    number: 0,
  },
  Collection: {
    id: "~hCa",
    type: "relation",
    relation: [],
  },
  // Title: {
  //   id: "title",
  //   type: "title",
  //   title: [null],
  // },
};

var req = {
  Year: 2017,
  Rated: "PG-13",
  Genre: "Action, Adventure, Comedy",
  "IMDB Rating": 7.9,
  "Run Time": "2h 10m",
  Language: "English",
  Cast: "Chris Hemsworth, Tom Hiddleston, Cate Blanchett",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMjMyNDkzMzI1OF5BMl5BanBnXkFtZTgwODcxODg5MjI@._V1_SX300.jpg",
  Type: "Movie",
  "Box Office": 315058289,
  Director: "Taika Waititi",
  imdbID: "tt3501632",
  Plot: "Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela.",
  Title: "Thor: Ragnarok ",
  Tagline: "No Hammer. No Problem.",
  "TMDB ID": 284053,
  "Where To Watch": "https://www.themoviedb.org/movie/284053/watch?locale=IN",
  Trailer: "https://www.youtube.com/watch?v=i0uIqxO26bw",
  "Back Drop":
    "https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg",
  Icon: "https://image.tmdb.org/t/p/original/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
  Collection: "Thor Collection",
  CID: 131296,
  CBackdrop:
    "https://image.tmdb.org/t/p/original/3KL8UNKFWgIKXzLHjwY0uwgjzYl.jpg",
  CPoster:
    "https://image.tmdb.org/t/p/original/yw7gr7DhHHVTLlO8Se8uH17TDMA.jpg",
  "Item ID": "34421edd-be3e-4321-89b5-8101c27a0af9",
};

let input;
let notionClient;

const init = (client) => {
  notionClient = client;
};

const switchCase = async (type, value, input) => {
  var title = input.Title;
  switch (type) {
    case "rich_text":
      return createRichText(value);
    case "multi_select":
      return createMultiSelect(value);
    case "select":
      return createSelect(value);
    case "relation":
      return await createRelation(value);
    case "number":
      return createNumber(value);
    case "url":
      return value;
    case "date":
      return createDate(value);
    case "status":
      return createStatus(value);
    case "files":
      return createFiles(value, title);
  }
};

const createNumber = (value) => {
  if (value === "#NUM!") {
    return null;
  } else {
    return Number.parseFloat(value);
  }
};

const createStatus = (value) => {
  return {
    name: value,
  };
};

const createDate = (value) => {
  return {
    start: value.split("/").reverse().join("-"),
  };
};

const createFiles = (value, title) => {
  return [
    {
      type: "external",
      name: title,
      external: {
        url: value,
      },
    },
  ];
};

const checkCollection = async (value) => {
  const databaseId = "b206d07b-0728-4b4f-a51c-1afa08bfbb84";
  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "Name",
      title: {
        equals: value,
      },
    },
  });
  if (response.results.length > 0) {
    return response.results[0].id;
  }
  return null;
};

const createCollection = async (collectionName) => {
  var collection = {
    cover: {
      type: "external",
      external: {
        url: `${input["CBackdrop"]}`,
      },
    },
    icon: {
      type: "external",
      external: {
        url: `${input["CPoster"]}`,
      },
    },
    parent: {
      type: "database_id",
      database_id: "b206d07b-0728-4b4f-a51c-1afa08bfbb84",
    },
    properties: {
      Poster: {
        id: "Ip%3BL",
        type: "files",
        files: [
          {
            name: collectionName,
            type: "external",
            external: {
              url: `${input["CPoster"]}`,
            },
          },
        ],
      },
      "Collection ID": {
        id: "QoCY",
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: `${input["CID"]}`,
              link: null,
            },
          },
        ],
      },
      Movies: {
        id: "xenZ",
        type: "relation",
        relation: [
          {
            id: `${input["Item ID"]}`,
          },
        ],
      },
      Name: {
        id: "title",
        type: "title",
        title: [
          {
            type: "text",
            text: {
              content: collectionName,
              link: null,
            },
          },
        ],
      },
    },
  };
  const response = await createNotionPage(collection);
  return response;
};

const createNotionPage = async (pageProperties) => {
  const response = await notionClient.pages.create(pageProperties);
  return response.id;
};

const createRelation = async (value) => {
  var relationId;
  if (value === "Movie") {
    relationId = "58acc6ff1d8d4154a95d26219a2a1777";
  } else if (value === "Series") {
    relationId = "d3982225de604015975d11fe0862e716";
  } else if (value && value !== "Movie" && value !== "Series") {
    relationId = await checkCollection(value);
    if (!relationId) {
      relationId = await createCollection(value);
    }
  }
  return [
    {
      id: relationId,
    },
  ];
};

const createSelect = (option) => {
  return {
    name: option,
  };
};

const createMultiSelect = (list) => {
  var newList = [];
  list.split(",").forEach((item) => {
    newList.push({ name: item.trim() });
  });
  return newList;
};

const createRichText = (text) => {
  return [
    {
      type: "text",
      text: {
        content: text,
      },
    },
  ];
};

const preProcessData = async ({ req, client }) => {
  notionClient = client;
  input = req;
  var keys = Object.keys(movie_properties);
  for (var key of keys) {
    var fillData = input[key];
    if (fillData && fillData !== undefined) {
      const value = movie_properties[key];
      var type = value.type;
      value[type] = await switchCase(type, fillData, input);
    } else {
      delete movie_properties[key];
    }
  }
  return movie_properties;
};

const processNewMoviesResult = async (data) => {
  let newMovies = [];
  for (var movie of data) {
    var id = movie.id;
    var title = await retrievePageProperty(id, "title");
    var year = await retrievePageProperty(id, movie_properties.Year.id);
    newMovies.push({
      id: id,
      title: title.results[0].title.plain_text,
      year: year[movie_properties.Year.type] || "",
    });
  }
  return newMovies;
};

const retrievePageProperty = async (pageId, propertyId) => {
  const response = await notionClient.pages.properties.retrieve({
    page_id: pageId,
    property_id: propertyId,
  });
  return response;
};

module.exports = {
  init,
  preProcessData,
  processNewMoviesResult,
  retrievePageProperty,
};
