<template>
	<view class="">
		<u-cell-group :border="false">
			<u-cell-item title="善举1" :arrow="false">
				<view slot="right-icon" class="u-flex">
					<u-button type="primary" shape="circle" size="mini" v-if="1" ripple @click="applyOnlineKinddeed">申请上架</u-button>
					<u-button type="success" shape="circle" size="mini" v-else ripple @click="applyOnlineKinddeed">申请下架</u-button>
					<u-button class="u-m-l-10" type="info" shape="circle" size="mini" ripple>修改</u-button>
					<u-button class="u-m-l-10" type="warning" shape="circle" size="mini" ripple @click="delateKind">删除</u-button>
				</view>
			</u-cell-item>
		</u-cell-group>
		<view class="">{{ list }}</view>
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
		this.getList();
	},
	methods: {
		async getList() {
			const res = await invoke('list_kinddeed', {}, '0');
			this.list = res;
		},
		async delateKind() {
			uni.showModal({
				content: '确认删除当前善举！',
				success: async function(res) {
					if (res.confirm) {
						const res = await invoke('delete_kinddeed', { id: '1' }, '0');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		async applyOnlineKinddeed() {
			const res = await invoke('apply_online_kinddeed', { id: '24' }, '0');
			// const res = await invoke('apply_offline_kinddeed', {id: '1'}, '0');
			uni.showToast({
				title: '已申请'
			});
		}
	}
};
</script>

<style></style>
