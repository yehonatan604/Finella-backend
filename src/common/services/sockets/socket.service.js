import cron from "node-cron";
import { Server } from "socket.io";
import NoteAutomation from "../../../automations/models/NoteAutomation.js";

const initializeSocketLogic = (socketServer) => {
    const io = new Server(socketServer, {
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

        socket.on("register-user", (id) => {
            console.log(`User registered: ${id}`);
            socket.join(id); // Join the user to their own room
            socket.emit("user-registered", id); // Emit a message back to the user
        });

        socket.on("disconnect", () => {
            console.log("🔴 User disconnected:", socket.id);
        });
    });

    cron.schedule("* * * * *", async () => {
        const now = new Date();
        const formatted = now.toISOString().slice(0, 16); // e.g., 2025-04-16T18:00

        const automations = await NoteAutomation.find({ status: "active" });

        for (const automation of automations) {
            const shouldTrigger =
                automation.dateTime === formatted &&
                (!automation.lastTriggeredAt || new Date(automation.lastTriggeredAt).toDateString() !== now.toDateString());

            if (shouldTrigger) {
                // Emit to front (to specific user use io.to(userId).emit())
                io.emit("note-automation-triggered", {
                    noteId: automation.noteId,
                    automationId: automation._id,
                    message: "Scheduled note reminder!",
                });

                // Update lastTriggeredAt
                automation.lastTriggeredAt = now;
                await automation.save();
            }
        }

        console.log(`[CRON] Running automation check at ${now.toISOString()}`);
    });
}

export { initializeSocketLogic };

