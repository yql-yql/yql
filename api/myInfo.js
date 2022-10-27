import request from '@/utils/request.js'
//登录(验证码)
export function phoneLogin(data) {
	return request({
		method: 'POST',
		url: `/login/cellphone/`,
		data: data
	})
}
//获取验证码
export function getCaptcha(data) {
	return request({
		method: 'POST',
		url: `/captcha/sent/`,
		data: data
	})
}
//验证验证码
export function verifyCaptcha(data) {
	return request({
		method: 'POST',
		url: `/captcha/verify/`,
		data: data
	})
}
//检测登录状态
export function getLoginStatus() {
	return request({
		url: `/login/status`,
	})
}
//退出登录
export function logout() {
	return request({
		url: `/logout`,
	})
}
//获取个人信息
export function getMyInfo() {
	return request({
		url: `/user/account`,
	})
}
//获取收藏的歌单
export function getMyMusicList(data) {
	return request({
		url: `/user/playlist?uid=${data}`,
	})
}
//获取用户详情
export function getUserDetail(data) {
	return request({
		url: `/user/detail?uid=${data}`,
	})
}