import { Schema, model, ObjectId } from "mongoose";

interface iUser{
    id?: ObjectId;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<iUser>({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
}, {
    timestamps: true
});

const Users = model<iUser>("Users", userSchema, "users");

export default Users;