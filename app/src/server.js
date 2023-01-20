"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverHttp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const user_routes_1 = require("./routes/Users/user.routes");
const todos_routes_1 = require("./routes/Todos/todos.routes");
const categories_routes_1 = require("./routes/Categories/categories.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use("/users", user_routes_1.UsersRouter);
app.use("/todos", todos_routes_1.TodosRouter);
app.use("/categories", categories_routes_1.CategoriesRouter);
exports.serverHttp = http_1.default.createServer(app);
