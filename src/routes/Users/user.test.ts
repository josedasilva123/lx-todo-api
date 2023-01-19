import mongoose from "mongoose";
import request from "supertest";
import User from "../../models/Users";
import { serverHttp } from "../../server";

beforeAll(async () => {
   await mongoose.connect("mongodb://localhost:27017/lxtodo-user-test");
});

describe("User Routes (Register)", () => {
   it("should register user", async () => {
      const response = await request(serverHttp)
         .post("/users/")
         .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(200);

      expect(response.body.message).toBe("Cadastro realizado com sucesso!");
   });

   it("should throw error when try to register and existing user", async () => {
      const response = await request(serverHttp)
         .post("/users/")
         .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(400);

      expect(response.body.error).toBe("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
   });

   it("should throw error when missing body parameter in register", async () => {
      const response = await request(serverHttp)
         .post("/users/")
         .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(422);

      expect(response.body).toBeTruthy();
   });
});

describe("User Routes (Login)", () => {
   it("should return user when login is correct", async () => {
      const response = await request(serverHttp)
         .post("/users/login")
         .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         })
         .expect(200);

      expect(response.body.token).toBeTruthy();
      expect(response.body.user).toBeTruthy();
   });

   it("should throw error when try to login with a unexisting user", async () => {
      const response = await request(serverHttp)
         .post("/users/login")
         .send({
            email: "patinho@email.com.br",
            password: "@12Patinhos",
         })
         .expect(400);

      expect(response.body.error).toBe("O usuário fornecido não está cadastrado.");
   });

   it("should throw error when try to login with wrong password", async () => {
      const response = await request(serverHttp)
         .post("/users/login")
         .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos2",
         })
         .expect(400);

      expect(response.body.error).toBe("Desculpe, o e-mail e senha fornecidos não correspondem.");
   });
});

describe("User Routes (AutoLogin)", () => {
   it("should autologin user", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp).get("/users/profile").set("auth", login.body.token).expect(200);

      expect(response.body).toBeTruthy();
   });

   it("should throw error when token is invalid on autologin", async () => {
      const response = await request(serverHttp).get("/users/profile").set("auth", "123").expect(400);

      expect(response.body.error).toBe("Sua token expirou ou é inválida.");
   });
});

describe("User Routes (Change Password)", () => {
   it("should be able to change password", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
         .patch("/users/password")
         .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
         })
         .set("auth", login.body.token)
         .expect(200);

      expect(response.body.message).toBe("Senha alterada com sucesso!");
   });

   it("should throw error when password in wrong", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@20Patinhos",
      });

      const response = await request(serverHttp)
         .patch("/users/password")
         .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
         })
         .set("auth", login.body.token)
         .expect(400);

      expect(response.body.error).toBe("A senha atual fornecida não corresponde de fato a senha atual.");
   });

   it("should throw error when token is invalid", async () => {
      const response = await request(serverHttp)
         .patch("/users/password")
         .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
         })
         .expect(400);

      expect(response.body.error).toBe("Está rota precisa de autorização.");
   });
});

describe("User Routes (Edit)", () => {
   it("should be adle to edit user", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@20Patinhos",
      });

      const response = await request(serverHttp)
         .patch("/users/")
         .send({
            name: "Joilson Boladado Silva Neto",
         })
         .set("auth", login.body.token)
         .expect(200);

      expect(response.body.message).toBe("Usuário editado com sucesso!");
   });

   it("should throw error when token is invalid", async () => {
      const response = await request(serverHttp)
         .patch("/users/")
         .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
         })
         .expect(400);

      expect(response.body.error).toBe("Está rota precisa de autorização.");
   });
});

afterAll(async () => {
   await User.deleteMany();
   mongoose.disconnect();
});
