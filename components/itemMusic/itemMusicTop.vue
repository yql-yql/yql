<template>
	<view class="itemMusicTop" :style="{ 'margin-top': topValue + 30+'px' }">
		<view class="top-content">
			<view class="content-left">
				<image :src="musicListInfo.coverImgUrl" class="musicPic"></image>
				<view class="playCount">
					<uni-icons custom-prefix="iconfont" type="icon-24gf-play" size="8" color="#fff"></uni-icons>
					{{ changeCount(musicListInfo.playCount) }}
				</view>
			</view>
			<view class="content-middle">
				<text class="content-title">{{ musicListInfo.name }}</text>
				<view class="creator">
					<image class="avatar" :src="musicListInfo.creator.avatarUrl"></image>
					<text class="nickname">{{ musicListInfo.creator.nickname }}</text>
				</view>
				<text class="description">{{ musicListInfo.description }}</text>
			</view>
			<view class="content-right">
				<uni-icons type="bottom" size="20" color="#fff"></uni-icons>
				<uni-icons type="right" size="20" color="#fff"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed:{
		...mapState(['topValue'])
	},
	props: ['musicListInfo'], //歌单信息
	mounted() {},
	methods: {
		//转换播放量
		changeCount: function(num) {
			if (num >= 100000000) {
				return (num / 100000000).toFixed(1) + '亿';
			} else {
				return (num / 10000).toFixed(1) + '万';
			}
		}
	}
};
</script>

<style lang="scss">
.itemMusicTop {
	width: 100%;
	height: 350rpx;
}
.top-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 300rpx;
	padding: 0 20rpx;
	.content-left {
		width: 35%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		image {
			width: 250rpx;
			height: 250rpx;
			border-radius: 10%;
		}
		.playCount {
			position: absolute;
			top: 10rpx;
			right: 10rpx;
			color: #fff;
			font-weight: 700;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		}
	}
	.content-middle {
		display: flex;
		flex-direction: column;
		width: 50%;
		justify-content: space-between;
		height: 250rpx;
		z-index: 1;
		color: #ccc;
		.creator {
			display: flex;
			align-items: center;
			image {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
		}
		.description,
		.content-title {
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			word-wrap: break-word;
			white-space: normal !important;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.content-title {
			color: #fff;
			font-size: 32rpx;
			font-weight: 700;
			-webkit-line-clamp: 2;
		}
	}
	.content-right {
		height: 250rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		z-index: 1;
	}
}
</style>
