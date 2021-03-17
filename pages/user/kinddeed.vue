<template>
	<view class="iden">
		<!-- <u-alert-tips type="primary" :description="alertTitle"></u-alert-tips> -->
		<view class="u-flex iden-list">
			<view class="name">善行名称：</view>
			<input type="text" v-model="formData.name" class="input-box" />
		</view>
		<view class="u-flex iden-list">
			<view class="name">善行id：</view>
			<input type="text" v-model="formData.id" class="input-box" />
		</view>
		<view class="u-flex u-col-top  iden-list">
			<view class="name">善行类型：</view>
			<input type="text" v-model="formData.type" disabled class="input-box" />
		</view>
		<!-- 	<view class="u-flex iden-list">
			<view class="name">善行价格：</view>
			<input type="text" v-model="formData." class="input-box" />
		</view>
		<view class="u-flex iden-list">
			<view class="name">善行数量：</view>
			<input type="text" value="" class="input-box" />
		</view> -->
		<!-- 		<view class="u-flex u-col-top iden-list">
			<view class="name">真人头像：</view>
			<view class="">
				<view class="u-m-b-20 dis">照片需清晰，美观，用于像信众展示</view>
				<u-image width="200rpx" height="200rpx" :src="src"></u-image>
			</view>
		</view> -->
		<view class="u-flex u-col-top iden-list">
			<view class="name">善行照片：</view>
			<view class="">
				<view class="u-m-b-20 dis">用于善行展示</view>
				<view class="img-box" @click="chooseImg"><u-icon name="plus" color="#999" size="32"></u-icon></view>
			</view>
		</view>
		<view class="image-list">
			<u-image width="110rpx" height="110rpx" class="u-m-r-20 u-m-b-20" :key="index" v-for="(item, index) in formData.detail" :src="src(item.hash)"></u-image>
		</view>
		<view class="u-flex iden-list">
			<view class="name">善行类别：</view>
			<!-- <input type="text" value="" class="input-box" /> -->
			<u-button ripple @click="show = true" plain class="u-flex-1" :custom-style="{ height: '60rpx' }">添加</u-button>
		</view>

		<view class=""><u-tag class="u-m-r-10 u-m-t-20" :text="item.desc + ' / ' + item.price" v-for="(item, index) in formData.spec" :key="index" type="primary" /></view>
		<view class="u-m-t-80">
			<u-button type="primary" ripple @click="addKinddeed" :custom-style="{height: '80rpx', color: '#fff' }">提交</u-button>
		</view>
		<u-popup v-model="show" mode="center" border-radius="14" width="600rpx" height="600rpx">
			<view class="u-p-20 u-p-t-60">
				<u-field v-model="spec.desc" label="描述:" label-width="80" placeholder="请填写描述" type="textarea"></u-field>
				<u-field v-model="spec.price" label="价格:" label-width="80" placeholder="请填写价格"></u-field>
				<view class="u-flex u-m-t-60">
					<u-button
						type="primary"
						:disabled="spec.desc == '' || spec.price == ''"
						ripple
						@click="add"
						size="mini"
						:custom-style="{ width: '200rpx', height: '60rpx', color: '#fff' }"
					>
						添加
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import { uploadImg } from '@/lib/common.js';
import { baseURL } from '@/service/env.js';
import { invoke } from '@/lib/XuperChainSdk.js';
export default {
	data() {
		return {
			alertTitle: '共得是100%真实的法师社区,我们需要先认证您的法师身份,通过审核后才能开始正式使用。',
			creditcode: '',
			proof: '',
			formData: {
				id: '',
				name: '',
				type: '1',
				lasttime: '',
				detail: [],
				spec: []
			},
			show: false,
			spec: {
				desc: '',
				price: '',
				sequence: ''
			}
		};
	},
	onLoad() {
		this.formData.id = this.$getRandom(1000, 10000000, 6)[0];
		this.getTypeList();
	},
	methods: {
		async getTypeList() {
			const res = await invoke('list_kinddeedtype', {}, '0');
		},
		async addKinddeed() {
			console.log(this.formData);
			this.formData.lasttime = new Date().getTime();
			if (this.formData.id == '' || this.formData.name == ''  || this.formData.detail.length == 0 || this.formData.spec.length == 0) {
				uni.showToast({
					title: '请填写完整信息!',
					icon: 'none'
				});
				return;
			}
			let obj = this.$u.deepClone(this.formData);
			obj.detail = JSON.stringify(obj.detail)
			obj.spec = JSON.stringify(obj.spec)
			console.log(obj);
			await invoke('add_kinddeed', obj, '0');
			uni.showToast({
				title:'添加成功'
			})
			setTimeout(()=>{
				uni.navigateBack()
			},800)
		},
		src(url) {
			return baseURL + ':8080/ipfs/' + url;
		},
		async chooseImg() {
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.showLoading({
						title: '上传中'
					});
					uploadImg(tempFilePaths).then(res => {
						console.log(res);
						this.formData.detail.push({ sequence: JSON.stringify(this.formData.detail.length + 1), hash: res });
					});
				}
			});
		},
		add() {
			this.spec.sequence = JSON.stringify(this.formData.spec.length + 1);
			this.formData.spec.push(this.spec);
			this.spec = {
				desc: '',
				price: '',
				sequence: ''
			};
			this.show = false;
		}
	}
};
</script>

<style lang="scss">
.iden {
	padding: 30rpx 20rpx;
	.iden-list {
		margin-top: 20rpx;
		// align-items: flex-start;
		.name {
			font-size: 28rpx;
			color: #4b485a;
			margin-right: 20rpx;
			flex-shrink: 0;
			min-width: 150rpx;
		}
		.input-box {
			background-color: #eaecf7;
			border-radius: 4rpx;
			padding: 10rpx;
			flex: 1;
			font-size: 28rpx;
			max-height: 110rpx;
		}
		.dis {
			color: #999;
			font-size: 28rpx;
		}
		.img-box {
			width: 200rpx;
			height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #eaecf7;
		}
	}
	.image-list {
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		margin-right: -20rpx;
		// justify-content: space-around;
	}
}
</style>
