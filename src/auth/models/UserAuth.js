import { model } from 'mongoose';
import { DbSchema } from '../../common/extensions/DbSchema.js';
import { objectFlip } from '../../common/services/data/obj.service.js';
import { ENUM_VALIDATION, OBJECT_ID_VALIDATION, STRING_VALIDATION } from "../../common/services/db/mongooseValidations.service.js";
import RoleTypes from '../enums/RoleTypes.js';

const UserAuthSchema = new DbSchema({
    userId: OBJECT_ID_VALIDATION("User", true),
    token: STRING_VALIDATION(true),
    role: {
        permission: ENUM_VALIDATION(RoleTypes, true),
        name: ENUM_VALIDATION(objectFlip(RoleTypes), true),
    }
});

const UserAuth = model("UserAuth", UserAuthSchema);
export default UserAuth;
