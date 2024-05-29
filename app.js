const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controller");
const { getApi } = require("./controllers/api.controller");
const { getArticleById } = require("./controllers/articles.controller");

app.get("/api/topics", getAllTopics);
app.get("/api", getApi);
app.get("/api/articles/:article_id", getArticleById);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.code) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
