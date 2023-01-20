import mongoose from "mongoose";
import request from "supertest";
import Todos from "../../models/Todos";
import Users from "../../models/Users";
import { serverHttp } from "../../server";

beforeAll(async () => {
   await mongoose.connect("mongodb://localhost:27017/lxtodo-todo-test");
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

describe("Todos Routes (Create)", () => {
   it("should be able do create a todo", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
         .post("/todos")
         .set("auth", login.body.token)
         .send({
            title: "Teste",
            content: "Conteúdo de teste",
            category: "teste",
         })
         .expect(200);

      expect(response.body.message).toBe("Nota cadastrada com sucesso!");
   });

   it("should throw error when missing a body parameter", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      await request(serverHttp)
         .post("/todos")
         .set("auth", login.body.token)
         .send({
            title: "Teste",
            content: "Conteúdo de teste",
         })
         .expect(422);
   });
});

describe("Todos Routes (Update)", () => {
   it("should be able to update a note", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const getTech = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(200);

      const response = await request(serverHttp)
      .patch(`/todos/${getTech.body.todos[0]._id}`)
      .send({
         title: 'Título atualizado',
         content: 'Conteúdo atualizado',
         category: 'teste'
      })
      .set("auth", login.body.token)
      .expect(200)

      expect(response.body.message).toBe("Nota editada com sucesso!");
   })

   it("should throw error when missing body parameter", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const getTech = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(200);

      const response = await request(serverHttp)
      .patch(`/todos/${getTech.body.todos[0]._id}`)
      .send({
         title: 'Título atualizado',
         content: 'Conteúdo atualizado',
      })
      .set("auth", login.body.token)
      .expect(422)
   })

   it("should throw error when try to update an unexisting note", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });   

      const response = await request(serverHttp)
      .patch(`/todos/63c97f2c264bf92451c7a803`)
      .send({
         title: 'Título atualizado',
         content: 'Conteúdo atualizado',
         category: 'teste'
      })
      .set("auth", login.body.token)
      .expect(400)

      expect(response.body.error).toBe("A nota que você está tentando editar não existe.");
   })

   it("should throw error when try to update a note from another user", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const getTech = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(400);

      const login2 = await request(serverHttp).post("/users/login").send({
         email: "otaviano@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
      .patch(`/todos/${getTech.body.todos[0]._id}`)
      .send({
         title: 'Título atualizado',
         content: 'Conteúdo atualizado',
         category: 'teste'
      })
      .set("auth", login2.body.token)
      .expect(400)

      expect(response.body.error).toBe("Você não tem autorização para editar essa nota.");
   })
});

describe("Todos Routes (Read)", () => {
   it("should be able to read the user notes", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(200);
      
      expect(response.body.count).toBe(1); 
   })

   it("should be able to read only the own notes", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "otaviano@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(200);
      
      expect(response.body.count).toBe(0); 
   })  
   
   it("should be able to read a note passing the id as param", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const getTech = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      .expect(200);

      const response = await request(serverHttp)
      .get(`/todos/${getTech.body.todos[0]._id}`)
      .set("auth", login.body.token)
      .expect(200)
      
      expect(response.body).toBeTruthy(); 
   })   

   it("should throw error when try to get an unexisting note", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });
      const response = await request(serverHttp)
      .get(`/todos/63c97f2c264bf92451c7a809`)
      .set("auth", login.body.token)
      .expect(400)
      
      expect(response.body.error).toBe("Desculpe, nenhuma nota foi encontrada.");
   })
})

describe("Todos Routes (Delete)", () => {
   it("should throw error when try to delete a note from another user", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const getTech = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(400);

      const login2 = await request(serverHttp).post("/users/login").send({
         email: "otaviano@email.com.br",
         password: "@12Patinhos",
      });

      const response = await request(serverHttp)
      .delete(`/todos/${getTech.body.todos[0]._id}`)
      .set("auth", login2.body.token)
      .expect(400)

      expect(response.body.error).toBe("Você não tem autorização para excluir essa nota.");
   })

   it("should be able to delete a note", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });

      const getTech = await request(serverHttp)
      .get("/todos")
      .set("auth", login.body.token)
      expect(200);

      const response = await request(serverHttp)
      .delete(`/todos/${getTech.body.todos[0]._id}`)      
      .set("auth", login.body.token)
      .expect(200)

      expect(response.body.message).toBe("Nota excluida com sucesso!");
   })

   it("should throw error when try to delete an unexisting note", async () => {
      const login = await request(serverHttp).post("/users/login").send({
         email: "joilsonbolado@email.com.br",
         password: "@12Patinhos",
      });   

      const response = await request(serverHttp)
      .delete(`/todos/63c97f2c264bf92451c7a803`)
      .set("auth", login.body.token)
      .expect(400)

      expect(response.body.error).toBe("A nota que você está tentando excluir não existe.");
   })
})

afterAll(async () => {
   await Users.deleteMany();
   await Todos.deleteMany();
   mongoose.disconnect();
});