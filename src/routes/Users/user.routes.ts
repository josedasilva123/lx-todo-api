import { Router } from "express";
import { Authenticate } from "../../middlewares/authenticate";
import { HandleErrors } from "../../middlewares/handleErrors";
import { Validate } from "../../middlewares/handleValidation";
import UsersControllers from "./users.controllers";
import { userChangePasswordValidation, userEditValidation, userLoginValidation, userRegisterValidation } from "./users.validations";

const UsersRouter = Router();

UsersRouter.post("/", userRegisterValidation(), Validate, HandleErrors(UsersControllers.Register));
UsersRouter.post("/login", userLoginValidation(), Validate, HandleErrors(UsersControllers.Login));
UsersRouter.get("/profile", Authenticate, HandleErrors(UsersControllers.AutoLogin));
UsersRouter.patch("/", Authenticate, userEditValidation(), Validate, HandleErrors(UsersControllers.Edit));
UsersRouter.patch("/password", Authenticate, userChangePasswordValidation(), Validate, HandleErrors(UsersControllers.ChangePassword));

export { UsersRouter };
