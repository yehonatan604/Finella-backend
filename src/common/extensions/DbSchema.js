import { Schema } from 'mongoose';
import { NamedError } from '../../common/extensions/NamedError.js';
import { DATE_VALIDATION, ENUM_VALIDATION } from '../services/db/mongooseValidations.service.js';

export class DbSchema extends Schema {
    constructor(fields) {
        super({
            serialNumber: {
                type: Number,
                index: true
            },
            status: {
                ...ENUM_VALIDATION(["active", "inactive"], false, "active"),
                index: true
            },
            createdAt: {
                ...DATE_VALIDATION(false, true),
                immutable: true
            },
            updatedAt: DATE_VALIDATION(false),
            ...fields
        });

        this.setupDeleteMiddleware();
        this.setupUpdateMiddleware();
        this.setupSaveMiddleware();
    }

    setupDeleteMiddleware() {
        const softDelete = async function (next) {
            try {
                const query = this.getQuery();

                if (!query || Object.keys(query).length === 0) {
                    return next(new NamedError("Soft delete query is empty", "EmptyDeleteQuery"));
                }

                const updateMethod = this.op === "deleteMany" ? "updateMany" : "updateOne";

                await this.model[updateMethod](query, {
                    status: "inactive",
                    updatedAt: new Date()
                });

                next(new NamedError("Document deleted", "DocumentDeleted"));
            } catch (error) {
                next(error);
            }
        };

        this.pre("deleteOne", softDelete);
        this.pre("findOneAndDelete", softDelete);
        this.pre("deleteMany", softDelete);
    }

    setupUpdateMiddleware() {
        const updateTimestamp = async function (next) {
            try {
                this.model.updatedAt = new Date();
                next();
            } catch (error) {
                next(error);
            }
        };

        this.pre("findOneAndUpdate", updateTimestamp);
        this.pre("updateOne", updateTimestamp);
        this.pre("updateMany", updateTimestamp);
    }

    setupSaveMiddleware() {
        this.pre("save", async function (next) {
            try {
                this.updatedAt = new Date();
                if (!this.createdAt) this.createdAt = new Date();

                if (!this.serialNumber) {
                    const Model = this.constructor;

                    if (Model && typeof Model.findOne === 'function') {
                        const lastDoc = await Model.findOne({}, { serialNumber: 1 })
                            .sort({ serialNumber: -1 });
                        this.serialNumber = (lastDoc?.serialNumber || 0) + 1;
                    } else {
                        this.serialNumber = 1;
                    }
                }
                next();
            } catch (error) {
                next(error);
            }
        });
    }
}