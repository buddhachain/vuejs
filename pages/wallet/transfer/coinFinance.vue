<template>
	<view class="finance-page-cont">
		<view class="coin_card bg-white shadow">
			<view class="coin_img"><image src="https://s2.feixiaoquan.com/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp" mode="" /></view>
			<view class="align-center totalAmount"><text class="gray">总资产</text></view>
			<view class="quantity align-center">
				<view class="num">{{ balance }}</view>
				<text class="coin_name">{{ currencyUppCase }}</text>
			</view>
			<view class="quantity align-center">
				<view class="num">
					<text class="coin_name gray">≈</text>
					<text class="gray">{{ zhehe }}</text>
				</view>
				<text class="coin_name gray">{{ zheheCoinUppCase }}</text>
			</view>
		</view>
		<view class="transferl_log bg-white radius shadow">
			<view class="_title">资产记录</view>
			<view class="log_list">
				<view class="log_item">
					<view class="_top _flex">
						<view class="_time"><text class="gray">2020-03-12 12:00:00</text></view>
						<view class="quantity text_overflow">
							<text class="in">+</text>
							<text class="in">1.00000000</text>
						</view>
					</view>
					<view class="_bom _flex">
						<view class="_type">转入</view>
						<view class="_hash"></view>
					</view>
				</view>
				<view class="log_item">
					<view class="_top _flex">
						<view class="_time">2020-03-12 12:00:00</view>
						<view class="quantity">
							<text class="red">-</text>
							<text class="red">1.00000000</text>
						</view>
					</view>
					<view class="_bom _flex">
						<view class="_type">转出</view>
						<view class="_hash text_overflow"><text class="gray">TXID：0xasdasdasdaskjfaskjfhasjkfhasjkfhakjsfkjashfkjasfasf</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer_wrap bg-white">
			<!-- $to('./out?c=bud') -->
			<!-- <Button long type="white" @click="out">转出</Button> -->
			<Button long type="white" @click="test">test 转账</Button>
			<!-- <u-button class="u-flex-1 u-m-r-20" type="primary" @click="out" ripple :custom-style="{ color: '#fff' }">转出</u-button> -->
			<!-- <u-button class="u-flex-1" type="warning" @click="$to('./in?c=bud')" ripple :custom-style="{ color: '#fff' }">转入</u-button> -->
		</view>
	</view>
</template>
<script>
import accountActions from '@/actions/account';
import { xuperSDK } from '@/lib/XuperChainSdk';
export default {
	data() {
		return {
			address: '',
			currency: 'bud',
			balance: 0,
			zhehe_coin: 'usdt'
		};
	},
	computed: {
		currencyUppCase() {
			return this.currency.toUpperCase();
		},
		zhehe() {
			return Number((this.balance / 7).toFixed(8));
		},
		zheheCoinUppCase() {
			return this.zhehe_coin.toUpperCase();
		}
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/wallet/manage/main'
		});
	},
	onLoad({ c }) {
		const account = accountActions.get();
		if (!account.address) {
			uni.redirectTo({
				url: '/pages/wallet/create/passwd'
			});
		} else {
			this.address = account.address;
		}
		if (!c) {
			// uni.navigateBack({
			//      delta: 2
			// });
			c = this.currency;
		} else {
			this.currency = c;
			uni.setNavigationBarTitle({
				title: c.toUpperCase()
			});
		}
		// this.getAddressBalance();
	},
	methods: {
		async getAddressBalance() {
			const res = await this.$u.api.walletApi.getBalance(this.address);
			console.log(r);
		},
		test() {
			const ti = {
				to: 'W3d1ReePU52xJuFTuuVU4Ung7yVACyiTb',
				amount: '1',
				fee: '0',
				desc: '121312'
			};
			const res = xuperSDK.transfer(ti,'W3d1ReePU52xJuFTuuVU4Ung7yVACyiTb');
			console.log(res);
			// test()
		},
		async out() {
			uni.navigateTo({
				url: './out'
			});
			// await this.$u.api.walletApi.postPretx({ account: 'W3d1ReePU52xJuFTuuVU4Ung7yVACyiTb', amount: '1', desc: '121312' });
		}
	}
};
</script>
<style lang="scss" scoped>
.finance-page-cont {
	padding: 20upx;
	padding-bottom: 100upx;
	.footer_wrap {
		display: flex;
		justify-content: space-between;
		height: 100upx;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 99;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.coin_card {
		padding: 26upx;
		margin-bottom: 30upx;
		border-radius: 8upx;
		.coin_img {
			height: 86upx;
			text-align: center;
			image {
				width: 86upx;
				height: 86upx;
			}
		}
		.totalAmount {
			font-size: 26upx;
			line-height: 76upx;
		}
		.quantity {
			font-size: 28upx;
			display: flex;
			justify-content: center;
			.coin_name {
				padding: 0 20upx;
			}
			> view,
			> text {
				line-height: 46upx;
			}
		}
	}
	.transferl_log {
		padding: 20upx 40upx;
		._title {
			font-size: 28upx;
			line-height: 54upx;
			margin-bottom: 16upx;
		}
		.log_list {
			.log_item {
				padding: 14upx 0;
				font-size: 26upx;
				._flex {
					justify-content: space-between;
				}
				._top {
					line-height: 32upx;
					.quantity {
						max-width: 60%;
						font-size: 28upx;
					}
				}
				._bom {
					> view {
						line-height: 50upx;
					}
					._type {
						font-size: 28upx;
					}
					._hash {
						max-width: 70%;
						letter-spacing: 1.2upx;
						font-size: 28upx;
					}
				}
			}
		}
	}
}
</style>
