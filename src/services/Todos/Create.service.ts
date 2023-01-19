import Todos from "../../models/Todos";

export class TodoCreate{
    async execute(body: any){
        const { _id, title, content, category } = body;

        const todo = {
            userId: _id,
            title,
            content,
            category
        }

        const newTodo = await Todos.create(todo);

        return { todo: newTodo, message: 'Nota cadastrada com sucesso!'}
    }
}