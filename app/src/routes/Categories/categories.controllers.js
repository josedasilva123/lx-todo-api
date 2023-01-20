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
const Create_service_1 = require("../../services/Categories/Create.service");
const Delete_service_1 = require("../../services/Categories/Delete.service");
const Read_service_1 = require("../../services/Categories/Read.service");
class CategoriesControlers {
    static Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const create = new Create_service_1.CategoryCreate();
            const response = yield create.execute(req.body);
            res.status(200).json(response);
        });
    }
    static Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const remove = new Delete_service_1.CategoryDelete();
            const response = yield remove.execute(req.body, req.params);
            res.status(200).json(response);
        });
    }
    static Read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const read = new Read_service_1.CategoryRead();
            const response = yield read.execute(req.body, req.query);
            res.status(200).json(response);
        });
    }
}
exports.default = CategoriesControlers;
