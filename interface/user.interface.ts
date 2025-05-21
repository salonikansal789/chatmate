import { Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  _id: Types.ObjectId;
  fullName: string;
  password: string;
  profilePic?: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface ISignup {
  email: string;
  fullName: string;
  password: string;
}
export interface IUpdateProfile {
  profilePic: string;
}
