import { ObjectId } from "mongodb";
import Categories from "../../models/Categories";

export class CategoryDelete{
    async execute(body: any, params: any){
        const { _id } = body;
        const { categoryId } = params;

        const categoryObjectId = new ObjectId(categoryId)

        const category = await Categories.findOne({ _id: categoryObjectId });

        if(!category){
            throw new Error('A categoria que você está tentando excluir não existe.')
        }

        if(_id !== category.userId){
            throw new Error('Você não tem autorização para excluir essa categoria.')
        }

        await Categories.deleteOne({ _id: categoryObjectId });

        return { message: 'Categoria excluida com sucesso!'}
    }
}