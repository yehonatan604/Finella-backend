import cors from 'cors';
import express from 'express';
import * as http from "http";
import { Server } from "socket.io";
import { badPathHandler } from './common/middlewares/badPathHandler.mw.js';
import { errorHandler } from './common/middlewares/errorHandler.mw.js';
import { morganLogger } from './common/middlewares/morganLogger.mw.js';
import { appRouter } from './common/router/appRouter.js';
import { connectToDb } from './common/services/db/db.service.js';
import { PORT } from './common/services/env/env.service.js';
import { print } from './common/services/logger/print.service.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("complete-task", (taskId) => {
        console.log(`Task completed: ${taskId}`);
        // Trigger your automation here
        io.emit("task-updated", { taskId, status: "done" });
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

app.use(cors());

app.use(express.json({ limit: '5mb' }));

app.use(morganLogger);

app.use(express.static('public'));

app.use(appRouter);

app.use(badPathHandler);
app.use(errorHandler)

const start = async () => {
    await connectToDb();
    print("Connected to database", "success");

    server.listen(PORT, () => {
        print(`Server (HTTP + WebSocket) running on port ${PORT}`, "info");
    });
};

start();