import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
	state: {
		myInfo: {}, //个人信息
		myMusicList:[],//个人歌单
	},
	getters: {},
	mutations: {
		//更新个人信息
		updateMyInfo: function(state, value) {
			state.myInfo = value;
		},
		//更新个人收藏的歌单
		updateMyMsiclist:function(state,value){
			state.myMusicList = value;
		}
	},
	actions: {
	},
	mudules: {
	}
})
