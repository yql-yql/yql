<template>
	<view class="itemMusicList" :class="{isFooterMusic:playList.length}">
		<view class="musicList-top" :class="{ 'topfixed-active': topfixed === 1 }">
			<view class="top-left" @click="playMusic(0)">
				<uni-icons custom-prefix="iconfont" type="icon-bofang1" size="25" color="red" ></uni-icons>
				<text style="font-size: 35rpx;font-weight: 700;">播放全部</text>
			</view>
			<view class="top-right">
				<uni-icons custom-prefix="iconfont" type="icon-download" size="25"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-zu" size="25"></uni-icons>
			</view>
		</view>
		<view class="musicList">
			<view class="musiclist-content" v-for="(item, i) in playList" :key="i">
				<view class="musicItem" @click="playMusic(i)">
					<view class="itemLeft">
						<text class="index" style="font-size: 30rpx;color: #999;font-weight: 700;padding-right: 20rpx;">{{ i + 1 }}</text>
						<view class="name" style="width: 550rpx;">
							<text class="title" style="font-size: 32rpx;">{{ item.name }}</text>
							<text class="singer-album" style="font-size: 25rpx;color: #999;">{{ item.ar[0].name }}—{{ item.al.name }}</text>
						</view>
					</view>
					<view class="itemRight">
						<uni-icons v-if="item.mv != 0" custom-prefix="iconfont" type="icon-shipin" size="25" color="#999"></uni-icons>
						<uni-icons custom-prefix="iconfont" type="icon-danlieliebiao" size="25" color="#999" style="padding-left: 20rpx;"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<footer-music></footer-music>
	</view>
</template>

<script>
import footerMusic from '@/components/itemMusic/footerMusic.vue';
import { mapState, mapMutations } from 'vuex';
import audio from '@/utils/playMusic.js';
export default {
	data() {
		return {
			topfixed: 0,
		};
	},
	computed: {
		...mapState(['playList', 'playListIndex','lyric'])
	},
	components: { footerMusic },
	mounted() {
		
	},
	methods: {
		...mapMutations(['updatePlayList', 'pushPlayList', 'updatePlayListIndex']),
		playMusic: function(index) {
			this.updatePlayListIndex(index);
			let src = `https://music.163.com/song/media/outer/url?id=${this.playList[this.playListIndex].id}.mp3`;
			audio.playAudios(src);
			console.log(audio.music);
			this.$store.dispatch('getLyric', this.playList[this.playListIndex].id);
			setTimeout(()=>{
				uni.navigateTo({
					url: '/pages/musicDetail/musicDetail'
				});
			},10);
			
		}
	}
};
</script>

<style lang="scss">
.itemMusicList {
	padding: 40rpx 30rpx;
	z-index:10
}
.isFooterMusic{
	padding-bottom: 100rpx;
}
.musicList-top,
.top-left,
.top-right {
	display: flex;
	align-items: center;
	justify-content: space-between;
	.top-left {
		width: 200rpx;
	}
	.top-right {
		width: 120rpx;
	}
}
.musiclist-content {
	padding: 20rpx 0;
	.musicItem,
	.itemLeft,
	.itemRight {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.title,
	.singer-album {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.musicItem {
		height: 100rpx;
	}
	.itemLeft {
		width: 520rpx;
	}
}
</style>
