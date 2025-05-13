import jwt from "jsonwebtoken";
import { JWT_SECRET, MAIL_SECRET, SECURITY_KEY } from "../env/env.service.js";

const generateAuthToken = (user) => {
  const { _id } = user;
  const payloadData = { _id };
  return jwt.sign(payloadData, JWT_SECRET, { expiresIn: "1d" });
};

const verifyAuthToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, JWT_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

const generateRegisterToken = (user) => {
  const { _id } = user;
  const payloadData = { _id };
  return jwt.sign(payloadData, MAIL_SECRET, { expiresIn: "30m" });
};

const verifyRegisterToken = (tokenFromClient) => {
  try {
    return jwt.verify(tokenFromClient, MAIL_SECRET);
  } catch (error) {
    return null;
  }
};

const generateSecurityToken = (user) => {
  const { _id } = user;
  const payloadData = { _id };
  return jwt.sign(payloadData, SECURITY_KEY, { expiresIn: "30m" });
}

const verifySecurityToken = (tokenFromClient) => {
  try {
    return jwt.verify(tokenFromClient, SECURITY_KEY);
  } catch (error) {
    return null;
  }
}


export { generateAuthToken, generateRegisterToken, generateSecurityToken, verifyAuthToken, verifyRegisterToken, verifySecurityToken };

