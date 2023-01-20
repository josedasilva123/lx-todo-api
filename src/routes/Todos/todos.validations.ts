import { body, param } from "express-validator";

export const todosCreateValidation = () => {
   return [
      body("title").isString().withMessage("O título (title) é obrigatório"),
      body("content").isString().withMessage("O conteúdo (content) é obrigatório"),
      body("category").isString().withMessage("A categoria (category) é obrigatória"),
   ];
};

export const todosDeleteValidation = () => {
   return [
      param("noteId").isString().withMessage("O parâmetro nodeId é obrigatório.")
   ];
};

export const todosUpdateValidation = () => {
   return [
      param("noteId").isString().withMessage("O parâmetro nodeId é obrigatório."),
      body("title").isString().withMessage("O título (title) é obrigatório"),
      body("content").isString().withMessage("O conteúdo (content) é obrigatório"),
      body("category").isString().withMessage("A categoria (category) é obrigatória"),
   ];
};

export const todosReadOneValidation = () => {
   return [
      param("noteId").isString().withMessage("O parâmetro nodeId é obrigatório.")
   ];
};


