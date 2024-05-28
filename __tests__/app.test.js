const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const db = require("../db/connection");
const endpoints = require("../endpoints.json");

afterAll(() => {
  return db.end();
});
beforeEach(() => {
  return seed(data);
});

describe("GET api/topics", () => {
  test("GET:200 sends an array of topics to the client with the correct array length", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).toHaveLength(3);
      });
  });
  test("Each topic object has correct structure", () => {
    return request(app)
      .get("/api/topics")
      .then(({ body }) => {
        body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});
describe("GET /api", () => {
  test("GET:200 responds with a JSON object describing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({endpoints});
      });
  });
});

describe("/*", () => {
  test("GET:404 responds with an error message when accessing a nonexistent route", () => {
    return request(app)
      .get("/api/notARoute")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found");
      });
  });
});
