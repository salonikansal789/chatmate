import { Request, Response, NextFunction } from "express";
import {
  ICustomRequest,
  ICustomResponse,
} from "../interface/response.interface";
import { common } from "../helper/common";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../interface/user.interface";

class Authentication {
  private readonly common = common;

  public authenticateByJwt = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let token: string = req.cookies.jwt;
      if (!token)
        await this.common.sendResponse(res, false, "Token not found", {}, 401);
      const secret = process.env.JWT_SECRET || " mysecretkey";

      const decode = jwt.verify(token, secret) as JwtPayload;
      if (!decode || typeof decode === "string") {
        await this.common.sendResponse(res, false, "Invalid Token", {}, 401);
        return;
      }

      const user = await User.findById(decode.userId).select("-password");
      if (!user) {
        await this.common.sendResponse(res, false, "User not found", {}, 401);
        return;
      }
      req.user = req.user;
      next();
    } catch (err) {
      console.log(`Error: ${err}`);
      next();
    }
  };
}

export default Authentication;
