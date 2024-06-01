import express from "express";
import bodyParser from "body-parser";
import { join, dirname } from "path";
import "dotenv/config";

// Import custom authentication middleware
import { authenticate } from "#utils/authenticate.js";

// Dependencies
import movie from "#modules/n-movies/movies.js";
import { writeFetchStatus } from "#utils/writeStatus.js";
import { FETCH_STATUS, __dirname } from "#utils/constants.js";

// Initialize App
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Custom authentication middleware
app.use(authenticate);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Notioner Running at port :: ${port}`);
});

// Routes
app.get("/", (req, res, next) => {
  const options = {
    root: __dirname,
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
    maxAge: "1d",
  };
  res.sendFile(join(__dirname, "public", "index.html"), (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", "index.html");
    }
  });
});

app.get("/status", (req, res, next) => {
  res.sendFile(join(__dirname, "public", "status.html"), (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", "status.html");
    }
  });
});

app.get("/test", (req, res) => {
  res.send("Test");
});

app.post("/writeNewMovie", async (req, res) => {
  await movie.writeNewMovie(req.body);
  res.status(200).send("Executed Successfully");
});

app.post("/fetchNewMovies", async (req, res) => {
  const date = new Date();
  FETCH_STATUS.lastFetched = date.toISOString();
  FETCH_STATUS.nextFetch = new Date(date.getTime() + 5 * 60000).toISOString();
  // writeFetchStatus(FETCH_STATUS.lastFetched, FETCH_STATUS.nextFetch);

  const reqTime = req.body.time;
  const response = await movie.fetchNewMovies(reqTime);
  res.status(200).send(response);
});

app.post("/testNotion", async (req, res) => {
  const response = await movie.testNotion(req.body);
  res.status(200).send(response);
});

// Catch-all route for undefined paths
app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

export default app;
