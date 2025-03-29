import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { deleteUser, getUserById, login, register, updateUser } from "../services/usersAccess.service.js";
import LoginSchema from "../validations/Login.schema.js";
import RegisterSchema from "../validations/Register.schema.js";
import UpdateSchema from "../validations/Update.schema.js";

const authRouter = Router();

authRouter.post("/login", validate(LoginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await login({ email, password });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

authRouter.post("/register", validate(RegisterSchema), async (req, res) => {
    try {
        const user = await register(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

authRouter.get("/:id", auth, async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

authRouter.post("/verify-email/:token", (req, res) => {
    res.send("Verify email");
});

authRouter.post("/forgot-password", (req, res) => {
    res.send("Forgot password");
});

authRouter.post("/reset-password/:token", (req, res) => {
    res.send("Reset password");
});

authRouter.put("/update-password", auth, (req, res) => {
    res.send("Update password");
});

authRouter.put("/", auth, validate(UpdateSchema), async (req, res) => {
    try {
        const user = await updateUser(req.user._id, req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

authRouter.delete("/:id", auth, async (req, res) => {
    try {
        const msg = await deleteUser(req.params.id);
        res.status(200).json(msg);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

export { authRouter };

