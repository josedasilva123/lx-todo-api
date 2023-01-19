import { ObjectId } from "mongodb";
import Users from "../../models/Users";
import bcrypt from "bcryptjs";

export class UserChangePassword {
   async execute(body: any) {
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
