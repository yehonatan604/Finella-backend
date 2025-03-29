import Joi from "joi";
import { JOI_EMAIL_VALIDATION, JOI_PASSWORD_VALIDATION } from "../../common/services/data/joiValidations.service.js";

const LoginSchema = Joi.object({
    email: JOI_EMAIL_VALIDATION,
    password: JOI_PASSWORD_VALIDATION
});

export default LoginSchema;