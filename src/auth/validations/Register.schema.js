import Joi from "joi";

import { JOI_EMAIL_VALIDATION, JOI_NAME_VALIDATION, JOI_PASSWORD_VALIDATION } from "../../common/services/data/joiValidations.service.js";

const RegisterSchema = Joi.object({
    email: JOI_EMAIL_VALIDATION,
    password: JOI_PASSWORD_VALIDATION,
    name: JOI_NAME_VALIDATION,
    dob: Joi.date().optional().allow(null, "").messages({
        "date.base": `"dob" must be a valid date`,
    }),
});

export default RegisterSchema;