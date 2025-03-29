import { DbSchema } from "../extensions/DbSchema.js";
import { STRING_VALIDATION } from "../services/db/mongooseValidations.service.js";

const PhoneSchema = new DbSchema({
    main: STRING_VALIDATION(false),
    secondary: STRING_VALIDATION(false),
});

export default PhoneSchema;
