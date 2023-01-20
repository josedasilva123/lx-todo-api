import { body, param } from "express-validator";

export const categoriesCreateValidation = () => {
   return [
      body("label").isString().withMessage("O rótulo (label) é obrigatório"),
      body("slug").isString().withMessage("O (slug) é obrigatório"),
   ];
};

export const categoriesDeleteValidation = () => {
   return [
      param("categoryId").isString().withMessage("O parâmetro categodyId é obrigatório"),
   ];
};

