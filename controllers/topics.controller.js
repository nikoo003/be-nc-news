const { selectsAllTopics } = require("../models/topics.model");

exports.getAllTopics = (req, res, next) => {
  selectsAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
