import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const SalarySchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    workPlaceId: OBJECT_ID_VALIDATION("WorkPlace", true),
    date: STRING_VALIDATION(true),
    hours: [{
        day: STRING_VALIDATION(true),
        startTime: STRING_VALIDATION(true),
        endTime: STRING_VALIDATION(true),
        notes: STRING_VALIDATION(false, 0),
    }],
    notes: STRING_VALIDATION(false, 0),
});

const Salary = model("Salary", SalarySchema);
export default Salary;
