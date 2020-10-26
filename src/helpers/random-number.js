const randNumberFromZeroTo = max => {
    return Math.floor(Math.random() * (max - 0 + 1)) + 0;
};

module.exports = { randNumberFromZeroTo };