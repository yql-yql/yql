import baseUrl from '../api/config.js'
import store from '../store/index.js'
export default function request(obj) {
	return new Promise((resolve, reject) => {
		let method = obj.method || 'GET';
		let url = baseUrl + obj.url || "";
		let data = obj.data || {};
		let token = store.state.token || uni.getStorageSync('token') || '';
		let header = obj.header || {
			'content-type': obj.contentType || 'application/json',
			'Authorization': 'Bearer ' + token,
		}
		uni.request({
			url: url,
			data: data,
			method: method,
			header: header,
			success: (res) => {
				if (res.statusCode === 403 || res.statusCode === 401) {
					uni.showModal({
						title:'提示',
						content:'登录信息已过期，请重新登录',
						success: (res) => {
							if(res.confirm){
								//确认登录,跳转到登录页
								uni.redirectTo({
									url:'/pages/login/login'
								});
							}else{
								//取消登录，返回首页
								uni.switchTab({
									url:'/pages/tabBar/found/found'
								});
								//清除token
								uni.removeStorageSync('token');
								this.$store.commit('updateToken','');
							}
						}
					})
					url.reLaunch({
						//错误处理，重定向至登录页
						url: '/pages/login/login'
					});
				} else if (res.statusCode === 200) {
					resolve(res);
				} else {
					console.log('错误', res);
					uni.showToast({
						icon: 'none',
						title: res.data.message,
						duration: 2000
					})
				}
			},
			fail: ((err) => {
				console.log(err);
				uni.showToast({
					title: '接口请求失败',
					duration: 2000
				})
				reject(err);
			})
		})
	})
}
