<template>
	<view class="icon-list">
		<view class="icon-item">
			<uni-icons customPrefix="iconfont" type="icon-bofang" size="35" color="#e9cac6"></uni-icons>
			<text class="text">最近播放</text>
		</view>
		<view class="icon-item">
			<uni-icons customPrefix="iconfont" type="icon-download" size="35" color="#e9cac6"></uni-icons>
			<text class="text">本地下载</text>
		</view>
		
		<view class="icon-item">
			<uni-icons type="cloud-upload" size="35" color="#e9cac6"></uni-icons>
			<text class="text">我的云盘</text>
		</view>
		<view class="icon-item">
			<uni-icons  type="cart-filled" size="35" color="#e9cac6"></uni-icons>
			<text class="text">我的已购</text>
		</view>
		<view class="icon-item">
			<uni-icons type="staff" size="35" color="#e9cac6"></uni-icons>
			<text class="text">我的好友</text>
		</view>
		<view class="icon-item">
			<uni-icons  type="star-filled" size="35" color="#e9cac6"></uni-icons>
			<text class="text">收藏和赞</text>
		</view>
		<view class="icon-item">
			<uni-icons type="mic-filled" size="35" color="#e9cac6"></uni-icons>
			<text class="text">我的播客</text>
		</view>
		<view class="icon-item">
			<uni-icons type="gift-filled" size="35" color="#e9cac6"></uni-icons>
			<text class="text">音乐罐子</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.icon-list{
		width: 100%;
		height: 350rpx;
		border: 1px solid #e8e8e8;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.04);
		margin-top: 20rpx;
		display: flex;
		flex-flow: wrap;
		align-items: center;
		.icon-item{
			display: flex;
			width: 25%;
			height: 110rpx;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			color: #737373;
		}
	}
</style>
