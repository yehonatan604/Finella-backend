import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import BalanceEntry from "../models/BalanceEntry.js";

export const repo = {
    ...createModelRepository(BalanceEntry),

    async getAll(user, query) {
        const formattedQuery = {
            userId: user._id,
        };
        if (query.type) {
            formattedQuery.type = query.type;
        }

        if (query.fromYear || query.toYear || query.months) {
            const startYear = query.fromYear ? parseInt(query.fromYear) : new Date().getFullYear();
            const endYear = query.toYear ? parseInt(query.toYear) : startYear;

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

        return BalanceEntry.find(formattedQuery);
    },

    getById: async () => {
        throw new Error("Not implemented");
    },
};