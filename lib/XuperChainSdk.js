import XuperSDK, {
	// accountIns,
	Language,
	Cryptography,
	Strength
} from '@xuperchain/xuper-sdk'


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
	// return xuperSDK.retrieve(mnemonic, Language.SimplifiedChinese, Cryptography.EccFIPS,true);
}
// 检查助剂词
export const checkAccount = (mnemonic) => {
	return xuperSDK.checkMnemonic(mnemonic, Language.SimplifiedChinese);
}
// 检查账户地址
export const checkAddress = (address) => {
	return xuperSDK.checkAddress(address);
}
