import Joi from 'joi';
import { REGEX_OBJECT_ID } from '../services/data/regex.service.js';

export const commonSchemaFields = {
    _id: Joi.string().pattern(REGEX_OBJECT_ID).required(),
    __v: Joi.number().optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    serialNumber: Joi.number().optional(),
    status: Joi.string().optional(),
} 