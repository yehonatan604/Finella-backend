import Joi from "joi";
import { JOI_PASSWORD_VALIDATION } from "../../common/services/data/joiValidations.service.js";

const ChangePasswordSchema = Joi.object({
    password: JOI_PASSWORD_VALIDATION,
    newPassword: JOI_PASSWORD_VALIDATION
});

export default ChangePasswordSchema;