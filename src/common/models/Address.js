import { DbSchema } from "../extensions/DbSchema.js";
import { STRING_VALIDATION } from "../services/db/mongooseValidations.service.js";

const AddressSchema = new DbSchema({
    street: STRING_VALIDATION(true),
    houseNumber: STRING_VALIDATION(true),
    city: STRING_VALIDATION(true),
    country: STRING_VALIDATION(true),
    zip: STRING_VALIDATION(false)
});

export default AddressSchema;
