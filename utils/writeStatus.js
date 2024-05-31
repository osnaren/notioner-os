import fs from "fs";
import path from "path";
import { __dirname } from "./constants.js";

export const writeFetchStatus = (lastFetched, nextFetch) => {
  const filePath = path.join(__dirname, "public/data", "status.json");
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
