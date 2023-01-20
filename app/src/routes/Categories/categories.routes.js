"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRouter = void 0;
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const handleErrors_1 = require("../../middlewares/handleErrors");
const handleValidation_1 = require("../../middlewares/handleValidation");
const categories_controllers_1 = __importDefault(require("./categories.controllers"));
const categories_validations_1 = require("./categories.validations");
const CategoriesRouter = (0, express_1.Router)();
exports.CategoriesRouter = CategoriesRouter;
CategoriesRouter.post('/', authenticate_1.Authenticate, (0, categories_validations_1.categoriesCreateValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(categories_controllers_1.default.Create));
CategoriesRouter.delete('/:categoryId', authenticate_1.Authenticate, (0, categories_validations_1.categoriesDeleteValidation)(), handleValidation_1.Validate, (0, handleErrors_1.HandleErrors)(categories_controllers_1.default.Delete));
CategoriesRouter.get("/", authenticate_1.Authenticate, (0, handleErrors_1.HandleErrors)(categories_controllers_1.default.Read));
