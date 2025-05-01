import Joi from 'joi';
import { REGEX_OBJECT_ID } from '../services/data/regex.service.js';

export const commonSchemaFields = {
    _id: Joi.string().pattern(REGEX_OBJECT_ID).optional().allow(null, ""),
    __v: Joi.number().optional().allow(null, ""),
    createdAt: Joi.date().optional().allow(null, ""),
    updatedAt: Joi.date().optional().allow(null, ""),
    serialNumber: Joi.number().optional().allow(null, ""),
    status: Joi.string().optional().allow(null, ""),
} 