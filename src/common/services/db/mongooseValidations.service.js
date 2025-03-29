import { Types } from "mongoose";
import { REGEX_EMAIL, REGEX_HASHED_PASSWORD, REGEX_URL } from "../data/regex.service.js";

const STRING_VALIDATION = (isRequired, minLength = 2, maxLength = 256) => ({
    type: String,
    minlength: minLength,
    maxlength: maxLength,
    required: isRequired,
});

const ENUM_VALIDATION = (someEnum, isRequired, defaultValue = false) => (
    !defaultValue ? {
        type: String,
        enum: Object.values(someEnum),
        required: isRequired,
    } : {
        type: String,
        enum: Object.values(someEnum),
        required: isRequired,
        default: defaultValue,
    }
);

const OBJECT_ID_VALIDATION = (ref, isRequired) => ({
    type: Types.ObjectId,
    required: isRequired,
    ref,
});

const NUMBER_VALIDATION = (isRequired, min = 0, max = 1000000) => ({
    type: Number,
    required: isRequired,
    min,
    max,
});

const BOOLEAN_VALIDATION = (isRequired, defaultValue = false) => ({
    type: Boolean,
    required: isRequired,
    default: defaultValue,
});

const DATE_VALIDATION = (isRequired, defaultNow) => (
    defaultNow ? {
        type: Date,
        required: isRequired,
        default: Date.now(),
    } : {
        type: Date,
        required: isRequired,
    }
);

const URL_VALIDATION_NR = {
    type: String,
    match: [REGEX_URL, "Invalid URL format"],
    trim: true,
    lowercase: true,
};

const EMAIL_VALIDATION = {
    type: String,
    required: true,
    trim: true,
    match: [REGEX_EMAIL, "Invalid email format"],
    unique: true,
};

const PASSWORD_VALIDATION_R = {
    type: String,
    required: true,
    match: [REGEX_HASHED_PASSWORD, "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"],
};

export {
    BOOLEAN_VALIDATION,
    DATE_VALIDATION, EMAIL_VALIDATION, ENUM_VALIDATION, NUMBER_VALIDATION, OBJECT_ID_VALIDATION, PASSWORD_VALIDATION_R, STRING_VALIDATION, URL_VALIDATION_NR
};

