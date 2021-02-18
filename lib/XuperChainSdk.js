import XuperSdk,{  accountIns, Language as sdkLanguage, Cryptography as sdkCryptography, Strength as sdkStrength } from '@xuperchain/xuper-sdk'


const node = ''

export const xuperSDK = new XuperSdk({
    node,
    chain: 'xuper'
})

export const Language = sdkLanguage;
export const Cryptography = sdkCryptography;
export const Strength = sdkStrength;

export const createAccount = () => {
    return xuperSDK.createAccount(sdkLanguage.English, sdkStrength.Middle, sdkCryptography.EccFIPS)
}

