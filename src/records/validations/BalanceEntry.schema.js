import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const balanceEntrySchemaFields = {
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    name: Joi.string().required(),
    date: Joi.date().required(),
    type: Joi.string().valid("expense", "income").required(),

    price: Joi.number().required(),
    withVat: Joi.boolean().optional().default(false),
    isPayed: Joi.boolean().optional().default(false),

    notes: Joi.string().optional().allow("", null),
};

const BalanceEntrySchema = Joi.object({
    ...balanceEntrySchemaFields,
});

const BalanceEntryUpdateSchema = Joi.object({
    ...commonSchemaFields,
    ...balanceEntrySchemaFields,
});

export { BalanceEntryUpdateSchema };
export default BalanceEntrySchema;