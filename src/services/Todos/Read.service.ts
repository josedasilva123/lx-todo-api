import Todos from "../../models/Todos";

export class TodosRead {
   async execute(query: any) {
      const { category, userId, search, limit, skip } = query;

      let newQuery = {};

      if (category) {
         newQuery = { ...newQuery, category };
      }

      if (userId) {
         newQuery = { ...newQuery, userId };
      }

      if (search) {
         const searchRegex = new RegExp(search, "i");
         newQuery = { ...newQuery, title: { $regex: searchRegex } };
      }

      const count = (await Todos.find(newQuery as object)).length;

      const todos = await Todos.find(newQuery as object)
         .skip(Number(skip))
         .limit(Number(limit));

      return { count, todos };
   }
}
