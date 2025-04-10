import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const noteAutomationSchemaFields = {
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),

    isSticky: Joi.boolean().required(),

    notes: Joi.string().optional(),
};

const NoteAutomationSchema = Joi.object({
    ...noteAutomationSchemaFields,
});

const NoteAutomationUpdateSchema = Joi.object({
    ...commonSchemaFields,
    ...noteAutomationSchemaFields,
});

export { NoteAutomationUpdateSchema };
export default NoteAutomationSchema;