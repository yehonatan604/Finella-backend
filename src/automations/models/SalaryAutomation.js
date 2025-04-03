import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    ENUM_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const SalaryAutomationSchema = new DbSchema({
    onAdd: ENUM_VALIDATION(["note", "report", "createIncome"], true),
    autoReport: ENUM_VALIDATION(["none", "quarterly", "halfYearly", "yearly", "byDate"], false, "none"),
    notes: STRING_VALIDATION(false, 0),
});

const SalaryAutomation = model("SalaryAutomation", SalaryAutomationSchema);
export default SalaryAutomation;
