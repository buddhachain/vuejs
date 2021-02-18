// toast
export const toast = (param, cb) => {
    if (typeof param === 'string') {
        param = {
            title: param,
            icon:'none',
            duration: 1500
        }
    }
    if (cb) {
        let timer = setTimeout(() => {
            cb();
            clearTimeout(timer)
            timer = null;
        }, param.duration);
    }
    uni.showToast(param);
}
export const toastSucc = (msg, cb) => {
    toast({
        icon: 'success',
        title: msg,
        duration: 1500
    }, cb)
}
// copy


export const copy = data => {
    uni.setClipboardData({
      data, //需要设置的内容,
      success: res => {
        toastSucc('复制成功')
      },
      fail: err => {
          toast('复制失败！')
      }
    });
}

export const random = (min, max) => Math.floor(Math.random() * (max + min) - min)