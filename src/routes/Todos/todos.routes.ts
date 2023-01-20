import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import TodosControllers from "./todos.controllers";
import { todosCreateValidation, todosDeleteValidation, todosUpdateValidation } from "./todos.validations";

const TodosRouter = Router();

TodosRouter.post("/", Authenticate, todosCreateValidation(), Validate, HandleErrors(TodosControllers.Create));
TodosRouter.delete("/:noteId", Authenticate, todosDeleteValidation(), Validate, HandleErrors(TodosControllers.Delete));
TodosRouter.put("/:noteId", Authenticate, todosUpdateValidation(), Validate, HandleErrors(TodosControllers.Update));
TodosRouter.get("/", Authenticate, HandleErrors(TodosControllers.Read));
TodosRouter.get("/:noteId", Authenticate, HandleErrors(TodosControllers.ReadOne));

export { TodosRouter };
