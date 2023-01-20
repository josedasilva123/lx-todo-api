"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const Todos_1 = __importDefault(require("../../models/Todos"));
const Users_1 = __importDefault(require("../../models/Users"));
const server_1 = require("../../server");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set('strictQuery', true);
    yield mongoose_1.default.connect("mongodb://localhost:27017/lxtodo-todo-test");
    //User A
    yield (0, supertest_1.default)(server_1.serverHttp).post("/users/").send({
        name: "Joilson",
        email: "joilsonbolado@email.com.br",
        password: "@12Patinhos",
    });
    //User B
    yield (0, supertest_1.default)(server_1.serverHttp).post("/users/").send({
        name: "Otaviano",
        email: "otaviano@email.com.br",
        password: "@12Patinhos",
    });
}));
describe("Todos Routes (Create)", () => {
    it("should be able do create a todo", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/todos")
            .set("auth", login.body.token)
            .send({
            title: "Teste",
            content: "Conteúdo de teste",
            category: "teste",
        })
            .expect(200);
        expect(response.body.message).toBe("Nota cadastrada com sucesso!");
    }));
    it("should throw error when missing a body parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/todos")
            .set("auth", login.body.token)
            .send({
            title: "Teste",
            content: "Conteúdo de teste",
        })
            .expect(422);
    }));
});
describe("Todos Routes (Update)", () => {
    it("should be able to update a note", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getNote = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(200);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch(`/todos/${getNote.body.todos[0]._id}`)
            .send({
            title: 'Título atualizado',
            content: 'Conteúdo atualizado',
            category: 'teste'
        })
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body.message).toBe("Nota editada com sucesso!");
    }));
    it("should throw error when missing body parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getNote = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(200);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch(`/todos/${getNote.body.todos[0]._id}`)
            .send({
            title: 'Título atualizado',
            content: 'Conteúdo atualizado',
        })
            .set("auth", login.body.token)
            .expect(422);
    }));
    it("should throw error when try to update an unexisting note", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch(`/todos/63c97f2c264bf92451c7a803`)
            .send({
            title: 'Título atualizado',
            content: 'Conteúdo atualizado',
            category: 'teste'
        })
            .set("auth", login.body.token)
            .expect(400);
        expect(response.body.error).toBe("A nota que você está tentando editar não existe.");
    }));
    it("should throw error when try to update a note from another user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getNote = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(400);
        const login2 = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "otaviano@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch(`/todos/${getNote.body.todos[0]._id}`)
            .send({
            title: 'Título atualizado',
            content: 'Conteúdo atualizado',
            category: 'teste'
        })
            .set("auth", login2.body.token)
            .expect(400);
        expect(response.body.error).toBe("Você não tem autorização para editar essa nota.");
    }));
});
describe("Todos Routes (Read)", () => {
    it("should be able to read the user notes", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(200);
        expect(response.body.count).toBe(1);
    }));
    it("should be able to read only the own notes", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "otaviano@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(200);
        expect(response.body.count).toBe(0);
    }));
    it("should be able to read a note passing the id as param", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getNote = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token)
            .expect(200);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get(`/todos/${getNote.body.todos[0]._id}`)
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body).toBeTruthy();
    }));
    it("should throw error when try to get an unexisting note", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .get(`/todos/63c97f2c264bf92451c7a809`)
            .set("auth", login.body.token)
            .expect(400);
        expect(response.body.error).toBe("Desculpe, nenhuma nota foi encontrada.");
    }));
});
describe("Todos Routes (Delete)", () => {
    it("should throw error when try to delete a note from another user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getNote = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(400);
        const login2 = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "otaviano@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/todos/${getNote.body.todos[0]._id}`)
            .set("auth", login2.body.token)
            .expect(400);
        expect(response.body.error).toBe("Você não tem autorização para excluir essa nota.");
    }));
    it("should be able to delete a note", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getNote = yield (0, supertest_1.default)(server_1.serverHttp)
            .get("/todos")
            .set("auth", login.body.token);
        expect(200);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/todos/${getNote.body.todos[0]._id}`)
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body.message).toBe("Nota excluida com sucesso!");
    }));
    it("should throw error when try to delete an unexisting note", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/todos/63c97f2c264bf92451c7a803`)
            .set("auth", login.body.token)
            .expect(400);
        expect(response.body.error).toBe("A nota que você está tentando excluir não existe.");
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Users_1.default.deleteMany();
    yield Todos_1.default.deleteMany();
    mongoose_1.default.disconnect();
}));
