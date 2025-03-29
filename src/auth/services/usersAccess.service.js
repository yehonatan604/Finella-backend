import lodash from "lodash";

import { hashPassword } from "../../common/services/data/password.service.js";
import { pickFileds } from "../../common/services/db/pickFields.service.js";
import { generateAuthToken } from "../../common/services/jwt/jwt.service.js";
import User from "../models/User.js";
import UserAuth from "../models/UserAuth.js";

import { checkEmailExist, checkPassword, checkUserAuth, checkUserExist, getUserAuth } from "./usersHelper.service.js";

const { pick } = lodash;

const login = async (credentials) => {
    try {
        const { email, password } = credentials;

        const user = await checkUserExist(email);
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
        newUser.isVerified = true; // ************ Remove this line after email verification is implemented ************
        newUser.password = await hashPassword(user.password);
        await newUser.save();

        return Promise.resolve(pick(newUser, pickFileds("user")));
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

const activateUser = async (id) => {
    try {
        const user = await getUserById(id);
        const userAuth = getUserAuth(user._id);

        user.status = "active";
        userAuth.status = "active";
        userAuth.token = "";

        await user.save();
        await userAuth.save();

        return Promise.resolve("User activated");
    } catch (error) {
        return Promise.reject(error);
    }
}

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
    activateUser, deleteUser, getUserById, login,
    register, updateUser
};

