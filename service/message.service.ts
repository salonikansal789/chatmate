import cloudinary from "../helper/cloudinary";
import Message from "../models/message.model";
import User from "../models/user.model";
import ResponseService from "./response.service";

class MessageService extends ResponseService {
  getUsers = async (userId: string) => {
    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    if (!filteredUsers) {
      throw new Error("users not found");
    }
    return this.serviceResponse(200, filteredUsers, "Users found");
  };
  getMessages = async (receiverId: string, senderId: string) => {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });
    return this.serviceResponse(200, messages, "Message found");
  };
  sendMessage = async (
    text: string,
    image: string,
    receiver: string,
    sender: string
  ) => {
    let imageUrl;
    if (image) {
      const uploadResponse = cloudinary.uploader.upload(image);
      imageUrl = (await uploadResponse).secure_url;
    }
    const newMessage = new Message({
      sender,
      receiver,
      text,
      image: imageUrl ?? "",
    });
    await newMessage.save();
    return this.serviceResponse(200, newMessage, "Message sent");
  };
}
export default MessageService;
