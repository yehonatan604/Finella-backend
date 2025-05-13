import { getPropName } from "../../common/services/data/obj.service.js";
import { verifyPassword } from "../../common/services/data/password.service.js";
import { generateSecurityToken } from "../../common/services/jwt/jwt.service.js";
import { sendMail } from "../../common/services/mail/mail.service.js";
import { manyAttemptsMail } from "../../common/services/mail/mails/manyAttempts.mail.js";
import RoleTypes from "../enums/RoleTypes.js";
import User from "../models/User.js";
import UserAuth from "../models/UserAuth.js";

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

const checkPassword = async (password, user) => {
    const checkPassword = await verifyPassword(password, user.password);
    const userAuth = await getUserAuth(user._id);
    const today = new Date();

    const checkDiff = () => {
        const diff = Math.abs(today - userAuth.lastFailedLoginTry);
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    if (!checkPassword) {
        if (userAuth.loginTries >= 3) {
            if (checkDiff() < 2) {
                console.log("User is blocked for 24 hours");
                const token = generateSecurityToken(user);
                const mail = manyAttemptsMail(user.email, user.name, token);
                await sendMail(mail);
                throw new Error("Too many login attempts", "userBlocked");
            }
        } else {
            userAuth.loginTries += 1;
            userAuth.lastFailedLoginTry = today;
            await userAuth.save();
        }
        throw new Error("Wrong password");
    } else {
        if (checkDiff() < 2) {
            throw new Error("Too many login attempts", "userBlocked");
        }
        userAuth.loginTries = 0;
        userAuth.lastFailedLoginTry = null;
        await userAuth.save();
    }
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

export { checkEmailExist, checkPassword, checkUserAuth, checkUserExist, getUserAuth, getUserById };

