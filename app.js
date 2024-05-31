const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controller");
const { getApi } = require("./controllers/api.controller");
const {
  getArticleById,
  getArticles,
  sendUpdatedArticle,
} = require("./controllers/articles.controller");
const {
  getCommentsByArticleId,
  addComment,
  deleteComment,
} = require("./controllers/comments.controller");

app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api", getApi);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", addComment);
app.patch("/api/articles/:article_id", sendUpdatedArticle);
app.delete("/api/comments/:comment_id", deleteComment);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
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
