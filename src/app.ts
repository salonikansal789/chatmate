import express, { Router } from "express";
import cors from "cors";
import { cwd } from "process";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index";
import connectDB from "./server";
require("dotenv").config({ path: cwd() + "/.env" });

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Router[]) {
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
  private initializeRoutes(routes: Router[]) {
    routes.forEach((routes) => {
      this.app.use("/api", routes);
    });
  }
  private connectToDatabase() {
    connectDB();
  }
}

const app = new App(routes);
app.listen();
