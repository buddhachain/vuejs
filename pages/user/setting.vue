<template>
	<view class="setting">
		<view class="setting-box radius">
			<u-cell-group :border="false">
				<u-cell-item title="提醒设置"></u-cell-item>
				<u-cell-item title="修改密码" @click="changePwd"></u-cell-item>
				<u-cell-item title="账号注销"></u-cell-item>
				<u-cell-item title="关于"></u-cell-item>
			</u-cell-group>
		</view>
		<view class="setting-box radius">
			<u-cell-group :border="false"><u-cell-item title="退出登录" @click="logout"></u-cell-item></u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		};
	},
	onLoad() {
	},
	methods: {
		logout() {
			uni.showModal({
				content: '退出登录',
				success: function(res) {
					if (res.confirm) {
						uni.clearStorageSync()
						uni.reLaunch({
							url:'/pages/wallet/index/index'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		changePwd() {
			uni.navigateTo({
				url: '/pages/wallet/create/passwd?t=2'
			});
		},
	}
};
</script>

<style lang="scss">
.setting {
	padding: 20rpx;
	.setting-box {
		background-color: #ffffff;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
}
</style>
