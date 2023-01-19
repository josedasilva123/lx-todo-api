import { body } from "express-validator";

export const userLoginValidation = () => {
   return [
      body("email").isString().withMessage("O e-mail (email) é obrigatório"),
      body("password").isString().withMessage("A senha (password) é obrigatória"),
   ];
};

export const userRegisterValidation = () => {
   return [
      body("name").isString().withMessage("O nome (name) é obrigatório"),
      body("email").isString().withMessage("O e-mail (email) é obrigatório"),
      body("password").isString().withMessage("A senha (password) é obrigatória"),
   ];
};

export const userEditValidation = () => {
   return [body("name").isString().withMessage("O nome (name) é obrigatório")];
};

export const userChangePasswordValidation = () => {
   return [
      body("currentPassword").isString().withMessage("A senha atual (currentPassword) é obrigatória"),
      body("newPassword").isString().withMessage("A senha nova (bewPassword) é obrigatória"),
   ];
};
