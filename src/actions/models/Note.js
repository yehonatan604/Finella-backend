import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    BOOLEAN_VALIDATION,
    DATE_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const NoteSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    name: STRING_VALIDATION(true),
    content: STRING_VALIDATION(true),
    date: DATE_VALIDATION(true),

    isSticky: BOOLEAN_VALIDATION(false),

    notes: STRING_VALIDATION(false),
});

const Note = model("Note", NoteSchema);
export default Note;
