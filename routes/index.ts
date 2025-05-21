import { Router } from "express";
import MessageRoute from "./messageRoutes";
import UserRoute from "./userRoutes";

export const routes= [
    new UserRoute(),
    new MessageRoute()
];