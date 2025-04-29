import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    BOOLEAN_VALIDATION,
    DATE_VALIDATION,
    ENUM_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";
import { NoteStatusTypes } from "../enums/NoteStatusTypes.js";

const NoteSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    name: STRING_VALIDATION(true),
    content: STRING_VALIDATION(true),
    date: DATE_VALIDATION(true),

    isSticky: BOOLEAN_VALIDATION(false),

    notes: { ...STRING_VALIDATION(false, 0) },
    noteStatus: ENUM_VALIDATION(NoteStatusTypes, false, NoteStatusTypes.PENDING)
});

const Note = model("Note", NoteSchema);
export default Note;
