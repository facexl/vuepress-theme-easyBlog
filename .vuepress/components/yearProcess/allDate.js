import moment from 'moment'
const arr = new Array(365).fill(null)
const start = +new Date('2019-01-01')
export const allDate = arr.map((it,i)=>{
    return {
        date:moment(start+86400000*i).format('YYYY-MM-DD')
    }
})