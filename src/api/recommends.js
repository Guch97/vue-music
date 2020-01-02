import jsonp from '../common/js/jsonp'
import { commonParams, options, } from './config'

export function getRecommends() {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'

    const data = Object.assign({}, commonParams {
        platform: 'yqq.json',
        hostUin: 0,
        needNewCode: 0,
    })

    return jsonp(url, data, options)
}