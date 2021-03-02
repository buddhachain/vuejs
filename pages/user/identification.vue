<template>
	<view class="identification">
		<view class="u-flex iden-list">
			<view class="name">冻结BUD金额：</view>
			<input type="number" value="" class="input-box" />
		</view>
		<view class="u-flex iden-list">
			<view class="name">出生日期：</view>
			<view class="u-flex  input-box select" @click="showTimePicker = true">
				{{ time }}
				<u-icon class="u-m-l-a" name="order" color="#999" size="28"></u-icon>
			</view>
		</view>
		<view class="u-flex   iden-list">
			<view class="name">所在地区：</view>
			<view class="u-flex  input-box select" @click="regionShow = true">
				{{ region }}
				<u-icon class="u-m-l-a" name="map" color="#999" size="28"></u-icon>
			</view>
		</view>
		<view class="u-flex iden-list">
			<view class="name">性别：</view>
			<!-- <input type="text" value="" class="input-box" /> -->
			<u-radio-group v-model="value" @change="radioGroupChange">
				<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
			</u-radio-group>
		</view>
		<view class="u-m-30 u-m-t-80"><u-button type="primary" ripple :custom-style="{ background: '#735ba0', height: '80rpx', color: '#fff' }">申请认证</u-button></view>
		<!-- 日期选择器 -->
		<u-picker mode="time" v-model="showTimePicker" :params="params" @confirm="getTime"></u-picker>
		<!-- 地区选择 -->
		<u-picker mode="region" v-model="regionShow" @confirm="getRegion"></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					name: '善男',
					disabled: false
				},
				{
					name: '信女',
					disabled: false
				}
			],
			value: '善男',
			params: {
				year: true,
				month: true,
				day: true,
				hour: false,
				minute: false,
				second: false
			},
			showTimePicker: false,
			regionShow: false,
			time: '',
			region: ''
		};
	},
	methods: {
		// 选中某个单选框时，由radio时触发
		radioChange(e) {
			// console.log(e);
		},
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			// console.log(e);
		},
		getTime({ year, month, day }) {
			this.time = `${year}-${month}-${day}`;
		},
		getRegion({ province, city, area }) {
			this.region = `${province.label}-${city.label}-${area.label}`;
		}
	}
};
</script>

<style lang="scss">
.identification {
	padding: 30rpx 20rpx;
	.iden-list {
		margin-top: 30rpx;
		.name {
			font-size: 28rpx;
			color: #4b485a;
			margin-right: 20rpx;
			flex-shrink: 0;
			width: 200rpx;
		}
		.input-box {
			background-color: #eaecf7;
			border-radius: 4rpx;
			padding: 10rpx;
			flex: 1;
			font-size: 28rpx;
			max-height: 110rpx;
		}
		.dis {
			color: #999;
			font-size: 28rpx;
		}
	}
	.select {
		height: 60rpx;
	}
}
</style>
