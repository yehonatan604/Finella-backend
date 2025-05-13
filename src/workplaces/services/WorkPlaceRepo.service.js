import User from "../../auth/models/User.js";
import { createModelRepository } from "../../common/services/db/modularDbAccess.service.js";
import WorkPlace from "../models/WorkPlace.js";

export const repo = {
    ...createModelRepository(WorkPlace),

    async create(workPlace, userId) {
        try {
            const newWorkPlace = new WorkPlace(workPlace);
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            // Save the workplace first
            await newWorkPlace.save();

            // // Update and save the user
            // user.workPlaces.push(newWorkPlace._id);
            // await user.save();

            return newWorkPlace;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    },
};