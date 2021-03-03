import XuperSdk, {
	// accountIns,
	Language,
	Cryptography,
	Strength
} from '@xuperchain/xuper-sdk'


const node = '120.79.167.88:37101' //超级节点

const endorseConf = {
	fee: '10',
	server: process.env.ENDORSE_SERVER || '',
	complianceCheckfeeAddress: process.env.FEEADDRESS || '',
	feeServiceAddress: process.env.FEESERVICEADDRESS || ''
};
export const xuperSDK = new XuperSdk({
	node,
	chain: 'xuper',
	needEndorse: false,
	// endorseConf,
})

// export const Language = sdkLanguage;
// export const Cryptography = sdkCryptography;
// export const Strength = sdkStrength;

export const createAccount = () => {
	// Language 助记词语言/Strength 助记词个数/ Cryptography 密码类型
	return xuperSDK.createAccount(Language.English, Cryptography.Middle, Strength.EccFIPS)
}


