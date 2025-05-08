import { Router } from "express";
import { Routes } from "../interface/routes.interface";

class Message implements Routes {
    public router = Router();
    constructor() {
        this.initializeRoutes();
    }
    public initializeRoutes() { 
        this.router.get(`/users`, this.);
        this.router.get(`/:id`, this.);
        this.router.get(`send/user/:id`, this.);
    }
}