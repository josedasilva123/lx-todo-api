"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const users_controllers_1 = __importDefault(require("./users.controllers"));
const users_validations_1 = require("./users.validations");
const UsersRouter = (0, express_1.Router)();
exports.UsersRouter = UsersRouter;
UsersRouter.post("/", (0, users_validations_1.userRegisterValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(users_controllers_1.default.Register));
UsersRouter.post("/login", (0, users_validations_1.userLoginValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(users_controllers_1.default.Login));
UsersRouter.get("/profile", authenticate_1.Authenticate, (0, handleErrors_1.HandleErrors)(users_controllers_1.default.AutoLogin));
UsersRouter.patch("/", authenticate_1.Authenticate, (0, users_validations_1.userEditValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(users_controllers_1.default.Edit));
UsersRouter.patch("/password", authenticate_1.Authenticate, (0, users_validations_1.userChangePasswordValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(users_controllers_1.default.ChangePassword));
