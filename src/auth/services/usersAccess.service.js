import lodash from "lodash";

import { hashPassword } from "../../common/services/data/password.service.js";
import { pickFileds } from "../../common/services/db/pickFields.service.js";
import { generateAuthToken, generateRegisterToken, verifyRegisterToken } from "../../common/services/jwt/jwt.service.js";
import User from "../models/User.js";
import UserAuth from "../models/UserAuth.js";

import { sendMail } from "../../common/services/mail/mail.service.js";
import { registerMail } from "../../common/services/mail/mails/register.mail.js";
import { checkEmailExist, checkPassword, checkUserAuth, checkUserExist, getUserAuth } from "./usersHelper.service.js";

const { pick } = lodash;

const login = async (credentials) => {
    try {
        const { email, password } = credentials;

        const user = await checkUserExist(email);
        if (!user.isVerified) throw new Error("User not verified", "userNotVerified");
        await checkPassword(password, user.password);
        const token = generateAuthToken(user);
        const { user: finalUser, role } = await checkUserAuth(user, token);

        return Promise.resolve({ user: finalUser, role, token });
    } catch (error) {
        return Promise.reject(error);
    }
}

const register = async (user) => {
    try {
        await checkEmailExist(user.email);

        const newUser = new User(user);
        newUser.password = await hashPassword(user.password);
        await newUser.save();

        const registerToken = generateRegisterToken(newUser);
        const mailOptions = registerMail(user.email, user.name, registerToken);
        await sendMail(mailOptions);

        return Promise.resolve("User registered successfully. Please check your email to verify your account.");
    } catch (error) {
        return Promise.reject(error);
    }
}

const verifyUser = async (token) => {
    try {
        const isVerified = verifyRegisterToken(token);
        if (!isVerified) throw new Error("Invalid token");

        const { _id } = isVerified;
        const user = await User.findById(_id);
        if (!user) throw new Error("User not found");

        user.isVerified = true;
        await user.save();

        return "User verified successfully";
    } catch (error) {
        return Promise.reject(error);
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        const userAuth = await getUserAuth(id);

        return Promise.resolve({ user, role: userAuth.role, token: userAuth.token });
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error("User not found");

        await UserAuth.findOneAndDelete({ userId: user._id });
    } catch (error) {
        if (error.name === "DocumentDeleted") {
            return Promise.resolve(error.message);
        };

        return Promise.reject(error);
    }
};

const updateUser = async (id, data) => {
    try {
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        if (!user) throw new Error("User not found");

        return Promise.resolve(pick(user, pickFileds("user")));
    } catch (error) {
        return Promise.reject(error);
    }
}

export {
    deleteUser, getUserById, login,
    register, updateUser, verifyUser
};

