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
exports.UserLogin = void 0;
const Users_1 = __importDefault(require("../../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserLogin {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = body;
            const user = yield Users_1.default.findOne({ email: email });
            if (!user) {
                throw new Error("O usuário fornecido não está cadastrado.");
            }
            if (!bcryptjs_1.default.compareSync(password, user.password)) {
                throw new Error("Desculpe, o e-mail e senha fornecidos não correspondem.");
            }
            const token = jsonwebtoken_1.default.sign({
                _id: user._id,
            }, process.env.JWT_SECRETKEY, { expiresIn: "12h" });
            return {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
                token: token,
            };
        });
    }
}
exports.UserLogin = UserLogin;
