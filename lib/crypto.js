import md5 from 'crypto-js/md5'
import { enc } from 'crypto-js'
import AES from 'crypto-js/aes'
// md5 加密
export const md5Encrypt = str => md5(str).toString(enc.Hex)
export const md5Decrypt = str => md5(str).toString(enc.Utf8)
// aes 加密
export const aesEncrypt = (str, key) => AES.encrypt(str, key).toString()
// aes 解密
export const aesDecrypt = (str, key) => AES.decrypt(str, key).toString(enc.Utf8)