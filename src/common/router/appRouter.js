import { Router } from "express";
import { balanceEntryRouter } from "../../actions/routes/BalanceEntry.routes.js";
import { noteRouter } from "../../actions/routes/Note.routes.js";
import { salaryRouter } from "../../actions/routes/Salary.routes.js";
import { toDoRouter } from "../../actions/routes/ToDo.routes.js";
import { workPlaceRouter } from "../../actions/routes/WorkPlace.routes.js";
import { authRouter } from "../../auth/routes/auth.routes.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.use("/work-place", workPlaceRouter);
appRouter.use("/salary", salaryRouter);
appRouter.use("/balance-entry", balanceEntryRouter);
appRouter.use("/todo", toDoRouter);
appRouter.use("/note", noteRouter);

export { appRouter };

