import { Schema, model } from "mongoose";

interface iCategory {
   label: string;
   slug: string;
}

const categorySchema = new Schema(
   {
      label: { type: String, required: true },
      slug: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const Categories = model("Categories", categorySchema, "categories");

export default Categories;
