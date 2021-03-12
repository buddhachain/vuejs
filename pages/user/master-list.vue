<template>
	<view class=""><check-cell v-for="i in 2" :class="{ 'list-double': i % 2 !== 0 }" :key="i" /></view>
</template>

<script>
import checkCell from './components/check-cell.vue';
import { invoke } from '@/lib/XuperChainSdk.js';
export default {
	components: {
		checkCell
	},
	data() {
		return {};
	},
	mounted() {
		this.getList();
	},
	methods: {
		async getList() {
			let res = await invoke('list_master', {}, '0');
			console.log(res);
		}
	}
};
</script>

<style></style>
