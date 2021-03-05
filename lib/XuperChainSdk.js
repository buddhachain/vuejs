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
	uni.showToast({
		title:'开始',
		icon:'none'
	})
  	return xuperSDK.createAccount(Language.SimplifiedChinese, Strength.Middle, Cryptography.EccFIPS)
  }
