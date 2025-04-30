import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { createHtmlResponse } from "../services/htmlResponse.service.js";
import { deleteUser, getUserById, login, register, updateUser, verifyUser } from "../services/usersAccess.service.js";
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
        if (err.name === "userNotVerified") {
            return res.status(403).json(err.message);
        }
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

authRouter.get("/verify/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const msg = await verifyUser(token);
        res.status(200).send(createHtmlResponse.success(msg));
    } catch (err) {
        res.status(400).send(createHtmlResponse.error(err.message));
    }
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

