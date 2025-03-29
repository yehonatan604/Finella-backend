import Joi from "joi";

import { JOI_DATE_VALIDATION, JOI_NAME_VALIDATION } from "../../common/services/data/joiValidations.service.js";

const UpdateSchema = Joi.object({
    name: JOI_NAME_VALIDATION,
    dob: JOI_DATE_VALIDATION
});

export default UpdateSchema;