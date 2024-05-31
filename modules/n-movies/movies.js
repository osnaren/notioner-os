import notion from "#utils/notionEndpoints.js";
import { MOVIE_DB_ID } from "#utils/constants.js";
import { MOVIE_PROPERTIES } from "#modules/n-movies/movie-config.js";

const fetchNewMovies = async (requestTime) => {
  const before = new Date(requestTime);
  const after = new Date(requestTime).setMinutes(before.getMinutes() - 7);
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
  const response = await notion.queryDatabase(MOVIE_DB_ID, query);
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
    var year = await notion.retrievePageProperty(pageId, MOVIE_PROPERTIES.Year.id);
    newMovies.push({
      id: id,
      title: title.results[0].title.plain_text,
      year: year[MOVIE_PROPERTIES.Year.type] || "",
    });
  }
  return newMovies;
};

export default {
  fetchNewMovies,
};
