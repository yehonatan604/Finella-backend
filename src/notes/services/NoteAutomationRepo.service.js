import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import NoteAutomation from "../models/NoteAutomation.js";

export const repo = {
    ...createModelRepository(NoteAutomation),
};