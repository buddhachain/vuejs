import {
	baseURL
} from '@/service/env.js';
// toast
export const toast = (param, cb) => {
	if (typeof param === 'string') {
		param = {
			title: param,
			icon: 'none',
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
	// #ifndef H5
	uni.setClipboardData({
		data, //需要设置的内容,
		success: res => {
			toastSucc('复制成功')
		},
		fail: err => {
			toast('复制失败！')
		}
	});
	// #endif
	
	// #ifdef H5
	h5Copy(data)
	// #endif

}

export const random = (min, max) => Math.floor(Math.random() * (max + min) - min)

export const uploadImg = (tempFilePaths) => {
	let promise = new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseURL + '/v1/ipfs/image',
			filePath: tempFilePaths[0],
			name: 'image',
			success: uploadFileRes => {
				console.log(uploadFileRes);
				const {
					errCode,
					errMsg,
					data
				} = JSON.parse(uploadFileRes.data);
				uni.hideLoading();
				if (errCode == 0) {
					resolve(data)
				} else {
					uni.showToast({
						title: errMsg,
						icon: 'none'
					});
					reject(errMsg)
				}
			},
			fail: err => {
				uni.showToast({
					title: err,
					icon: 'none'
				});
			}
		});
	})
	return promise
}


/*
 * h5复制
 */
export function h5Copy(content) {

	if (!document.queryCommandSupported('copy')) {
		toast('当前浏览器不支持复制，请手动选择')
		// 不支持
		return false
	}

	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	textarea.remove()
	toastSucc('复制成功')
	return result
}