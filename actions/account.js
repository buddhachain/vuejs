import Qs from 'qs'
import { keys } from '../lib/storage'
import { aesDecrypt, aesEncrypt } from '../lib/crypto'
import passwordActions from './password'
export default {
	// 保存账号
    save (accountModel, passwd) {
        uni.setStorageSync(keys.mnemonic, this.encrypt(accountModel.mnemonic, passwd)) //助记词，密码
        uni.setStorageSync(keys.address, accountModel.address)
    },
    get () {
        const address = uni.getStorageSync(keys.address)
        const mnemonic_lock = uni.getStorageSync(keys.mnemonic)
        return {
            address,
            mnemonic_lock
        }
    },
    encrypt (mnemonic, passwd) {
        return aesEncrypt(mnemonic, passwd)
    },
	// 解密助记词
    deCrypt (str, passwd) {
        return aesDecrypt(str, passwd)
    },
    saveVerify (obj) {
        const str = Qs.stringify(obj);
        return uni.setStorageSync(keys.verify, aesEncrypt(str, passwordActions.get()))
    },
    getVerify () {
        const str = aesDecrypt(uni.getStorageSync(keys.verify), passwordActions.get())
        return Qs.parse(str)
    },
    delVerify () {
        return uni.removeStorageSync(keys.verify);
    }
}