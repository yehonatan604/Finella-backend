import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { repo } from "../services/NoteAutomationRepo.service.js";
import NoteAutomationSchema, { NoteAutomationUpdateSchema } from "../validations/NoteAutomation.schema.js";

const noteAutomationRouter = Router();

noteAutomationRouter.post("/", auth, validate(NoteAutomationSchema), async (req, res) => {
    try {
        const noteA = await repo.create(req.body);
        res.status(200).json(noteA);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteAutomationRouter.get("/", auth, async (req, res) => {
    try {
        const notesA = await repo.getAll(req.user);
        res.status(200).json(notesA);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteAutomationRouter.get("/by", auth, async (req, res) => {
    try {
        const notesA = await repo.getAll(req.query);
        res.status(200).json(notesA);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteAutomationRouter.get(":/id", auth, async (req, res) => {
    try {
        const noteA = await repo.getById(req.params.id);
        res.status(200).json(noteA);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteAutomationRouter.put("/", auth, validate(NoteAutomationUpdateSchema), async (req, res) => {
    try {
        const noteA = await repo.update(req.body._id, req.body);
        res.status(200).json(noteA);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

noteAutomationRouter.delete("/:id", auth, async (req, res) => {
    try {
        await repo.delete(req.params.id);
    } catch (err) {
        if (err.name === "DocumentDeleted") {
            return res.status(200).json("Document deleted successfully");
        }
        res.status(400).json(err.message);
    }
});

noteAutomationRouter.patch("/undelete/:id", auth, async (req, res) => {
    try {
        const msg = await repo.undelete(req.params.id);
        res.status(200).json(msg);
    } catch (err) {
        res.status(400).json(err.message);
    }
});



export { noteAutomationRouter };

