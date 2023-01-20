import { iAuthenticatedBody } from "../Users/@types";

export interface iTodoCreateBody extends iAuthenticatedBody{
    title: string;
    content: string;
    category: string;
}

export interface iTodoDeleteParams{
    noteId?: string;
}

export interface iTodoUpdateBody extends iAuthenticatedBody{
    title: string;
    content: string;
    category: string;
}

export interface iTodoUpdateParams{
    noteId?: string;
}

export interface iTodoReadQuery{
    category?: string;
    userId?: string;
    search?: string;
    limit?: string;
    skip?: string;
}

export interface iTodoReadOneParams{
    noteId?: string;
}