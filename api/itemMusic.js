import request from '@/utils/request.js'
//获取歌单详情页的数据
export function getMusicItemList(data){
  return request({
    url:`/playlist/detail?id=${data}`
  })
}

//获取歌单详情页的歌曲
export function getMusicList(data){
  return request({
    url:`/playlist/track/all?id=${data}&limit=10&offset=0`
  })
}
//获取歌曲歌词
export function getMusicLyric(data){
  return request({
    url:`/lyric?id=${data}`
  })
}