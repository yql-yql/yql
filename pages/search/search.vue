<template>
	<view class="searchPage">
		<view class="header" :style="{'padding-top':topValue + 'px' }"><uni-icons type="back" size="30"  color="#000" @click="goBack"></uni-icons></view>
		<view>
			<view class="searchTop" :style="{ top: topValue + 40 + 'px' }">
				<uni-icons type="bars" size="30" color="#000"></uni-icons>
				<uni-search-bar
					class="searchBox"
					v-model="keywords"
					radius="100"
					:placeholder="placeholder"
					clearButton="none"
					cancelButton="none"
					confirm-type="search"
					@confirm="confirm"
				/>
				<uni-icons type="search" size="30" color="#000" @click="_getSearchMusic"></uni-icons>
			</view>
			<view class="searchContent" :style="{'margin-top': (topValue+25) +'px'}">
				<view class="history" >
					<view class="history-header">
						<text class="title">历史</text>
						<uni-icons custom-prefix="iconfont" type="icon-shanchu" size="20" @click="deleteHistory"></uni-icons>
					</view>
					<view class="history-content" v-if="keywordList.length">
						<text class="history-item" v-for="item in keywordList" :key="item" @click="_getSearchMusic(item)">{{ item }}</text>
					</view>
				</view>
				<view class="searchList" :class="{ isFooterMusic: playList.length }" v-if="searchList.length">
					<view class="searchList-header" @click="playAllMusic()">
						<text class="title" style="padding-right: 16rpx;">播放全部</text>
						<uni-icons custom-prefix="iconfont" type="icon-bofang" size="20" color="#ff0000"></uni-icons>
					</view>
					<uni-list v-for="item in searchList" :key="item.id">
						<uni-list-chat :avatar-circle="true" :title="item.name" :note="item.ar[0].name" :avatar="item.al.picUrl">
							<view class="chat-custom-right" @click="playMusic(item)">
								<uni-icons custom-prefix="iconfont" type="icon-bofang" size="20" color="#000"></uni-icons>
							</view>
						</uni-list-chat>
					</uni-list>
				</view>
			</view>
		</view>
		<footer-music></footer-music>
	</view>
</template>

<script>
import { getSearchMusic } from '@/api/found.js';
import footerMusic from '@/components/itemMusic/footerMusic.vue';
import { mapState, mapMutations } from 'vuex';
import audio from '@/utils/playMusic.js';
export default {
	data() {
		return {
			placeholder: '',
			keywords: '', //搜索关键字
			keywordList: [], //搜索历史
			searchList: [] //搜索返回的结果
		};
	},
	mounted() {
		if(uni.getStorageSync('keywordList')){
			this.keywordList = JSON.parse(uni.getStorageSync('keywordList')) || [];
			
		}
	},
	components: { footerMusic },
	computed: {
		...mapState(['playList', 'playListIndex','topValue'])
	},
	methods: {
		...mapMutations(['updatePlayList', 'pushPlayList', 'updatePlayListIndex']),
		//回退上一页
		goBack: function() {
			uni.navigateBack({
				delta:1
			})
		},
		//回车搜索
		confirm: function(e) {
			this.keywords = e.value;
			this._getSearchMusic();
		},
		//搜索
		_getSearchMusic: async function(value = '') {
			if (value != '') {
				this.keywords = value;
			}
			if (this.keywords != '') {
				//保存搜索结果
				this.keywordList.unshift(this.keywords);
				//去重
				this.keywordList = [...new Set(this.keywordList)];
				//固定数组长度
				if (this.keywordList.length > 8) {
					this.keywordList.pop();
				}
				uni.setStorageSync('keywordList', JSON.stringify(this.keywordList));
				let res = await getSearchMusic(this.keywords);
				if (res.data.code === 200) {
					this.searchList = res.data.result.songs;
					console.log(this.keywordList);
				}
			}
		},
		//播放全部
		playAllMusic: function() {
			this.updatePlayList(this.searchList);
			this.updatePlayListIndex(0);
			let src = `https://music.163.com/song/media/outer/url?id=${this.playList[this.playListIndex].id}.mp3`;
			audio.playAudios(src);
			uni.navigateTo({
				url: '/pages/musicDetail/musicDetail'
			});
		},
		//播放某个歌曲
		playMusic: function(data) {
			console.log(data);
			this.pushPlayList(data);
			console.log(this.playList);
			this.updatePlayListIndex(this.playList.length - 1);
			let src = `https://music.163.com/song/media/outer/url?id=${this.playList[this.playListIndex].id}.mp3`;
			audio.playAudios(src);
			uni.navigateTo({
				url: '/pages/musicDetail/musicDetail'
			});
		},
		//删除历史记录
		deleteHistory: function() {
			this.keywordList = [];
			uni.removeStorageSync('keywordList');
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	position: fixed;
	top:0;
	left:10rpx;
	width: 100%;
	height: 80rpx;
	display: flex;
	align-items: center;
	background-color: #fff;
	z-index: 100;
}
.searchPage {
	width: 100%;
	height: 100%;
	background-color: #fff;
	.searchTop {
		position: sticky;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 0 6.5rpx;
		background-color: #fff;
		z-index: 10;
		.searchBox {
			width: 70%;
			text-align: center;
		}
		button {
			background-color: transparent;
			font-size: 32rpx;
		}
		button::after {
			border: 0;
		}
	}
	.searchContent {
		.title {
			font-size: 38rpx;
			font-weight: 700;
			
		}
		.history {
			padding:32rpx;
			.history-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.history-content {
				display: flex;
				align-items: center;
				margin-top: 32rpx;
				width: 700rpx;
				flex-flow: wrap;
				.history-item {
					height: 26rpx;
					line-height: 26rpx;
					border-radius: 13%;
					background-color: #f8f8f8;
					padding: 20rpx;
					margin: 0 26rpx 20rpx 0;
					font-size: 35rpx;
					font-family: '微软雅黑';
					color: #686868;
				}
			}
		}
		.searchList {
			padding:32rpx;
			.searchList-header {
				display: flex;
				align-items: center;
				margin-bottom: 32rpx;
			}
		}
		.isFooterMusic {
			padding-bottom: 100rpx;
		}
	}
}
</style>
