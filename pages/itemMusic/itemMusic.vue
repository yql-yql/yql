<template>
	<view>
		<image :src="musicListInfo.coverImgUrl" class="bgImg"></image>
		<item-music-nav></item-music-nav>
		<item-music-top :musicListInfo="musicListInfo"></item-music-top>
		<item-music-list></item-music-list>
		<footer-music></footer-music>
	</view>
</template>

<script>
import { mapMutations } from 'vuex';
import { getMusicItemList, getMusicList } from '../../api/itemMusic.js';
import itemMusicTop from '@/components/itemMusic/itemMusicTop.vue';
import itemMusicList from '@/components/itemMusic/itemMusicList.vue';
import footerMusic from '@/components/itemMusic/footerMusic.vue';
import itemMusicNav from '@/components/itemMusic/itemMusicNav.vue';
export default {
	data() {
		return {
			musicListInfo: { 
				coverImgUrl: '', creator: { nickName: '', avatarUrl: '' } ,
			}, //歌单详情
			musicList: [] //歌单歌曲
		};
	},
	components: {
		itemMusicTop,
		itemMusicList,
		footerMusic,
		itemMusicNav
	},
	onLoad: async function(option) {
		let id = option.id; //上个页面传递的参数。
		//获取该歌单详情页数据
		let res = await getMusicItemList(id);
		this.musicListInfo = res.data.playlist;
		//获取歌单歌曲
		let result = await getMusicList(id);
		this.musicList = result.data.songs;
		this.updatePlayList(this.musicList);
		//防止页面刷新时数据丢失，将数据以json格式保存到sessionStorage
		uni.setStorageSync('musicList', JSON.stringify(this.musicList));
		uni.setStorageSync('musicListInfo', JSON.stringify(this.musicListInfo));
	},
	methods: {
		...mapMutations(['updatePlayList'])
	}
};
</script>

<style lang="scss">
.bgImg {
	width: 100%;
	height: 480rpx;
	filter: blur(30px) brightness(70%);
	top: -40rpx;
	position: absolute;
}
.footer-music {
	margin-left: 0;
}
</style>
