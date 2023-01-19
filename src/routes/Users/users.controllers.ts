import { Request, Response } from "express";
import { UserAutoLogin } from "../../services/Users/Autologin.service";
import { UserChangePassword } from "../../services/Users/ChangePassword.service";
import { UserEdit } from "../../services/Users/Edit.service";
import { UserLogin } from "../../services/Users/Login.service";
import { UserRegister } from "../../services/Users/Register.service";
import { iUserRegisterBody, iUserLoginBody, iUserEditBody, iUserChangePasswordBody } from "./@types";

export default class UsersControllers {
   static async Register(req: Request<{}, {}, iUserRegisterBody, {}>, res: Response) {
      const register = new UserRegister();
      const response = await register.execute(req.body);

      res.status(200).json(response);
   }

   static async Login(req: Request<{}, {}, iUserLoginBody, {}>, res: Response) {
      const login = new UserLogin();
      const response = await login.execute(req.body);

      res.status(200).json(response);
   }

   static async AutoLogin(req: Request, res: Response) {
      const autoLogin = new UserAutoLogin();
      const response = await autoLogin.execute(req.body);

      res.status(200).json(response);
   }

   static async Edit(req: Request<{}, {}, iUserEditBody, {}>, res: Response) {
      const edit = new UserEdit();
      const response = await edit.execute(req.body);

      res.status(200).json(response);
   }

   static async ChangePassword(req: Request<{}, {}, iUserChangePasswordBody, {}>, res: Response) {
      const changePassword = new UserChangePassword();
      const response = await changePassword.execute(req.body);

      res.status(200).json(response);
   }
}
