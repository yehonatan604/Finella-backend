import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";

const SalarySchema = Joi.object({
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    workPlaceId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    date: Joi.string().required(),
    hours: Joi.array().items(Joi.object().keys({
        day: Joi.string().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        breakStart: Joi.string().allow("").optional(),
        breakEnd: Joi.string().allow("").optional(),
        vat: Joi.number().optional(),
        notes: Joi.string().allow("").optional(),
    })),
    notes: Joi.string().allow("").optional(),
});

export default SalarySchema;