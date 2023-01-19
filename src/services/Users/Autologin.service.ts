import { ObjectId } from "mongodb";
import Users from "../../models/Users";

export class UserAutoLogin{
    async execute(body: iAuthenticatedBody){
        const { _id } = body;
        const objectUserId = new ObjectId(_id);

        const user = await Users.findOne({ _id: objectUserId});

        if(!user){
            throw new Error("O usuário vínculado a está token não existe.");
        }

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
    }
}