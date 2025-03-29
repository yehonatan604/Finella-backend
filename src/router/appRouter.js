import { Router } from "express";
import { balanceEntryRouter } from "../accounts/routes/BalanceEntry.routes.js";
import { salaryRouter } from "../accounts/routes/Salary.routes.js";
import { workAbsenceRouter } from "../accounts/routes/WorkAbsence.routes.js";
import { authRouter } from "../auth/routes/auth.routes.js";
import { calendarRouter } from "../personal/routes/Calendar.routes.js";
import { noteRouter } from "../personal/routes/Note.routes.js";
import { toDoRouter } from "../personal/routes/ToDo.routes.js";
import { workPlaceRouter } from "../workPlace/routes/WorkPlace.routes.js";

const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.use("/work-place", workPlaceRouter);

appRouter.use("/salary", salaryRouter);
appRouter.use("/balance-entry", balanceEntryRouter);
appRouter.use("/work-absence", workAbsenceRouter);

appRouter.use("/todo", toDoRouter);
appRouter.use("/note", noteRouter);
appRouter.use("/calendar", calendarRouter);

export { appRouter };

