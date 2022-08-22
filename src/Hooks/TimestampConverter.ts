export const convertTimestamp = (timestamp: number) => {
    const now = new Date().getTime();
    const secondsAgo = now - timestamp
    const minutesAgo = Math.floor(secondsAgo / 60)
    const hoursAgo = Math.floor(minutesAgo / 60)
    const daysAgo = Math.floor(hoursAgo / 24)
    const weeksAgo = Math.floor(daysAgo / 7)
    const monthsAgo = Math.floor(weeksAgo / 4.35)
    const yearsAgo = Math.floor(monthsAgo / 12)
    if (secondsAgo < 0) {
        return '0 second ago'
    } else if (secondsAgo < 60) {
        return `${Math.floor(secondsAgo)} seconds ago`
    } else if (minutesAgo < 60) {
        return `${minutesAgo} ${minutesAgo === 1 ? 'minute' : 'minutes'} ago`
    } else if (hoursAgo < 24) {
        return `${hoursAgo} ${hoursAgo === 1 ? 'hour' : 'hours'} ago`
    } else if (daysAgo < 7) {
        return `${daysAgo} ${daysAgo === 1 ? 'day' : 'days'} ago`
    } else if (weeksAgo < 4.35) {
        return `${weeksAgo} ${weeksAgo === 1 ? 'week' : 'weeks'} ago`
    } else if (monthsAgo < 12) {
        return `${monthsAgo} ${monthsAgo === 1 ? 'month' : 'months'} ago`
    } else {
        return `${yearsAgo} ${yearsAgo === 1 ? 'year' : 'years'} ago`
    }
}

export const convertDateStringToDate = (dateString: string) => {
    const timestamp = new Date(dateString).getTime()
    return convertTimestampToDateAndTime(timestamp)
}

export const convertDateStringToTimesAgo = (dateString: string) => {
    const timestamp = new Date(dateString).getTime()
    return convertTimestamp(timestamp)
}

export const convertTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toUTCString()
}

export const convertTimestampToDateAndTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    return `${year}-${month >= 10 ? month : '0' + month}-${day < 10 ? '0' + day : day}, ${time}`
}

export const convertDateStringToYearMonthDay = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}