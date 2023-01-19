export interface iAuthenticatedBody{
    _id: string;
}

export interface iUserRegisterBody{
    name: string;
    email: string;
    password: string;   
}

export interface iUserLoginBody{
    email: string;
    password: string;
}

export interface iUserEditBody extends iAuthenticatedBody{
    name: string;
}

export interface iUserChangePasswordBody extends iAuthenticatedBody{
    currentPassword: string;
    newPassword: string;
}