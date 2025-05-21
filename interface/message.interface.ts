import { Types } from "mongoose";
export interface IMessage extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  text?: string;
  image?: string;
}
