import { Router } from "express";
import { Routes } from "../interface/routes.interface";

class User implements Routes{
    public path = '/auth';
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}/login`, this.login);
        this.router.get(`${this.path}/signup`, this.signup);
        this.router.get(`${this.path}/logout`, this.logout);
        this.router.get(`${this.path}/check/auth`, this.checkAuth);
        this.router.get(`${this.path}/update/profile`, this.updateProfile);
    }
}