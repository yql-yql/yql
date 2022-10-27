<template>
	<view class="swiperTop" :style="{ 'margin-top': topValue + 50 + 'px' }">
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular indicator-dots="true" indicator-color="#bebebe" indicator-active-color="#fff" autoplay="true" :interval="interval" :duration="duration">
				<swiper-item v-for="item in images" :key="item.pic" class="swiper-item">
					<view><image class="img" :src="item.pic"></image></view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { getBanners } from '@/api/found.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			interval: 2000, //轮播图间隔
			duration: 500, //切换速度
			images: [] //轮播图图片
		};
	},
	computed: {
		...mapState(['topValue'])
	},
	methods: {
		_getBanners: function() {
			getBanners()
				.then(res => {
					if (res.data.code === 200) {
						this.images = res.data.banners;
					}
				})
				.catch(err => {
					console.log('出错啦');
				});
		}
	},
	mounted: function() {
		this._getBanners();
	}
};
</script>

<style lang="scss" scoped>
.swiperTop {
	padding: 16rpx;
	.swiper {
		border-radius: 32rpx;
		overflow: hidden;
		//兼容ios
		transform: translateY(0);
		width: 100%;
		height: 272rpx;
		.img {
			width: 100%;
			height: 272rpx;
		}
	}
}
</style>
