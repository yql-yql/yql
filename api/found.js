import request from '@/utils/request.js'
//发现页面轮播图
export function getBanners(){
	return request({
		url:'/banner?type=2'
	})
}
//获取每日推荐歌单
export function getMusicList(){
	return request({
	    url: '/personalized?limit=6'
	})
}
//获取首页排行榜
export function getTopList(){
	return request({
		url:'/toplist'
	})
}
//获取热门播客
export function getDjProgram(){
	return request({
		url:'/personalized/djprogram'
	})
}
//获取歌单详情
export function getPlayList(id){
	return request({
		url:`/playlist/detail?id=${id}`
	})
}
//搜索
export function getSearchMusic(data) {
	return request({
		contentType:'application/x-www-form-urlencoded;charset=utf-8',
		url: `/cloudsearch?keywords=${data}`,
	});
}
//简略热搜列表
export function getHotDetail() {
	return request({
		url: `/search/hot`,
	});
}