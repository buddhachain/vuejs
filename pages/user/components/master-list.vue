<template>
	<view>
		<view class="u-flex list" v-for="i in 2">
			<view class="u-flex-1 u-text-center">名称</view>
			<view class="u-flex-1 u-text-center">所属人</view>
			<view class="u-flex-1 u-text-center"><u-switch v-model="checked" :size="30" :loading="loading" @change="changeCheck"></u-switch></view>
		</view>
	</view>
</template>

<script>
import { invoke } from '@/lib/XuperChainSdk.js';
export default {
	props: {
		list: {
			type: Array,
			default: () => []
		},
		currentIndex: {}
	},
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
		async getRestultFromServer(status) {
			switch (this.currentIndex) {
				case 0:
					alert(1);
					await invoke('approve_online_kinddeed', { id: '1' }, '0');
					break;
				case 1:
					await invoke('approve_join_temple', { templeid: 'nRv4jJd25N13tBVxq3EjnjSB1uviLM548' }, '0');
					break;
				case 2:
					await invoke('approve_master', { id: '' }, '0');
					break;
				default:
					break;
			}
			// 通过定时器模拟向后端请求
			// setTimeout(() => {
			// this.controlStatus = true;
			// 后端允许用户关闭switch，设置checked为false，结束loading状态
			this.loading = false;
			this.checked = status;
			// }, 1500);
		}
	}
};
</script>

<style>
.list {
	padding: 20rpx 0;
	background-color: #ebeffa;
}
</style>
