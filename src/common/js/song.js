export default class Song {
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id=id
    this.mid=mid
    this.singer=singer
    this.name=name
    this.album=album
    this.duration=duration
    this.image=image
    this.url=url
  }
}

export function createSong(songInfo){
  const {id,mid,singer,name,album,interval}=songInfo
    return new Song({
      id,
      mid,
      singer:filterSinger(singer),
      name,
      album:album.name,
      duration: interval,
      image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.mid}.jpg?max_age=2592000`,
      // url: `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
      url: `http://ws.stream.qqmusic.qq.com/C100${mid}.m4a?fromtag=0&guid=126548448`  
    })
}

function filterSinger(singer){
  let ret=[]
  if(!singer){
    return ''
  }
  singer.forEach((singer)=>{
    ret.push(singer.name)
  })
    return  ret.join('/')
}
