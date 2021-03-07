<template>
	<view class="import-page-cont">
		<view class="main_body bg-white">
			<view class="tab_wrap">
				<view class="tab_item" v-for="(text, i) in tabs" :key="i" @click="tabCurr = i" :class="{ 'bg-white active': tabCurr === i }">{{ text }}</view>
			</view>
			<view class="content">
				<view class="tip_text">{{ tipText }}</view>
				<view class="input_area bg-none" v-if="tabCurr == 0"><textarea placeholder="请输入助记词，单词之间以空格分开" v-model="mnemonic"></textarea></view>
				<view class="input_area bg-none" v-else><textarea placeholder="请输入私钥明文" v-model="address"></textarea></view>
				<view class="tip_text passwd">
					<view>设置钱包密码</view>
					<view class="image_wrap">
						<image v-show="isPassword == 'text'" @click="isPassword = 'password'" src="/static/icons/attention.png" mode="" />
						<image v-show="isPassword == 'password'" @click="isPassword = 'text'" src="/static/icons/attention_forbid.png" mode="" />
					</view>
				</view>
				<view class="set_passwd"><u-input v-model="passwd" border :type="isPassword" :password-icon="false" /></view>
				<view class="set_passwd"><u-input v-model="confirm" border :type="isPassword" :password-icon="false" /></view>
			</view>
		</view>
		<view class="tip_danger">
			<text class="red">
				*导入新钱包后现有
				<text>HD钱包</text>
				将被覆盖，请确保您已经备份了现有钱包数据
			</text>
		</view>
		<view class="page_footer_wrap bg-white btn_wrap" style="width:100%">
			<u-button type="primary" @click="startHandle" ripple :custom-style="{ height: '80rpx', color: '#fff' }">开始导入</u-button>
		</view>
	</view>
</template>
<script>
import { revertAccount, checkAccount, checkAddress } from '@/lib/XuperChainSdk';
import accountActions from '@/actions/account';
import passwordActions from '@/actions/password';
export default {
	data() {
		return {
			tabCurr: 0,
			tabs: ['助记词导入'], //'私钥导入'
			mnemonic: '',
			passwd: '',
			confirm: '',
			isPassword: 'password',
			address: '',
			isApp: ''
		};
	},
	onLoad({ isApp }) {
		this.isApp = isApp || 0;
	},
	computed: {
		tipText() {
			if (this.tabCurr === 1) {
				return '请输入私钥明文';
			}
			return '请输入助记词';
		}
	},
	methods: {
		confirmerrmsg() {
			if (this.confirm !== this.passwd) {
				uni.showToast({
					title: '两次输入不一致',
					icon: 'none'
				});
				return false;
			} else {
				return true;
			}
		},
		passwderrmsg() {
			if (/\d/.test(this.passwd) && (/[A-Z]/.test(this.passwd) || /[a-z]/.test(this.passwd)) && this.passwd.length >= 8) {
				return true;
			} else {
				uni.showToast({
					title: '数字和大小写字母，不少于8位',
					icon: 'none'
				});
				return false;
			}
		},
		startHandle() {
			this.tabCurr ? this.checkPrivatekey() : this.checkWords();
		},
		checkPrivatekey() {
			const checkResult = checkAddress(this.address);
			alert(checkResult);
		},
		checkWords() {
			// 检查助记词是否正确
			const checkResult = checkAccount(this.mnemonic);
			if (!checkResult) {
				return this.$toast('助记词格式不正确');
			}
			if (!this.passwderrmsg()) return;
			if (!this.confirmerrmsg()) return;
			uni.showLoading({
				title: '导入中...'
			});
			// 导入账户
			const accountModel = revertAccount(this.mnemonic);
			if (this.isApp) {
				uni_new.postMessage({
					data: {
						passwd: this.passwd,
						account: accountModel
					}
				});
			} else {
				accountActions.save(accountModel, this.passwd);
				passwordActions.set(this.passwd);
				uni.hideLoading();
				this.$toastSucc('导入成功！', () => {
					uni.redirectTo({
						url: '/pages/app/index'
					});
				});
			}
			uni.hideLoading();
		}
	}
};
</script>
<style lang="scss" scoped>
.import-page-cont {
	padding: 20upx 30upx;
	padding-bottom: 120upx;
	.main_body {
		border-radius: 10upx;
		padding-bottom: 30upx;
		box-shadow: 0 0 16upx 0upx #d7d7d7;
		margin-bottom: 50upx;
		.content {
			padding: 0 20upx;
		}
		.tab_wrap {
			background: #f6f7fb;
			margin-bottom: 20upx;
			.tab_item {
				flex: 1;
				text-align: center;
				&:first-child {
					border-top-left-radius: 10upx;
				}
				&:last-child {
					border-top-right-radius: 10upx;
				}
				&.bg-white {
					font-weight: bold;
				}
			}
		}
		.tip_text {
			line-height: 144upx;
			font-size: 28upx;
			color: #757575;
			&.passwd {
				line-height: initial;
				padding: 20upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				> .image_wrap {
					width: 50upx;
					height: 50upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.input_area {
			margin-bottom: 52upx;
			padding: 10upx;
		}
		.set_passwd {
			margin-bottom: 50upx;
			height: 80upx;
			// line-height: 80upx;
			input {
				width: 100%;
				height: 80upx;
				font-size: 28upx;
			}
			.red_dis {
				font-size: 24rpx;
				color: red;
				padding: 0 0 10rpx;
			}
		}
	}
	.tip_danger {
		font-size: 28upx;
		line-height: 46upx;
	}
	.btn_wrap {
		width: 60%;
		margin: 0 auto;
		margin-top: 110upx;
	}
}
</style>
