const createFullDate = () => {
    const date = new Date();

    return `${date.toDateString()} / ${date.toLocaleTimeString()}`;
};

module.exports = { createFullDate };