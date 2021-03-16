<template>
	<view class="order">
		<view class="order-list radius">
			<view class="order-list-title">订单编号：23212131232</view>
			<view class="u-m-8">
				<u-cell-item title="夕阳无限好" :title-style="{ color: '#111', paddingBottom: '10rpx' }" label="解脱香 + 哈达" :arrow="false">
					<view class="" slot="right-icon">
						<view class="u-p-b-10 order-list-price">508 BUD</view>
						<view class="u-font-24">x1</view>
					</view>
				</u-cell-item>
			</view>
			<view class=" order-list-sub">
				<text>应付：</text>
				<text class="all-price">508 BUD</text>
			</view>
		</view>
		<!-- 支付方式 -->
		<view class="u-m-t-30">
			<view class="u-font-30">支付方式</view>
			<u-cell-group :border="false">
				<u-cell-item title="微信" :arrow="false" :title-style="{ color: '#111' }">
					<u-icon slot="icon" size="48" color="#7af04e" class="u-m-r-20" name="weixin-fill"></u-icon>
					<u-icon slot="right-icon" size="38" name="checkmark-circle-fill" color="#438df0"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view>

		<view class="order-brn"><u-button type="primary" ripple shape="circle" @click="show = true" :custom-style="{ width: '500rpx' }">确认支付</u-button></view>
		<view class="u-flex order-pop">
			<image class="pop-icon" src="/static/logo.png" mode="widthFix"></image>
			<view class="">
				<view class="u-font-30">已获得授权协议，可放心支付</view>
				<view class="u-m-t-10 u-flex">
					<text>授权单位</text>
					<u-button type="primary" ripple size="mini" shape="circle" :custom-style="{ width: '200rpx' }">查看详情</u-button>
				</view>
			</view>
		</view>

		<!-- 密码输入框 -->
		<u-popup v-model="show" mode="center" border-radius="10" width="600rpx">
			<view class="u-p-30"><u-input v-model="value" border type="password" placeholder="请输入密码" /></view>
			<view class="u-flex u-m-t-20 u-p-b-30">
				<u-button type="primary" :disabled="value == ''" ripple size="mini" shape="circle" @click="pay" :custom-style="{ width: '200rpx', height: '60rpx' }">确认</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { invoke } from '@/lib/XuperChainSdk.js';
export default {
	data() {
		return {
			checked: false,
			show: false,
			value: ''
		};
	},
	methods: {
		async pay() {
			if(this.value === uni.getStorageSync('noPwd')){
				await invoke('pray_kinddeed', { id: '3', kinddeed: '3', spec: '1', count: '1', timestamp: '11111' }, '111');
				uni.showToast({
					title:'祈福成功'
				})
				this.show = false
			}else{
				uni.showToast({
					title:'密码错误',
					icon:"none"
				})
			}
		}
	}
};
</script>

<style lang="scss">
$price-color: #e83a3f;
.order {
	padding: 20rpx 30rpx;
	.order-list {
		background-color: #ffffff;
		.order-list-title {
			padding: 20rpx;
			font-size: 28rpx;
			color: #111;
			border-bottom: 1rpx solid #e4e7ed;
		}
		.order-list-price {
			font-size: 24rpx;
			color: $price-color;
			font-weight: 700;
		}
		.order-list-sub {
			font-size: 28rpx;
			color: #111;
			text-align: center;
			padding: 20rpx 0;
			.all-price {
				color: $price-color;
				font-weight: 700;
			}
		}
	}
	.order-brn {
		position: fixed;
		bottom: 80rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.order-pop {
		position: fixed;
		bottom: 200rpx;
		left: 40rpx;
		right: 40rpx;
		background-color: #ffffff;
		padding: 30rpx;
		border-radius: 10rpx;
		.pop-icon {
			width: 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
		}
	}
}
/deep/.u-cell-item-box {
	background-color: rgba(0, 0, 0, 0);
}
</style>
