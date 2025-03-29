import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";

const NoteSchema = Joi.object({
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    name: Joi.string().required(),
    content: Joi.string().required(),
    date: Joi.date().required(),

    isSticky: Joi.boolean().required(),

    notes: Joi.string().optional(),
});

export default NoteSchema;