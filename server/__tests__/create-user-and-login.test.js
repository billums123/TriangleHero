const supertest = require("supertest");
const { describe, it, beforeAll, expect, xdescribe } = require("@jest/globals");
const pg = require("pg");

const { TEST_DATABASE_URI } = process.env;

const server = "http://localhost:3000";

const pool = new pg.Pool({
  connectionString: TEST_DATABASE_URI,
});

jest.setTimeout(30000);

describe("User functionality", () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM "triangles";');
    await pool.query('DELETE FROM "users";');
  });

  describe("Registering a new user", () => {
    it("responds with a 200 status and creates a user", () => {
      const body = {
        username: "test",
        plainPassword: "test1",
      };
      return supertest(server)
        .post("/api/user/signup")
        .send(body)
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect((res) => {
          expect(res.body.username).toEqual("test");
          expect(res.body.userId).toBeDefined();
        });
    });
    it("does not create a user if no username is provided", () => {
      return supertest(server)
        .post("/api/user/signup")
        .send({ plainPassword: "testPassword" })
        .expect(400);
    });
    it("does not create a user if no password is provided", () => {
      return supertest(server)
        .post("/api/user/signup")
        .send({ username: "testUsername" })
        .expect(400);
    });
  });

  describe("Login functionality", () => {
    it("responds with a 200 status and logs in a user", () => {
      const body = {
        username: "test",
        plainPassword: "test1",
      };
      return supertest(server)
        .post("/api/user/login")
        .send(body)
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect("Set-Cookie", /access_token/);
    });
    it("responds with a 401 status if the username is incorrect", () => {
      const body = {
        username: "a",
        plainPassword: "test1",
      };
      return supertest(server).post("/api/user/login").send(body).expect(401);
    });
    it("responds with a 401 status if the password is incorrect", () => {
      const body = {
        username: "test@test.com",
        plainPassword: "test2",
      };
      return supertest(server).post("/api/user/login").send(body).expect(401);
    });
  });
});
