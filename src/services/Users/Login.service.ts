import Users from "../../models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserLogin {
    async execute(body: iUserLoginBody){
        const { email, password } = body;

        const user = await Users.findOne({ email: email });

        if(!user) {
            throw new Error("O usuário fornecido não está cadastrado.");
        }

        if(!bcrypt.compareSync(password, user.password)) {
            throw new Error("Desculpe, o e-mail e senha fornecidos não correspondem.");
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRETKEY as string,
            { expiresIn: "12h"}
        );

        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token,
        }
    }
}