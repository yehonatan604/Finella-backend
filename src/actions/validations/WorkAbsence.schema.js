import Joi from "joi";
import { REGEX_ISRAELI_DATE, REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";

const WorkAbsenceSchema = Joi.object({
    userId: Joi.string().pattern(new RegExp(REGEX_OBJECT_ID)).required(),

    workPlace: Joi.object({
        workPlaceId: Joi.string().pattern(new RegExp(REGEX_OBJECT_ID)).required(),
        price: Joi.number().optional(),
        withVat: Joi.boolean().optional(),
    }).optional().allow(null),

    type: Joi.string().valid("vacation", "sick", "other").required(),

    fromDate: Joi.string().pattern(REGEX_ISRAELI_DATE).required(),
    toDate: Joi.string().pattern(REGEX_ISRAELI_DATE).required(),
});

export default WorkAbsenceSchema;