import User from "../../auth/models/User.js";
import { verifyToken } from "../services/jwt/jwt.service.js";

const auth = async (req, res, next) => {
    try {
        const tokenFromClient = req.header("auth-token");
        if (!tokenFromClient)
            throw new Error("Authentication Error: Please Login");
        const userInfo = verifyToken(tokenFromClient);
        const user = await User.findById(userInfo._id);
        if (!user.isVerified)
            throw new Error("Authentication Error: Please verify your email");
        if (!userInfo)
            throw new Error("Authentication Error: Unauthorize user");
        req.user = userInfo;
        return next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export default auth;