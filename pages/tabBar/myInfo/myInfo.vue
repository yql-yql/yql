<template>
	<view class="myInfo">
		<top-nav></top-nav>
		<profile></profile>
		<icon-list></icon-list>
		<my-music-list ></my-music-list>
		<footer-music></footer-music>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import footerMusic from '@/components/itemMusic/footerMusic.vue';
import topNav from '@/components/myInfo/topNav.vue';
import profile from '@/components/myInfo/profile.vue';
import iconList from '@/components/myInfo/iconList.vue';
import myMusicList from '@/components/myInfo/myMusicList.vue';
export default {
	data() {
		return {};
	},
	components: { footerMusic, topNav, profile, iconList, myMusicList },
	computed: {
		...mapState(['token']),
		...mapState(['myInfo','myMusicList'])
	},
	onShow: function() {
		if (!this.token && !uni.getStorageSync('token')) {
			uni.showModal({
				title: '提示',
				content: '您还没有登录，前往登录吗？',
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url: '../../login/login',
							success: function() {
								console.log('跳转成功');
							},
							fail: function(e) {
								console.log('跳转失败', e);
							}
						});
					} else {
						console.log('取消登录');
						uni.switchTab({
							url: '/pages/tabBar/found/found'
						});
					}
				}
			});
		}
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.myInfo {
	background-color: #f8f8f8;
	width: 90%;
	// padding: 20rpx 0;
	margin: 0 auto;
}
.footer-music {
	bottom: 100rpx;
	margin-left:-38rpx;
}
</style>
