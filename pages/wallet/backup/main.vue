<template>
	<view class="page-cont backup-mnemonic">
		<view class="main_body bg-white shadow">
			<view class="body_title">佛界&nbsp;钱包{{ actionsItem.text }}已{{ actionsItem.action_text }}</view>
			<view class="cont">
				<view class="tip gray">请妥善备份好您的{{ actionsItem.text }}，用于恢复您的佛界钱包</view>
				<view class="tip gray">佛界钱包不会为您保存{{ actionsItem.text }}</view>
				<view class="mnemonic_list" v-if="type === _actions._mnemonic.type">
					<view class="_row" v-for="(arr, i) in mnemonicArr" :key="i">
						<view class="_item" v-for="(str, i) in arr" :key="i">{{ str }}</view>
					</view>
				</view>
				<view class="priv_key" v-if="type === _actions._privateKey.type">
					<view class="prv_key_inner">0xasjdasfhasfasfyuaysfayagasyuYGAYSGFAUSFyasudygasuygdUGASjf17221</view>
				</view>
				<view style="height: 30upx"></view>
			</view>
		</view>
		<view class="img_tips">
			<view class="_row">
				<view class="_item">
					<image src="../../../static/pages/backup/img-tip-1.jpg" mode="" />
					<view class="text">请勿拍照/截屏</view>
				</view>
				<view class="_item">
					<image src="../../../static/pages/backup/img-tip-2.jpg" mode="" />
					<view class="text">请勿使用网络传输</view>
				</view>
			</view>
			<view class="_row">
				<view class="_item">
					<image src="../../../static/pages/backup/img-tip-3.jpg" mode="" />
					<view class="text">请勿告知他人</view>
				</view>
				<view class="_item green">
					<image src="../../../static/pages/backup/img-tip-4.jpg" mode="" />
					<view class="text">使用纸笔抄录下来</view>
				</view>
			</view>
		</view>
		<view class="page_footer_wrap bg-white">
			<!-- <Button long v-if="_actions._mnemonic.type === this.type" @click="nextStep">下一步</Button> -->
			<u-button type="primary" @click="nextStep" ripple :custom-style="{ color: '#fff' }">下一步</u-button>
			<!-- <Button long v-else-if="_actions._privateKey.type === this.type">完成</Button> -->
		</view>
		<!-- <CheckPasswd v-if="!isSuccess" @success="successhandle"/> -->
		<u-popup v-model="show" mode="center" border-radius="14" width="600rpx" :mask-close-able="false">
			<view class="u-p-30 u-text-center">
				<u-field v-model="pwd" password :label-width="0" :border-bottom="false" placeholder="请输入密码"></u-field>
				<u-button
					type="primary"
					class="u-m-t-30"
					@click="successhandle"
					ripple
					shape="circle"
					size="mini"
					:disabled="!pwd"
					:custom-style="{ width: '200rpx', height: '60rpx', color: '#fff' }"
				>
					保存
				</u-button>
			</view>
		</u-popup>
	</view>
</template>
<script>
import Qs from 'qs';
import { actions, getTipItem } from './actions';
import { random } from '@/lib/common';
import accountActions from '@/actions/account';
import PasswordActions from '@/actions/password';
export default {
	components: {},
	data() {
		return {
			type: actions._mnemonic.type,
			accountModel: {},
			isSuccess: false,
			show: true,
			pwd: ''
		};
	},
	onLoad({ type }) {
		type = Number(type);
		const typeArr = Object.keys(actions).map(_key => actions[_key].type);
		const _index = typeArr.findIndex(t => t === type);
		if (_index > -1) {
			this.type = type;
		} else {
			this.type = typeArr[0];
		}
		uni.setNavigationBarTitle({
			title: getTipItem(this.type).title
		});
	},
	computed: {
		_actions() {
			return actions;
		},
		actionsItem() {
			return getTipItem(this.type);
		},
		mnemonicArr() {
			if (!this.accountModel.mnemonic) {
				return [[]];
			}
			const mnemonic = this.accountModel.mnemonic;
			const memicArr = mnemonic.split(' ');
			const len = Math.ceil(memicArr.length / 3);
			let mnemonicArr = [];
			for (let i = 0; i < len; i++) {
				mnemonicArr.push(memicArr.splice(0, 3));
			}
			return mnemonicArr;
		}
	},
	methods: {
		// 验证密码成功后
		successhandle() {
			const res = PasswordActions.check(this.pwd);
			if (!res) {
				this.pwd = '';
				return this.$toast('密码错误');
			}
			console.log(this.pwd);
			// 获取加密的助记词
			const { mnemonic_lock } = accountActions.get();
			console.log(mnemonic_lock);
			const mnemonic = accountActions.deCrypt(mnemonic_lock, this.pwd);
			console.log(mnemonic);
			this.accountModel = { mnemonic };
			this.show = false;
		},
		nextStep() {
			// 随机打乱助记词
			const random = this.$getRandom(0, this.accountModel.mnemonic.split(' ').length, 3);
			const obj = {};
			random.forEach(i => {
				obj[i + 1] = this.accountModel.mnemonic.split(' ')[i];
			});
			accountActions.saveVerify(obj);
			this.$to('/pages/wallet/backup/verify');
		}
	}
};
</script>
<style lang="scss" scoped>
.backup-mnemonic {
	padding: 30upx;
	border-radius: 8upx;
	.main_body {
		margin-bottom: 80upx;
		.body_title {
			line-height: 100upx;
			border-bottom: 2upx solid #f7f6fb;
			text-align: center;
			font-weight: bold;
			font-size: 28upx;
			color: #262626;
		}
		.tip {
			line-height: 50upx;
			font-size: 26upx;
		}
		.cont {
			padding: 0 20upx;
		}
		.mnemonic_list {
			padding: 20upx 0;
			._row {
				display: flex;
				justify-content: space-between;
				height: 60upx;
				margin-bottom: 20upx;
				._item {
					line-height: 60upx;
					height: 100%;
					width: 180upx;
					text-align: center;
					font-size: 26upx;
					color: #575757;
					background: #efefef;
					border-radius: 4upx;
				}
			}
		}
		.priv_key {
			background: #efefef;
			padding: 20upx;
			font-size: 28upx;
			color: #4f4f4f;
			word-break: break-all;
			margin-bottom: 30upx;
			.prv_key_inner {
				line-height: 50upx;
			}
		}
	}
	.img_tips {
		padding-bottom: 140upx;
		._row {
			display: flex;
			&:first-child {
				margin-bottom: 40upx;
			}
			._item {
				border: 1upx solid #ad3920;
				flex: 1;
				&:first-child {
					margin-right: 36upx;
				}
				height: 164upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				image {
					width: 66upx;
					height: 66upx;
				}
				view.text {
					font-size: 26upx;
					line-height: 40upx;
					color: #ad3920;
				}
				&.green {
					border-color: #397a50;
					view.text {
						color: #397a50;
					}
				}
			}
		}
	}
	.next_btn_wrap {
		width: 80%;
		margin: 0 auto;
	}
}
</style>
