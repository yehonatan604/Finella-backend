import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { createHtmlResponse } from "../services/htmlResponse.service.js";
import { changePassword, deleteUser, getUserById, login, register, secureUser, updateUser, verifyUser } from "../services/usersAccess.service.js";
import ChangePasswordSchema from "../validations/ChangePassword.schema.js";
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

authRouter.get("/secure/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const msg = await secureUser(token);
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

authRouter.patch("/change-password", auth, validate(ChangePasswordSchema), async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const msg = await changePassword(req.user._id, password, newPassword);
        res.status(200).json(msg);
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

