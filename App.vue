<script>
import accountActions from '@/actions/account';
import passwordActions from '@/actions/password.js';
import { revertAccount } from '@/lib/XuperChainSdk.js';
export default {
	onLaunch: function() {
		console.log('App Launch');
		// 防止h5刷新页面sdk js报错
		const { address, mnemonic_lock } = accountActions.get();
		if (address) {
			const pwd = uni.getStorageSync('noPwd');
			const mnemonic = accountActions.deCrypt(mnemonic_lock, pwd);
			const accountModel = revertAccount(mnemonic);
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
@import './styles/main.scss';
@import 'uview-ui/index.scss';
</style>
