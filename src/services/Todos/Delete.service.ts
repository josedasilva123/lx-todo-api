import { ObjectId } from "mongodb";
import Todos from "../../models/Todos";
import { iAuthenticatedBody } from "../../routes/Users/@types";

export class TodoDelete {
   async execute(body: iAuthenticatedBody, params: any) {
      const { noteId } = params;
      const { _id } = body;
      const todoObjectId = new ObjectId(noteId);

      const note = await Todos.findOne({ _id: todoObjectId });

      if (!note) {
         throw new Error("A nota que você está tentando excluir não existe.");
      }

      if (note.userId !== _id) {
         throw new Error("Você não tem autorização para excluir essa nota");
      }

      await Todos.deleteOne({ _id: todoObjectId  });
   }
}
