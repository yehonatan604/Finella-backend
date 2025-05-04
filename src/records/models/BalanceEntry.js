import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    DATE_VALIDATION,
    ENUM_VALIDATION,
    NUMBER_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const BalanceEntrySchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    name: STRING_VALIDATION(true),
    date: DATE_VALIDATION(true),
    type: ENUM_VALIDATION(["expense", "income"], true),

    price: NUMBER_VALIDATION(true),

    notes: STRING_VALIDATION(false, 0),
});

const BalanceEntry = model("BalanceEntry", BalanceEntrySchema);
export default BalanceEntry;
