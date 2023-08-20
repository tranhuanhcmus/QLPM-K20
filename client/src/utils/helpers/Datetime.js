export function isDateGreaterThan(dateCheck, dateTarget) {
    if (!dateCheck || !dateTarget) return false;
    const check = new Date(dateCheck);
    const target = new Date(dateTarget);

    return check > target;
}
export function calcNight(startDate, endDate) {
    if (!startDate || !endDate) return 0;

    const startDateRaw = new Date(startDate);
    const endDateRaw = new Date(endDate);

    // Tính hiệu của hai ngày
    const timeDifference = endDateRaw.getTime() - startDateRaw.getTime();

    // Chuyển đổi thành số đêm (mili giây trong một ngày)
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const night = Math.round(timeDifference / oneDayInMilliseconds);

    return night;
}