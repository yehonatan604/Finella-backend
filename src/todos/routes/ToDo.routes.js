import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { repo } from "../services/ToDoRepo.service.js";
import ToDoSchema from "../validations/ToDo.schema.js";
import ToDoUpdateSchema from "../validations/ToDoUpdate.schema.js";

const toDoRouter = Router();

toDoRouter.post("/", auth, validate(ToDoSchema), async (req, res) => {
    try {
        const todo = await repo.create(req.body);
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

toDoRouter.get("/by", auth, async (req, res) => {
    try {
        const todos = await repo.getAll(req.user, req.query);
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

toDoRouter.get(":/id", auth, async (req, res) => {
    try {
        const todo = await repo.getById(req.params.id);
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

toDoRouter.put("/", auth, validate(ToDoUpdateSchema), async (req, res) => {
    try {
        const todo = await repo.update(req.body._id, req.body);
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

toDoRouter.delete("/:id", auth, async (req, res) => {
    try {
        const msg = await repo.delete(req.params.id);
        res.status(200).json(msg);
    } catch (err) {
        if (err.name === "DocumentDeleted") {
            return res.status(200).json("Document deleted successfully");
        }
        res.status(400).json(err.message);
    }
});

toDoRouter.patch("/undelete/:id", auth, async (req, res) => {
    try {
        await repo.undelete(req.params.id);
        res.status(200).json("Document undeleted successfully");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

export { toDoRouter };

