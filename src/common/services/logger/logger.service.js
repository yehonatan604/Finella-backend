import chalk from 'chalk';

import { getTodayDate, getTodayTime } from '../data/date.service.js';

export const consoleFormat = (tokens, req, res) => {
    const color = res.statusCode >= 400 ? chalk.red : chalk.green;

    return [
        chalk.cyan(getTodayDate()),
        chalk.cyan(getTodayTime()),
        color(tokens.method(req, res)),
        color(tokens.url(req, res)),
        color(tokens.status(req, res)),
        tokens['response-time'](req, res) + 'ms',
    ].join(' | ');
};

export const fileFormat = (tokens, req, res) => {
    return [
        getTodayDate(),
        getTodayTime(),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res) + 'ms',
    ].join(' | ');
};
