import Todos from "../../models/Todos";
import { iTodoReadQuery } from "../../routes/Todos/@types";
import { iAuthenticatedBody } from "../../routes/Users/@types";

export class TodoRead {
   async execute(body: iAuthenticatedBody ,query: iTodoReadQuery) {
      const { _id } = body;
      const { category, search, limit, skip } = query;

      let newQuery = {  };

      if (category) {
         newQuery = { ...newQuery, category };
      }

      if (search) {
         const searchRegex = new RegExp(search, "i");
         newQuery = { ...newQuery, title: { $regex: searchRegex } };
      }

      newQuery = { ...newQuery, userId: _id };

      const count = (await Todos.find(newQuery as object)).length;

      const todos = await Todos.find(newQuery as object)
         .skip(Number(skip))
         .limit(Number(limit));

      return { count, todos };
   }
}
