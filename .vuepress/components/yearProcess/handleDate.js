import moment from 'moment'
import did from './did'
const arr = new Array(365).fill(null)
const start = +new Date('2019-01-01')
const alldays = Math.ceil((+new Date() - +new Date('2019-01-01'))/86400000)
const allDate = arr.map((it,i)=>{
    return {
        date:moment(start+86400000*i).format('YYYY-MM-DD')
    }
})



export default {
    allDate,
    enSuccess:did.en.length,
    enFail:alldays-did.en.length,
    sportSuccess:did.sport.length,
    sportFail:alldays-did.sport.length
}