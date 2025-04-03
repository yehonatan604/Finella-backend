import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";

const CalendarSchema = Joi.object({
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    month: Joi.number().min(1).max(12).required(),
    year: Joi.number().min(1900).max(2200).required(),

    title: Joi.string().min(2).max(255),
    description: Joi.string().min(2).max(255),
    color: Joi.string().min(2).max(255),

    entries: Joi.array().items(Joi.object().keys({
        day: Joi.number().min(1).max(31).required(),
        dayEntries: Joi.array().items(Joi.object().keys({
            startTime: Joi.string().required(),
            endTime: Joi.string(),
            title: Joi.string().min(2).max(255).required(),
            description: Joi.string().min(2).max(255),
            color: Joi.string().min(2).max(255),
            type: Joi.string().min(2).max(255),
            entryStatus: Joi.string().min(2).max(255),
            notes: Joi.string().min(2).max(255),
        })),
        notes: Joi.string().min(2).max(255),
    })),
});

export default CalendarSchema;