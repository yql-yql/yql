<template>
	<view class="footer-music" v-if="playList.length">
		<view class="footer-left" @click="openMusicDetail">
			<image :src="playList[playListIndex].al.picUrl" mode=""></image>
			<view>
				<text class="name">{{ playList[playListIndex].name }}</text>
			</view>
		</view>
		<view class="footer-right">
			<uni-icons v-if="!isPlay" custom-prefix="iconfont" type="icon-24gf-play" size="25" color="#000" @click="play"></uni-icons>
			<uni-icons v-else custom-prefix="iconfont" type="icon-zanting4" size="25" color="#000" @click="play"></uni-icons>
			<uni-icons custom-prefix="iconfont" type="icon-24gf-playlistHeart2" size="25" color="#000"></uni-icons>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import audio from '@/utils/playMusic.js';
export default {
	data() {
		return {};
	},
	computed: { ...mapState(['playList', 'playListIndex', 'isPlay', 'detailShow', 'currentTime', 'duration']) },
	mounted() {
		//渲染和更新的时候都要获取歌词
		if (this.playList.length) {
			this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
		}
	},
	updated() {
		if (this.playList.length) {
			this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
		}
	},
	watch: {},
	methods: {
		...mapMutations(['updateIsPlay', 'updateDetailShow', 'updateCurrentTime', 'updateDuration', 'updateFooterMusic']),
		//播放或暂停
		play: function() {
			let src = `https://music.163.com/song/media/outer/url?id=${this.playList[this.playListIndex].id}.mp3`;
			audio.playAudios(src);
		},
		//打开歌曲详情页
		openMusicDetail: function() {
			this.updateDetailShow();
			uni.navigateTo({
				url: '/pages/musicDetail/musicDetail',
				animationType: 'slide-in-bottom',
				animationDuration: 300
			});
		},
		//获取当前歌曲总时长
		addDuration: function() {
			setTimeout(() => {
				this.updateDuration(audio.music.duration);
			}, 1000);
		},
	}
};
</script>

<style lang="scss">
.footer-music {
	width: 100%;
	height: 100rpx;
	background-color: #fff;
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-top: 1px solid #e2e2e2;
	z-index: 10;
	.footer-left {
		display: flex;
		align-items: center;
		padding-left: 32rpx;
		width: 600rpx;
		image {
			width: 80rpx;
			height: 80rpx;
			margin-right: 16rpx;
			border-radius: 16rpx;
		}
		.name {
			width: 400rpx;
			height: 50rpx;
			display: inline-block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.footer-right {
		width: 18%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 32rpx;
	}
}
</style>
