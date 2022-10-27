<template>
	<view class="nav" :style="{'padding-top':topValue + 'px'} ">
		<text style="font-size: 35rpx;" @click="myLogout">退出登录</text>
	</view>
</template>

<script>
import { logout } from 'api/myInfo.js';
export default {
	data() {
		return {
			topValue:'',
		};
	},
	mounted() {
		let sss = uni.getSystemInfoSync().statusBarHeight;
		this.topValue = sss;
	},
	methods: {
		//退出
		myLogout: async function() {
			uni.showModal({
				confirmText: '退出',
				title: '提示',
				content: '真的要走了嘛',
				success: async res => {
					if (res.confirm) {
						let result = await logout();
						if (result.data.code === 200) {
							uni.showToast({
								icon: 'none',
								title: '你好狠的心呐~'
							});
							//清除token
							uni.removeStorageSync('token');
							//清除个人登录信息
							uni.removeStorageSync('myInfo');
							//跳转到登录页
							uni.navigateTo({
								url: '/pages/login/login'
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '哎呀哪里有问题啦'
							});
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '不走啦ヾ(✿ﾟ▽ﾟ)ノ'
						});
					}
				}
			});
		}
	}
};
</script>

<style>
.nav {
	position: sticky;
	height: 110rpx;
	width: 105%;
	top:0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 10;
	background-color: #f8f8f8;
	margin-left:-10rpx;
}
</style>
