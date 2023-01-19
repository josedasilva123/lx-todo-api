import { Schema, model, ObjectId } from "mongoose";

export interface iCategory {
   id?: ObjectId;
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
