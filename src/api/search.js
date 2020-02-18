import axios from 'axios'
import { commonParams } from './config'



//热门搜索
export function getHotKey() {
    const url = '/api/getHotKey'
    const data = commonParams
    return axios.get(url, {
        params: data
    }).then((res) => {
        return res.data
    })
}
//搜索列表
export function search(query, page, zhida, perpage) {
    const url = '/api/getHotSearch'
    const data = Object.assign({}, commonParams, {
        w: query,
        p: page,
        perpage,
        n: perpage,
        catZhida: zhida ? 1 : 0,
        zhidaqu: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        remoteplace: 'txt.mqq.all',
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return res.data
    })
}