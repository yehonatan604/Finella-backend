import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const hashPassword = async (password) => {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = await scryptAsync(password, salt, 64);
    return `${salt}:${derivedKey.toString('hex')}`;
}

const verifyPassword = async (password, storedHash) => {
    const [salt, key] = storedHash.split(':');
    const derivedKey = await scryptAsync(password, salt, 64);
    return key === derivedKey.toString('hex');
}

export { hashPassword, verifyPassword };