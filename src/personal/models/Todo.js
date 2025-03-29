import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    DATE_VALIDATION,
    ENUM_VALIDATION,
    NUMBER_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";
import TaskStatusTypes from "../enums/TaskStatusTypes.js";

const ToDoSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    name: STRING_VALIDATION(true),
    description: STRING_VALIDATION(false),
    startDate: DATE_VALIDATION(true),
    endDate: DATE_VALIDATION(false),
    toDoStatus: ENUM_VALIDATION(TaskStatusTypes, false, TaskStatusTypes.PENDING),

    tasks: [{
        name: STRING_VALIDATION(true),
        taskStatus: ENUM_VALIDATION(TaskStatusTypes, false, TaskStatusTypes.PENDING),
        priority: NUMBER_VALIDATION(true),
        notes: STRING_VALIDATION(false),
    }],

    notes: STRING_VALIDATION(false),
});

const ToDo = model("ToDo", ToDoSchema);
export default ToDo;
