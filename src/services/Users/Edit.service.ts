import { ObjectId } from "mongodb";
import Users from "../../models/Users";

export class UserEdit {
   async execute(body: iUserEditBody) {
      const { _id, name } = body;

      const userObjectId = new ObjectId(_id);

      const user = await Users.findOne({ _id: userObjectId });

      if (!user) {
         throw new Error("O usuário fornecido não existe.");
      }

      const newUser = await Users.updateOne({ _id: userObjectId}, {
        $set: {
            name
        }
      })

      return { message: 'Usuário editado com sucesso!' }
   }
}
