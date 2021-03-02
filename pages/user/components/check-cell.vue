<template>
	<view class="u-flex list">
		<view class="u-flex-1 u-text-center">名称</view>
		<view class="u-flex-1 u-text-center">所属人</view>
		<view class="u-flex-1 u-text-center"><u-switch v-model="checked" :size="30" :loading="loading" @change="changeCheck"></u-switch></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: false,
			controlStatus: false,
			loading: false
		};
	},
	methods: {
		changeCheck(status) {
			this.loading = true;
			this.getRestultFromServer(status);
		},
		getRestultFromServer(status) {
			// 通过定时器模拟向后端请求
			setTimeout(() => {
				// this.controlStatus = true;
				// 后端允许用户关闭switch，设置checked为false，结束loading状态
				this.loading = false;
				this.checked = status;
			}, 1500);
		}
	}
};
</script>

<style scoped>
.list {
	padding: 20rpx 0;
	background-color: #ebeffa;
}
</style>
