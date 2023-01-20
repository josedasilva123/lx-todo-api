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
exports.TodoCreate = void 0;
const Todos_1 = __importDefault(require("../../models/Todos"));
class TodoCreate {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, title, content, category } = body;
            const todo = {
                userId: _id,
                title,
                content,
                category
            };
            const newTodo = yield Todos_1.default.create(todo);
            return { todo: newTodo, message: 'Nota cadastrada com sucesso!' };
        });
    }
}
exports.TodoCreate = TodoCreate;
