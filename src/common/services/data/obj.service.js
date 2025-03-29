export const getPropName = (obj, prop) => {
    return Object.keys(obj).find(key => obj[key] === prop);
};

export const objectFlip = (obj) => {
    const res = {};
    Object.keys(obj).forEach(key => {
        res[obj[key]] = key;
    });
    return res;
};
