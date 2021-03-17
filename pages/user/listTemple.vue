<template>
	<view class="">
		<u-cell-group :border="false">
			<u-cell-item title="寺院列表" @click="goIden('/pages/user/temple-iden')">
				<view slot="right-icon">
					<!-- <text class="u-font-26">未认证</text> -->
					<!-- <u-icon name="arrow-right" color="#969799" :size="26"></u-icon> -->
				</view>
			</u-cell-item>
		</u-cell-group>
		
		<view class="">
			{{list}}
		</view>
	</view>
</template>

<script>
import { invoke } from '@/lib/XuperChainSdk.js';
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		this.getList()
	},
	methods: {
		async getList() {
			const res = await invoke('list_temple_master', {}, '0');
			this.list = res
		}
	}
};
</script>

<style></style>
