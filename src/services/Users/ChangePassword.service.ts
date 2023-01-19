import { ObjectId } from "mongodb";
import Users from "../../models/Users";
import bcrypt from "bcryptjs";

export class UserChangePassword {
   async execute(body: any) {
      const { _id, currentPassword, newPassword } = body;

      const userObjectId = new ObjectId(_id);

      const user = await Users.findOne({ _id: userObjectId });

      if (!user) {
         throw new Error("O usuário fornecido não existe.");
      }

      if (!bcrypt.compareSync(currentPassword, user.password)) {
         throw new Error("A senha atual fornecida não corresponde de fato a senha atual.");
      }

      const encryptedNewPassword = bcrypt.hashSync(newPassword, 1);

      await Users.updateOne({ _id: userObjectId}, {
        $set: {
            password: encryptedNewPassword,
        }
      })

      return { message: 'Senha alterada com sucesso!'}
   }
}




