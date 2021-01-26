export const actions = {
    _mnemonic: {
        type: 1,
        title: '备份助记词',
        text: '助记词',
        action_text: '备份'
    },
    _privateKey: {
        type: 2,
        title: '导出私钥',
        text: '私钥',
        action_text: '导出'
    }
}

export const getTipItem = type => {
    const keysArr = Object.keys(actions);
    for (let i = 0; i< keysArr.length; i++) {
        let _k = keysArr[i];
        if (actions[_k].type === type) {
            return actions[_k]
        }
    }
    return type
}