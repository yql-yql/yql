<template>
		<view class="top-title" :style="{ top: topValue + 'px' }">
			<uni-icons type="back" size="30" color="#fff" @click="goBack"></uni-icons>
			<text style="color: #fff;font-size: 38rpx;font-weight: 700;">歌单</text>
		</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed:{
		...mapState(['topValue'])
	},
	methods: {
		//返回上一级
		goBack: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		//跳转
		goto: function() {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
.top-title {
	position: fixed;
	width: 100%;
	display: flex;
	align-items: center;
	padding-bottom: 32rpx;
	z-index: 10;
}
</style>
