import { getPropName } from "../../common/services/data/obj.service.js";
import { verifyPassword } from "../../common/services/data/password.service.js";
import RoleTypes from "../enums/RoleTypes.js";
import User from "../models/User.js";
import UserAuth from "../models/UserAuth.js";

const checkEmailExist = async (email) => {
    const checkUser = await User.findOne({ email });

    if (checkUser) throw new Error("Email already exist");
    return checkUser;
};

const checkUserExist = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    return user;
}

const checkPassword = async (password, storedPassword) => {
    const checkPassword = await verifyPassword(password, storedPassword);
    if (!checkPassword) throw new Error("Wrong password");
}

const checkUserAuth = async (user, token) => {
    const userAuth = await UserAuth.findOne({ userId: user._id });

    const role = {
        permission: RoleTypes.USER,
        name: getPropName(RoleTypes, RoleTypes.USER),
    }

    if (!userAuth) {
        const userAuth = new UserAuth({
            userId: user._id,
            token,
            role
        });
        await userAuth.save();
    } else {
        userAuth.token = token;
        await userAuth.save();
    }

    return { user, role };
}

const getUserAuth = async (userId) => {
    const userAuth = await UserAuth.findOne({ userId });
    if (!userAuth) throw new Error("User not authenticated");
    return userAuth;
}

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found")
    else return user;
}


export { checkEmailExist, checkPassword, checkUserAuth, checkUserExist, getUserAuth, getUserById };
