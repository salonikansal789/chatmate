import { IUser } from "../interface/user.interface";
import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      body: any;
      params: any;
      query: any;
      user: IUser;
      files?: {
        profilePic?: UploadedFile | UploadedFile[];
      };
    }
  }

  interface Number {
    readonly str: string;
  }
}

export {};
