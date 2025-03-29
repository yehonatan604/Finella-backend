import { model } from "mongoose";
import { DbSchema } from "../../common/extensions/DbSchema.js";
import {
    ENUM_VALIDATION,
    NUMBER_VALIDATION,
    OBJECT_ID_VALIDATION,
    STRING_VALIDATION
} from "../../common/services/db/mongooseValidations.service.js";
import TaskStatusTypes from "../enums/TaskStatusTypes.js";

const CalendarSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    month: NUMBER_VALIDATION(true),
    year: NUMBER_VALIDATION(true),

    title: STRING_VALIDATION(false),
    description: STRING_VALIDATION(false),
    color: STRING_VALIDATION(false),

    entries: [{
        day: NUMBER_VALIDATION(true),
        dayEntries: [{
            startTime: STRING_VALIDATION(true),
            endTime: STRING_VALIDATION(false),
            title: STRING_VALIDATION(true),
            description: STRING_VALIDATION(false),
            color: STRING_VALIDATION(false),
            type: STRING_VALIDATION(false),
            entryStatus: ENUM_VALIDATION(TaskStatusTypes, false, TaskStatusTypes.PENDING),
            notes: STRING_VALIDATION(false),
        }],
        notes: STRING_VALIDATION(false),
    }],
});

const Calendar = model("Calendar", CalendarSchema);
export default Calendar;
