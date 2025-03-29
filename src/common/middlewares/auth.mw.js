import { verifyToken } from "../services/jwt/jwt.service.js";

const auth = (req, res, next) => {
    try {
        const tokenFromClient = req.header("auth-token");
        if (!tokenFromClient)
            throw new Error("Authentication Error: Please Login");
        const userInfo = verifyToken(tokenFromClient);
        if (!userInfo) throw new Error("Authentication Error: Unauthorize user");
        req.user = userInfo;
        return next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

export default auth;