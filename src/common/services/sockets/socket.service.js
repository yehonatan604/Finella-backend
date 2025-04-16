import cron from "node-cron";
import { Server } from "socket.io";
import Note from "../../../actions/models/Note.js";
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
        const now = new Date();
        const formatted = now.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:mm"

        const automations = await NoteAutomation.find({ status: "active" });

        for (const automation of automations) {
            const shouldTrigger =
                automation.dateTime === formatted &&
                (!automation.lastTriggeredAt ||
                    new Date(automation.lastTriggeredAt).toDateString() !== now.toDateString());

            if (shouldTrigger) {
                const note = await Note.findById(automation.noteId);
                print(`Emitting to user: ${automation.userId}`, "info");

                io.to(automation.userId.toString()).emit("note-automation-triggered", {
                    title: note.name,
                    content: note.content,
                });

                automation.lastTriggeredAt = now;
                await automation.save();
            }
        }

        print(`[CRON] Running automation check at ${now.toISOString()}`, "info");
    });
};

export { initializeSocketLogic };

