import { Schema, model, ObjectId } from "mongoose";
import { iCategory } from "./Categories";

interface iTodo{
    id?: ObjectId;
    userId: string;
    title: string;
    content: string;
    category: iCategory;
}

export const todoSchema = new Schema<iTodo>(
   {
      userId: { type: String, required: true },
      title: { type: String, required: true },
      content: { type: String, required: true },
      category: { type: Object, required: true },
   },
   {
      timestamps: true,
   }
);

const Todos = model<iTodo>("Todos", todoSchema, "todos");

export default Todos;
