export const createModelRepository = (model) => {
    return {
        async create(data) {
            return await model.create(data);
        },
        async update(id, data) {
            return await model.findByIdAndUpdate(id, data, { new: true });
        },
        async delete(id) {
            return await model.findByIdAndDelete(id);
        },
        async undelete(id) {
            return await model.findByIdAndUpdate(id, { status: "active" }, { new: true });
        },
        async getAll(user) {
            return await model.find({ userId: user._id });
        },
        async getById(id) {
            return await model.findById(id);
        },
    }
}