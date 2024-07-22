import fetch from "node-fetch";

import { formatMovieData } from "@utils/movie-helpers";
import { MovieTitleYear, OMDBAPIResponse, OMDBTransformedResponse } from "@ctypes/movie-type";

const OMDB_API_KEY = process.env.OMDB_API_KEY as string;
const OMDB_API_URL = process.env.OMDB_API_URL as string;

if (!OMDB_API_KEY || !OMDB_API_URL) {
  throw new Error("OMDB API key and URL must be provided");
}

const OMDB_API_ENDPOINT = `${OMDB_API_URL}?apikey=${OMDB_API_KEY}`;

/**
 * Get movie data by title and year
 * @param {MovieTitleYear} - Movie title and year
 * @returns {Promise<OMDBTransformedResponse>} - Movie data
 */
export const getMovieDataByTitle = async ({ title, year }: MovieTitleYear): Promise<OMDBTransformedResponse> => {
  const omdbUrl = `${OMDB_API_ENDPOINT}&t=${encodeURIComponent(title)}&y=${year}`;
  const omdbResponse = await fetch(omdbUrl);
  const omdbData = (await omdbResponse.json()) as OMDBAPIResponse;

  if (omdbData.Response === "False") {
    throw new Error(omdbData.Error);
  }

  const transformedData = formatMovieData(omdbData);

  return transformedData;
};

/**
 * Get movie data by IMDB ID
 * @param {string} imdbID - IMDB ID of the movie
 * @returns {Promise<OMDBTransformedResponse>} - Movie data
 */
export const getMovieDataById = async (imdbID: string): Promise<OMDBTransformedResponse> => {
  const omdbUrl = `${OMDB_API_ENDPOINT}&i=${imdbID}`;
  const omdbResponse = await fetch(omdbUrl);
  const omdbData = (await omdbResponse.json()) as OMDBAPIResponse;

  if (omdbData.Response === "False") {
    throw new Error(omdbData.Error);
  }

  const transformedData = formatMovieData(omdbData);
  return transformedData;
};
