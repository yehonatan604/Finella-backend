import Joi from "joi";

import { JOI_DATE_VALIDATION, JOI_EMAIL_VALIDATION, JOI_NAME_VALIDATION, JOI_PASSWORD_VALIDATION } from "../../common/services/data/joiValidations.service.js";

const RegisterSchema = Joi.object({
    email: JOI_EMAIL_VALIDATION,
    password: JOI_PASSWORD_VALIDATION,
    name: JOI_NAME_VALIDATION,
    dob: JOI_DATE_VALIDATION,
});

export default RegisterSchema;