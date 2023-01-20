import { Schema, model} from "mongoose";

interface iTodo{
    userId: string;
    title: string;
    content: string;
    category: string;
}

export const todoSchema = new Schema<iTodo>(
   {
      userId: { type: String, required: true },
      title: { type: String, required: true },
      content: { type: String, required: true },
      category: { type: String, required: true },
   },
   {
      timestamps: true,
   }
);

const Todos = model<iTodo>("Todos", todoSchema, "todos");

export default Todos;
