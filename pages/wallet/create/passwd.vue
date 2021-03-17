<template>
	<view class="c-passwd-page-cont">
		<!-- <u-navbar  title="创建钱包" :border-bottom="false" title-color="#111"></u-navbar> -->
		<view class="card_body bg-white radius shadow">
			<view class="_title _flex">
				<text>{{ title }}</text>
				<view class="image_wrap">
					<image v-show="isShowPasswd === false" @click="isShowPasswd = true" src="/static/icons/attention.png" mode="" />
					<image v-show="isShowPasswd === true" @click="isShowPasswd = false" src="/static/icons/attention_forbid.png" mode="" />
				</view>
			</view>
			<view class="passwd-ipt">
				<u-field
					v-model="passwd"
					:password="isShowPasswd"
					confirm-type="next"
					:label-width="0"
					placeholder="数字和大小写字母，不少于8位"
					@input="$u.debounce(pwdAuth, 500)"
				></u-field>
				<text class="pwd-err" v-if="passwdErrMsg">{{ passwdErrMsg }}</text>
			</view>
			<view class="passwd-ipt">
				<u-field
					v-model="confirm"
					:password="isShowPasswd"
					confirm-type="next"
					:label-width="0"
					placeholder="再次输入您设置的佛界钱包密码"
					@input="$u.debounce(pwdAuthTwo, 500)"
				></u-field>
				<text class="pwd-err" v-if="confirmErrMsg">{{ confirmErrMsg }}</text>
			</view>
		</view>
		<view class="tips u-m-b-40">
			<view><text class="red">* 钱包密码用于保护您的私钥，建议设置足够强度的密码</text></view>
			<view><text class="red">* 钱包密码丢失将无法找回，请务必牢记您设置的密码</text></view>
		</view>
		<u-button type="primary" :disabled="hasErrors" @click="confirmCreate" ripple shape="circle" :custom-style="{ height: '80rpx', color: '#fff' }">
			{{ type == 2 ? '确认修改' : '确认创建' }}
		</u-button>
		<!-- <CheckPasswd v-if="isShowCheckPassword" title="原钱包密码" @success="confirmCreate" /> -->
		<u-popup v-model="show" mode="center" border-radius="14" width="600rpx" :mask-close-able="false">
			<view class="u-p-30 u-text-center">
				<u-field v-model="pwd" password :label-width="0" :border-bottom="false" placeholder="请输入当前密码"></u-field>
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
					确定
				</u-button>
			</view>
		</u-popup>
	</view>
</template>
<script>
import { xuperSDK, createAccount } from '@/lib/XuperChainSdk';
import passwordActions from '@/actions/password';
import accountActions from '@/actions/account';
import account from '@/actions/account';
export default {
	data() {
		return {
			passwd: '',
			confirm: '',
			passwdErrMsg: '',
			confirmErrMsg: '',
			text: '',
			isShowPasswd: true,
			type: 1,
			isShowCheckPassword: false,
			isLoading: false,
			isApp: '',
			show:false,
			pwd:''
		};
	},
	computed: {
		hasErrors() {
			if (this.passwd === this.confirm && this.confirm.length > 7 && this.confirmErrMsg == '') {
				return false;
			} else {
				return true;
			}
		},
		title() {
			return this.type === 1 ? '设置钱包密码' : '修改钱包密码';
		}
	},
	onLoad({ t = 1, isApp = 0 }) {
		this.type = Number(t);
		this.isApp = isApp;
		if (this.type === 2) {
			this.show = true
			uni.setNavigationBarTitle({
				title: '修改钱包密码'
			});
		}
	},
	watch: {
		passwd(nV) {
			if (/\d/.test(nV) && (/[A-Z]/.test(nV) || /[a-z]/.test(nV)) && nV.length >= 8) {
				this.passwdErrMsg = '';
			} else {
				this.passwdErrMsg = '数字和大小写字母，不少于8位';
			}
		},
		confirm(nV) {
			if (this.confirm.length >= 8) {
				if (this.confirm !== this.passwd) {
					this.confirmErrMsg = '两次输入不一致';
				} else {
					this.confirmErrMsg = '';
				}
			}
		},
		successhandle(passwd) {}
	},
	methods: {
		// 验证密码成功后
		successhandle() {
			const res = passwordActions.check(this.pwd);
			if (!res) {
				this.pwd = '';
				return this.$toast('密码错误');
			}
			console.log(this.pwd);
			this.show = false;
		},
		pwdAuth() {
			let nV = this.passwd;
			if (/\d/.test(nV) && (/[A-Z]/.test(nV) || /[a-z]/.test(nV)) && nV.length >= 8) {
				this.passwdErrMsg = '';
			} else {
				this.passwdErrMsg = '数字和大小写字母，不少于8位';
			}
		},
		pwdAuthTwo() {
			if (this.confirm.length >= 8) {
				if (this.confirm !== this.passwd) {
					this.confirmErrMsg = '两次输入不一致';
				} else {
					this.confirmErrMsg = '';
				}
			}
		},
		async confirmCreate() {
			if (this.passwdErrMsg || this.confirmErrMsg) return;
			// if (this.type === 2 && !) {
			// 	return (this.isShowCheckPassword = true);
			// }

			// 密码md5本地存储 （pw)
			if (this.type === 1) {
				// 此处应该先创建钱包， 使用用户设置的密码将助记词加密后存储到本地；
				const account = createAccount();
				console.log(account);
				if (this.isApp) {
					uni_new.postMessage({
						data: {
							passwd: this.passwd,
							account
						}
					});
				} else {
					accountActions.save(account, this.passwd);
					passwordActions.set(this.passwd);
					passwordActions.setNoPwd(this.passwd);
					await this.postUser(account);
					uni.reLaunch({
						url: '/pages/app/index'
					});
				}
			} else if (this.type === 2) {
				// 如果是修改钱包密码
				// 应该先取出使用旧密码加密过的
				const { mnemonic_lock, address } = accountActions.get();
				const mnemonic = accountActions.deCrypt(mnemonic_lock, this.pwd);
				console.log(mnemonic,address)
				uni.clearStorageSync()
				// 使用新密码加密后存储
				accountActions.save(
					{
						mnemonic,
						address
					},
					this.passwd
				);
				passwordActions.set(this.passwd);
				passwordActions.setNoPwd(this.passwd);
				// 修改成功
				this.$toastSucc('修改成功', () => {
					this.passwd = '';
					this.confirm = '';
					uni.navigateBack({
						delta: 2
					});
				});
			}
		},
		async postUser({ address }) {
			this.isLoading = true;
			let obj = {
				account: address,
				nickname: '',
				image: '',
				sex: true,
				email: '',
				phone: '',
				address: ''
			};
			let res = await this.$u.api.userApi.postUser(obj);
			this.isLoading = false;
		}
	}
};
</script>
<style lang="scss" scoped>
.c-passwd-page-cont {
	padding: 40upx;
	.card_body {
		padding: 40upx;
		padding-bottom: 104upx;
		margin-bottom: 50upx;
		._title {
			font-size: 28upx;
			line-height: 86upx;
			margin-bottom: 14upx;
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
		.passwd-ipt {
			margin-top: 40upx;
		}
		.pwd-err {
			color: red;
			font-size: 26rpx;
			padding-left: 20rpx;
		}
	}
	.tips {
		> view {
			line-height: 52upx;
			font-size: 26upx;
		}
	}
	.confirm_btn {
		margin-top: 150upx;
	}
}
</style>
