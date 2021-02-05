import XuperSdk,{  accountIns, Language, Cryptography, Strength } from '@xuperchain/xuper-sdk'


const node = ''

export const xuperSDK = new XuperSdk({
    node,
    chain: 'xuper'
})

export const createAccount = () => {
    return xuperSDK.createAccount(Language.English, Strength.Middle, Cryptography.EccFIPS)
}

