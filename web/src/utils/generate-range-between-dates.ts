import dayjs from 'dayjs'

export function generateRangeBetweenDates () {
    const firstDayOfYr = dayjs().startOf('year')
    const today = new Date()

    const dates = []
    let compareDate = firstDayOfYr

    while(compareDate.isBefore(today)) {
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }
    return dates
}
