import { Router } from "express";
import { authRouter } from "../../auth/routes/auth.routes.js";
import { noteRouter } from "../../notes/routes/Note.routes.js";
import { noteAutomationRouter } from "../../notes/routes/NoteAutomation.routes.js";
import { balanceEntryRouter } from "../../records/routes/BalanceEntry.routes.js";
import { salaryRouter } from "../../records/routes/Salary.routes.js";
import { workPlaceRouter } from "../../records/routes/WorkPlace.routes.js";
import { toDoRouter } from "../../todos/routes/ToDo.routes.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.use("/work-place", workPlaceRouter);
appRouter.use("/salary", salaryRouter);
appRouter.use("/balance-entry", balanceEntryRouter);
appRouter.use("/todo", toDoRouter);
appRouter.use("/note", noteRouter);
appRouter.use("/note-automations", noteAutomationRouter);

export { appRouter };

