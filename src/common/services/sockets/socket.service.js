import { DateTime } from "luxon";
import cron from "node-cron";
import { Server } from "socket.io";
import TaskStatusTypes from "../../../actions/enums/TaskStatusTypes.js";
import Note from "../../../actions/models/Note.js";
import ToDo from "../../../actions/models/Todo.js";
import NoteAutomation from "../../../automations/models/NoteAutomation.js";
import { verifyToken } from "../jwt/jwt.service.js";
import { print } from "../logger/print.service.js";

const initializeSocketLogic = (socketServer) => {
    const io = new Server(socketServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        const userData = verifyToken(token);

        if (!userData) {
            print("Invalid or missing token during socket connection", "error");
            return next(new Error("Unauthorized"));
        }

        socket.user = userData;
        socket.join(userData._id);
        next();
    });

    io.on("connection", (socket) => {
        print(`User connected: ${socket.user._id}`, "success");

        socket.emit("user-registered", socket.user._id);

        socket.on("disconnect", () => {
            print(`User disconnected: ${socket.user._id}`, "secondary");
        });
    });

    cron.schedule("* * * * *", async () => {
        const now = DateTime.utc().startOf("minute");
        const automations = await NoteAutomation.find({ status: "active" });
        const toDos = await ToDo.find({ status: "active" });

        for (const automation of automations) {
            const automationTime = DateTime.fromISO(automation.dateTime).startOf("minute");
            const lastTriggered = automation.lastTriggeredAt
                ? DateTime.fromJSDate(automation.lastTriggeredAt)
                : null;
            const nowHM = now.setZone("UTC").toFormat("HH:mm");
            const autoHM = automationTime.setZone("UTC").toFormat("HH:mm");
            let shouldTrigger = false;

            if (automation.repeat === "none") {
                shouldTrigger =
                    automationTime.equals(now) &&
                    (!lastTriggered || !lastTriggered.hasSame(now, "minute"));
            } else if (automation.repeat === "daily") {
                shouldTrigger =
                    nowHM === autoHM &&
                    (!lastTriggered || !lastTriggered.hasSame(now, "minute"));
            } else if (automation.repeat === "weekly") {
                shouldTrigger =
                    nowHM === autoHM &&
                    now.weekday === automationTime.weekday &&
                    (!lastTriggered || !lastTriggered.hasSame(now, "minute"));
            } else if (automation.repeat === "monthly") {
                shouldTrigger =
                    nowHM === autoHM &&
                    now.day === automationTime.day &&
                    (!lastTriggered || !lastTriggered.hasSame(now, "minute"));
            }

            if (shouldTrigger) {
                const note = await Note.findById(automation.noteId);
                print(`Triggering automation for user: ${automation.userId}`, "success");

                io.to(automation.userId.toString()).emit("note-automation-triggered", {
                    title: note.name,
                    content: note.content,
                });

                automation.lastTriggeredAt = now.toJSDate();
                await automation.save();
            }
        }

        for (const todo of toDos) {
            const shouldTrigger = (
                todo.endDate
                && DateTime.fromJSDate(todo.endDate) < now
                && todo.toDoStatus !== TaskStatusTypes.FAILED
                && todo.toDoStatus !== TaskStatusTypes.COMPLETE
            );

            if (shouldTrigger) {
                const note = new Note({
                    userId: todo.userId,
                    name: `ToDo "${todo.name}" failed`,
                    content: `Your ToDo "${todo.name}" has failed. Please check your tasks.`,
                    date: now.toJSDate(),
                });

                await note.save();

                io.to(todo.userId.toString()).emit("todo-failed", {
                    title: note.name,
                    content: note.content,
                });
                todo.toDoStatus = TaskStatusTypes.FAILED;
                await todo.save();
            }
        }
    });
};

export { initializeSocketLogic };

