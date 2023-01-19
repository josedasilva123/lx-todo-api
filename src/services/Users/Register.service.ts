import Users from "../../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserRegister {
   async execute(body: iUserRegisterBody) {
      const { name, email, password } = body;

      const existingUser = await Users.findOne({ email: email });

      if (existingUser) {
         throw new Error("Desculpe, o e-mail fornecido já pertence a um usuário cadastrado.");
      }

      const encryptedPassword = bcrypt.hashSync(password, 1);

      const user = {
         name,
         email,
         password: encryptedPassword,
      };

      const newUser = await Users.create(user);

      const token = jwt.sign(
         {
            _id: newUser._id,
         },
         process.env.JWT_SECRETKEY as string,
         { expiresIn: "12h" }
      );

      return {
        user: {
            _id: newUser._id,
            name: newUser.name,
            password: newUser.password,
        },
        token: token,
        message: "Cadastro realizado com sucesso!" 
      }   
   }
}
