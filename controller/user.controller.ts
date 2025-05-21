import ResponseService from "../service/response.service";
import { ILogin, ISignup } from "../interface/user.interface";
import UserService from "../service/user.service";
import { Request,Response,NextFunction } from "express";
export default class UserController extends ResponseService {
  public userServices = new UserService();
  constructor() {
    super();
  }
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const credentials: ILogin = req.body;
      const { statusCode, data, message } = await this.userServices.login(
        credentials,
        res
      );
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };
  signup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const credentials: ISignup = req.body;
      const { statusCode, data, message } = await this.userServices.signup(
        credentials,
        res
      );
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      this.sendResponse(res, 200, {}, "Logout Successfully...");
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.user?._id.toString();
      const { statusCode, data, message } =
        await this.userServices.updateProfile(req, userId);
      this.sendResponse(res, statusCode, data, message);
    } catch (error) {
      next(error);
    }
  };
  checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
           this.sendResponse(res, 200, req.user, "Success");

    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}