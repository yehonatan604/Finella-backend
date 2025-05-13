import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    BOOLEAN_VALIDATION,
    DATE_VALIDATION,
    EMAIL_VALIDATION,
    PASSWORD_VALIDATION_R,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const UserSchema = new DbSchema({
    name: {
        first: STRING_VALIDATION(true),
        middle: STRING_VALIDATION(false),
        last: STRING_VALIDATION(true)
    },
    email: EMAIL_VALIDATION,
    dob: DATE_VALIDATION(false),
    password: PASSWORD_VALIDATION_R,
    isVerified: BOOLEAN_VALIDATION(false),
});

const User = model("User", UserSchema);
export default User;
