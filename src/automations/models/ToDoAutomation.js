import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    DATE_VALIDATION,
    ENUM_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";

const ToDoAutomationSchema = new DbSchema({
    onAdd: ENUM_VALIDATION(["none", "note", "report"], false, "none"),
    onComplete: ENUM_VALIDATION(["none", "note", "report"], false, "none"),
    onDelete: ENUM_VALIDATION(["none", "note"], false, "none"),
    onEdit: ENUM_VALIDATION(["none", "note", "report"], false, "none"),
    autoReport: ENUM_VALIDATION(["none", "weekly", "monthly", "byDate"], false, "none"),
    autoReportDate: DATE_VALIDATION(false),
    repeatNote: ENUM_VALIDATION(["none", "daily", "weekly", "monthly"], false, "none"),
    notes: STRING_VALIDATION(false, 0),
});

const ToDoAutomation = model("TodoAutomation", ToDoAutomationSchema);
export default ToDoAutomation;
