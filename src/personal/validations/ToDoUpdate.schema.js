import Joi from "joi";
import { REGEX_OBJECT_ID } from "../../common/services/data/regex.service.js";
import { commonSchemaFields } from "../../common/validations/commonSchemaFields.js";

const ToDoUpdateSchema = Joi.object({
    userId: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    name: Joi.string().required(),
    description: Joi.string().allow(""),
    startDate: Joi.date().required(),
    endDate: Joi.date().allow("").optional(),
    toDoStatus: Joi.string().optional().default("pending"),

    tasks: Joi.array().items(Joi.object({
        _id: Joi.string().pattern(REGEX_OBJECT_ID).optional().allow(""),
        name: Joi.string().required(),
        taskStatus: Joi.string().optional().default("pending"),
        priority: Joi.number().required(),
        notes: Joi.string().allow(""),
    })),

    notes: Joi.string().allow(""),

    ...commonSchemaFields,
});

export default ToDoUpdateSchema;