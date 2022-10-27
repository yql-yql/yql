<template>
	<view class="music-list">
		<view class="music-list-title">
			<text class="title-text">推荐歌单</text>
			<uni-icons custom-prefix="iconfont" type="icon-youjiantou" size="20"></uni-icons>
		</view>
		<view class="music-list-content">
			<scroll-view class="pic" scroll-x show-scrollbar="false" style="width: 100%;overflow:hidden;white-space:nowrap;">
				<view class="swiper-item" v-for="item in reMusciList" :key="item.picUrl" @click="goToMusicDetail(item.id)">
					<image class="img" :src="item.picUrl"></image>
					<view class="playCount">
						<uni-icons custom-prefix="iconfont" type="icon-24gf-play" size="8" color="#fff" style="padding-right: 6.5rpx;"></uni-icons>
						{{ changeCount(item.playCount) }}
					</view>
					<uni-icons custom-prefix="iconfont" type="icon-24gf-play playIcon" size="20" color="#fff"></uni-icons>
					<text class="musicListName">{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { getMusicList } from '@/api/found.js';
export default {
	name: 'musicList',
	data() {
		return {
			reMusciList: [] //推荐歌单
		};
	},
	methods: {
		//获取推荐歌单列表
		_getMusicList: function() {
			getMusicList()
				.then(res => {
					if (res.data.code === 200) {
						this.reMusciList = res.data.result;
					}
				})
				.catch(err => {
					console.log('出错啦', err);
				});
		},
		//跳转到歌单详情
		goToMusicDetail: function(id) {
			uni.navigateTo({
				url: `/pages/itemMusic/itemMusic?id=${id}`
			});
		},
		//转换播放量
		changeCount: function(num) {
			if (num >= 100000000) {
				return (num / 100000000).toFixed(1) + '亿';
			} else {
				return (num / 10000).toFixed(1) + '万';
			}
		}
	},
	mounted: function() {
		this._getMusicList();
	}
};
</script>

<style lang="scss" scoped>
.music-list {
	margin-top: 32rpx;
}
.music-list-title {
	display: flex;
	align-items: center;
	padding-left: 32rpx;
	font-size: 38rpx;
	font-weight: 700;
}
.music-list-content {
	margin-top: 32rpx;
	width: 100%;
	height: 240rpx;
	.pic {
		.swiper-item {
			width: 224rpx;
			height: 310rpx;
			margin-left: 20rpx;
			display: inline-block;
			position: relative;
			.img {
				width: 100%;
				height: 224rpx;
				border-radius: 16rpx;
			}
			.playCount {
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				color: white;
				font-weight: 700;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			}
			.playIcon {
				position: absolute;
				bottom: 105rpx;
				right: 6.5rpx;
				color: #000;
			}
			.musicListName {
				position: absolute;
				top: 224rpx;
				left: 6.5rpx;
				width: 100%;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				word-wrap: break-word;
				white-space: normal !important;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>
