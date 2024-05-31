const fs = require("fs");
const path = require("path");

const writeFetchStatus = (lastFetched, nextFetch) => {
  filePath = path.join(__dirname, "public", "data", "status.json");
  const data = {
    lastFetched,
    nextFetch,
  };
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Status written to file");
    }
  });
};

module.exports = writeFetchStatus;
