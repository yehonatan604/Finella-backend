import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import ToDo from "../models/Todo.js";

export const repo = {
    ...createModelRepository(ToDo),

    async getAll(user, query) {
        const formattedQuery = {
            userId: user._id,
        };

        if (query.toDoStatus && query.toDoStatus !== "all") {
            formattedQuery.toDoStatus = query.toDoStatus;
        }

        // Handle year/month range filters
        if (query.fromYear || query.toYear || query.months) {
            const currentYear = new Date().getFullYear();
            const startYear = query.fromYear ? parseInt(query.fromYear) : currentYear;
            const endYear = query.toYear ? parseInt(query.toYear) : startYear;

            if (isNaN(startYear) || isNaN(endYear) || startYear > endYear) {
                return []; // invalid range
            }

            // Convert months to an array of numbers (1-12)
            const monthsArray = query.months
                ? (Array.isArray(query.months)
                    ? query.months.map(m => parseInt(m))
                    : query.months.split(',').map(m => parseInt(m)))
                : Array.from({ length: 12 }, (_, i) => i + 1); // default to all months

            const dateConditions = [];

            for (let year = startYear; year <= endYear; year++) {
                for (const month of monthsArray) {
                    if (month < 1 || month > 12) continue;

                    const startDate = new Date(year, month - 1, 1);
                    const endDate = new Date(year, month, 0, 23, 59, 59); // last day of month

                    dateConditions.push({
                        $or: [
                            { startDate: { $gte: startDate, $lte: endDate } },
                            { endDate: { $gte: startDate, $lte: endDate } }
                        ]
                    });
                }
            }

            if (dateConditions.length > 0) {
                formattedQuery.$or = dateConditions;
            }
        }

        return ToDo.find(formattedQuery);
    }
};