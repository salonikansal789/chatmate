import dotenv from "dotenv";
require("dotenv").config();
import express, { Application } from "express";
import cors from "cors";
import { cwd } from "process";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index";
import connectDB from "./server";
import { Routes } from "./interface/routes.interface";

class App {
  public app: Application = express();
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.port || 8000;
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: process.env.ORIGIN,
        credentials: process.env.CREDENTIALS === "true",
      })
    );
    this.app.use(cookieParser());
  }
  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }
  private connectToDatabase() {
    connectDB();
  }
}

const app = new App(routes);
app.listen();
