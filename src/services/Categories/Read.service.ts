import Categories from "../../models/Categories";

export class CategoryRead {
   async execute(body: any, query: any) {
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
