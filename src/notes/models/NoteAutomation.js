import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    DATE_VALIDATION,
    ENUM_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION,
} from "../../common/services/db/mongooseValidations.service.js";

const NoteAutomationSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    noteId: OBJECT_ID_VALIDATION("Note", true),
    dateTime: STRING_VALIDATION(true),
    repeat: ENUM_VALIDATION(["none", "daily", "weekly", "monthly"], false, "none"),
    lastTriggeredAt: DATE_VALIDATION(false),
    notes: STRING_VALIDATION(false, 0),
});

const NoteAutomation = model("NoteAutomation", NoteAutomationSchema);
export default NoteAutomation;
