export const actions = {
    _export: {
        type: 1,
        text: '导出',
        title: '导出私钥安全提示'
    },
    _backup: {
        type: 2,
        text: '备份',
        title: '备份助记词安全提示'
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