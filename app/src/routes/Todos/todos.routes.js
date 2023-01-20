"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const todos_controllers_1 = __importDefault(require("./todos.controllers"));
const todos_validations_1 = require("./todos.validations");
const TodosRouter = (0, express_1.Router)();
exports.TodosRouter = TodosRouter;
TodosRouter.post("/", authenticate_1.Authenticate, (0, todos_validations_1.todosCreateValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(todos_controllers_1.default.Create));
TodosRouter.delete("/:noteId", authenticate_1.Authenticate, (0, todos_validations_1.todosDeleteValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(todos_controllers_1.default.Delete));
TodosRouter.patch("/:noteId", authenticate_1.Authenticate, (0, todos_validations_1.todosUpdateValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(todos_controllers_1.default.Update));
TodosRouter.get("/", authenticate_1.Authenticate, (0, handleErrors_1.HandleErrors)(todos_controllers_1.default.Read));
TodosRouter.get("/:noteId", authenticate_1.Authenticate, (0, handleErrors_1.HandleErrors)(todos_controllers_1.default.ReadOne));
