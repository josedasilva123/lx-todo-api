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
exports.UserRegister = void 0;
const Users_1 = __importDefault(require("../../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserRegister {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = body;
            const existingUser = yield Users_1.default.findOne({ email: email });
            if (existingUser) {
                throw new Error("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
            }
            const encryptedPassword = bcryptjs_1.default.hashSync(password, 1);
            const user = {
                name,
                email,
                password: encryptedPassword,
            };
            const newUser = yield Users_1.default.create(user);
            const token = jsonwebtoken_1.default.sign({
                _id: newUser._id,
            }, process.env.JWT_SECRETKEY, { expiresIn: "12h" });
            return {
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    password: newUser.password,
                },
                token: token,
                message: "Cadastro realizado com sucesso!"
            };
        });
    }
}
exports.UserRegister = UserRegister;
