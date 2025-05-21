import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default class Common {
  
    public sendResponse = (
    res: Response,
    success: boolean,
    message: string,
    data: {},
    statusCode: number
  ): Promise<Response> => {
    return Promise.resolve(
      res.status(statusCode).json({
        success: success,
        message: message,
        data: data,
      })
    );
  };
    
    
    public generateToken = (userID:Types.ObjectId,res:Response) : String=> {
        const token = jwt.sign({ userID }, process.env.JWT_SECRET!, {
            expiresIn: "7d"

        });
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return token;
  } 

}
export const common = new Common();

