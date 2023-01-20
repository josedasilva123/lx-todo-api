import Categories from "../../models/Categories";
import { iCategoryReadQuery } from "../../routes/Categories/@types";
import { iAuthenticatedBody } from "../../routes/Users/@types";

export class CategoryRead {
   async execute(body: iAuthenticatedBody, query: iCategoryReadQuery) {
      const { _id } = body;
      const { limit, skip } = query;

      let newQuery = {};

      newQuery = { ...newQuery, userId: _id };

      const count = (await Categories.find(newQuery as object)).length;

      const categories = await Categories.find(newQuery as object)
         .skip(Number(skip))
         .limit(Number(limit));

      return { count, categories };
   }
}
