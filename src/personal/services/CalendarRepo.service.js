import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import Calendar from "../models/Calendar.js";

export const repo = {
    ...createModelRepository(Calendar)
};