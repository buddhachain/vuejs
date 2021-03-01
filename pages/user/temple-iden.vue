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
			<view class="box">
				<view class="title">寺院信息设置</view>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="单位名称:" placeholder="请输入单位全称"></u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="机构代码:" placeholder="请输入机构代码"></u-field>
				<view class="dis-text">场所编号或统一信用带代码</view>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="省份城市:" placeholder=""></u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="详细地址:" placeholder=""></u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="寺院法人:" placeholder="请输入真实姓名"></u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="手机号码:" placeholder="请输入法人常用手机号"></u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="电子邮箱:" placeholder="请输入常用的邮箱"></u-field>
			</view>
			<view class="box">
				<view class="title">后台登录设置</view>
				<view class="u-flex">
					<text class="sub-title">您是寺院法人？</text>
					<view class="u-m-l-a change-btn" :class="{ 'active-btn': 1 }">是</view>
					<view class="change-btn u-m-l-20" :class="{ 'active-btn': 0 }">否</view>
				</view>
				<u-field v-model="code" class="field-box" :border-bottom="false" label="" :label-width="0" placeholder="请输入短信验证码">
					<view slot="right">
						<u-button
							size="mini"
							:ripple="false"
							:custom-style="{ border: 'none', 'border-left': '1rpx solid #943f3e' }"
							type="success"
							hover-class="none"
							:hair-line="false"
							class="code-btn"
							@click="getCode"
						>
							{{ codeText }}
						</u-button>
						<u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
					</view>
				</u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="登录密码:" placeholder=""></u-field>
				<u-field v-model="mobile" class="field-box" :border-bottom="false" label="确认密码:" placeholder=""></u-field>
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
			currentIndex: 0,
			seconds: 60,
			codeText: '获取验证码'
		};
	},
	methods: {
		changeCurrentIndex() {
			this.currentIndex++;
		},
		codeChange(text) {
			this.codeText = text;
		},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				});
				setTimeout(() => {
					uni.hideLoading();
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
				}, 1000);
			} else {
				this.$u.toast('倒计时结束后再发送');
			}
		},
		end() {
			this.$u.toast('倒计时结束');
		},
		start() {
			this.$u.toast('倒计时开始');
		}
	}
};
</script>

<style lang="scss">
.temp-iden {
	padding: 30rpx 30rpx 100rpx;
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
		font-size: 28rpx;
		color: #111;
		.box {
			padding: 30rpx 20rpx;
			background-color: #ffffff;
		}
		.title {
			position: relative;
			padding: 0 20rpx 10rpx 0rpx;
			position: relative;
			&:after {
				content: '';
				height: 30rpx;
				width: 6rpx;
				background-color: #943f3e;
				position: absolute;
				left: -20rpx;
				top: 4rpx;
			}
		}
		.field-box {
			background-color: #f8f8f8;
			margin-top: 20rpx;
		}
		.dis-text {
			color: #b7a68d;
			display: flex;
			justify-content: flex-end;
			font-size: 26rpx;
			padding-top: 10rpx;
		}
		.change-btn {
			padding: 0rpx 30rpx;
			background-color: #999;
			color: #ffffff;
			border-radius: 30rpx;
		}
		.active-btn {
			background-color: #943f3e;
		}
		.code-btn {
			background: transparent;
			color: #943f3e;
		}
		.sub-title {
			color: #555;
			font-size: 28rpx;
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
