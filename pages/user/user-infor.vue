<template>
	<view class="user-infor">
		<view class="box radius">
			<u-cell-group :border="false">
				<u-cell-item title="头像" :arrow="false">
					<view class="" slot="right-icon"><u-avatar :size="130" :src="src" mode="circle" @click="changeAvator"></u-avatar></view>
				</u-cell-item>
				<u-cell-item title="昵称" :value="userInfor.nickname || '未设置昵称'" @click="showPop(1)"></u-cell-item>
				<u-cell-item title="性别" :value="userInfor.sex ? '男' : '女'" @click="showPop(2)"></u-cell-item>
				<!-- <u-cell-item title="手机号" :value="userInfor.phone || '未设置'" @click="showPop(3)"></u-cell-item> -->
			</u-cell-group>
		</view>
		<!-- nikname -->
		<u-popup v-model="show" mode="center" border-radius="14" width="600">
			<view class="u-p-20 u-p-t-30 u-p-b-30 u-text-center">
				<u-field v-model="nikeName" :label-width="0" placeholder="请输入新昵称" v-if="type == 1"></u-field>
				<view class="" v-if="type == 2">
					<u-radio-group v-model="sex">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
				<!-- <u-field v-model="phone" :label-width="0" placeholder="请输入" v-if="type == 3"></u-field> -->
				<u-button
					type="primary"
					class="u-m-t-30"
					@click="save"
					:loading="isLoading"
					ripple
					shape="circle"
					size="mini"
					:custom-style="{ width: '200rpx', height: '60rpx', color: '#fff' }"
				>
					保存
				</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { baseURL } from '@/service/env.js';
export default {
	data() {
		return {
			userInfor: {
				cid: '',
				userInfor:'',
				sex:true
			},
			src: '',
			show: false,
			nikeName: '',
			isLoading: false,
			sex: '男',
			type: 0,
			phone: '',
			list: [
				{
					name: '女',
					disabled: false
				},
				{
					name: '男',
					disabled: false
				}
			]
		};
	},
	computed: {
		// src() {
		// 	return 'http://120.79.167.88:8080/ipfs/' + this.userInfor.cid;
		// }
	},
	onLoad() {
		this.getUserDtails();
	},
	methods: {
		radioChange(e) {},
		changeAvator() {
			let _self = this;
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.showLoading({
						title: '上传中'
					});
					uni.uploadFile({
						url: baseURL + '/v1/ipfs/image',
						filePath: tempFilePaths[0],
						name: 'image',
						// header: {
						// 	'Content-Type': 'multipart/form-data'
						// },
						success: uploadFileRes => {
							console.log(uploadFileRes);
							const { errCode, errMsg, data } = JSON.parse(uploadFileRes.data);
							uni.hideLoading();
							if (errCode == 0) {
								_self.userInfor.cid = data;
								console.log(_self.userInfor.cid);
								_self.src = baseURL + ':8080/ipfs/' + data;
								_self.putImg(data);
							} else {
								uni.showToast({
									title: errMsg,
									icon: 'none'
								});
							}
						},
						fail: err => {
							uni.showToast({
								title: err,
								icon: 'none'
							});
						}
					});
				}
			});
		},
		// user
		async getUserDtails() {
			const res = await this.$u.api.userApi.getUser();
			this.userInfor = res;
			this.src = baseURL + ':8080/ipfs/' + res.image;
		},
		// image
		async putImg(cid) {
			await this.$u.api.userApi.postUserImage({ image: cid });
		},
		// save
		async save() {
			let res;
			res = await this.$u.api.userApi.postUserNickname({ nickname: this.nikeName });
			// res = await this.$u.api.userApi.postUserNickname({ nickname: this.nikeName });
			// res = await this.$u.api.userApi.postUserNickname({ nickname: this.nikeName });
			this.show = false;
			this.userInfor.nikeName = nikeName;
		},
		showPop(num) {
			this.show = true;
			this.type = num;
		}
	}
};
</script>

<style lang="scss">
.user-infor {
	padding: 30rpx 20rpx;
	.box {
		background-color: #ffffff;
	}
}
</style>
