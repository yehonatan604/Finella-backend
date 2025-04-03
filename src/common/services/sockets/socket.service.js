import { Server } from "socket.io";

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

}

export { initializeSocketLogic };

