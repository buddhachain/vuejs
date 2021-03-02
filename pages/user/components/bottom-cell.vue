<template>
	<view class="cell-box">
		<u-cell-group :border="false">
			<u-cell-item
				@click="goIden('/pages/user/ident')"
				icon="integral-fill"
				:title-style="{ color: '#eaa741' }"
				:icon-style="{ color: '#eaa741' }"
				title="认证法师, 领取信众供养"
			>
				<view slot="right-icon">
					<text class="u-font-26" style="color: #e0a19f;">未认证</text>
					<!-- <u-icon name="arrow-right" color="#969799" :size="26"></u-icon> -->
				</view>
			</u-cell-item>
			<u-cell-item title="寺院认证" @click="goIden('/pages/user/temple-iden')">
				<view slot="right-icon">
					<text class="u-font-26">未认证</text>
					<!-- <u-icon name="arrow-right" color="#969799" :size="26"></u-icon> -->
				</view>
			</u-cell-item>
			<u-cell-item title="基金会成员" @click="goIden('/pages/user/identification')"></u-cell-item>
			<!-- 已经认证的基金会成员 -->
			<u-cell-item title="基金会成员" @click="goIden('/pages/user/check')"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
export default {
	methods: {
		goIden(url) {
			this.$needLogin(() => {
				uni.navigateTo({
					url: url
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cell-box {
	margin: 20rpx 30rpx 0;
	border-radius: 16rpx;
	overflow: hidden;
}
</style>
