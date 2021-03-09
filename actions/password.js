import {
	setPassword,
	getPassword
} from '../lib/storage'
import {
	md5Encrypt,
	md5Decrypt
} from '../lib/crypto'
export default {
	set: val => setPassword(md5Encrypt(val)),
	setNoPwd: val => uni.setStorageSync('noPwd', val),
	get: () => getPassword(),
	getNoPwd: (val) => getPassword(md5Decrypt(val)),
	check: val => md5Encrypt(val) === getPassword()
}
