import Joi from "joi";

import { JOI_DATE_VALIDATION, JOI_EMAIL_VALIDATION, JOI_NAME_VALIDATION } from "../../common/services/data/joiValidations.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const UpdateSchema = Joi.object({
    ...commonSchemaFields,
    name: JOI_NAME_VALIDATION,
    dob: JOI_DATE_VALIDATION,
    email: JOI_EMAIL_VALIDATION,
});

export default UpdateSchema;