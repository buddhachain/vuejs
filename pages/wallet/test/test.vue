<template>
	<view>
		<view class="u-m-t-30"><u-button type="warning" @click="create" ripple :custom-style="{ color: '#fff' }">创健一个合约账户</u-button></view>
		<view class="u-m-t-30"><u-button type="" @click="getList" ripple>获取余额</u-button></view>
		<view class="u-m-t-30"><u-button type="error" @click="invoke" ripple :custom-style="{ color: '#fff' }">申请基金会</u-button></view>
		<view class="u-m-t-30"><u-button type="error" @click="cheack" ripple :custom-style="{ color: '#fff' }">查看是否基金会</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="applyMaster" ripple :custom-style="{ color: '#fff' }">申请成为法师</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="isMaster" ripple :custom-style="{ color: '#fff' }">是否法师</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="applyTemple" ripple :custom-style="{ color: '#fff' }">申请成为寺院</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="add" ripple :custom-style="{ color: '#fff' }">添加善行类型</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="addDetails" ripple :custom-style="{ color: '#fff' }">添加善行详情</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="applyOnline" ripple :custom-style="{ color: '#fff' }">申请上下架</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="pray_kinddeed" ripple :custom-style="{ color: '#fff' }">用户祈求善举</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="addBeforecomment" ripple :custom-style="{ color: '#fff' }">点评</u-button></view>
		<view class="u-m-t-30"><u-button type="primary" @click="find" ripple :custom-style="{ color: '#fff' }">查询</u-button></view>
	</view>
</template>

<script>
import { invoke, getBalance } from '@/lib/XuperChainSdk.js';
import { enc } from 'crypto-js';
export default {
	data() {
		return {};
	},
	methods: {
		async create() {
			xsdk.retrieve('单 写 横 浙 乌 轴 语 云 缓 三 找 购 峰 侦 法 使 勃 雪', Language.SimplifiedChinese, Cryptography.EccFIPS, true);
			console.log('导入成功');
			const num = parseInt('1234567890' + ~~(Math.random() * (999999 - 100000) + 100000));
			console.log(num.toString());
			const execStruct = await xsdk.createContractAccount(num.toString());
			// amount: "F0hqoug="
			// refOffset: 2
			// refTxid: "BeuZS0clvnD5VhekHAFlVLGNuRB82+ShdyLIv7kqjsY="
			// toAddr: "ZXlZNkVlejh6NFkzSHZUV0NNOHIxVlFER0JFYllrUzZN"
			console.log(execStruct);
			const result = await xsdk.postTransaction(execStruct.transaction);
			console.error(result);
		},
		async getList() {
			getBalance();
		},
		async invoke() {
			invoke('apply_founder', { desc: 'apply to be founder' }, '100000');
		},
		async find() {
			// let a = 'F0hqhJc=';
			// let b = await xsdk.transactionIdToHex(a)
			// console.log(b);
			// const balance =await xsdk.getBalanceDetail()
			// console.log(balance)
			const res = await xsdk.queryTransaction('xCMKCZGtyXY4zSoOd7WzzV/i1WkU0zlQLIySmFl5xS0=');
			console.log(res);
		},
		async cheack() {
			invoke('is_founder', {}, '0');
		},
		async applyMaster() {
			invoke('apply_master', { creditcode: 'test123456', proof: 'QmQdjouEJc16JTgZ3ifbD5eEn8jyMZvD2b2EG1WhdkFuRb' }, '0');
		},
		async isMaster() {
			invoke('is_master', {}, '0');
		},
		async applyTemple() {
			// invoke('apply_temple', { unit: '佛山顶观音寺', creditcode: 'F110300007', address: '浙江丽水佛顶山', proof: 'QmQdjouEJc16JTgZ3ifbD5eEn8jyMZvD2b2EG1WhdkFuRb' }, '0');

			// invoke('list_temple', {}, '0');
			invoke('approve_temple', { id: 'nRv4jJd25N13tBVxq3EjnjSB1uviLM548' }, '0');
		},
		async add() {
			// invoke('add_kinddeedtype', { id: '3', desc: '事业顺心2222223332' }, '0');
			// invoke('find_kinddeedtype', { id: '1' }, '0');
			invoke('list_kinddeedtype', {}, '0');
			// invoke('update_kinddeedtype', { id: '1', desc: '事业顺心111' }, '0');
			// invoke('delete_kinddeedtype', { id: '1'}, '0');
		},

		async addDetails() {
			let obj = {
				id: '1',
				name: 'kd1',
				type: '1',
				lasttime: 'xxxxxx',
				detail: [{ sequence: '1', hash: '1xxxxxxx' }],
				spec: [{ sequence: '1', desc: 'aaaaaa', price: '10' }, { sequence: '2', desc: 'xxxxxxx', price: '10' }]
			};
			console.log(JSON.stringify(obj));
			let a = JSON.stringify(obj);
			// invoke('add_kinddeed',{"id":"3", "name":"kd1", "type":"1", "lasttime":"xxxxxx", "detail":"[{\"sequence\":\"1\", \"hash\":\"xxxxxx\"},{\"sequence\":\"2\", \"hash\":\"yyyyyy\"}]", "spec":"[{\"sequence\":\"1\", \"desc\":\"aaaaaa\", \"price\":\"10\"},{\"sequence\":\"2\", \"desc\":\"bbbbbb\", \"price\":\"10\"}]" }, '0');
			// // invoke('find_kinddeed',{'id':'1'},'0');
			// invoke('list_kinddeed', {}, '0');
			// invoke('list_kinddeeddetail', { kdid: '1' }, '0');
			// invoke('list_kinddeedspec', {kdid:'1'}, '0');
		},
		async applyOnline() {
			invoke('approve_online_kinddeed', { id: '2' }, '0');
		},
		pray_kinddeed(){
			invoke('pray_kinddeed', {"id": "2","kinddeed":"2","spec":"1","count":"1","timestamp":"11111"}, '20');
			// invoke('list_pray_kinddeed', {}, '0');
		},
		async addBeforecomment() {
			// invoke('add_beforecomment', {"kdid":"1", "satisfaction":"0", "labels":"[\"1\"]","comment":"够前评论，不孬","timestamp":"xxxxxx"}, '0');

			// invoke('add_commentlabel', { id: '2',"desc":"处理及时"}, '0');
			// invoke('list_pray_kinddeed', {id:"fadAkuBzJABCoQnNHUpZhUhoRqJ8cEkV7","proof":"xxxxx", "timestamp":"xxxxxx" }, '0');
			
			// invoke('is_user', {}, '0');
			invoke('list_kinddeedproof', {}, '0');
			
		},
		
	}
};
</script>

<style lang="scss"></style>
