import { print } from '../services/logger/print.service.js';

export const badPathHandler = (req, res) => {
    print(`Bad path: ${req.url}`, 'error');
    res.status(404).sendFile('public/404.html', { root: process.cwd() });
}
