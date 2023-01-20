import mongoose from "mongoose";
import request from "supertest";
import Categories from "../../models/Categories";
import Users from "../../models/Users";
import { serverHttp } from "../../server";

beforeAll(async () => {
   mongoose.set("strictQuery", true);
   await mongoose.connect("mongodb://localhost:27017/lxtodo-category-test");
   //User A
   await request(serverHttp).post("/users/").send({
      name: "Joilson",
      email: "joilsonbolado@email.com.br",
      password: "@12Patinhos",
   });
   //User B
   await request(serverHttp).post("/users/").send({
      name: "Otaviano",
      email: "otaviano@email.com.br",
      password: "@12Patinhos",
   });
});

describe("Categories Routes (Create)", () => {
   it("should be able to create a category", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
         .post("/categories")
         .set("auth", login.body.token)
         .send({
            label: "exemplo",
            slug: "category",
         })
         .expect(200);

      expect(response.body.message).toBe("Categoria cadastrada com sucesso!");
   });

   it("should throw error when try to create a category with the same slug", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
         .post("/categories")
         .set("auth", login.body.token)
         .send({
            label: "exemplo",
            slug: "category",
         })
         .expect(400);

      expect(response.body.error).toBe("Já existe uma categoria cadastrada com este respectivo slug.");
   });

   it("should throw error when missing body parameter", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
         .post("/categories")
         .set("auth", login.body.token)
         .send({
            label: "exemplo",
         })
         .expect(422);
   });
});

describe("Categories Routes (Read)", () => {
   it("should be able to get the categories from the user", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp).get("/categories").set("auth", login.body.token).expect(200);

      expect(response.body.count).toBe(1);
   });

   it("should be able to get only the own categories", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "otaviano@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp).get("/categories").set("auth", login.body.token).expect(200);

      expect(response.body.count).toBe(0);
   });
});

describe("Categories Routes (Delete)", () => {
    it("should throw error when try to delete another user category", async () => {
        const login = await request(serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         });
   
         const getCategory = await request(serverHttp).get("/categories").set("auth", login.body.token).expect(200);

         const login2 = await request(serverHttp).post("/users/login").send({
            email: "otaviano@email.com.br",
            password: "@12Patinhos",
         });

         const response = await request(serverHttp)
         .delete(`/categories/${getCategory.body.categories[0]._id}`)
         .set("auth", login2.body.token)
         .expect(400)

         expect(response.body.error).toBe("Você não tem autorização para excluir essa categoria.");
    })

    it("should throw error when try to delete an unexisting category", async () => {
        const login = await request(serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         });

         const response = await request(serverHttp)
         .delete(`/categories/63c97f2c264bf92451c7a809`)
         .set("auth", login.body.token)
         .expect(400)

         expect(response.body.error).toBe("A categoria que você está tentando excluir não existe.");
    })

    it("should be able to delete the category", async () => {
        const login = await request(serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
         });
   
         const getCategory = await request(serverHttp).get("/categories").set("auth", login.body.token).expect(200);

         const response = await request(serverHttp)
         .delete(`/categories/${getCategory.body.categories[0]._id}`)
         .set("auth", login.body.token)
         .expect(200)

         expect(response.body.message).toBe("Categoria excluida com sucesso!");
    })
})

afterAll(async () => {
   await Users.deleteMany();
   await Categories.deleteMany();
   mongoose.disconnect();
});
