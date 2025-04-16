import cors from 'cors';
import express from 'express';
import * as http from "http";
import { badPathHandler, errorHandler } from './common/middlewares/error.mw.js';
import { morganLogger } from './common/middlewares/morganLogger.mw.js';
import { appRouter } from './common/router/appRouter.js';
import { connectToDb } from './common/services/db/db.service.js';
import { PORT } from './common/services/env/env.service.js';
import { print } from './common/services/logger/print.service.js';
import { initializeSocketLogic } from './common/services/sockets/socket.service.js';

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.json({ limit: '5mb' }));

app.use(morganLogger);

app.use(express.static('public'));

app.use(appRouter);

app.use(badPathHandler);
app.use(errorHandler)

const start = async () => {
    try {
        await connectToDb();

        server.listen(PORT, () => {
            initializeSocketLogic(server);
            print(`Server (HTTP + WebSocket) running on port ${PORT}`, "info");
        });
    } catch (err) {
        print("Failed to connect to DB", "error");
        console.error(err);
        process.exit(1);
    }
};

await start();