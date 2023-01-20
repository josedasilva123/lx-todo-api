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
exports.TodoReadOne = void 0;
const mongodb_1 = require("mongodb");
const Todos_1 = __importDefault(require("../../models/Todos"));
class TodoReadOne {
    execute(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { noteId } = params;
            const todoObjectId = new mongodb_1.ObjectId(noteId);
            const todo = yield Todos_1.default.findOne({ _id: todoObjectId });
            if (!todo) {
                throw new Error("Desculpe, nenhuma nota foi encontrada.");
            }
            return todo;
        });
    }
}
exports.TodoReadOne = TodoReadOne;
