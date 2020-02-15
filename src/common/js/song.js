import { getLyric, getSongsUrl } from 'api/song'
import { ERR_OK } from 'api/config'
import { Base64 } from 'js-base64'
export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
            this.id = id
            this.mid = mid
            this.singer = singer
            this.name = name
            this.album = album
            this.duration = duration
            this.image = image
            this.filename = `C400${this.mid}.m4a`
            this.url = url
        }
        //获取歌词
    getSongLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    //返回数据的是 base64 的字符串，需要解码，这里用到了第三方库: js-base64
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}
//singer 页歌曲
export function createSong(musicData) {
    const { id, mid, singer, name, album, interval } = musicData
    return new Song({
        id,
        mid,
        singer: filterSinger(singer),
        name,
        album: name,
        duration: interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.mid}.jpg?max_age=2592000`,
        url: musicData.url
            // url: `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
            // http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=7347620869&vkey=${vkey}&uin=0&fromtag=66
            // url: `http://ws.stream.qqmusic.qq.com/C100${mid}.m4a?fromtag=0&guid=126548448`
    })
}
//推荐页歌曲
export function creatRecommendeSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: musicData.url
    })
}

function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((singer) => {
        ret.push(singer.name)
    })
    return ret.join('/')
}

export function isValidMusic(musicData) {
    if (musicData.id) {
        return musicData.id && musicData.album.mid && (!musicData.pay || musicData.pay.price_album === 0)
    } else {
        return musicData.albumid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
    }

}

// export function isValidRecommendMusic(musicData) {
//     return musicData.albumid && musicData.albummid && (!musicData.pay || musicData.pay.payalbumprice === 0)
// }


//获取歌手url
export function processSongsUrl(songs) {
    console.log('songs', songs)
    if (!songs.length) {
        return Promise.resolve(songs)
    }
    return getSongsUrl(songs).then((purlMap) => {
        songs = songs.filter((song) => {

            const purl = purlMap[song.mid]
            if (purl) {
                song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl
                return true
            }
            return false
        })
        return songs
    })
}