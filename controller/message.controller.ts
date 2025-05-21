import { NextFunction, Request, Response } from "express";
import ResponseService from "../service/response.service";
import MessageService from "../service/message.service";

export default class MessageController extends ResponseService {
  private messageService = new MessageService();

  constructor() {
    super();
  }
  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string= req.user?._id.toString();
      const { statusCode, data, message } =
        await this.messageService.getUsers(userId);
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };
  getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const receiverId = req.params.id;
      const senderId: string = req.user?._id.toString();
      const { statusCode, data, message } =
        await this.messageService.getMessages(receiverId, senderId);
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };
  sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text, image } = req.body;
      const receiver = req.params.id;
      const sender: string = req.user?._id.toString();
      const { statusCode, data, message } =
        await this.messageService.sendMessage(text,image,receiver,sender);
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };
}
