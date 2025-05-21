import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interface/user.interface";

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User:Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
