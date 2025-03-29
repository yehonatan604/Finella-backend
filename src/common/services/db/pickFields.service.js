export const pickFileds = (model) => {
    const fieldsToPick = {
        user: [
            "_id",
            "name",
            "email",
            "dob",
            "address",
            "phone",
            "workPlaces",
            "isVerified",
        ],
    };

    return fieldsToPick[model];
};