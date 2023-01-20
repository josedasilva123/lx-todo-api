import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import Categories from "../../models/Categories";
import CategoriesControlers from "./categories.controllers";
import { categoriesCreateValidation, categoriesDeleteValidation } from "./categories.validations";

const CategoriesRouter = Router();

CategoriesRouter.post('/', Authenticate, categoriesCreateValidation(), Validate, HandleErrors(CategoriesControlers.Create));
CategoriesRouter.delete('/:categoryId', Authenticate, categoriesDeleteValidation(), Validate, HandleErrors(CategoriesControlers.Delete));
CategoriesRouter.get("/", Authenticate, HandleErrors(CategoriesControlers.Read));

export { CategoriesRouter }