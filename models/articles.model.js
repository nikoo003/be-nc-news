const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [article_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      } else {
        return result.rows[0];
      }
    });
};

exports.selectArticles = () => {
  return db
    .query(
      `
      SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) ::INT AS comment_count 
      FROM articles 
      LEFT JOIN comments ON comments.article_id = articles.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateArticle = (article_id, inc_votes) => {

  if(typeof inc_votes !== "number"){
    return Promise.reject({
      status:400, 
      msg: "Vote value is not valid"
    })
  }
  return db
    .query(
      `UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *`,
      [inc_votes, article_id]
    )
    .then((result) => {
      const updatedArticle = result.rows[0];
      if (updatedArticle.votes < 0) {
        updatedArticle.votes = 0;
      }
      return updatedArticle;
    });
};
