"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosReadOneValidation = exports.todosUpdateValidation = exports.todosDeleteValidation = exports.todosCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const todosCreateValidation = () => {
    return [
        (0, express_validator_1.body)("title").isString().withMessage("O título (title) é obrigatório"),
        (0, express_validator_1.body)("content").isString().withMessage("O conteúdo (content) é obrigatório"),
        (0, express_validator_1.body)("category").isString().withMessage("A categoria (category) é obrigatória"),
    ];
};
exports.todosCreateValidation = todosCreateValidation;
const todosDeleteValidation = () => {
    return [
        (0, express_validator_1.param)("noteId").isString().withMessage("O parâmetro nodeId é obrigatório.")
    ];
};
exports.todosDeleteValidation = todosDeleteValidation;
const todosUpdateValidation = () => {
    return [
        (0, express_validator_1.param)("noteId").isString().withMessage("O parâmetro nodeId é obrigatório."),
        (0, express_validator_1.body)("title").isString().withMessage("O título (title) é obrigatório"),
        (0, express_validator_1.body)("content").isString().withMessage("O conteúdo (content) é obrigatório"),
        (0, express_validator_1.body)("category").isString().withMessage("A categoria (category) é obrigatória"),
    ];
};
exports.todosUpdateValidation = todosUpdateValidation;
const todosReadOneValidation = () => {
    return [
        (0, express_validator_1.param)("noteId").isString().withMessage("O parâmetro nodeId é obrigatório.")
    ];
};
exports.todosReadOneValidation = todosReadOneValidation;
