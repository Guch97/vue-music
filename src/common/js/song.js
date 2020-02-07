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
    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(musicData) {
    const { id, mid, singer, name, album, interval, url } = musicData
    return new Song({
        id,
        mid,
        singer: filterSinger(singer),
        name,
        album: name,
        duration: interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.mid}.jpg?max_age=2592000`,
        url
        // url: `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
        // http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=7347620869&vkey=${vkey}&uin=0&fromtag=66
        // url: `http://ws.stream.qqmusic.qq.com/C100${mid}.m4a?fromtag=0&guid=126548448`
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
    console.log(musicData)
        // return musicData.id && musicData.albummid.mid && (!musicData.pay || musicData.pay.payalbumprice === 0)
}


//获取歌手url
export function processSongsUrl(songs) {
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