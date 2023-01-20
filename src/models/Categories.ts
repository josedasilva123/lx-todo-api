import { Schema, model } from "mongoose";

interface iCategory {
   userId: string;
   label: string;
   slug: string;
}

const categorySchema = new Schema<iCategory>(
   {
      userId: { type: String, required: true },
      label: { type: String, required: true },
      slug: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const Categories = model<iCategory>("Categories", categorySchema, "categories");

export default Categories;
