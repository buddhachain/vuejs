<template>
	<view class="rollout-page-cont">
		<!-- @click="$to('./coinFinance?c=' + coinUpper)" -->
		<CoinBar img="https://s2.feixiaoquan.com/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp" :name="coinUpper" style="border-radius: 8upx"></CoinBar>
		<view class="transfer-form shadow radius bg-white">
			<!-- addr -->
			<view class="form-group">
				<view class="label">
					<text>转出地址</text>
					<!-- <text class="icon">ICON</text> -->
				</view>
				<u-input v-model="toadders" border placeholder="输入或长按粘贴地址" />
			</view>
			<!-- quantity -->
			<view class="form-group">
				<view class="label">
					<text>转出数量</text>
					<text class="yellow">全部转出</text>
				</view>
				<u-input v-model="amount" border placeholder="输入数量" />
			</view>
			<view class="gas">
				<text class="gray">矿工费：{{ gas }}</text>
				<text class="coin_name gray">{{ coinUpper }}</text>
			</view>
		</view>
		<!-- passwd -->
		<view class="transfer-form passwd-form shadow radius bg-white">
			<!-- passwd -->
			<view class="label"><text>验证钱包密码</text></view>
			<u-input v-model="pwd" border type="password" placeholder="输入佛界钱包密码" />
		</view>
		<view class="tip"><text class="red">* 转账时请注意核对地址，资产一旦转出将无法找回</text></view>
		<view class="page_footer_wrap">
			<view class="btn_wrap">
				<u-button type="primary" :loading="loading" ripple @click="outAmount" :custom-style="{ height: '80rpx', color: '#fff' }">确定转出</u-button>
			</view>
		</view>
	</view>
</template>
<script>
import { xuperSDK } from '@/lib/XuperChainSdk';
export default {
	data() {
		return {
			gas: 0.0001,
			coin: 'bud',
			toadders: '',
			amount: '',
			pwd: '',
			loading: false
		};
	},
	computed: {
		coinUpper() {
			return this.coin.toUpperCase();
		}
	},
	onLoad({ c }) {
		if (c) {
			this.coin = c;
		}
	},
	methods: {
		async outAmount() {
			if (this.toadders == '' || this.amount == '' || this.pwd == '') {
				uni.showToast({
					title: '请填写完整信息！',
					icon: 'none'
				});
				return;
			}
			if (this.pwd !== uni.getStorageSync('noPwd')) {
				uni.showToast({
					title: '密码错误！',
					icon: 'none'
				});
				return;
			}
			this.loading = true;
			const tx = await xuperSDK.transfer({
				to: this.toadders,
				amount: this.amount,
				fee: '10'
			});
			const result = await xuperSDK.postTransaction(tx);
			this.loading = false;
			uni.showToast({
				title: '转账成功'
			});
			this.toadders = '';
			this.amount = '';
			this.pwd = '';
		}
	}
};
</script>
<style lang="scss" scoped>
.rollout-page-cont {
	padding: 30upx;
	.transfer-form {
		padding: 40upx;
		margin: 44upx 0;
		.form-group {
			margin-bottom: 50upx;
		}
		.label {
			font-size: 28upx;
			line-height: 28upx;
			margin-bottom: 36upx;
			display: flex;
			justify-content: space-between;
			text:last-child {
				font-size: 26upx;
			}
		}
		.gas {
			font-size: 26upx;
			.coin_name {
				padding: 20upx;
			}
		}
	}
	.tip {
		font-size: 26upx;
	}
}
</style>
