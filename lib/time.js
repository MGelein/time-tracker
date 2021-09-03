const timeToFloat = (time) => {
    const timeParts = time.split(':');
    const [hours, minutes] = timeParts.map(part => parseInt(part));
    if (hours < 0 || hours > 24 || minutes < 0 || minutes > 60) showErrorAndAbort(`Illegal time: ${time}`);
    const partOfHour = minutes / 60;
    return hours + partOfHour;
}

const nearestQuarter = () => {
    const now = new Date();
    const hours = now.getHours()
    const minutes = (Math.round(now.getMinutes() / 15 + 0.17) * 15)
    const hoursString = (minutes === 60 ? hours + 1 : hours).toString().padStart(2, '0');
    const minutesString = (minutes === 60 ? 0 : minutes).toString().padStart(2, '0');
    return `${hoursString}:${minutesString}`
}

const getTimeDifference = (timeStringA, timeStringB) => {
    return timeToFloat(timeStringB) - timeToFloat(timeStringA);
}

module.exports = { nearestQuarter, getTimeDifference, timeToFloat }