import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { getTodayDate } from '../services/data/date.service.js';
import { consoleFormat, fileFormat } from '../services/logger/logger.service.js';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}
const accessLogStream = fs.createWriteStream(path.join(logsDir, `${getTodayDate()}.txt`), { flags: 'a' });

const consoleLogger = morgan(consoleFormat);
const fileLogger = morgan(fileFormat, {
    stream: accessLogStream
});

export const morganLogger = (req, res, next) => {
    consoleLogger(req, res, (err) => {
        if (err) return next(err);
        fileLogger(req, res, next);
    });
};
