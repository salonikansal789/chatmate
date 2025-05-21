import { Router } from "express";
import { Routes } from "../interface/routes.interface";
import MessageController from "../controller/message.controller";
import Authentication from "../middleware/auth.middleware";

class MessageRoute implements Routes {
  public router = Router();
  public MessageController = new MessageController();
  public Authentication = new Authentication();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.get(
      `/users`,
      this.Authentication.authenticateByJwt,
      this.MessageController.getUsers
    );
    this.router.get(
      `/:id`,
      this.Authentication.authenticateByJwt,
      this.MessageController.getMessages
    );
    this.router.post(
      `send/user/:id`,
      this.Authentication.authenticateByJwt,
      this.MessageController.sendMessage
    );
  }
}
export default MessageRoute