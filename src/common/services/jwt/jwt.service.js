import jwt from "jsonwebtoken";
import { JWT_SECRET, MAIL_SECRET } from "../env/env.service.js";

const generateAuthToken = (user) => {
  const { _id } = user;
  const payloadData = { _id };
  return jwt.sign(payloadData, JWT_SECRET, { expiresIn: "1d" });
};

const generateRegisterToken = (user) => {
  const { _id } = user;
  const payloadData = { _id };
  return jwt.sign(payloadData, MAIL_SECRET, { expiresIn: "1h" });
};

const verifyRegisterToken = (tokenFromClient) => {
  try {
    return jwt.verify(tokenFromClient, MAIL_SECRET);
  } catch (error) {
    return null;
  }
};

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, JWT_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

export { generateAuthToken, generateRegisterToken, verifyRegisterToken, verifyToken };

