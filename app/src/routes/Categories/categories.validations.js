"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesDeleteValidation = exports.categoriesCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const categoriesCreateValidation = () => {
    return [
        (0, express_validator_1.body)("label").isString().withMessage("O rótulo (label) é obrigatório"),
        (0, express_validator_1.body)("slug").isString().withMessage("O (slug) é obrigatório"),
    ];
};
exports.categoriesCreateValidation = categoriesCreateValidation;
const categoriesDeleteValidation = () => {
    return [
        (0, express_validator_1.param)("categoryId").isString().withMessage("O parâmetro categodyId é obrigatório"),
    ];
};
exports.categoriesDeleteValidation = categoriesDeleteValidation;
