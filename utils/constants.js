const AUTH_EXCEPT_PATHS = ["/", "/favicon.ico", "/status"];

let FETCH_STATUS = {
  lastFetched: null,
  nextFetch: null,
};

module.exports = {
  AUTH_EXCEPT_PATHS,
  FETCH_STATUS,
};
