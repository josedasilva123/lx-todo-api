"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userChangePasswordValidation = exports.userEditValidation = exports.userRegisterValidation = exports.userLoginValidation = void 0;
const express_validator_1 = require("express-validator");
const userLoginValidation = () => {
    return [
        (0, express_validator_1.body)("email").isString().withMessage("O e-mail (email) é obrigatório"),
        (0, express_validator_1.body)("password").isString().withMessage("A senha (password) é obrigatória"),
    ];
};
exports.userLoginValidation = userLoginValidation;
const userRegisterValidation = () => {
    return [
        (0, express_validator_1.body)("name").isString().withMessage("O nome (name) é obrigatório"),
        (0, express_validator_1.body)("email").isString().withMessage("O e-mail (email) é obrigatório"),
        (0, express_validator_1.body)("password").isString().withMessage("A senha (password) é obrigatória"),
    ];
};
exports.userRegisterValidation = userRegisterValidation;
const userEditValidation = () => {
    return [(0, express_validator_1.body)("name").isString().withMessage("O nome (name) é obrigatório")];
};
exports.userEditValidation = userEditValidation;
const userChangePasswordValidation = () => {
    return [
        (0, express_validator_1.body)("currentPassword").isString().withMessage("A senha atual (currentPassword) é obrigatória"),
        (0, express_validator_1.body)("newPassword").isString().withMessage("A senha nova (bewPassword) é obrigatória"),
    ];
};
exports.userChangePasswordValidation = userChangePasswordValidation;
