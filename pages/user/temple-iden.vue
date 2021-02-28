<template>
	<view class="temp-iden">
		<u-steps :list="numList" :current="currentIndex" mode="number" active-color="#943f3e"></u-steps>
		<!-- 第一步 资料认证 -->
		<view class="u-m-t-40 infor-box radius" v-show="currentIndex === 0">
			<view class="title">请准备好如下材料的扫描件或照片,要求清晰可辨认:</view>
			<view class="u-p-t-30 u-p-b-60 sub">《宗教场地登记证》</view>
			<view class="u-flex u-row-center radius u-m-b-50"><u-image width="300rpx" height="200rpx" :src="src"></u-image></view>
			<view class="dis-list">
				<text class="dis-icon">*</text>
				<text>自在家认证将谨慎、严格的验证真实性,能够更好地保护寺院及用户的合法权益;</text>
			</view>
			<view class="dis-list">
				<text class="dis-icon">*</text>
				<text>认证资料仅在自在家后台进行备注和核实信息用,通过认证后将展示在认证页面。</text>
			</view>
			<view class="u-flex u-row-center u-m-t-30"><u-icon name="checkmark-circle-fill" color="#943f3e" :size="46" label="同意佛界服务"></u-icon></view>
		</view>
		<!-- 第二步 -->
		<view class="u-m-t-40 infor-box-two radius" v-show="currentIndex === 1">
			<view class="">
				<view class="title">寺院信息设置</view>
				<u-field v-model="mobile" border-bottom="false" label="单位名称:" placeholder="请输入单位名称"></u-field>
			</view>
		</view>
		<!-- 下一步 -->
		<view class="temp-iden-btn"><u-button type="primary" ripple :custom-style="{ background: '#943f3e' }" @click="changeCurrentIndex">下一步</u-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			numList: [
				{
					name: '资料准备'
				},
				{
					name: '填写信息'
				},
				{
					name: '提交资料'
				}
			],
			src: 'https://cdn.uviewui.com/uview/example/fade.jpg',
			currentIndex: 0
		};
	},
	methods: {
		changeCurrentIndex() {
			this.currentIndex++;
		}
	}
};
</script>

<style lang="scss">
.temp-iden {
	padding: 30rpx;
	.infor-box {
		padding: 30rpx;
		background-color: #ffffff;
		.title {
			font-size: 32rpx;
			color: #111;
			font-weight: 700;
		}
		.sub {
			color: #999;
			font-size: 24rpx;
		}
		.dis-list {
			font-size: 24rpx;
			color: #c0c0c0;
			line-height: 1.6;
			margin-bottom: 20rpx;
			.dis-icon {
				color: red;
				margin-right: 4rpx;
			}
		}
	}
	.infor-box-two {
		padding: 30rpx 20rpx;
		font-size: 28rpx;
		color: #111;
		background-color: #ffffff;
		.title {
			position: relative;
			padding: 0 20rpx;
		}
	}
	.temp-iden-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	uni-button {
		border-radius: 0;
	}
}
</style>
