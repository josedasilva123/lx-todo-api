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
const Categories_1 = __importDefault(require("../../models/Categories"));
const Users_1 = __importDefault(require("../../models/Users"));
const server_1 = require("../../server");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", true);
    yield mongoose_1.default.connect("mongodb://localhost:27017/lxtodo-category-test");
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
describe("Categories Routes (Create)", () => {
    it("should be able to create a category", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/categories")
            .set("auth", login.body.token)
            .send({
            label: "exemplo",
            slug: "category",
        })
            .expect(200);
        expect(response.body.message).toBe("Categoria cadastrada com sucesso!");
    }));
    it("should throw error when try to create a category with the same slug", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/categories")
            .set("auth", login.body.token)
            .send({
            label: "exemplo",
            slug: "category",
        })
            .expect(400);
        expect(response.body.error).toBe("Já existe uma categoria cadastrada com este respectivo slug.");
    }));
    it("should throw error when missing body parameter", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/categories")
            .set("auth", login.body.token)
            .send({
            label: "exemplo",
        })
            .expect(422);
    }));
});
describe("Categories Routes (Read)", () => {
    it("should be able to get the categories from the user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp).get("/categories").set("auth", login.body.token).expect(200);
        expect(response.body.count).toBe(1);
    }));
    it("should be able to get only the own categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "otaviano@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp).get("/categories").set("auth", login.body.token).expect(200);
        expect(response.body.count).toBe(0);
    }));
});
describe("Categories Routes (Delete)", () => {
    it("should throw error when try to delete another user category", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getCategory = yield (0, supertest_1.default)(server_1.serverHttp).get("/categories").set("auth", login.body.token).expect(200);
        const login2 = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "otaviano@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/categories/${getCategory.body.categories[0]._id}`)
            .set("auth", login2.body.token)
            .expect(400);
        expect(response.body.error).toBe("Você não tem autorização para excluir essa categoria.");
    }));
    it("should throw error when try to delete an unexisting category", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/categories/63c97f2c264bf92451c7a809`)
            .set("auth", login.body.token)
            .expect(400);
        expect(response.body.error).toBe("A categoria que você está tentando excluir não existe.");
    }));
    it("should be able to delete the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const getCategory = yield (0, supertest_1.default)(server_1.serverHttp).get("/categories").set("auth", login.body.token).expect(200);
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .delete(`/categories/${getCategory.body.categories[0]._id}`)
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body.message).toBe("Categoria excluida com sucesso!");
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Users_1.default.deleteMany();
    yield Categories_1.default.deleteMany();
    mongoose_1.default.disconnect();
}));
