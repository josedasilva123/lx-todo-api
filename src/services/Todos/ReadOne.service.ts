import { ObjectId } from "mongodb";
import Todos from "../../models/Todos";

export class TodosReadOne{
    async execute(params: any){
        const { noteId } = params;

        const todoObjectId = new ObjectId(noteId);

        const todo = await Todos.findOne({ _id: todoObjectId});

        return todo;
    }
}