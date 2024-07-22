// import { getMovieDataByTitle } from "@utils/omdb";
// import { getTMDBMovieDataByIMDBId } from "@utils/tmdb";

import { gatherMovieData } from "@api/movie/utils";
import { createResponse } from "@utils/api-helpers";

// Handler for POST requests
export const POST = async (req: Request) => {
  try {
    const { title, year } = await req.json();
    const response = await gatherMovieData({ title, year });
    // const OMDBResponse = await getMovieDataByTitle({ title, year });
    // const TMDBResponse = await getTMDBMovieDataByIMDBId(OMDBResponse.imdbID);

    // return createResponse({ OMDBResponse, TMDBResponse }, { status: 200 });
    return createResponse(response, { status: 200 });
  } catch (error) {
    return createResponse({ error: "Failed to retrieve movie data" }, { status: 500 });
  }
};
