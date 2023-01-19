import { Schema, model } from "mongoose";

export interface iUser{
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