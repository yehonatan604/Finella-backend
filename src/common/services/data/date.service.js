export const getTodayDate = () => {
    const date = new Date();
    return date.toLocaleDateString('he-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\./g, '-');
};

export const getTodayTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('he-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};
