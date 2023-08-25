import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

config({
    path:"./config/config.env"
})
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true,
  }))



  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
import user from "./routes/userRoute.js"
import post from "./routes/postRoute.js"
import {ErrorMiddleware} from "./utils/Error.js"
import { isAuthenticated } from "./Authenticate/isAuth.js";
app.use(isAuthenticated);

  app.use("/api/" , user)
  app.use("/api/" , post)



  export default app ;
  app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend.</h1>`
  )
);
 app.use(ErrorMiddleware)