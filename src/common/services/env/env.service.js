import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI;
export const ATLAS_URI = process.env.ATLAS_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const MAIL_SECRET = process.env.MAIL_SECRET;
export const MAIL_PROVIDER = process.env.MAIL_PROVIDER;
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const API_URL = process.env.API_URL;

