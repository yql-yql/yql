import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import {
	getMusicLyric
} from '@/api/itemMusic.js'
export default new Vuex.Store({
	state: {
		playList: [], //播放列表
		playListIndex: 0, //默认为0,歌曲index
		isPlay: false, //歌曲播放状态
		detailShow: false, //歌曲详情页开关
		currentTime: 0, //歌曲播放当前时间
		duration: 0, //歌曲总时长
		lyricList: {}, //保存歌词
	},
	getters: {},
	mutations: {
		//改变isPlay状态
		updateIsPlay: function(state, value) {
			state.isPlay = value;
		},
		//改变歌曲详情页开关
		updateDetailShow: function(state) {
			state.detailShow = !state.detailShow
		},
		//改变歌曲播放当前时间
		updateCurrentTime: function(state, value) {
			state.currentTime = value;
		},
		//改变歌曲总时长
		updateDuration: function(state, value) {
			state.duration = value;
		},
		//改变歌曲播放列表
		updatePlayList: function(state, value) {
			state.playList = value;
		},
		//歌曲播放列表增加歌曲
		pushPlayList: function(state, value) {
			state.playList.push(value);
		},
		//改变歌曲播放列表索引
		updatePlayListIndex: function(state, value) {
			state.playListIndex = value;
		},
		//更新歌词
		updateLyricList: function(state, value) {
			state.lyricList = value;
		}

	},
	actions: {
		//获取歌词
		getLyric: async function(context, value) {
			let res = await getMusicLyric(value);
			context.commit("updateLyricList", res.data.lrc)
		},
	},
	mudules: {
	}
})
