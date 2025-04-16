import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const noteAutomationSchemaFields = {
    noteId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    dateTime: Joi.string().required(),
    repeat: Joi.string().valid("none", "daily", "weekly", "monthly").default("none"),
    lastTriggeredAt: Joi.date().optional().allow(null),
    notes: Joi.string().optional().allow("", null),
};

const NoteAutomationSchema = Joi.object({
    ...noteAutomationSchemaFields,
    status: Joi.string().valid("active", "inactive").default("active"),
});

const NoteAutomationUpdateSchema = Joi.object({
    ...commonSchemaFields,
    ...noteAutomationSchemaFields,
});

export { NoteAutomationUpdateSchema };
export default NoteAutomationSchema;