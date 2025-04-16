import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import Salary from "../models/Salary.js";

export const repo = {
    ...createModelRepository(Salary),

    async create(data) {
        try {
            const existingSalary = await Salary.findOne({
                userId: data.userId,
                workPlaceId: data.workPlaceId,
                date: data.date
            });

            if (existingSalary) {
                for (const hour of data.hours) {
                    await Salary.updateOne(
                        { _id: existingSalary._id },
                        { $pull: { hours: { day: hour.day } } }
                    );

                    await Salary.updateOne(
                        { _id: existingSalary._id },
                        { $push: { hours: hour } }
                    );
                }

                return await Salary.findById(existingSalary._id);
            } else {
                return await Salary.create({
                    userId: data.userId,
                    workPlaceId: data.workPlaceId,
                    date: data.date,
                    hours: data.hours,
                    notes: data.notes || "",
                    status: "active"
                });
            }
        } catch (error) {
            console.error("Error in create function:", error);
            throw error;
        }
    },

    async getAll(user, query) {
        const formattedQuery = {
            userId: user._id,
        };

        if (query.workplaceIds) {
            formattedQuery.workPlaceId = {
                $in: Array.isArray(query.workplaceIds)
                    ? query.workplaceIds
                    : query.workplaceIds.split(',')
            };
        }

        if (query.fromYear || query.toYear || query.months) {
            const startYear = query.fromYear ? parseInt(query.fromYear) : new Date().getFullYear();
            const endYear = query.toYear ? parseInt(query.toYear) : startYear;

            const monthsArray = query.months
                ? (Array.isArray(query.months)
                    ? query.months.map(m => parseInt(m))
                    : query.months.split(',').map(m => parseInt(m)))
                : Array.from({ length: 12 }, (_, i) => i + 1);

            const datesToMatch = [];

            for (let year = startYear; year <= endYear; year++) {
                for (const month of monthsArray) {
                    datesToMatch.push(`${month}-${year}`);
                }
            }

            if (datesToMatch.length > 0) {
                formattedQuery.date = { $in: datesToMatch };
            }
        }

        return Salary.find(formattedQuery)
    }
};
