export type MovieTitleYear = {
  title: string;
  year?: string;
};

export type MovieImdbId = {
  imdbID: string;
};

export type OMDBSuccessResponse = {
  Response: "True";
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};

export type OMDBErrorResponse = {
  Response: "False";
  Error: string;
};

export type OMDBAPIResponse = OMDBSuccessResponse | OMDBErrorResponse;

export type MovieData = {
  Title: string;
  Year: number;
  Rated: string;
  Genre: string;
  "IMDB Rating": number;
  "Run Time": string;
  Language: string;
  Cast: string;
  Poster: string;
  Type: string;
  "Box Office": string;
  Director: string;
  imdbID: string;
  Plot: string;
  Tagline: string;
  "TMDB ID": number;
  "Where To Watch": string;
  Trailer: string;
  "Back Drop": string;
  Icon: string;
  Collection: string;
  CID: number;
  CBackdrop: string;
  CPoster: string;
  CItemId?: string;
};

export type MovieDataProperties =
  | "Title"
  | "Year"
  | "Rated"
  | "Genre"
  | "IMDB Rating"
  | "Run Time"
  | "Language"
  | "Cast"
  | "Poster"
  | "Type"
  | "Box Office"
  | "Director"
  | "imdbID"
  | "Plot"
  | "Tagline"
  | "TMDB ID"
  | "Where To Watch"
  | "Trailer"
  | "Back Drop"
  | "Icon"
  | "Collection"
  | "CID"
  | "CBackdrop"
  | "CPoster";

export type OMDBTransformedResponse = Pick<
  MovieData,
  | "Title"
  | "Year"
  | "Rated"
  | "Genre"
  | "IMDB Rating"
  | "Run Time"
  | "Language"
  | "Cast"
  | "Poster"
  | "Type"
  | "Box Office"
  | "Director"
  | "imdbID"
  | "Plot"
>;

export type NotionMovieProperties = {
  Title: {
    id: string;
    type: string;
    title: (null | string)[];
  };
  Genre: {
    id: string;
    type: string;
    multi_select: (null | string)[];
  };
  Type: {
    id: string;
    type: string;
    relation: (null | string)[];
  };
  imdbID: {
    id: string;
    type: string;
    rich_text: (null | string)[];
  };
  "Run Time": {
    id: string;
    type: string;
    rich_text: (null | string)[];
  };
  Rated: {
    id: string;
    type: string;
    select: (null | string)[];
  };
  "Watched On": {
    id: string;
    type: string;
    date: (null | string)[];
  };
  "TMDB ID": {
    id: string;
    type: string;
    number: number | null;
  };
  Tagline: {
    id: string;
    type: string;
    rich_text: (null | string)[];
  };
  "My Rating": {
    id: string;
    type: string;
    select: (null | string)[];
  };
  Trailer: {
    id: string;
    type: string;
    url: string;
  };
  Poster: {
    id: string;
    type: string;
    files: (null | string)[];
  };
  Language: {
    id: string;
    type: string;
    multi_select: (null | string)[];
  };
  Director: {
    id: string;
    type: string;
    multi_select: (null | string)[];
  };
  Cast: {
    id: string;
    type: string;
    multi_select: (null | string)[];
  };
  Plot: {
    id: string;
    type: string;
    rich_text: (null | string)[];
  };
  "Where To Watch": {
    id: string;
    type: string;
    url: string;
  };
  Year: {
    id: string;
    type: string;
    number: number;
  };
  "Watch Count": {
    id: string;
    type: string;
    number: number | null;
  };
  "IMDB Rating": {
    id: string;
    type: string;
    number: number;
  };
  "Box Office": {
    id: string;
    type: string;
    number: number;
  };
  Collection: {
    id: string;
    type: string;
    relation: (null | string)[];
  };
};

export type IdType = {
  id: string;
  type: string;
};
export type CheckboxPropertyItemObjectResponse = {
  id?: string;
  type: "checkbox";
  checkbox: boolean;
};
export type EmailPropertyItemObjectResponse = {
  id?: string;
  type: "email";
  email: string;
};
export type NumberPropertyItemObjectResponse = {
  id?: string;
  type: "number";
  number: number | null;
};
export type StatusPropertyItemObjectResponse = {
  id?: string;
  type: "status";
  status: { name: string };
};
export type DatePropertyItemObjectResponse = {
  id?: string;
  type: "date";
  date: {
    start: string;
    end: string | null;
    time_zone: string | null;
  };
};
export type FilesPropertyItemObjectResponse = {
  id?: string;
  type: string;
  files: Array<{
    name: string;
    type: "external";
    external: {
      url: string;
    };
  }>;
};
export type ExternalFilePropertyItemObjectResponse = {
  type: "external";
  external: {
    url: string;
  };
};
export type UrlPropertyItemObjectResponse = {
  id?: string;
  type: "url";
  url: string;
};
export type RelationPropertyItemObjectResponse = {
  id?: string;
  type: "relation";
  relation: Array<{
    id: string;
  }>;
};
export type SelectPropertyItemObjectResponse = {
  id?: string;
  type: "select";
  select: { name: string };
};
export type MultiSelectPropertyItemObjectResponse = {
  id?: string;
  type: "multi_select";
  multi_select: Array<{
    name: string;
  }>;
};
export type RichTextPropertyItemObjectResponse = {
  id?: string;
  type: "rich_text";
  rich_text: Array<{
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
  }>;
};
export type TitlePropertyItemObjectResponse = {
  id: "title";
  type: "title";
  title: Array<{
    type: "text";
    text: {
      content: string;
      link: string | null;
    };
  }>;
};

export type NotionPropertyItemObjectResponse =
  | CheckboxPropertyItemObjectResponse
  | EmailPropertyItemObjectResponse
  | NumberPropertyItemObjectResponse
  | StatusPropertyItemObjectResponse
  | DatePropertyItemObjectResponse
  | FilesPropertyItemObjectResponse
  | ExternalFilePropertyItemObjectResponse
  | UrlPropertyItemObjectResponse
  | RelationPropertyItemObjectResponse
  | SelectPropertyItemObjectResponse
  | MultiSelectPropertyItemObjectResponse
  | RichTextPropertyItemObjectResponse
  | TitlePropertyItemObjectResponse;

export type NotionProperties =
  | "id"
  | "url"
  | "status"
  | "date"
  | "checkbox"
  | "email"
  | "number"
  | "files"
  | "relation"
  | "select"
  | "multi_select"
  | "rich_text"
  | "title";
