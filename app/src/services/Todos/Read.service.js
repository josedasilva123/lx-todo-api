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
exports.TodoRead = void 0;
const Todos_1 = __importDefault(require("../../models/Todos"));
class TodoRead {
    execute(body, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id } = body;
            const { category, search, limit, skip } = query;
            let newQuery = {};
            if (category) {
                newQuery = Object.assign(Object.assign({}, newQuery), { category });
            }
            if (search) {
                const searchRegex = new RegExp(search, "i");
                newQuery = Object.assign(Object.assign({}, newQuery), { title: { $regex: searchRegex } });
            }
            newQuery = Object.assign(Object.assign({}, newQuery), { userId: _id });
            const count = (yield Todos_1.default.find(newQuery)).length;
            const todos = yield Todos_1.default.find(newQuery)
                .skip(Number(skip))
                .limit(Number(limit));
            return { count, todos };
        });
    }
}
exports.TodoRead = TodoRead;
