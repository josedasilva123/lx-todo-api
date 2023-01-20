"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    label: { type: String, required: true },
    slug: { type: String, required: true },
}, {
    timestamps: true,
});
const Categories = (0, mongoose_1.model)("Categories", categorySchema, "categories");
exports.default = Categories;
