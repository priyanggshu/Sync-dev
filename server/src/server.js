import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import path from "path";
import { Server } from "socket.io";

dotenv.config();
const app = express();

// middlewares specific to express
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// DB connector
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(`DB connection error: ${err}`));

// HTTP server setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

// routing
app.use('/auth', authRoutes);

app.listen(process.env.PORT || 3003, () => {
  console.log(`App listening on port ${process.env.PORT || 3003}`);
});
