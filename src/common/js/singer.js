export default class Singer {
  constructor({id, name,singer_mid}) {
    this.id = id
    this.name = name
    this.singer_mid=singer_mid
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer_mid}.webp`
  }
}