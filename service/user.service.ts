import { ILogin, ISignup } from "../interface/user.interface";
import cloudinary from "../helper/cloudinary";
import User from "../models/user.model";
import ResponseService from "./response.service";
import Common from "../helper/common";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

class UserService extends ResponseService {
  private readonly common = new Common();
  login = async (credentials: ILogin, res: Response) => {
    const { email, password } = credentials;
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const isPaswordCheck = await bcrypt.compare(password, user.password);
    if (!isPaswordCheck) {
      throw new Error("Incorrect password");
    }
    this.common.generateToken(user._id, res);

    return this.serviceResponse(200, {}, "Login successfully...");
  };

  signup = async (credentials: ISignup, res: Response) => {
    const { fullName, email, password } = credentials;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already present");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    if (!newUser) {
      throw new Error("Invalid User Data");
    }
    this.common.generateToken(newUser._id, res);
    await newUser.save();
    return this.serviceResponse(200, {}, "Signup successfully...");
  };

  updateProfile = async (req: Request, userId: string) => {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new Error("No files uploaded");
    }
    const { profilePic } = req.files[0] as { profilePic: { path: string } };
    const uploadResponse = await cloudinary.uploader.upload(profilePic.path);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    return this.serviceResponse(200, {}, "Update Profile Successfully");
  };
}

export default UserService;
