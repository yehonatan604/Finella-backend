import Joi from "joi";

const WorkPlaceSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).allow(null, ""),
    address: Joi.object().keys({
        street: Joi.string().required(),
        city: Joi.string().required(),
        houseNumber: Joi.string().required(),
        country: Joi.string().required(),
        zip: Joi.string().allow(null, ""),
    }).allow(null, ""),
    phone: Joi.object().keys({
        main: Joi.string().allow(null, ""),
        secondary: Joi.string().allow(null, ""),
    }).allow(null, ""),
    pricePerHour: Joi.number().allow(null, ""),
    pricePerMonth: Joi.number().allow(null, ""),
    withVat: Joi.boolean().default(false),
    startDate: Joi.string().required(),
    endDate: Joi.string().allow(null, ""),
    notes: Joi.string().allow(null, ""),
});

export default WorkPlaceSchema;