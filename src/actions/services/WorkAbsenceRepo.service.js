import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import WorkAbsence from "../models/WorkAbsence.js";

export const repo = {
    ...createModelRepository(WorkAbsence)
};