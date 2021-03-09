<template>
	<view><web-view :src="$webUrl + '/#/pages/wallet/create/passwd?isApp=1'" @message="message"></web-view></view>
</template>
<script>
import passwordActions from '@/actions/password';
import accountActions from '@/actions/account';
import account from '@/actions/account';
export default {
	data() {
		return {};
	},
	onLoad({ t = 1 }) {
		this.type = Number(t);
		if (this.type === 2) {
			uni.setNavigationBarTitle({
				title: '修改钱包密码'
			});
		}
	},

	methods: {
		async message(e) {
			const { account, passwd } = e.detail.data[0];
			passwordActions.set(passwd);
			passwordActions.setNoPwd(passwd);
			// 此处应该先创建钱包， 使用用户设置的密码将助记词加密后存储到本地；
			console.log(account);
			accountActions.save(account, passwd);
			await this.postUser(account);
			uni.reLaunch({
				url: '/pages/app/index'
			});
		},
		async confirmCreate(oldPasswd) {
			if (this.passwdErrMsg || this.confirmErrMsg) return;
			if (this.type === 2 && !oldPasswd) {
				return (this.isShowCheckPassword = true);
			}
			// 密码md5本地存储 （pw)
			passwordActions.set(this.passwd);
			if (this.type === 1) {
				// 此处应该先创建钱包， 使用用户设置的密码将助记词加密后存储到本地；
				const account = createAccount();
				console.log(account);
				accountActions.save(account, this.passwd);
				await this.postUser(account);
				this.$to('/pages/wallet/transfer/coinFinance?c=bud');
			} else if (this.type === 2) {
				// 如果是修改钱包密码
				// 应该先取出使用旧密码加密过的
				const { mnemonic_lock, address } = accountActions.get();
				const mnemonic = accountActions.deCrypt(mnemonic_lock, oldPasswd);
				// 使用新密码加密后存储
				accountActions.save(
					{
						mnemonic,
						address
					},
					this.passwd
				);
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
			uni.showLoading({
				title: '加载中...'
			});
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
			uni.hideLoading();
		}
	}
};
</script>
<style lang="scss" scoped></style>
