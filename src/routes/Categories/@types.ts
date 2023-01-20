import { iAuthenticatedBody } from "../Users/@types";

export interface iCategoryCreateBody extends iAuthenticatedBody{
    label: string;
    slug: string;
}

export interface iCategoryDeleteParams{
    categoryId?: string;
}

export interface iCategoryReadQuery{
    skip?: string;
    limit?: string;
}