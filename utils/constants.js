import { fileURLToPath } from "url";
import { dirname } from "path";

export const AUTH_EXCEPT_PATHS = ["/", "/favicon.ico", "/status"];

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename).replace("utils", "");

export let FETCH_STATUS = {
  lastFetched: null,
  nextFetch: null,
};

export const MOVIES_DB_ID = "53999533-c639-467e-b0cb-bec31b241407";
export const COLLECTION_DB_ID = "b206d07b-0728-4b4f-a51c-1afa08bfbb84";
export const MOVIES_RELATION_ID = "58acc6ff1d8d4154a95d26219a2a1777";
export const SERIES_RELATION_ID = "d3982225de604015975d11fe0862e716";
