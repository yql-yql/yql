import store from '../store/index'
const audio = {};
var music = uni.createInnerAudioContext()
var previousSrc = '' //上一个音频的地址，如果和现在的播放地址一样就进入暂停
audio.playAudios = function(src) {
	if (music.paused) { //在暂停状态
		if (previousSrc === src) {
			music.play();
		} else {
			music.stop();
			music.src = src;
			previousSrc = src;
			music.play();
		}
		store.commit('updateIsPlay', false);
	} else { //不在暂停状态
		if (previousSrc == src) {
			music.pause();
			store.commit('updateIsPlay', true);
		} else {
			music.stop();
			music.src = src;
			previousSrc = src;
			music.play();
		}
	}
	//更新duration
	// store.commit('updateDuration',music.duration);
}
audio.stopAudios = function() {
	music.stop()
}
audio.pauseAudios = function() {
	music.pause()
}
audio.goto = function(newTime){
	music.seek(newTime);
}
music.onPlay(() => { //播放监听事件
	console.log('开始播放');
	
	store.commit('updateIsPlay', true);
});
music.onPause(() => { //暂停监听
	console.log('暂停');
	store.commit('updateIsPlay', false);
});
music.onSeeked(()=>{//监听进度跳转事件
	console.log('跳转完成');
})

music.onEnded(() => { // 自然播放结束监听也需要更改歌曲播放状态
	console.log('音频自然播放结束事件');
	store.commit('updateIsPlay', false);
});
music.onCanplay(() => {
	//获取到歌曲信息时出现了很多undefined的情况，所以为了处理为空的状态，在获取到的时候直接判断一下当前获取到的是否为空，如果为空就进行处理,设置一个定时器进行一秒的延时进行处理获取时间
	if (typeof music.duration != 'undefined') {
		store.commit('updateDuration',music.duration);
	} else {
		setTimeout(() => {
			store.commit('updateDuration',music.duration);
		}, 1000)
	}
});
music.onError((e) => {
	console.log('错误');
	uni.showToast({
		title:'暂时没有这首歌曲的资源哦，换首别的吧o(╥﹏╥)o',
		duration:2000
	})
		//跳到下一首
		let index = store.state.playListIndex;//获取当前歌曲索引
		let list = store.state.playList;//获取当前播放列表
		//更新索引
		if(index + 1 === list.length){
			index = 0;
		}else{
			index++;
		}
		store.commit('updatePlayListIndex',index);
		//播放歌曲
		let src = `https://music.163.com/song/media/outer/url?id=${list[index].id}.mp3`;
		setTimeout(()=>{
			audio.playAudios(src);
		},2000);
		
})
audio.music = music;
export default audio
