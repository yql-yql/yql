<template>
	<view class="musicDetail">
		<image class="bgImg" :src="playList[playListIndex].al.picUrl"></image>
		<view class="detail-top" :style="{ top: topValue + 'px' }">
			<uni-icons @click="closeMusicDetail" type="bottom" size="30" color="#fff"></uni-icons>
			<view class="title">
				<view class="name" style="font-size: 30rpx;">{{ playList[playListIndex].name }}</view>
				<view class="singer">{{ playList[playListIndex].ar[0].name }}</view>
			</view>
		</view>
		<view class="detail-body">
			<view class="cd" v-show="!isLyricShow" @click="isLyricShow = !isLyricShow">
				<image src="../../static/assets/needle.png" class="needle" :class="{ needle_active: isPlay }"></image>
				<image src="../../static/assets/cd.png" class="cdPic"></image>
				<img :src="playList[playListIndex].al.picUrl" alt="" class="ar" :class="{ ar_active: isPlay, ar_paused: !isPlay }" />
			</view>
		</view>
		<!-- <scroll-view
			:scroll-top="scrollTop"
			ref="nodesRef"
			scroll-y="true"
			class=" lyric"
			@click="isLyricShow = !isLyricShow"
			v-show="isLyricShow"
			:style="{ 'margin-top': topValue + 50 + 'px'}"
		>
			<view
				class="scroll-view-item"
				v-for="(item, i) in lyric"
				:id="i"
				:key="i"
				:class="{
					active: currentTime * 1000 >= item.time && currentTime * 1000 < item.next
				}"
			>
				{{ item.lrc }}
			</view>
		</scroll-view> -->
		<view
			class=" lyric"
			@click="isLyricShow = !isLyricShow"
			v-show="isLyricShow"
			:style="{ 'margin-top': topValue + 60 + 'px'}"
		>
			<view
				class="row"
				v-for="(item, i) in lyric"
				:id="i"
				:key="i"
				:style="{transform: `translateY(${scrollTop}px)`}"
				:class="{
					active: currentTime * 1000 >= item.time && currentTime * 1000 < item.next
				}"
			>
				{{ item.lrc }}
			</view>
		</view>
		<view class="detail-footer">
			<view class="footer-top">
				<uni-icons custom-prefix="iconfont" type="icon-aixin" size="30" color="#fff"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-download" size="30" color="#fff"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-shouyinji" size="30" color="#fff"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-xiaoxi" size="30" color="#fff"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-danlieliebiao" size="30" color="#fff"></uni-icons>
			</view>
			<view class="footer-content" style="padding: 10rpx 0;">
				<text style="color: #5e5e5e;">{{ handleTimeFormat(currentTime) }}</text>
				<slider
					class="slider"
					:value="currentTime"
					min="0"
					:max="duration"
					@changing="changeCurrentTime"
					@change="sliderChange"
					step="0.05"
					activeColor="#bebebe"
					block-size="12"
				/>
				<text style="color: #5e5e5e;">{{ handleTimeFormat(duration) }}</text>
			</view>
			<view class="footer-bottom">
				<uni-icons custom-prefix="iconfont" type="icon-xunhuan" size="30" color="#fff"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-shangyishoushangyige" size="30" color="#fff" @click="getPlay(-1)"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-bofang" size="40" color="#fff" v-if="!isPlay" @click="play"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-zanting2" size="40" color="#fff" v-if="isPlay" @click="play"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-xiayigexiayishou" size="30" color="#fff" @click="getPlay(1)"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-danlieliebiao" size="30" color="#fff"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import audio from '@/utils/playMusic.js';
export default {
	data() {
		return {
			isLyricShow: false, //歌词开关
			scrollTop: 0, //滚动距离
			timer: null,
			name: '',
			isMove:false
		};
	},
	computed: {
		...mapState(['playList', 'playListIndex', 'isPlay', 'currentTime', 'duration', 'lyricList', 'topValue']),
		//对歌词进行处理
		lyric: function() {
			let arr;
			if (this.lyricList) {
				arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map(item => {
					let min = item.slice(1, 3);
					let sec = item.slice(4, 6);
					let mill = item.slice(7, 10);
					let lrc = item.slice(11);
					if (isNaN(Number(mill))) {
						mill = item.slice(7, 9);
						lrc = item.slice(10);
					}
					let time = parseInt(min, 10) * 60 * 1000 + parseInt(sec, 10) * 1000 + parseInt(mill, 10);
					return {
						min,
						sec,
						mill,
						time,
						lrc
					};
				});
				arr.forEach((item, i) => {
					if (i === arr.length - 1 || isNaN(arr[i + 1]).time) {
						item.next = 10000000000;
					} else {
						item.next = arr[i + 1].time;
					}
				});
			}
			return arr;
		}
	},
	methods: {
		...mapMutations(['updateDetailShow', 'updateDuration', 'updateLyricList', 'updatePlayListIndex', 'updateCurrentTime']),
		//关闭歌曲详情页
		closeMusicDetail: function() {
			this.updateDetailShow();
			uni.navigateBack({
				delta: 1,
				animationType: 'slide-out-bottom',
				animationDuration: 300
			});
		},
		//播放暂停歌曲
		play: function() {
			let src = `https://music.163.com/song/media/outer/url?id=${this.playList[this.playListIndex].id}.mp3`;
			audio.playAudios(src);
			console.log('我点啦');
		},
		//切换上一曲和下一曲
		getPlay: function(value) {
			if (this.playList.length === 1) {
				uni.showToast({
					title: '只有这一首歌啦',
					icon: 'error'
				});
			} else {
				let index = this.playListIndex + value;
				if (index === -1) {
					index = this.playList.length - 1;
				}
				if (index === this.playList.length) {
					index = 0;
				}
				this.updatePlayListIndex(index);
				this.play();
			}
		},
		//处理时间格式
		handleTimeFormat: function(time) {
			if (isNaN(time)) {
				time = 0;
			}
			let min = Math.floor(parseInt(time) / 60)
				.toString()
				.padStart(2, 0);
			let sec = (parseInt(time) % 60).toString().padStart(2, 0);
			return min + ':' + sec;
		},
		//拖动进度条
		changeCurrentTime: function(res) {
			audio.goto(res.detail.value);
			this.updateCurrentTime(res.detail.value);
		},
		//点击进度条
		sliderChange: function(res) {
			audio.goto(res.detail.value);
			this.updateCurrentTime(res.detail.value);
		}
	},
	watch: {
		currentTime: function(newValue) {
			let query = uni.createSelectorQuery();
			let active = query.select('.active');
			if (this.isLyricShow) {
				active
					.boundingClientRect(data => {
						if (data && data.top > 250) {
							console.log(this);
							this.scrollTop -=(data.top-250);
							// console.log(data,this.scrollTop);
						}
					})
					.exec();
			}
			//如果歌曲结束，就自动播放下一曲
			if (newValue === this.duration) {
				this.updatePlayListIndex((this.playListIndex + 1) % this.playList.length);
				this.play();
			}
		}
	}
};
</script>

<style lang="scss">
.musicDetail {
	width: 100%;
	padding: 20rpx 0;
}
.bgImg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	filter: blur(70px) brightness(70%);
	z-index: 0;
}
.detail-top {
	position: absolute;
	color: #fff;
	height: 120rpx;
	.uni-icons {
		position: absolute;
		padding: 20rpx;
	}
	.title {
		width: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
}
.cd {
	position: relative;
	top: 320rpx;
	.cdPic {
		width: 550rpx;
		height: 550rpx;
		position: absolute;
		left: 100rpx;
		z-index: 1;
	}
	.needle {
		width: 200rpx;
		height: 300rpx;
		position: absolute;
		left: 350rpx;
		top: -140rpx;
		transform-origin: 0 0;
		transform: rotate(-20deg);
		transition: all 1.5s;
		z-index: 2;
	}
	.needle_active {
		width: 220rpx;
		height: 300rpx;
		position: absolute;
		left: 350rpx;
		transform-origin: 0 0;
		transform: rotate(0deg);
		transition: all 2s;
	}
	.ar {
		width: 350rpx;
		height: 350rpx;
		border-radius: 50%;
		position: absolute;
		top: 100rpx;
		left: 200rpx;
		animation: rotate_ar 10s linear infinite;
	}
	.ar_active {
		animation-play-state: running;
	}
	.ar_paused {
		animation-play-state: paused;
	}
	//动画
	@keyframes rotate_ar {
		0% {
			transform: rotateZ(0deg);
		}
		100% {
			transform: rotateZ(360deg);
		}
	}
}
.lyric {
	height: 800rpx;
	position:absolute;
	z-index: 10;
	overflow-y:scroll;
	.row{
		width: 700rpx;
		color: rgb(161, 161, 161);
		margin-bottom: 20rpx;
		padding: 20rpx 30rpx;
		font-size: 32rpx;
		z-index: 1;
		text-align: center;
	}
	.active {
		color: #fff;
		font-size: 40rpx;
	}
}
.move{
	// transform: translateY(-30px);
}
.detail-footer {
	position: absolute;
	bottom: 20rpx;
	padding: 0 30rpx;
	.footer-top,
	.footer-content,
	.footer-bottom {
		width: 660rpx;
		padding: 20rpx 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.footer-content {
		.slider {
			width: 700rpx;
		}
	}
}
</style>
