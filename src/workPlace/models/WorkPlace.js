import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import AddressSchema from "../../common/models/Address.js";
import PhoneSchema from "../../common/models/Phone.js";
import {
    EMAIL_VALIDATION,
    NUMBER_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const WorkPlaceSchema = new DbSchema({
    name: STRING_VALIDATION(true),
    email: { ...EMAIL_VALIDATION, required: false, unique: false },
    address: {
        type: AddressSchema,
        required: false
    },
    phone: {
        type: PhoneSchema,
        required: false
    },

    pricePerHour: NUMBER_VALIDATION(false),
    pricePerMonth: NUMBER_VALIDATION(false),
    withVat: { type: Boolean, default: false },

    startDate: STRING_VALIDATION(true),
    endDate: STRING_VALIDATION(false),

    notes: STRING_VALIDATION(false)
});

const WorkPlace = model("WorkPlace", WorkPlaceSchema);
export default WorkPlace;
