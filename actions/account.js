import { keys } from '../lib/storage'
import { aesDecrypt, aesEncrypt } from '../lib/crypto'
export default {
    save (accountModel, passwd) {
        uni.setStorageSync(keys.mnemonic, this.encrypt(accountModel.mnemonic, passwd))
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
    deCrypt (str, passwd) {
        return aesDecrypt(str, passwd)
    }
}