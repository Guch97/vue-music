import { getSongsUrl } from 'api/song';

class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
}

const formatSinger = (singers) => {
  if(!singers) {
    return '';
  }
  return singers.map(singer => singer.name).join('/');
};

export const createSong = (songInfo) => {
  const { id, mid, singer, name, album, interval } = songInfo;
  return new Song({
    id,
    mid,
    singer: formatSinger(singer),
    name,
    album: album.name,
    duration: interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.mid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`
  });
};

export const isValidMusic = ({ mid, album, pay}) => {
  return mid && album.mid && pay && pay.price_album === 0;
};

export const processSongsUrl = (songs) => {
  return getSongsUrl(songs).then(purlMap => {
    return songs.filter(song => {
      const purl = purlMap[song.mid];
      if(purl) {
        song.url = purl.indexOf('http') === -1 ? `http://dl.stream.qqmusic.qq.com/${purl}` : purl;
        return true;
      }
      return false;
    });
  });
};
