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
const Users_1 = __importDefault(require("../../models/Users"));
const server_1 = require("../../server");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.default.set("strictQuery", true);
    yield mongoose_1.default.connect("mongodb://localhost:27017/lxtodo-user-test");
}));
describe("User Routes (Register)", () => {
    it("should register user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/users/")
            .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(200);
        expect(response.body.message).toBe("Cadastro realizado com sucesso!");
    }));
    it("should throw error when try to register and existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/users/")
            .send({
            name: "Joilson",
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(400);
        expect(response.body.error).toBe("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
    }));
    it("should throw error when missing body parameter in register", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/users/")
            .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(422);
        expect(response.body).toBeTruthy();
    }));
});
describe("User Routes (Login)", () => {
    it("should return user when login is correct", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/users/login")
            .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        })
            .expect(200);
        expect(response.body.token).toBeTruthy();
        expect(response.body.user).toBeTruthy();
    }));
    it("should throw error when try to login with a unexisting user", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/users/login")
            .send({
            email: "patinho@email.com.br",
            password: "@12Patinhos",
        })
            .expect(400);
        expect(response.body.error).toBe("O usuário fornecido não está cadastrado.");
    }));
    it("should throw error when try to login with wrong password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .post("/users/login")
            .send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos2",
        })
            .expect(400);
        expect(response.body.error).toBe("Desculpe, o e-mail e senha fornecidos não correspondem.");
    }));
});
describe("User Routes (AutoLogin)", () => {
    it("should autologin user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp).get("/users/profile").set("auth", login.body.token).expect(200);
        expect(response.body).toBeTruthy();
    }));
    it("should throw error when token is invalid on autologin", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp).get("/users/profile").set("auth", "123").expect(400);
        expect(response.body.error).toBe("Sua token expirou ou é inválida.");
    }));
});
describe("User Routes (Change Password)", () => {
    it("should be able to change password", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@12Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch("/users/password")
            .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
        })
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body.message).toBe("Senha alterada com sucesso!");
    }));
    it("should throw error when password in wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@20Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch("/users/password")
            .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
        })
            .set("auth", login.body.token)
            .expect(400);
        expect(response.body.error).toBe("A senha atual fornecida não corresponde de fato a senha atual.");
    }));
    it("should throw error when token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch("/users/password")
            .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
        })
            .expect(400);
        expect(response.body.error).toBe("Está rota precisa de autorização.");
    }));
});
describe("User Routes (Edit)", () => {
    it("should be adle to edit user", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(server_1.serverHttp).post("/users/login").send({
            email: "joilsonbolado@email.com.br",
            password: "@20Patinhos",
        });
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch("/users/")
            .send({
            name: "Joilson Boladado Silva Neto",
        })
            .set("auth", login.body.token)
            .expect(200);
        expect(response.body.message).toBe("Usuário editado com sucesso!");
    }));
    it("should throw error when token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.serverHttp)
            .patch("/users/")
            .send({
            currentPassword: "@12Patinhos",
            newPassword: "@20Patinhos",
        })
            .expect(400);
        expect(response.body.error).toBe("Está rota precisa de autorização.");
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Users_1.default.deleteMany();
    mongoose_1.default.disconnect();
}));
