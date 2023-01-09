
import calendar from "./2023.json"
import dayjs from "dayjs"
import mapStore from "../store"

export default () => {
    const now = dayjs(mapStore.testData.day)
    let start = 0
    let end = calendar.length
    let middle = Math.floor((end+start)/2)
    while(end >= start){       
        if(now.isSame(dayjs(calendar[middle].date),'day'))return calendar[middle].isHoliday
        if(now.isAfter(dayjs(calendar[middle].date),'day')){
            start = middle+1
        }else if(now.isBefore(dayjs(calendar[middle].date),'day')){
            end = middle-1
        }
        middle = Math.floor((end+start)/2)
    }
    return false
}