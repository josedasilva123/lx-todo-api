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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCreate = void 0;
const Categories_1 = __importDefault(require("../../models/Categories"));
class CategoryCreate {
    execute(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, label, slug } = body;
            const category = {
                userId: _id,
                label,
                slug,
            };
            const existingCategory = yield Categories_1.default.findOne({ slug: slug });
            if (existingCategory) {
                throw new Error("Já existe uma categoria cadastrada com este respectivo slug.");
            }
            const newCategory = yield Categories_1.default.create(category);
            return { category: newCategory, message: "Categoria cadastrada com sucesso!" };
        });
    }
}
exports.CategoryCreate = CategoryCreate;
