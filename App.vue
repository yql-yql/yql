<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.setAppInfo();
		console.log(this.$store.state.topValue);
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		// 获取系统栏高度
		setAppInfo() {
			let height = uni.getSystemInfoSync().statusBarHeight;
			this.$store.commit('updateTopValue',height);
			
		}
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
@import '@/static/customicons.css';
//外部iconfont
@import '@/static/iconfont.css';
@import '@/static/iconfont-weapp-icon.css';

// 设置整个项目的背景色
page {
	width: 100%;
	height: 100%;
	background-color: #f8f8f8;
}
/* #ifndef APP-NVUE */

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
/* 解决小程序和app滚动条的问题 */
/* #ifdef MP-WEIXIN || APP-PLUS */
::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
	color: transparent;
}
/* #endif */

/* 解决H5 的问题 */
/* #ifdef H5 */
uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
	color: transparent;
}
/* #endif */
</style>
