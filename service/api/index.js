import { http } from '../request'

// 获取地址余额
export const getBalance = addr => http.get('/v1/balance/' + addr)
// 查询交易
export const getTx = txid => http.get('/v1/tx/' + txid)
// 查询转账记录
export const getTxsLog = addr => http.get('/v1/txs/' + addr)
// 交易预处理
export const preTx = (params) => http.post('/v1/pretx', params)
// 广播交易
export const pushTx = signedTx => http.post('/v1/tx',  signedTx)
