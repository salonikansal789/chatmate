import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interface/message.interface";

const messageSchema: Schema<IMessage> = new Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type:String
        },
        image: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)


const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;