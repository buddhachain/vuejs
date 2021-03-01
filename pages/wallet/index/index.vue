<template>
	<view class="page-index-cont">
		<!-- create wallet -->
		<!-- <view class="wallet_index_wapper" v-if="address">
			<view class="card_balance">
				<view class="_tp _flex">
					<view class="address_wrap text_overflow">{{ this.address }}</view>
					<view class="manage_icon" @click="$to('')">...</view>
				</view>
				<view class="balance_of">￥0.000</view>
			</view>
		</view>
		<template v-else> -->
		<view class="nav_wrap">
			<view class="nav-list"><view class="nav-item active">佛界钱包</view></view>
		</view>
		<view class="main_body">
			<view class="wallet-icon"><image src="../../../static/pages/index/wallet.jpg" mode="image" /></view>
			<view class="info-msg">
				<view class="_text">
					创建属于自己的
					<text>佛界</text>
					钱包
				</view>
				<view class="_text">掌控资产、安全随行</view>
			</view>
		</view>
		<view class="create_wallet_btn_box">
			<Button long style="width:100%" @click="$to('/pages/wallet/create/passwd')">
				创建
				<span>佛界</span>
				钱包
			</Button>
		</view>
		<view class="import_wallet_tip">
			已有
			<text>佛界</text>
			钱包？
			<text class="yellow" @click="$to('/pages/wallet/import/main')">点此导入钱包</text>
		</view>
		<!-- </template> -->
	</view>
</template>

<script>
import accountActions from '@/actions/account';
export default {
	data() {
		return {
			address: ''
		};
	},
	onLoad() {
		const { address } = accountActions.get();
		this.address = address;
		if (address) {
			uni.reLaunch({
				url: '/pages/app/index'
			});
		}
	}
};
</script>

<style scoped lang="scss">
.page-index-cont {
	padding: 20upx 0;
	.nav_wrap {
		height: 80upx;
		padding: 0 30upx;
		.nav-list {
			display: flex;
			.nav-item {
				font-size: 34upx;
				line-height: 70upx;
				&.active {
					border-bottom: 8upx solid #6573ed;
				}
			}
		}
	}
	.main_body {
		padding-top: 172upx;
		.wallet-icon {
			width: 100%;
			display: flex;
			justify-content: center;
			image {
				width: 276upx;
				height: 276upx;
			}
		}
		.info-msg {
			padding-top: 140upx;
			._text {
				line-height: 50upx;
				font-size: 30upx;
				text-align: center;
				text {
					padding: 0 10upx;
				}
			}
		}
	}
	.create_wallet_btn_box {
		padding-top: 80upx;
		text-align: center;
		width: 70%;
		margin: 0 auto;
		button {
			width: 100%;
		}
	}
	.import_wallet_tip {
		line-height: 134upx;
		text-align: center;
		font-size: 28upx;
		color: #98999d;
		text {
			padding: 10upx;
		}
	}
	.wallet_index_wapper {
		padding: 0 20upx;
		.card_balance {
			padding: 20upx;
			background: #f5a34f;
			color: #fff;
			border-radius: 8upx;
			._tp {
				font-size: 28upx;
				line-height: 60upx;
				justify-content: space-between;
				.address_wrap {
					font-size: 26upx;
				}
			}
			.manage_icon {
				letter-spacing: 4upx;
			}
			.balance_of {
				font-size: 36upx;
				line-height: 60upx;
			}
		}
	}
}
</style>
