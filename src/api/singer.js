// import axios from 'axios'
import { commonParams, options } from './config'
import jsonp from 'common/js/jsonp'
import axios from 'axios'

// export function getSingerList() {
//   const url = '/api/getSingerList'

//   const data = Object.assign({}, commonParams, {
//     '-': 'getUCGI' + (Math.random() + '').replace('0.', ''),
//     loginUin: 0,
//     data: {
//       'comm':{ 'ct':24, 'cv':0 },
//       'singerList':{
//         'module':'Music.SingerListServer',
//         'method':'get_singer_list',
//         'param':{
//           'area':-100,
//           'sex':-100,
//           'genre':-100,
//           'index': -100,
//           'sin':0,
//           'cur_page':1
//         }
//       }
//     }
//   })

//   return axios.get(url, {
//     params: data
//   }).then((res) => {
//     console.log(res)
//     return res.data
// })
// }
//歌手列表
export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return jsonp(url, data, options)
}


//歌手列表详情

export const getSingerDetail = (singerMid) => {
    const url = '/api/getSingerDetail'

    const params = {
        ...commonParams,
        '-': 'getSingerSong29843273505889334',
        loginUin: 0,
        data: {
            'comm': {
                'ct': 24,
                'cv': 0
            },
            'singerSongList': {
                'method': 'GetSingerSongList',
                'param': {
                    'order': 1,
                    singerMid,
                    'begin': 0,
                    'num': 100
                },
                'module': 'musichall.song_list_server'
            }
        }
    };

    return axios.get(url, { params }).then(res => res.data);
};