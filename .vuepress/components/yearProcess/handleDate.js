import did from './did'
import { formatDate } from '../../util/helper';
const arr = new Array(365).fill(null)
const start = +new Date('2019-01-01')
const alldays = Math.ceil((+new Date() - +new Date('2019-01-01'))/86400000)
const allDate = arr.map((it,i)=>{
    return {
        date:formatDate(start+86400000*i)
    }
})


export default {
    allDate,
    enSuccess:did.en.length,
    enFail:alldays-did.en.length,
    sportSuccess:did.sport.length,
    sportFail:alldays-did.sport.length
}