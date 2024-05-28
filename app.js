const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controller");
const { getApi } = require("./controllers/api.controller");

app.get("/api/topics", getAllTopics);
app.get("/api", getApi);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

module.exports = app;
