const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT * FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC
  `,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      } else {
        return result.rows;
      }
    });
};

exports.setComment = (article_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Invalid data provided for comment",
    });
  } else {
    return db
      .query(
        "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING * ;",
        [article_id, username, body]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  }
};
