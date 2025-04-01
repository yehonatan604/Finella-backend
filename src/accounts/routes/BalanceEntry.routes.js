import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { repo } from "../services/BalanceEntryRepo.service.js";
import BalanceEntrySchema, { BalanceEntryUpdateSchema } from "../validations/BalanceEntry.schema.js";

const balanceEntryRouter = Router();

balanceEntryRouter.post("/", auth, validate(BalanceEntrySchema), async (req, res) => {
    try {
        const bEntry = await repo.create(req.body);
        res.status(200).json(bEntry);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

balanceEntryRouter.get("/", auth, async (req, res) => {
    try {
        const bEntries = await repo.getAll();
        res.status(200).json(bEntries);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

balanceEntryRouter.get("/by", auth, async (req, res) => {
    try {
        const bEntries = await repo.getAll(req.query);
        res.status(200).json(bEntries);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

balanceEntryRouter.put("/", auth, validate(BalanceEntryUpdateSchema), async (req, res) => {
    try {
        const bEntry = await repo.update(req.body._id, req.body);
        res.status(200).json(bEntry);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

balanceEntryRouter.delete("/:id", auth, async (req, res) => {
    try {
        const msg = await repo.delete(req.params.id);
        res.status(200).json(msg);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

export { balanceEntryRouter };

