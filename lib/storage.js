export const keys = {
    password: 'PW'
}

export const setPassword = (val) => {
    return uni.setStorageSync(keys.password, val)
}
export const getPassword = val => uni.getStorageSync(keys.password)
