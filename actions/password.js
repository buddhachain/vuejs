import {
	setPassword,
	getPassword
} from '../lib/storage'
import {
	md5Encrypt,
} from '../lib/crypto'
export default {
	set: val => setPassword(md5Encrypt(val)),
	setNoPwd: val => uni.setStorageSync('noPwd', val),
	get: () => getPassword(),
	check: val => md5Encrypt(val) === getPassword()
}
