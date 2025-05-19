import lodash from "lodash";
import { DateTime } from "luxon";
import { hashPassword } from "../../common/services/data/password.service.js";
import { pickFileds } from "../../common/services/db/pickFields.service.js";
import { generateAuthToken, generatePasswordResetToken, generateRegisterToken, verifyPasswordResetToken, verifyRegisterToken, verifySecurityToken } from "../../common/services/jwt/jwt.service.js";
import { sendMail } from "../../common/services/mail/mail.service.js";
import { forgotPasswordrMail } from "../../common/services/mail/mails/forgotPassword.mail.js";
import { registerMail } from "../../common/services/mail/mails/register.mail.js";
import { resetPasswordMail } from "../../common/services/mail/mails/resetPassword.mail.js";
import Note from "../../notes/models/Note.js";
import User from "../models/User.js";
import UserAuth from "../models/UserAuth.js";
import { checkEmailExist, checkPassword, checkUserAuth, checkUserExist, getUserAuth } from "./usersHelper.service.js";

const { pick } = lodash;

const login = async (credentials) => {
    try {
        const { email, password } = credentials;

        const user = await checkUserExist(email);
        if (!user.isVerified) throw new Error("User not verified", "userNotVerified");
        await checkPassword(password, user);
        const token = generateAuthToken(user);
        const { user: finalUser, role } = await checkUserAuth(user);

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

        const note = new Note({
            userId: newUser._id,
            name: `Welcome!`,
            content: `Hello ${user.name.first} ${user.name.last}, welcome to Finella!`,
            date: DateTime.now().toJSDate(),
            isSticky: false,
            notes: "",
            noteStatus: "PENDING",
        });
        await note.save();

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

const changePassword = async (id, password, newPassword) => {
    try {
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        await checkPassword(password, user);
        const hashedNewPassword = await hashPassword(newPassword);
        if (hashedNewPassword === user.password) throw new Error("New password cannot be the same as the old password");
        user.password = hashedNewPassword;
        await user.save();
        return Promise.resolve("Password changed successfully");
    }
    catch (error) {
        return Promise.reject(error);
    }
}

const forgotPassword = async (email) => {
    try {
        const user = await checkUserExist(email);
        if (!user.isVerified) throw new Error("User not verified", "userNotVerified");

        const token = generatePasswordResetToken(user);
        const mail = forgotPasswordrMail(user.email, user.name, token);
        await sendMail(mail);

        return Promise.resolve("Password reset link sent to your email");
    } catch (error) {
        return Promise.reject(error);
    }
}

const resetPassword = async (token) => {
    try {
        const { _id } = verifyPasswordResetToken(token);
        if (!_id) throw new Error("Invalid token");

        const user = await User.findById(_id);
        if (!user) throw new Error("User not found");

        const newPassword = "Z" + Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) + "!"
        user.password = await hashPassword(newPassword);
        await user.save();

        const userAuth = await UserAuth.findOne({ userId: user._id });
        if (!userAuth) throw new Error("User not found");

        userAuth.loginTries = 0;
        userAuth.lastFailedLoginTry = null;
        userAuth.token = null;
        await userAuth.save();

        const mail = resetPasswordMail(user.email, user.name, newPassword);
        await sendMail(mail);

        return Promise.resolve("Password reset successfully. Please check your email for the new password.");
    } catch (error) {
        return Promise.reject(error);
    }
}

const secureUser = async (token) => {
    try {
        const id = verifySecurityToken(token)._id;
        if (!id) throw new Error("Invalid token");
        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        const userAuth = await UserAuth.findOne({ userId: user._id });
        if (!userAuth) throw new Error("User not found");

        userAuth.loginTries = 0;
        userAuth.lastFailedLoginTry = null;
        userAuth.token = null;

        await userAuth.save();
        return Promise.resolve("Account secured successfully, please login.");
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export {
    changePassword, deleteUser, forgotPassword, getUserById, login,
    register, resetPassword, secureUser, updateUser, verifyUser
};

