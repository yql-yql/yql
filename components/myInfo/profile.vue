<template>
	<view class="profile" :style="{'margin-top':(topValue+25)+'px'}">
		<img :src="myInfo.src" />
		<view class="content">
			<view class="title">{{ myInfo.name }}</view>
			<view class="detail">
				<text>{{ myInfo.follow }}关注</text>
				<text>{{ myInfo.fans }}粉丝</text>
				<text>Lv.{{ myInfo.level }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return { myDetail: {},  };
	},
	computed: {
		...mapState(['myInfo','topValue'])
	},
	methods: {
		...mapMutations(['updateMyInfo'])
	},
	mounted() {
		if(uni.getStorageSync('myInfo')){
			this.updateMyInfo(JSON.parse(uni.getStorageSync('myInfo')));
		}
	}
};
</script>

<style lang="scss">
.profile {
	width: 100%;
	height: 220rpx;
	border: 1px solid #e8e8e8;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: 0 0 4px 5px rgba(0, 0, 0, 0.04);
	position: relative;
	text-align: center;
	img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 0;
		position: absolute;
		top: -25%;
		left: 40%;
		background-color: #fff;
	}
	.content {
		margin-top: 70rpx;
		display: flex;
		flex-direction: column;
		height: 110rpx;
		justify-content: space-between;
		.title {
			font-size: 40rpx;
			font-weight: 700;
		}
		.detail {
			text {
				padding: 0 20rpx;
				border-right: 1px solid #ccc;
			}
			:last-child {
				border: 0;
			}
		}
	}
}
</style>
