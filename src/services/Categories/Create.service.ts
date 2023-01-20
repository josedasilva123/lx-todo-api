import Categories from "../../models/Categories";
import { iCategoryCreateBody } from "../../routes/Categories/@types";

export class CategoryCreate{
    async execute(body: iCategoryCreateBody){
        const { _id, label, slug } = body;

        const category = {
            userId: _id,
            label,
            slug
        }

        const existingCategory = await Categories.findOne({ slug: slug });

        if(existingCategory){
            throw new Error("Já existe uma categoria cadastrada com este respectivo slug.");
        }

        const newCategory = await Categories.create(category);

        return { category: newCategory, message: 'Categoria criada com sucesso!'}
    }
}