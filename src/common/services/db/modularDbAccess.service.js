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
        async getAll() {
            return await model.find();
        },
        async getById(id) {
            return await model.findById(id);
        },
    }
}