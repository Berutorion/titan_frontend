
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)


const dateTime =  {
    timeFormat: (time) =>{
        return dayjs(time).tz('Asia/Taipei').format()
    }

   } 

export default dateTime