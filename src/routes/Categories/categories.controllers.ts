import { Request, Response } from "express";
import { CategoryCreate } from "../../services/Categories/Create.service";
import { CategoryDelete } from "../../services/Categories/Delete.service";
import { CategoryRead } from "../../services/Categories/Read.service";
import { iAuthenticatedBody } from "../Users/@types";
import { iCategoryCreateBody, iCategoryDeleteParams, iCategoryReadQuery } from "./@types";

export default class CategoriesControlers {
   static async Create(req: Request<{}, {}, iCategoryCreateBody, {}>, res: Response) {
      const create = new CategoryCreate();
      const response = await create.execute(req.body);

      res.status(200).json(response);
   }

   static async Delete(req: Request<iCategoryDeleteParams, {}, iAuthenticatedBody, {}>, res: Response) {
      const remove = new CategoryDelete();
      const response = await remove.execute(req.body, req.params);

      res.status(200).json(response);
   }

   static async Read(req: Request<{}, {}, iAuthenticatedBody, iCategoryReadQuery>, res: Response) {
      const read = new CategoryRead();
      const response = await read.execute(req.body, req.query);

      res.status(200).json(response);
   }
}
