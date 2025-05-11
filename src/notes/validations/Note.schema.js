import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";
import { NoteStatusTypes } from "../enums/NoteStatusTypes.js";

const notesSchemaFields = {
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),
    noteStatus: Joi.string().valid(...Object.values(NoteStatusTypes)).allow("", null).optional(),

    isSticky: Joi.boolean().required(),

    notes: Joi.string().optional().allow("", null),
};

const NoteSchema = Joi.object({
    ...notesSchemaFields,
});

const NoteUpdateSchema = Joi.object({
    ...commonSchemaFields,
    ...notesSchemaFields,
});

export { NoteUpdateSchema };
export default NoteSchema;