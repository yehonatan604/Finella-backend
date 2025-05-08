import { Router } from "express";
import auth from "../../common/middlewares/auth.mw.js";
import { validate } from "../../common/middlewares/validation.mw.js";
import { repo } from "../services/SalaryRepo.service.js";
import SalarySchema, { SalaryUpdateSchema } from "../validations/Salary.schema.js";

const salaryRouter = Router();

salaryRouter.post("/", auth, validate(SalarySchema), async (req, res) => {
    try {
        const workPlace = await repo.create(req.body);
        res.status(200).json(workPlace);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

salaryRouter.get("/by", auth, async (req, res) => {
    try {
        const workPlaces = await repo.getAll(req.user, req.query);
        res.status(200).json(workPlaces);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

salaryRouter.put("/", auth, validate(SalaryUpdateSchema), async (req, res) => {
    try {
        const salary = await repo.update(req.body._id, req.body);
        res.status(200).json(salary);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

salaryRouter.delete("/:id", auth, async (req, res) => {
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

salaryRouter.patch("/undelete/:id", auth, async (req, res) => {
    try {
        await repo.undelete(req.params.id);
        res.status(200).json("Document undeleted successfully");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

export { salaryRouter };

