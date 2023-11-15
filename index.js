require("dotenv").config({ path: "./.env" });
AUTH_TOKEN = process.env.AUTH_TOKEN;

const fs = require("fs");
const express = require("express");
var bodyParser = require("body-parser");
const preprocess = require("./preprocess");

const { Client } = require("@notionhq/client");
const fetch = require("node-fetch");

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.listen(port, () => {
  console.log(`Notioner :: ${port}`);
});

const notion = new Client({
  auth: AUTH_TOKEN,
});
preprocess.init(notion);

app.get("/", (req, res, next) => {
  res.send("Notioner");
});

app.get("/favicon.ico", (req, res) => {
  res.sendFile(__dirname + "/favicon.png");
});

let postReqData;
let pageId;

app.post("/writeToNotion", urlencodedParser, async (req, res) => {
  postReqData = req.body;
  await preparePatchData(postReqData);
  res.status(200).send("Hello World!");
});

const retrievePage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(JSON.stringify(response));
};
// retrievePage("");

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

module.exports = app;
