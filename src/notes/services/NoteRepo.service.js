import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import Note from "../models/Note.js";

export const repo = {
    ...createModelRepository(Note),

    async getAll(user, query) {
        if (!query) {
            return Note.find({ userId: user._id });
        }

        const formattedQuery = {};

        if (query.type) {
            formattedQuery.type = query.type;
        }

        if (query.fromYear || query.toYear || query.months) {
            const startYear = query.fromYear ? parseInt(query.fromYear) : new Date().getFullYear();
            const endYear = query.toYear ? parseInt(query.toYear) : startYear;

            // Convert months to an array of numbers (1-12)
            const monthsArray = query.months
                ? (Array.isArray(query.months)
                    ? query.months.map(m => parseInt(m))
                    : query.months.split(',').map(m => parseInt(m)))
                : Array.from({ length: 12 }, (_, i) => i + 1);

            const dateConditions = [];

            for (let year = startYear; year <= endYear; year++) {
                for (const month of monthsArray) {
                    const startDate = new Date(year, month - 1, 1); // First day of the month
                    const endDate = new Date(year, month, 0, 23, 59, 59); // Last day of the month

                    dateConditions.push({
                        date: { $gte: startDate, $lte: endDate }
                    });
                }
            }

            if (dateConditions.length > 0) {
                formattedQuery.$or = dateConditions;
            }
        }

        return Note.find(formattedQuery);
    }
};