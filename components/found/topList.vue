<template>
	<view class="topList" :class="{isFooterMusic:playList.length}">
		<view class="topList-title">
			<text class="title-text">热门电台</text>
			<uni-icons custom-prefix="iconfont" type="icon-youjiantou" size="20"></uni-icons>
		</view>
		<view class="topList-content">
			<swiper class="topList-swiper">
				<swiper-item v-for="(item, index) in topList" :key="index" class="swiper-item">
					<uni-list :border="false"><uni-list-chat v-for="i in item" :key="i.picUrl" :title="i.name" :avatar="i.picUrl" :note="i.copywriter"></uni-list-chat></uni-list>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { getDjProgram } from '@/api/found.js';
import {mapState} from 'vuex';
export default {
	name: 'topList',
	data() {
		return {
			topList: [] //榜单
		};
	},
	computed:{
		...mapState(['playList']),
	},
	methods: {
		//获取电台榜单
		_getTopList: async function() {
			let res = await getDjProgram();
			if (res.data.code === 200) {
				this.topList.push(res.data.result.splice(0, 3));
				this.topList.push(res.data.result.splice(0));
				console.log(this.topList);
			}
		}
	},
	mounted() {
		this._getTopList();
	}
};
</script>

<style lang="scss" scoped>
.topList {
	margin-top: 96rpx;
}
.isFooterMusic{
	padding-bottom: 100rpx;
}
.topList-title {
	display: flex;
	align-items: center;
	padding-left: 32rpx;
	font-size: 38rpx;
	font-weight: 700;
}
.topList-content {
	.topList-swiper {
		height: 400rpx;
		.swiper-item {
			font-size: 38rpx;
			font-weight: 700;
			/deep/ .uni-list-chat__header {
				border-radius: 15rpx;
				border: none;
			}
		}
	}
}
</style>
