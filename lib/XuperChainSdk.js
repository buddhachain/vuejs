import XuperSdk, {
	// accountIns,
	Language,
	Cryptography,
	Strength
} from '@xuperchain/xuper-sdk'


const node = '120.79.167.88:37101'

export const xuperSDK = new XuperSdk({
	node,
	chain: 'xuper'
})
// 创建账户
export const createAccount = () => {
	return xuperSDK.createAccount(Language.SimplifiedChinese, Strength.Middle, Cryptography.EccFIPS)
}
// 检查助剂词
export const checkAccount = (mnemonic) => {
	return xuperSDK.checkMnemonic(mnemonic, Language.SimplifiedChinese);
}
// 导入账户
export const revertAccount = (mnemonic) => {
	return xuperSDK.revertAccount(mnemonic, Language.SimplifiedChinese, Cryptography.EccFIPS);
}
// 检查账户地址
export const checkAddress = (address) => {
	return xuperSDK.checkAddress(address);
}
