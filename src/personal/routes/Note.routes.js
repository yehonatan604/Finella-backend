import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { repo } from "../services/NoteRepo.service.js";
import NoteSchema from "../validations/Note.schema.js";

const noteRouter = Router();

noteRouter.post("/", auth, validate(NoteSchema), async (req, res) => {
    try {
        const workPlace = await repo.create(req.body);
        res.status(200).json(workPlace);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteRouter.get("/", auth, async (req, res) => {
    try {
        const workPlaces = await repo.getAll();
        res.status(200).json(workPlaces);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteRouter.get(":/id", auth, async (req, res) => {
    try {
        const workPlace = await repo.getById(req.params.id);
        res.status(200).json(workPlace);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteRouter.put("/", auth, validate(NoteSchema), async (req, res) => {
    try {
        const user = await repo.create(req.user._id, req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteRouter.delete("/:id", auth, async (req, res) => {
    try {
        const msg = await repo.delete(req.params.id);
        res.status(200).json(msg);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

export { noteRouter };

