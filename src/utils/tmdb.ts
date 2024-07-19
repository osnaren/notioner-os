import { MovieDetails, TMDB } from "tmdb-ts";

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN as string;

const tmdb = new TMDB(TMDB_ACCESS_TOKEN);

export default tmdb;

export const getTMDBMovieDataByIMDBId = async (imdbID: string) => {
  const tmdbData = await tmdb.find.byId(imdbID, { external_source: "imdb_id" });
  const tmdbMovie = tmdbData.movie_results[0];

  const fullTmdbData = (await tmdb.movies.details(tmdbMovie.id)) as MovieDetails | undefined;

  return fullTmdbData;
};

const sample = {
  movie_results: [
    {
      backdrop_path: "/u2dKiAl7UQ9sTwhqzFxVpCnjyYT.jpg",
      id: 1171532,
      original_title: "ரத்னம்",
      overview:
        "Rathnam, a henchmen working for MLA Panneer Selvam in Vellore, protects Malliga, a medical student who bears a resemblance to Rathnam's late mother, from the relentless pursuit of land grabbers Rayudu brothers and becomes her guardian angel.",
      poster_path: "/j35uUmrMgWNQHrs0Obi8ll0OVfe.jpg",
      media_type: "movie",
      adult: false,
      title: "Rathnam",
      original_language: "ta",
      genre_ids: [28, 10749],
      popularity: 11.294,
      release_date: "2024-04-26",
      video: false,
      vote_average: 7,
      vote_count: 1,
    },
  ],
  person_results: [],
  tv_results: [],
  tv_episode_results: [],
  tv_season_results: [],
};

const s2 = {
  adult: false,
  backdrop_path: "/u2dKiAl7UQ9sTwhqzFxVpCnjyYT.jpg",
  belongs_to_collection: null,
  budget: 0,
  genres: [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 10749,
      name: "Romance",
    },
  ],
  homepage: "",
  id: 1171532,
  imdb_id: "tt27577888",
  origin_country: ["IN"],
  original_language: "ta",
  original_title: "ரத்னம்",
  overview:
    "Rathnam, a henchmen working for MLA Panneer Selvam in Vellore, protects Malliga, a medical student who bears a resemblance to Rathnam's late mother, from the relentless pursuit of land grabbers Rayudu brothers and becomes her guardian angel.",
  popularity: 11.294,
  poster_path: "/j35uUmrMgWNQHrs0Obi8ll0OVfe.jpg",
  production_companies: [
    {
      id: 95823,
      logo_path: "/guoPHeFGMZSXvMnF8zNnOgWPuGO.png",
      name: "Stone Bench Creations",
      origin_country: "IN",
    },
    {
      id: 86347,
      logo_path: "/ir79iQBhrXk9PJ5Pr9vlLjM4viO.png",
      name: "Zee Studios",
      origin_country: "IN",
    },
  ],
  production_countries: [
    {
      iso_3166_1: "IN",
      name: "India",
    },
  ],
  release_date: "2024-04-26",
  revenue: 0,
  runtime: 159,
  spoken_languages: [
    {
      english_name: "Tamil",
      iso_639_1: "ta",
      name: "தமிழ்",
    },
  ],
  status: "Released",
  tagline: "",
  title: "Rathnam",
  video: false,
  vote_average: 7,
  vote_count: 1,
};
