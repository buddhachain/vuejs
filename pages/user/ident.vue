<template>
	<view class="iden">
		<u-alert-tips type="primary" :description="alertTitle"></u-alert-tips>
		<view class="u-flex iden-list">
			<view class="name">法号称谓：</view>
			<input type="text" v-model="creditcode" class="input-box" />
		</view>
		<!-- 	<view class="u-flex u-col-top  iden-list">
			<view class="name">善行描述：</view>
			<textarea type="text" value="" class="input-box" />
		</view>
		<view class="u-flex iden-list">
			<view class="name">善行价格：</view>
			<input type="text" value="" class="input-box" />
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
			<view class="name">戒牒照片：</view>
			<view class="">
				<view class="u-m-b-20 dis">仅用于认证，不公开</view>
				<u-image v-if="src!=''" width="200rpx" height="200rpx" :src="src" @click="chooseImg"></u-image>
				<view v-else class="img-box" @click="chooseImg">
					<u-icon name="plus" color="#999" size="32"></u-icon>
				</view>
			</view>
		</view>
		<view class="u-flex u-col-top iden-list">
			<view class="name">自我介绍：</view>
			<view>
				<view class="u-m-b-20 dis">向他人展示您自己的文字说明</view>
				<textarea type="text" value="" class="input-box" style="width: 530rpx;" />
			</view>
		</view>
		<view class="u-m-30 u-m-t-80">
			<u-button type="primary" ripple @click="applyMaster" :custom-style="{ height: '80rpx', color: '#fff' }">申请认证</u-button>
		</view>
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
			src: '',
			creditcode: '',
			proof: ''
		};
	},
	methods: {
		async applyMaster() {
			if (this.creditcode == '' || this.proof == '') {
				uni.showToast({
					title: '请填写完整信息!',
					icon: 'none'
				});
				return;
			}
			await invoke('apply_master', { creditcode: this.creditcode, proof: this.proof }, '0');
			this.src = '';
			this.creditcode = '';
			this.proof = '';
		},
		async chooseImg() {
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.showLoading({
						title: '上传中'
					});
					uploadImg(tempFilePaths).then(res => {
						this.src = baseURL + ':8080/ipfs/' + res;
						this.proof = res;
					});
				}
			});
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
		.img-box{
			width: 200rpx;
			height: 200rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #f3f4f6;
		}
	}
}
</style>
