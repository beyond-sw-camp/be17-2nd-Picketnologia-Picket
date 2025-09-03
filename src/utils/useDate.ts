export const useDate = () => {

  function curDate(): string {
    const today = new Date()

    const dateFormat: string = extractDateFormat(today)
    return dateFormat
  }

  function prevDate(curDate: string): string {
    const today: Date = getDateOfCurDate(curDate)
    const yesterday: Date = new Date(today.setDate(today.getDate() - 1))

    const dateFormat: string = extractDateFormat(yesterday)
    return dateFormat
  }

  function nextDate(curDate: string): string {
    const today: Date = getDateOfCurDate(curDate)
    const tomorrow: Date = new Date(today.setDate(today.getDate() + 1))

    const dateFormat: string = extractDateFormat(tomorrow)
    return dateFormat
  }

  function getYear(curDate: Date): number {
    return curDate.getFullYear()
  }

  function getMonth(curDate: Date): number {
    return curDate.getMonth() + 1
  }

  function getYearAndMonth(curDate: Date): string {
    const year: number = curDate.getFullYear()
    const month: number = curDate.getMonth() + 1
    return year + "년 " + month + "월"
  }

  function prevMonth(curDate: Date): string {
    curDate.setMonth(curDate.getMonth() - 1)

    return getYearAndMonth(curDate)
  }

  function nextMonth(curDate: Date): string {
    curDate.setMonth(curDate.getMonth() + 1)

    return getYearAndMonth(curDate)
  }

  function extractDateFormat(date: Date): string {
    const year: number = date.getFullYear()
    const month: string = ("0" + (date.getMonth() + 1)).slice(-2)
    const day: string = ("0" + date.getDate()).slice(-2)
  
    return year + "-" + month + "-" + day
  }

  function getDateOfCurDate(curDate: string): Date {
    const [year, month, day] = curDate.split("-").map(Number)
    const createDate: Date = new Date(year, month-1, day)

    return createDate
  }

  return {
    curDate,
    prevDate,
    nextDate,
    getDateOfCurDate,
    getYearAndMonth,
    prevMonth,
    nextMonth,
    extractDateFormat
  }
};
