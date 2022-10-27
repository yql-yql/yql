<template>
	<view class="icon-list">
		<view class="icon-item">
			<view class="t-icon t-icon-rili"></view>
			<text class="text">每日推荐</text>
		</view>
		<view class="icon-item">
			<view class="t-icon t-icon-shouyinji"></view>
			<text class="text">私人FM</text>
		</view>
		<view class="icon-item">
			<view class="t-icon t-icon-yinlegedan-"></view>
			<text class="text">歌单</text>
		</view>
		<view class="icon-item">
			<view class="t-icon t-icon-paihangbang-"></view>
			<text class="text">排行榜</text>
		</view>
		<view class="icon-item">
			<view class="t-icon t-icon-zhibo"></view>
			<text class="text">直播</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:'iconList',
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.icon-list{
		width: 100%;
		height: 128rpx;
		display: flex;
		align-items: center;
	}
	.icon-item{
		display: flex;
		flex-direction: column;
		width: 20%;
		align-items: center;
		.t-icon{
			width: 64rpx; 
			height: 64rpx;
		}
	}
	.text{
		margin-top: 10rpx;
	}
</style>
