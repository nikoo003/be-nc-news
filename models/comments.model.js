const db = require("../db/connection");

exports.selectCommentsByArticleId = (article_id) => {
  return db
    .query(
      `SELECT comments.*, articles.article_id AS article_exists
       FROM articles
       LEFT JOIN comments ON articles.article_id = comments.article_id
       WHERE articles.article_id = $1
       ORDER BY comments.created_at DESC`,
      [article_id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else if (result.rows[0].comment_id === null) {
        return [];
      } else {
        return result.rows;
      }
    });
};

exports.setComment = (article_id, username, body) => {
  return db
    .query("SELECT * FROM users WHERE username = $1", [username])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Invalid username",
        });
      }else{
        return db
        .query(
          "INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING * ;",
          [article_id, username, body]
        )
        .then(({ rows }) => {
          return rows[0];
        });
      }
    });
};

exports.removeComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      } else {
        return rows[0];
      }
    });
};
