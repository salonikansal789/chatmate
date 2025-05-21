import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import UserController from "../controller/user.controller";
import validatePayload from "../middleware/validatePayload.middleware";
import { loginSchema, signupSchema } from "../validations/login.validation";
import Authentication from "../middleware/auth.middleware";

class UserRoute implements Routes {
  public path = "/auth";
  public router = Router();
  public UserController = new UserController();
  public Authentication = new Authentication();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validatePayload({ body: loginSchema }),
      this.UserController.login
    );
    this.router.post(
      `${this.path}/signup`,
      validatePayload({ body: signupSchema }),
      this.UserController.signup
    );
      this.router.post(
          `${this.path}/logout`,
          this.UserController.logout
      );
    this.router.get(`${this.path}/check/auth`,
        this.Authentication.authenticateByJwt,
      this.UserController.checkAuth);
    
    this.router.put(
      `${this.path}/update/profile`,
      this.Authentication.authenticateByJwt,
      this.UserController.updateProfile
    );
  }
}
export default UserRoute