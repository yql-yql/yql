<template>
	<view class="login">
		<view class="top">
			<view class="top-left">
				<view class="title">{{ title }}</view>
				<view class="subTitle">{{ subTitle }}</view>
			</view>
			<view class="top-right" v-show="isSend">
				<view :class="className" @click="sendCaptcha">{{ count }}{{ message }}</view>
			</view>
		</view>
		<uni-forms :modelValue="form"  class="loginForm">
			<uni-forms-item name="phone" class="phone" v-if="!isSend" placeholder="请输入手机号">
				<uni-easyinput prefixIcon="person" type="number" v-model="form.phone" />
			</uni-forms-item>
			<uni-forms-item name="captcha" class="captcha" v-else><one-input v-model="form.captcha" type="bottom"></one-input></uni-forms-item>
		</uni-forms>
		<view class="footer">
			<button type="warn" class="myButton" @click="sendCaptcha" v-if="!isSend">下一步</button>
			<button type="warn" class="myButton" @click="login" v-else>登录</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import oneInput from '@/components/common/myp-one/myp-one.vue';
import { getCaptcha, verifyCaptcha, phoneLogin,getUserDetail,getMyMusicList } from '@/api/myInfo.js';
export default {
	data() {
		return {
			form: {
				phone: '', //手机号
				captcha: '' //验证码
			},
			title: '登录体验更多精彩',
			subTitle: '新用户将自动注册',
			isSend: false, //是否发送了验证码
			className: 'clickable', //当前状态可点击
			count: '',
			message: '',
			timer: null,
			reg: /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/
		};
	},
	components: {
		oneInput
	},
	computed: {
		...mapState(['token','myInfo'])
	},
	methods: {
		...mapMutations(['updateIsLogin', 'updateToken','updateMyInfo','updateMyMusicList']),
		//发送验证码
		sendCaptcha: async function() {
			if (this.form.phone === '' || this.form.phone === undefined) {
				uni.showToast({
					title: '请输入手机号码',
					duration: 2000,
					icon: 'none'
				});
			} else if (!this.reg.test(this.form.phone)) {
				// 核对手机号格式
				uni.showToast({
					title: '请输入正确的手机号码',
					duration: 2000,
					icon: 'none'
				});
			} else {
				console.log('?', this.form);
				let res = await getCaptcha({
					phone: this.form.phone
				});
				if (res.data.code == 200) {
					//若验证码成功发送
					// 修改样式
					this.className = 'unclickable'; //不可点击状态
					this.message = 's后重发';
					this.title = "请输入验证码";
					this.subTitle = "已发送至+86 "+ this.form.phone; 
					this.isSend = true; 
					const TOTAL_TIME = 60;
					if (!this.timer) {
						this.count = TOTAL_TIME;
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TOTAL_TIME) {
								this.count--;
							} else {
								clearInterval(this.timer); //清除定时器
								this.count = '';
								this.className = 'clickable';
								this.message = '重新发送';
								this.timer = null;
							}
						}, 1000);
					}
				}else{
					uni.showToast({
						icon:'error',
						title:res.data.message,
						duration:2000
					})
				}
			}
		},
		//根据id获取用户详情和歌单
		getUserDetail:async function(id){
			let res = await getUserDetail(id);
			console.log('详情',res);
			let data = res.data;
			let info = {
				id:data.profile.userId,
				name:data.profile.nickname,
				follow:data.profile.follows,
				fans:data.profile.followeds,
				src:data.profile.avatarUrl,
				level:data.level
			};
			let result = await getMyMusicList(id);
			this.updateMyMusicList(result.data.playlist);
			this.updateMyInfo(info);
			console.log('我的信息',this.myInfo);
			//存储到本地
			uni.setStorageSync('myInfo',JSON.stringify(info));
		},
		
		//验证验证码后登录
		login: async function() {
			let res = await verifyCaptcha({
				phone: this.form.phone,
				captcha: this.form.captcha
			});
			console.log('验证', res);
			if (res.data.data) {
				let result = await phoneLogin({
					phone: this.form.phone,
					captcha: this.form.captcha
				});
				console.log('登录结果', result);
				if (result.data.code === 200) {
					
					//存储token
					this.updateToken(result.data.token);
					uni.setStorageSync('token', result.data.token);
					//获取个人信息
					this.getUserDetail(result.data.account.id);
					uni.setStorageSync('account',JSON.stringify(res.data.account));
					uni.setStorageSync('profile',JSON.stringify(res.data.profile));
					//页面跳转
					uni.switchTab({
						url:'/pages/tabBar/found/found',
						success() {
							//登录成功
							uni.showToast({
								title: '登录成功',
								duration: 2000
							});
						},
						fail:function(e){
							console.log(e);
						}
					})
				} else {
					uni.showToast({
						icon:'error',
						title:result.data.message,
						duration:2000
					})
				}
			} else {
				uni.showToast({
					title: '手机或验证码输入有误',
					duration: 2000,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style lang="scss">
.clickable {
	font-family: SourceHanSansCN-Normal;
	font-size: 32rpx;
	color: #00557f;
	letter-spacing: 0;
	text-align: center;
}

.unclickable {
	font-family: SourceHanSansCN-Normal;
	font-size: normal;
	color: #b5bbc4;
	letter-spacing: 0;
	text-align: center;
}
.top {
	width: 600rpx;
	position: absolute;
	left:50rpx;
	top:200rpx;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	.top-left{
		.title {
			font-size: 45rpx;
			padding-bottom: 20rpx;
		}
		.subTitle{
			color: #a6abb3;
		}
	}
	.top-right{
		
	}
}

.myButton {
	position: absolute;
	top: 500rpx;
	width: 600rpx;
	border-radius: 50rpx;
	left: 75rpx;
}
.uni-forms {
	width: 650rpx;
	margin: auto;
	padding: 360rpx 0;
	height: 10rpx;
	// .uni-forms-item {
	// 	display: flex;
	// 	flex-direction: column;
	// 	height: 300rpx;
	// 	justify-content: space-between;
	// }
}
</style>
