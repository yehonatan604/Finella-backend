import Joi from "joi";

import { REGEX_PASSWORD } from "./regex.service.js";

const JOI_EMAIL_VALIDATION = Joi.string().email({ tlds: { allow: false } }).required();

const JOI_PASSWORD_VALIDATION = Joi.string().pattern(new RegExp(REGEX_PASSWORD)).required();

const JOI_DATE_VALIDATION = Joi.date().required();

const JOI_NAME_VALIDATION = Joi.object({
    first: Joi.string().min(2).max(30).required().messages({
        "string.min": `"name.first" must be at least 2 characters long`,
        "string.max": `"name.first" must be at most 30 characters long`,
    }),
    middle: Joi.string().min(2).max(30).allow(null, "").messages({
        "string.min": `"name.middle" must be at least 2 characters long`,
        "string.max": `"name.middle" must be at most 30 characters long`,
    }),
    last: Joi.string().min(2).max(30).required().messages({
        "string.min": `"name.last" must be at least 2 characters long`,
        "string.max": `"name.last" must be at most 30 characters long`,
    }),
}).messages({
    "object.base": `name must be an object`,
});


export {
    JOI_EMAIL_VALIDATION,
    JOI_PASSWORD_VALIDATION,
    JOI_NAME_VALIDATION,
    JOI_DATE_VALIDATION
};