import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js"
import { initializeSocket } from "./sockets/socketHandler.js";

dotenv.config({ path: "./.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middlewares specific to express
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); 

// DB connector
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) =>{ 
    console.error(`DB connection error: ${err}`)
    process.exit(1);
  });

// HTTP server setup
const server = http.createServer(app);

// Socket initialization
initializeSocket(server);

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, "public")));

// routing
app.use('/auth', authRoutes);

if(process.env.NODE_ENV === "production") {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

server.listen(process.env.PORT || 3003, () => {
  console.log(`App listening on port ${process.env.PORT || 3003}`);
});

const shutdown = async () => {
  console.log(`🔴 Closing Server..`);
  await mongoose.connection.close();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
