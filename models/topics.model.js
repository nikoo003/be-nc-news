const db = require("../db/connection");

exports.selectsAllTopics = () => {
  return db.query(`SELECT * FROM topics`).then((result) => {
    return result.rows
  });
};

 