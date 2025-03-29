import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import AddressSchema from "../../common/models/Address.js";
import PhoneSchema from "../../common/models/Phone.js";
import {
    BOOLEAN_VALIDATION,
    DATE_VALIDATION,
    EMAIL_VALIDATION,
    OBJECT_ID_VALIDATION,
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
    address: {
        type: AddressSchema,
        required: false
    },
    phone: {
        type: PhoneSchema,
        required: false
    },
    dob: DATE_VALIDATION(false),
    password: PASSWORD_VALIDATION_R,
    isVerified: BOOLEAN_VALIDATION(false),
    workPlaces: [OBJECT_ID_VALIDATION("WorkPlace", false)]
});

const User = model("User", UserSchema);
export default User;
