import express from "express";
import http from "http";

import indexRouter from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

/**
 * Create HTTP server And Socket.io.
 */
const server = http.Server(app);
const io = require("socket.io")(server);

export const application = { app, server, io };
