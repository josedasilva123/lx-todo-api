import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import http from "http";
import { UsersRouter } from "./routes/Users/user.routes";
import { TodosRouter } from "./routes/Todos/todos.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.use('/users', UsersRouter);
app.use('/todos', TodosRouter);

export const serverHttp = http.createServer(app);