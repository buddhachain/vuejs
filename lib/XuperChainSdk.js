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

// export const Language = sdkLanguage;
// export const Cryptography = sdkCryptography;
// export const Strength = sdkStrength;

export const createAccount = () => {
	return xuperSDK.createAccount(Language.SimplifiedChinese, Strength.Middle, Cryptography.EccFIPS)
}
export const checkAccount = (mnemonic) => {
	return xuperSDK.checkMnemonic(mnemonic, Language.SimplifiedChinese);
}
export const revertAccount = (mnemonic) => {
	return xuperSDK.revertAccount(mnemonic, Language.SimplifiedChinese, Cryptography.EccFIPS);
}
export const checkAddress = (address) => {
	return xuperSDK.checkAddress(address);
}
