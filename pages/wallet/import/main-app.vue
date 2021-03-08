<template>
	<view><web-view :src="$webUrl + '/#/pages/wallet/import/main?isApp=1'" @message="message"></web-view></view>
</template>

<script>
import passwordActions from '@/actions/password';
import accountActions from '@/actions/account';
export default {
	data() {
		return {};
	},
	onLoad() {
		uni.showToast({
			title: 'q11'
		});
	},
	methods: {
		message(e) {
			const { account, passwd } = e.detail.data[0];
			accountActions.save(account, passwd);
			passwordActions.set(passwd);
			this.$toastSucc('导入成功！', () => {
				uni.reLaunch({
					url: '/pages/app/index'
				});
			});
		}
	}
};
</script>

<style></style>
