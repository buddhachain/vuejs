<template>
	<view class="my-card">
		<view class="card u-flex u-row-between" @click="goNext()">
			<text>{{ title }}</text>
			<u-icon name="arrow-right" color="#999" size="24"></u-icon>
		</view>
		<slot />
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	methods:{
		goNext(){
			this.$emit('head-click')
		}
	}
};
</script>

<style lang="scss" scoped>
.my-card {
	background-color: #ffffff;
	padding-bottom: 20rpx;
	border-radius: 16rpx;
	.card {
		padding: 20rpx;
		font-size: 28rpx;
		color: #111;
		border-bottom: 1rpx solid #e4e7ed;
	}
}
</style>
