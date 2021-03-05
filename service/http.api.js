const install = (Vue, vm) => {
	// 钱包
	const walletApi = {
		// 获取地址余额
		getBalance(params) {
			return vm.$u.get(`/v1/balance/${params}`)
		},
		// 查询交易
		getTx(params) {
			return vm.$u.get(`/v1/tx/${params}`)
		},
		// 查询转账记录
		getTxs(params) {
			return vm.$u.get(`/v1/txs/${params}`)
		},
		// 交易预处理
		postPretx(params) {
			return vm.$u.post(`/v1/pretx`, params)
		},
		// 广播交易
		postTx(params) {
			return vm.$u.post(`/v1/tx`, params)
		},
	};
	// 佛经
	const buddhistApi = {
		// 新建佛经
		postPractise(params) {
			return vm.$u.post(`/v1/practise/sutra`, params)
		},
		// 新建佛经分类别
		postPractiseSutra(params) {
			return vm.$u.get(`/v1/practise/sutra/category`, params)
		},
		// 根据经文id查询经文详细信息
		getPractise(params) {
			return vm.$u.get(`/v1/practise/sutra`, params)
		},
		// 获取佛经分类信息
		getPractiseSutra() {
			return vm.$u.get(`/v1/practise/sutra/category`)
		},
		// 获取用户佛经分类信息
		getPractiseHistory() {
			return vm.$u.get(`/v1/practise/sutra/history`)
		},
	}
	// 用户信息
	const userApi = {
		// 上传用户信息
		postUser(params) {
			return vm.$u.post(`/v1/user`, params)
		},
		// 修改昵称
		postUserNickname(params) {
			return vm.$u.put(`/v1/user/nickname`, params)
		},
		// 更新用户头像
		postUserImage(params) {
			return vm.$u.put(`/v1/user/image`, params)
		},
		// 获取用户佛经分类信息
		getUser(params) {
			return vm.$u.get(`/v1/user`, params)
		},
	}
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		walletApi,
		buddhistApi,
		userApi
	};
}

export default {
	install
}
