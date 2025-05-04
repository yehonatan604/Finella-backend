import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const salarySchemaFields = {
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    workPlaceId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    date: Joi.string().required(),
    hours: Joi.array().items(Joi.object().keys({
        day: Joi.string().required(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        notes: Joi.string().allow("").optional(),
    })),
    notes: Joi.string().allow("").optional(),
};

const SalarySchema = Joi.object({
    ...salarySchemaFields,
});

const SalaryUpdateSchema = Joi.object({
    ...commonSchemaFields,
    ...salarySchemaFields,
});

export { SalaryUpdateSchema };
export default SalarySchema;