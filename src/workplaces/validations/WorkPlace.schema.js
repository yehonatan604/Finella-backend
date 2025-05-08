import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const workplaceSchemaFields = {
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).allow(null, ""),
    address: Joi.object().keys({
        ...commonSchemaFields,
        street: Joi.string().required(),
        city: Joi.string().required(),
        houseNumber: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string().allow(null, ""),
    }).allow(null, ""),
    phone: Joi.object().keys({
        ...commonSchemaFields,
        main: Joi.string().allow(null, ""),
        secondary: Joi.string().allow(null, ""),
    }).allow(null, ""),
    pricePerHour: Joi.number().allow(null, ""),
    pricePerMonth: Joi.number().allow(null, ""),
    startDate: Joi.string().required(),
    endDate: Joi.string().allow(null, ""),
    notes: Joi.string().allow(null, ""),
};

const WorkPlaceSchema = Joi.object({
    ...workplaceSchemaFields,
});

const WorkPlaceUpdateSchema = Joi.object({
    ...commonSchemaFields,
    ...workplaceSchemaFields,
});

export { WorkPlaceUpdateSchema };
export default WorkPlaceSchema;