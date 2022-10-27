<template>
	<view class="found">
		<top-nav></top-nav>
		<swiper-top></swiper-top>
		<icon-list></icon-list>
		<music-list></music-list>
		<topList></topList>
		<footerMusic></footerMusic>
	</view>
</template>

<script>
	import swiperTop from '@/components/found/swiperTop.vue'
	import topNav from '@/components/found/topNav.vue'
	import musicList from '@/components/found/musicList.vue'
	import iconList from '@/components/found/iconList.vue'
	import topList from '@/components/found/topList.vue'
	import footerMusic from '@/components/itemMusic/footerMusic.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{swiperTop,topNav,musicList,iconList,topList,footerMusic},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.found{
		background-color: #fff;
	}
	.footer-music{
		bottom: 100rpx;
	}
</style>
