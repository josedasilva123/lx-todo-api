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
Object.defineProperty(exports, "__esModule", { value: true });
const Autologin_service_1 = require("../../services/Users/Autologin.service");
const ChangePassword_service_1 = require("../../services/Users/ChangePassword.service");
const Edit_service_1 = require("../../services/Users/Edit.service");
const Login_service_1 = require("../../services/Users/Login.service");
const Register_service_1 = require("../../services/Users/Register.service");
class UsersControllers {
    static Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const register = new Register_service_1.UserRegister();
            const response = yield register.execute(req.body);
            res.status(200).json(response);
        });
    }
    static Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const login = new Login_service_1.UserLogin();
            const response = yield login.execute(req.body);
            res.status(200).json(response);
        });
    }
    static AutoLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const autoLogin = new Autologin_service_1.UserAutoLogin();
            const response = yield autoLogin.execute(req.body);
            res.status(200).json(response);
        });
    }
    static Edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const edit = new Edit_service_1.UserEdit();
            const response = yield edit.execute(req.body);
            res.status(200).json(response);
        });
    }
    static ChangePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const changePassword = new ChangePassword_service_1.UserChangePassword();
            const response = yield changePassword.execute(req.body);
            res.status(200).json(response);
        });
    }
}
exports.default = UsersControllers;
