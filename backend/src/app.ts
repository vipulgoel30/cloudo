// Core imports
import { createServer } from "http";

// Third party imports
import express, { Express } from "express";

// User imports
import authRouter from "./routes/authRouter";
import { randomBytes } from "crypto";

const app: Express = express();
const httpServer = createServer(app);

// middleware that parses incoming payload if the content-type is set to `application/json`
app.use(express.json());

app.use("/api/v1/auth", authRouter);

export default httpServer;
console.log(randomBytes(16));
console.log(randomBytes(32).toString("hex"));
