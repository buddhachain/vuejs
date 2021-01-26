export const to = (param, isSwitch = false) => {
    if (typeof param === 'string') {
        param = {
            url: param,
        }
    }
    const method = isSwitch ? uni.switchTab : uni.navigateTo.bind(uni);
    method(param);
}