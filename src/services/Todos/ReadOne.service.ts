import { ObjectId } from "mongodb";
import Todos from "../../models/Todos";
import { iTodoReadOneParams } from "../../routes/Todos/@types";

export class TodoReadOne {
   async execute(params: iTodoReadOneParams) {
      const { noteId } = params;

      const todoObjectId = new ObjectId(noteId);

      const todo = await Todos.findOne({ _id: todoObjectId });

      if (!todo) {
         throw new Error("Desculpe, nenhuma nota foi encontrada.");
      }

      return todo;
   }
}
