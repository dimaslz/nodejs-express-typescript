import request from "supertest";
import { isValidObjectId } from "mongoose";

import UserModel from "../../models/User.model";
import {
  connect,
  clearDatabase,
  closeDatabase,
} from "../../../test/settings/db-handler";

import app from "../../app";

beforeAll(async () => await connect());

afterEach(async () => await clearDatabase());

afterAll(async () => await closeDatabase());

describe("User controller endpoints", () => {
  describe("GET", () => {
    it("`/users` If do not exist users should return an empty array", async (done) => {
      request(app)
        .get("/users")
        .expect(200)
        .then((response: any) => {
          const users = response.body.data;
          expect(users).toHaveLength(0);
          expect(users).toMatchObject([]);
          done();
        });
    });

    it("`/users` If there are users should return an array", async (done) => {
      const userData = {
        username: "foo",
        email: "foo@bar.com",
        password: "password123",
      };
      const validUser = new UserModel(userData);
      await validUser.save();
  
      request(app)
        .get("/users")
        .expect(200)
        .then((response: any) => {
          const users = response.body.data;
          expect(users).toHaveLength(1);
          expect(users).toMatchObject([
            {
              _id: validUser._id.toString(),
              email: userData.email,
              username: userData.username,
            }
          ]);
          done();
        });
    });

    it("`/users/:userId` If userId is not an ObjectId should return an error", async (done) => {
      request(app)
        .get("/users/foo")
        .expect(400)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(400);
          expect(user.message).toBe("UserID parameter should be a valid ObjectId.");
          done();
        });
    });

    it("`/users/:userId` If user does not exists, data should return an error", async (done) => {
      request(app)
        .get("/users/5ef7d10f0f64318daf5ab956")
        .expect(404)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(404);
          expect(user.data).toBe(undefined);
          expect(user.message).toBe("UserID does not exists");
          done();
        });
    });

    it("`/users/:userId` If user exists should return user data", async (done) => {
      const userData = {
        username: "foo",
        email: "foo@bar.com",
        password: "password123",
      };
      const validUser = new UserModel(userData);
      const savedUser = await validUser.save();
  
      expect(savedUser._id).toBeDefined();
      request(app)
        .get(`/users/${savedUser._id}`)
        .expect(200)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(200);
          expect(user.data).toMatchObject({
            _id: savedUser._id.toString(),
            username: userData.username,
            email: userData.email,
          });
          done();
        });
    });
  });
  
  describe("POST", () => {
    it("`/users` If user exists should return user data", async (done) => {
      const userData = {
        username: "foo",
        email: "foo@email.com",
        password: "password123",
      };
  
      request(app)
        .post("/users")
        .send(userData)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const user = response.body;
  
          expect(user.status).toBe(200);
          expect(isValidObjectId(user.data._id)).toBe(true);
          expect(user.data.username).toBe(userData.username);
          expect(user.data.email).toBe(userData.email);
          
          done();
        });
    });
  });

  describe("PUT", () => {
    it("`/users/:userId` If userId is not a valid ObjectId should return an error", async (done) => {
      request(app)
        .get("/users/foo")
        .expect(400)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(400);
          expect(user.message).toBe("UserID parameter should be a valid ObjectId.");
          done();
        });
    });

    it("`/users/:userId` If userId does not exists, should return and error", async (done) => {
      request(app)
        .put("/users/5f6cb123cdd18ad8826aa851")
        .expect(404)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(404);
          expect(user.message).toBe("UserID does not exists");
          done();
        });
    });

    it("`/users/:userId` User should be updated", async (done) => {
      const userDataOriginal = {
        username: "foo",
        email: "foo@bar.com",
        password: "password123",
      };
      const validUser = new UserModel(userDataOriginal);
      const savedUser = await validUser.save();
  
      const userDataToUpdate = {
        username: "bar",
        email: "bar@email.com",
        password: "password456",
      };
  
      const userData = savedUser.toJSON();
      request(app)
        .put(`/users/${userData._id}`)
        .send(userDataToUpdate)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          const user = response.body;
  
          expect(user.status).toBe(200);
          expect(isValidObjectId(user.data._id)).toBe(true);
          expect(user.data.username).toBe(userDataToUpdate.username);
          expect(user.data.email).toBe(userDataToUpdate.email);
          
          done();
        });
    });
  });

  describe("DELETE", () => {
    it("`/users/:userId` If userId is not a valid ObjectId should return an error", async (done) => {
      request(app)
        .get("/users/foo")
        .expect(400)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(400);
          expect(user.message).toBe("UserID parameter should be a valid ObjectId.");
          done();
        });
    });

    it("`/users/:userId` If userId does not exists, should return and error", async (done) => {
      request(app)
        .put("/users/5f6cb123cdd18ad8826aa851")
        .expect(404)
        .then((response) => {
          const user = response.body;
          expect(user.status).toBe(404);
          expect(user.message).toBe("UserID does not exists");
          done();
        });
    });

    it("`/users/:userId` User should be updated and looks like deleted", async (done) => {
      const userDataOriginal = {
        username: "foo",
        email: "foo@bar.com",
        password: "password123",
      };
      const validUser = new UserModel(userDataOriginal);
      const savedUser = await validUser.save();
  
      const userData = savedUser.toJSON();
      request(app)
        .delete(`/users/${userData._id}`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(async ({ body }: any) => {
          expect(body.status).toBe(200);
          expect(body.message).toBe("User has been deleted successfully");
          const currentUserData = await UserModel.findOne({ _id: userData._id });
          expect(currentUserData.delete).toBe(true);
          
          done();
        });
    });
  });
});
