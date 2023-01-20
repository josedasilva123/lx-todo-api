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
exports.UserEdit = void 0;
const mongodb_1 = require("mongodb");
const Users_1 = __importDefault(require("../../models/Users"));
class UserEdit {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, name } = body;
            const userObjectId = new mongodb_1.ObjectId(_id);
            const user = yield Users_1.default.findOne({ _id: userObjectId });
            if (!user) {
                throw new Error("O usuário fornecido não existe.");
            }
            const newUser = yield Users_1.default.updateOne({ _id: userObjectId }, {
                $set: {
                    name
                }
            });
            return { message: 'Usuário editado com sucesso!' };
        });
    }
}
exports.UserEdit = UserEdit;
