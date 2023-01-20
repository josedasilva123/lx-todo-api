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
const Create_service_1 = require("../../services/Todos/Create.service");
const Delete_service_1 = require("../../services/Todos/Delete.service");
const Read_service_1 = require("../../services/Todos/Read.service");
const ReadOne_service_1 = require("../../services/Todos/ReadOne.service");
const Update_service_1 = require("../../services/Todos/Update.service");
class TodosControllers {
    static Create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const create = new Create_service_1.TodoCreate();
            const response = yield create.execute(req.body);
            res.status(200).json(response);
        });
    }
    static Delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const remove = new Delete_service_1.TodoDelete();
            const response = yield remove.execute(req.body, req.params);
            res.status(200).json(response);
        });
    }
    static Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = new Update_service_1.TodoUpdate();
            const response = yield update.execute(req.body, req.params);
            res.status(200).json(response);
        });
    }
    static Read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const read = new Read_service_1.TodoRead();
            const response = yield read.execute(req.body, req.query);
            res.status(200).json(response);
        });
    }
    static ReadOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const readOne = new ReadOne_service_1.TodoReadOne();
            const response = yield readOne.execute(req.params);
            res.status(200).json(response);
        });
    }
}
exports.default = TodosControllers;
