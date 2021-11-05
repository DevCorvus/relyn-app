import express, { Application } from "express";
import { join as pathJoin } from "path";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import envConfig, { NODE_ENV, PORT, SESSION_COOKIES_SECRET, SIGNED_COOKIES_SECRET } from "../utils/env";
import errors from "../controllers/error.controller";
import indexRoutes from "../routes/index";
import authRoutes from "../routes/auth";
import userRoutes from "../routes/users";
import postRoutes from "../routes/posts";
import commentRoutes from "../routes/comments";

const app: Application = express();

// Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "img-src": ["*", "data:"]
    }
  }
}));
app.enable("trust proxy");
app.use(cookieParser(SIGNED_COOKIES_SECRET));
app.use(cookieSession({
  name: "session",
  secret: SESSION_COOKIES_SECRET || "secret",
  path: "/",
  httpOnly: true,
  secure: NODE_ENV === "production" ? true : false
}));
app.use(express.json());
app.use(morgan(NODE_ENV === "production" ? "tiny" : "dev"));

// Settings
app.set("port", PORT);
if (NODE_ENV === "production") {
  app.use(express.static(pathJoin(__dirname, "../../client/build")));
}

// Routes
if (envConfig.includes(undefined)) {
  app.all("*", errors.envRequired);
} else {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes, commentRoutes);
  app.use(indexRoutes);
}

// Shutdowns
process.on("uncaughtException", () => process.exit(1));
process.on("unhandledRejection", () => process.exit(1));
process.on("SIGTERM", () => process.exit(1));
process.on("SIGINT", () => process.exit(1));

export default app;