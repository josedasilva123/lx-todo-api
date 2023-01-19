interface iAuthenticatedBody{
    _id: string;
}

interface iUserRegisterBody{
    name: string;
    email: string;
    password: string;   
}

interface iUserLoginBody{
    email: string;
    password: string;
}

interface iUserEditBody extends iAuthenticatedBody{
    name: string;
}

interface iUserChangePasswordBody extends iAuthenticatedBody{
    currentPassword: string;
    newPassword: string;
}