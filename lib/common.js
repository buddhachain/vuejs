// toast
export const toast = param => {
    if (typeof param === 'string') {
        param = {
            title: param,
            icon:'none',
            duration: 1500
        }
    }
    uni.showToast(param);
}
export const toastSucc = msg => {
    toast({
        icon: 'success',
        title: msg
    })
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