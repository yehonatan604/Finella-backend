import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { repo } from "../services/WorkPlaceRepo.service.js";
import WorkPlaceSchema from "../validations/WorkPlace.schema.js";

const workPlaceRouter = Router();

workPlaceRouter.post("/", auth, validate(WorkPlaceSchema), async (req, res) => {
    try {
        const workPlace = await repo.create(req.body, req.user._id);
        res.status(200).json(workPlace);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

workPlaceRouter.get("/", auth, async (req, res) => {
    try {
        const workPlaces = await repo.getAll(req.user._id);
        res.status(200).json(workPlaces);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

workPlaceRouter.get("/:id", auth, async (req, res) => {
    try {
        const workPlace = await repo.getById(req.params.id);
        res.status(200).json(workPlace);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

workPlaceRouter.put("/:id", auth, async (req, res) => {
    try {
        const workPlace = await repo.update(req.params.id, req.body);
        res.status(200).json(workPlace);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

workPlaceRouter.delete("/:id", auth, async (req, res) => {
    try {
        const msg = await repo.delete(req.params.id);
        res.status(200).json(msg);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

export { workPlaceRouter };

