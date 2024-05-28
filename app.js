const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topics.controller");

app.get("/api/topics", getAllTopics);

app.all('*', (req, res) => {
    res.status(404).send({msg: "Not found"})
      })

module.exports = app;
