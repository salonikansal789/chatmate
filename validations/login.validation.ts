import Joi, { ObjectSchema } from "joi";
import { ILogin, ISignup, IUpdateProfile } from "../interface/user.interface";
import { profile } from "console";

export const loginSchema: ObjectSchema<ILogin> = Joi.object<ILogin>({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);

export const signupSchema: ObjectSchema<ISignup> = Joi.object<ISignup>({
  fullName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
}).unknown(false);

export const updateProfileSchema: ObjectSchema<IUpdateProfile> =
  Joi.object<IUpdateProfile>({
    profilePic: Joi.string().required(),
  }).unknown(false);