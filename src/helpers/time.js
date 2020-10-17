const secund = 1000;
const minute = secund * 60;
const hour = minute * 60;

const calcSecToMs = secs => secs * secund;
const calcMinsToMs = mins => mins * minute;
const clacHoursToMs = hours => hours * hour;

const delay = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

module.exports = { calcSecToMs, calcMinsToMs, clacHoursToMs, delay };