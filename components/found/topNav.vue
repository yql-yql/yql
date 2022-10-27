<template>
	<view class="top-nav" :style="{'padding-top':topValue + 'px'}">
		<uni-icons type="mic-filled" size="30" color="#ffffff"></uni-icons>
		<!-- <uni-icons type="bars" size="30" color="#ffffff"></uni-icons> -->
		<uni-search-bar class="searchBox"  placeholder="落日飞车" bgColor="#EEEEEE" cancelButton="none" @focus="searchPage" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			topValue:''
		};
	},
	mounted() {
		this.topValue = uni.getSystemInfoSync().statusBarHeight;
	},
	methods: {
		searchPage: function() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		}
	}
};
</script>

<style>
.top-nav {
	position: fixed;
	height: 100rpx;
	width: 100%;
	margin-top: -10rpx;
	top:0;
	display: flex;
	align-items: center;
	z-index: 10;
	background-color: #e9cac6;
}
.searchBox {
	width: 60%;
	text-align: center;
	padding: 0;
}
</style>
