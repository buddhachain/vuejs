<template>
	<view class="check">
		<u-sticky :offset-top="0"><u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs></u-sticky>
		<view class="check-page">
			<u-search placeholder="日照香炉生紫烟" class="u-m-b-20" bg-color="#fff" shape="round" v-model="keyword" clearabled></u-search>
			<view class="u-flex header">
				<view class="u-flex-1 u-text-center" v-for="item in tableHeade">{{ item }}</view>
			</view>
			<view class="">
				<check-cell v-for="i in 20" :class="{ 'list-double': i % 2 !== 0 }" :key="i" />
				<!-- <view class="u-flex list" v-for="i in 20" :class="{ 'list-double': i % 2 !== 0 }" :key="i">
					<view class="u-flex-1 u-text-center">名称</view>
					<view class="u-flex-1 u-text-center">所属人</view>
					<view class="u-flex-1 u-text-center"><u-switch v-model="checked" :size="30" :loading="loading" @change="changeCheck"></u-switch></view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import checkCell from './components/check-cell.vue';
export default {
	components: {
		checkCell
	},
	data() {
		return {
			list: [
				{
					name: '上架审核'
				},
				{
					name: '活动审核'
				},
				{
					name: '寺院认证'
				},
				{
					name: '法师认证'
				}
			],

			current: 0,
			keyword: '',
			
		};
	},
	computed: {
		tableHeade() {
			const titleMap = {
				0: ['名称', '所属人', '是否上架'],
				1: ['名称', '所属人', '是否合格'],
				2: ['名称', '所属人', '是否通过'],
				3: ['名字', '所属寺院', '是否通过']
			};
			return titleMap[this.current];
		}
	},
	watch: {
		// checked(val) {
		// 	// 等于false，意味着用户手动关闭了switch
		// 	if (val == false) {
		// 		if (this.controlStatus == true) {
		// 			this.controlStatus = false;
		// 			return;
		// 		}
		// 		// 重新打开switch，并让它处于加载中的状态
		// 		this.checked = true;
		// 		this.loading = true;
		// 		// 模拟向后端发起请求
		// 		this.getRestultFromServer();
		// 	}
		// }
	},
	methods: {
		change(index) {
			this.current = index;
		},
		
	}
};
</script>

<style lang="scss">
.check {
	.check-page {
		margin: 20rpx;
		.header {
			background-color: #6a96e0;
			color: #ffffff;
			font-size: 28rpx;
			padding: 30rpx 0;
		}

		.list-double {
			background-color: #d3dcf3;
		}
	}
}
</style>
