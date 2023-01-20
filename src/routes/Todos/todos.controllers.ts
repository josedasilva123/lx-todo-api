import { Request, Response } from "express";
import { TodoCreate } from "../../services/Todos/Create.service";
import { TodoDelete } from "../../services/Todos/Delete.service";
import { TodoRead } from "../../services/Todos/Read.service";
import { TodoReadOne } from "../../services/Todos/ReadOne.service";
import { TodoUpdate } from "../../services/Todos/Update.service";
import { iAuthenticatedBody } from "../Users/@types";
import { iTodoCreateBody, iTodoDeleteParams, iTodoReadOneParams, iTodoReadQuery, iTodoUpdateBody, iTodoUpdateParams } from "./@types";

export default class TodosControllers {
   static async Create(req: Request<{}, {}, iTodoCreateBody, {}>, res: Response) {
      const create = new TodoCreate();
      const response = await create.execute(req.body);

      res.status(200).json(response);
   }

   static async Delete(req: Request<iTodoDeleteParams, {}, iAuthenticatedBody, {}>, res: Response) {
      const remove = new TodoDelete();
      const response = await remove.execute(req.body, req.params);

      res.status(200).json(response);
   }

   static async Update(req: Request<iTodoUpdateParams, {}, iTodoUpdateBody, {}>, res: Response) {
      const update = new TodoUpdate();
      const response = await update.execute(req.body, req.params);

      res.status(200).json(response);
   }

   static async Read(req: Request<{}, {}, {}, iTodoReadQuery>, res: Response) {
      const read = new TodoRead();
      const response = await read.execute(req.query);

      res.status(200).json(response);
   }

   static async ReadOne(req: Request<iTodoReadOneParams, {}, {}, {}>, res: Response) {
      const readOne = new TodoReadOne();
      const response = await readOne.execute(req.params);

      res.status(200).json(response);
   }
}
