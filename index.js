const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const helmet = require("helmet");

// Import custom authentication middleware
const auth = require("./utils/authenticate");
const preprocess = require("./preprocess");

// Initialize App
// deepcode ignore UseCsurfForExpress
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", "https://vercel.live", "https:"],
        scriptSrc: ["'self'", "https://vercel.live", "https:"],
        connectSrc: ["'self'", "https://vercel.live"],
      },
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.authenticate); // Custom authentication middleware

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
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
    maxAge: "1d",
  };
  res.sendFile("index.html", options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", "index.html");
    }
  });
});

app.get("/test", (req, res) => {
  res.send("Test");
});

let postReqData;

app.post("/writeToNotion", async (req, res) => {
  postReqData = req.body;
  await preparePatchData(postReqData);
  res.status(200).send("Hello World!");
});

const retrievePage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(JSON.stringify(response));
};

const preparePatchData = async (postReqData) => {
  console.log("Preparing data for patching : ", postReqData["Item ID"]);
  const data = {
    page_id: postReqData["Item ID"],
    cover: {
      type: "external",
      external: {
        url: `${postReqData["Back Drop"]}`,
      },
    },
    icon: {
      type: "external",
      external: {
        url: `${postReqData["Icon"]}`,
      },
    },
    properties: await preprocess.preProcessData({
      req: postReqData,
      client: notion,
    }),
  };
  // console.log(JSON.stringify(data));
  await updatePage(data);
};

const updatePage = async (data) => {
  try {
    const response = await notion.pages.update(data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

app.post("/listenNewMovies", async (req, res) => {
  const databaseId = "53999533-c639-467e-b0cb-bec31b241407";
  reqTime = req.body.time;
  let before_time = new Date(reqTime);
  let after_time = new Date(reqTime);
  after_time.setMinutes(after_time.getMinutes() - 8);
  let body = {
    database_id: databaseId,
    filter: {
      and: [
        {
          timestamp: "created_time",
          created_time: {
            after: after_time.toISOString(),
          },
        },
        {
          timestamp: "created_time",
          created_time: {
            before: before_time.toISOString(),
          },
        },
      ],
    },
  };
  let response = await checkNewMovies(body);

  if (response.results.length > 0) {
    var newMovies = await preprocess.processNewMoviesResult(response.results);
    console.log(newMovies);
    res.status(200).send(newMovies);
  } else {
    res.status(200).send("No New Movies");
  }
});

const checkNewMovies = async (body) => {
  const response = await notion.databases.query(body);
  return response;
};

// Catch-all route for undefined paths
app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
