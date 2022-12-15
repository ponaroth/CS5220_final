const getYearMonthDay = () => {
    const date = new Date();

    const year = date.getUTCFullYear();

    const utcMonth = date.getUTCMonth() + 1; // returns months 0 to 11 so we add + 1
    const month = utcMonth < 10 ? '0' + utcMonth : utcMonth;

    const day = date.getUTCDate();

    return `${year}-${month}-${day}`;
};

module.exports = {
    getYearMonthDay,
};
