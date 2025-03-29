import cors from 'cors';
import express from 'express';
import { badPathHandler } from './common/middlewares/badPathHandler.mw.js';
import { errorHandler } from './common/middlewares/errorHandler.mw.js';
import { morganLogger } from './common/middlewares/morganLogger.mw.js';
import { connectToDb } from './common/services/db/db.service.js';
import { PORT } from './common/services/env/env.service.js';
import { print } from './common/services/logger/print.service.js';
import { appRouter } from './router/appRouter.js';

const app = express();

app.use(cors());

app.use(express.json({ limit: '5mb' }));

app.use(morganLogger);

app.use(express.static('public'));

app.use(appRouter);

app.use(badPathHandler);
app.use(errorHandler)

app.listen(PORT, async () => {
    print(`Server is running on port ${PORT}`, "info");

    await connectToDb();
    print("Connected to database", "success");
});