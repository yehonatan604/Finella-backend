import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import Note from "../models/Note.js";

export const repo = {
    ...createModelRepository(Note)
};