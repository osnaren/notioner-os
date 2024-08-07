import { TMDB_IMAGE_BASE_URL, TMDB_SITE_URL, YOUTUBE_BASE_URL } from "@config/constants";
import {
  OMDBSuccessResponse,
  OMDBTransformedResponse,
  MovieData,
  TmdbVideos,
  TmdbMovie,
  TmdbRelease,
  TmdbKeywords,
  TmdbProviders,
} from "@ctypes/movie-type";
import { BelongsToCollection } from "tmdb-ts";

/**
 * Get preferred language based on country
 * @param {string} languages - List of languages
 * @param {string} country - Country name
 * @returns {string} - Preferred language
 */
export const getPreferredLanguage = (languages: string, country: string): string => {
  const languagePreferences = {
    India: ["Tamil", "English", "Hindi", "Telugu", "Malayalam", "Spanish"],
    default: ["English", "Spanish", "Tamil"],
  };

  const languagesArray = languages.replace(/\s/g, "").split(",") as string[];
  const preferences = country === "India" ? languagePreferences.India : languagePreferences.default;

  for (const language of preferences) {
    if (languagesArray.includes(language)) {
      return language;
    }
  }

  return languagesArray[0];
};

/**
 * Format time to a specific format
 * @param {string} time - Time in minutes
 * @returns {string} - Formatted time
 */
export const formatTime = (time: string): string => {
  if (time === "") {
    return "";
  }

  const totalMinutes = Number.parseInt(time, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

/**
 * Retrieves the trailer link from the given TMDB videos.
 *
 * @param {TmdbVideos | undefined} videos - The TMDB videos object or undefined.
 * @return {string} The trailer link if found, otherwise an empty string.
 */
const getTrailerLink = (videos: TmdbVideos | undefined): string => {
  const trailer = videos?.results.find((video) => video.type === "Trailer");
  return trailer ? `${YOUTUBE_BASE_URL}${trailer.key}` : "";
};

/**
 * Retrieves the certification for a given TMDB release.
 *
 * @param {TmdbRelease | undefined} releases - The TMDB release object or undefined.
 * @return {string} The certification value if found, otherwise an empty string.
 */
const getCertification = (releases: TmdbRelease | undefined): string => {
  const releaseDates = releases?.results.find((release) => release.iso_3166_1 === "IN") || releases?.results[0];

  if (!releaseDates) {
    return "";
  }

  const certification =
    releaseDates.release_dates.find((release) => release.certification && release.iso_639_1 === "ta") ||
    releaseDates.release_dates.find((release) => release.certification);
  return certification ? certification.certification : "";
};

/**
 * Retrieves a string of keywords separated by commas from a TMDB keywords object.
 *
 * @param {TmdbKeywords | undefined} keywords - The TMDB keywords object or undefined.
 * @return {string} A string of keywords separated by commas, or an empty string if keywords is undefined or has no keywords.
 */
const getKeywords = (keywords: TmdbKeywords | undefined): string => {
  if (!keywords) {
    return "";
  }
  return keywords.keywords?.map((keyword) => keyword.name).join(", ");
};

/**
 * Retrieves the provider name from the given TMDB providers object.
 *
 * @param {TmdbProviders | undefined} providers - The TMDB providers object or undefined.
 * @return {string} The provider name if found, otherwise an empty string.
 */
const getProviders = (providers: TmdbProviders | undefined): string => {
  if (!providers) {
    return "";
  }
  const firstProviderKey = Object.keys(providers.results)[0];
  const providerResults =
    providers?.results["IN"] ||
    providers?.results["US"] ||
    providers?.results[firstProviderKey as keyof typeof providers.results];
  return providerResults.flatrate[0].provider_name;
};

/**
 * Format movie data to a specific format
 * @param {OMDBSuccessResponse} movieData - Movie data from OMDB API
 * @returns {OMDBTransformedResponse} - Transformed movie data
 */
export const formatMovieData = (movieData: OMDBSuccessResponse): OMDBTransformedResponse => {
  return {
    Title: movieData.Title,
    Year: parseInt(movieData.Year, 10),
    Rated: movieData.Rated === "N/A" ? "G" : movieData.Rated,
    Genre: movieData.Genre.replace("/,s/g", ","),
    "IMDB Rating": parseFloat(movieData.imdbRating) || 0,
    "Run Time": movieData.Runtime === "N/A" ? "" : formatTime(movieData.Runtime),
    Language: getPreferredLanguage(movieData.Language, movieData.Country),
    Cast: movieData.Actors.replace("/,s/g", ","),
    Poster: movieData.Poster,
    Type: movieData.Type,
    "Box Office": movieData.BoxOffice === "N/A" ? "0" : movieData.BoxOffice.replace("$", "").replace(/,/g, ""),
    Director: movieData.Director,
    imdbID: movieData.imdbID,
    Plot: movieData.Plot === "N/A" ? "" : movieData.Plot,
  };
};
/**
 * Prepares movie data by merging data from OMDB and TMDB APIs.
 *
 * @param {OMDBTransformedResponse} omdbData - The transformed movie data from OMDB API.
 * @param {MovieDetails | undefined} tmdbData - The movie details from TMDB API.
 * @returns {MovieData} The prepared movie data.
 */
export const prepareMovieData = (
  omdbData: OMDBTransformedResponse,
  tmdbData: TmdbMovie | undefined,
  watched: boolean
): MovieData => {
  const collectionData: BelongsToCollection | undefined = tmdbData?.belongs_to_collection ?? undefined;

  const movieData = {
    Title: omdbData.Title || tmdbData?.title || "",
    Year: omdbData.Year,
    Rated: getCertification(tmdbData?.release_dates) || omdbData.Rated,
    Genre: omdbData.Genre,
    Watched: watched ? "Watched" : "Not started",
    "IMDB Rating": omdbData["IMDB Rating"],
    "Run Time": omdbData["Run Time"] || formatTime(tmdbData?.runtime.toString() || ""),
    runtime: tmdbData?.runtime || 0,
    Language: omdbData.Language,
    Cast: omdbData.Cast,
    Poster: omdbData.Poster,
    Type: omdbData.Type,
    "Box Office": omdbData["Box Office"] || tmdbData?.revenue.toString() || "0",
    Director: omdbData.Director,
    imdbID: omdbData.imdbID,
    Plot: omdbData.Plot || tmdbData?.overview || "",
    Keywords: getKeywords(tmdbData?.keywords),
    "Watch Provider": getProviders(tmdbData?.["watch/providers"]),
    Tagline: tmdbData?.tagline || "",
    "TMDB ID": tmdbData?.id || 0,
    "Where To Watch": `${TMDB_SITE_URL}${tmdbData?.id}/watch?locale=IN`,
    Trailer: getTrailerLink(tmdbData?.videos),
    "Back Drop": `${TMDB_IMAGE_BASE_URL}${tmdbData?.backdrop_path}`,
    Icon: `${TMDB_IMAGE_BASE_URL}${tmdbData?.poster_path}`,
    Collection: collectionData?.name || "",
    CID: collectionData?.id || 0,
    CBackdrop: collectionData?.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${collectionData?.backdrop_path}` : "",
    CPoster: collectionData?.poster_path ? `${TMDB_IMAGE_BASE_URL}${collectionData?.poster_path}` : "",
  } as MovieData;
  return movieData;
};

// ------------------------------------------------------------
export const MOVIE_PROPERTIES = {
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
  Watched: {
    id: "AK_Z",
    type: "status",
    status: {
      name: "Not started",
    },
  },
  "Run Time": {
    id: "Ae%3Dr",
    type: "rich_text",
    rich_text: [null],
  },
  runtime: {
    id: "_%7Bf_",
    type: "number",
    number: null,
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
  Keywords: {
    id: "T%3D%5EQ",
    type: "multi_select",
    multi_select: [null],
  },
  "Watch Provider": {
    id: "pQnS",
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
  Title: {
    id: "title",
    type: "title",
    title: [null],
  },
};
