import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    BOOLEAN_VALIDATION,
    ENUM_VALIDATION,
    NUMBER_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const WorkAbsenceSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    workPlace: {
        type: {
            workPlaceId: OBJECT_ID_VALIDATION("WorkPlace", true),
            price: NUMBER_VALIDATION(false),
            withVat: BOOLEAN_VALIDATION(false),
        },
        required: false
    },
    type: ENUM_VALIDATION(["vacation", "sick", "other"], true),

    fromDate: STRING_VALIDATION(true),
    toDate: STRING_VALIDATION(true),

    notes: STRING_VALIDATION(false),
});

const WorkAbsence = model("WorkAbsence", WorkAbsenceSchema);
export default WorkAbsence;
