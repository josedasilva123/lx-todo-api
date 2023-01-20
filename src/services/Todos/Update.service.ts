import { ObjectId } from "mongodb";
import Todos from "../../models/Todos";
import { iTodoUpdateBody, iTodoUpdateParams } from "../../routes/Todos/@types";

export class TodoUpdate {
   async execute(body: iTodoUpdateBody, params: iTodoUpdateParams) {
      const { noteId } = params;
      const { _id, title, content, category } = body;
      const todoObjectId = new ObjectId(noteId);

      const note = await Todos.findOne({ _id: todoObjectId });

      if (!note) {
         throw new Error("A nota que você está tentando editar não existe.");
      }

      if (note.userId !== _id) {
         throw new Error("Você não tem autorização para editar essa nota");
      }

      await Todos.updateOne(
         { _id: todoObjectId },
         {
            $set: {
               title,
               content,
               category,
            },
         }
      );

      return { message: "Nota editada com sucesso!" };
   }
}
