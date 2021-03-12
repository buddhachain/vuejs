import XuperSDK, {
	// accountIns,
	Language,
	Cryptography,
	Strength
} from '@xuperchain/xuper-sdk'
import accountActions from '@/actions/account';
import {
	enc
} from 'crypto-js'
const node = '120.79.167.88:8098'

export const xuperSDK = new XuperSDK({
	node,
	chain: 'xuper'
})
// const xsdk = new XuperSDK({node, chain});

// 创建账户
export const createAccount = () => {
	return xuperSDK.create(Language.SimplifiedChinese, Strength.Middle, Cryptography.EccFIPS)
}
// 导入账户
export const revertAccount = (mnemonic) => {
	return xuperSDK.retrieve(mnemonic, Language.SimplifiedChinese, Cryptography.EccFIPS, true);
}
// 检查助剂词
export const checkAccount = (mnemonic) => {
	return xuperSDK.checkMnemonic(mnemonic, Language.SimplifiedChinese);
}
// 检查账户地址
export const checkAddress = (address) => {
	return xuperSDK.checkAddress(address);
}
// 检查账户地址
export const getBalance = () => {
	return xuperSDK.getBalance();
}
// 调用合约方法
export const invoke = async (methods, args, amount) => {
	const {
		address,
		mnemonic_lock
	} = accountActions.get();
	if (address) {
		const pwd = uni.getStorageSync('noPwd');
		const mnemonic = accountActions.deCrypt(mnemonic_lock, pwd);
		const {
			address
		} = revertAccount(mnemonic);
	}
	console.log('导入成功');
	const res =await xuperSDK.invokeContarct('buddha', methods, 'wasm', args, amount);
	console.log(res);
	let response = await res.preExecutionTransaction.response.responses[0];
	if (response.status == 200) {
		var parsedWordArray = enc.Base64.parse(response.body);
		var parsedStr = parsedWordArray.toString(enc.Utf8);
		console.log(parsedStr);
		const result = xuperSDK.postTransaction(res.transaction);
		console.log(response);
		return (parsedStr)
	} else {
		uni.showToast({
			title: '请求错误',
			icon: "none"
		})
		return ('请求错误')
	}
}
