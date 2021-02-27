<template>
	<view class="editor-page-cont">
		<view class="add_modal bg-white radius pd-20 _flex">
			<view class="_icon"><view class="">+</view></view>
			<view class="_text">
				<view class="_title">添加功德主</view>
				<view class="_info"><text class="gray">功德主资料将用于记录与反馈</text></view>
			</view>
		</view>
		<view class="form_modal bg-white radius pd-20">
			<view class="form">
				<view class="form-group">
					<view class="label">
						<view>
							<text>功德芳名</text>
							<text class="required">*</text>
						</view>
						<text class="icon">ICON</text>
					</view>
					<Input placeholder="请填写功德主姓名" bg="white" :radius="true" />
				</view>
				<view class=" form-group">
					<view class="label">
						<view>
							<text>心愿</text>
							<text class="required">*</text>
						</view>
						<text class="icon">ICON</text>
					</view>
					<view class="u-flex u-row-between radius form-wish" @click="showWishPop">
						<text>请填写您的心愿单</text>
						<u-icon name="arrow-right" color="grey" size="28"></u-icon>
					</view>
				</view>
				<view class="form-group">
					<view class="label">
						<view>
							<text>功德芳名</text>
							<text class="required">*</text>
						</view>
						<text class="icon">ICON</text>
					</view>
					<Input placeholder="请填写功德主姓名" bg="white" :radius="true" />
				</view>
				<!-- 提示文字 -->
				<u-alert-tips type="primary" :description="alertTitle"></u-alert-tips>
			</view>
		</view>
		<!-- 用户 -->
		<view class="u-m-t-20 u-flex u-row-between radius user-box">
			<view class="">
				<view class="u-flex u-p-b-10">
					<u-icon name="account-fill" color="#7192B9" size="32"></u-icon>
					<text class="user-name">匿名参与</text>
				</view>
				<view class="user-dis">对寺院、其他用户在参与记录中将隐藏您的名称</view>
			</view>
			<u-switch v-model="checked" size="26"></u-switch>
		</view>

		<view class="u-font-26 u-m-t-30 dis-box">
			<text>点击下一步表示已同意</text>
			<text class="dis">《佛界服务协议》</text>
		</view>

		<view class="u-m-t-50 u-flex btn-box">
			<view class="u-flex-1 left-btn">
				<text class="u-font-24">合计：</text>
				<text>508 BUD</text>
			</view>
			<view class="u-flex-1 right-btn" @click="goOrder">下一步</view>
		</view>

		<!-- 心愿弹窗选择 -->
		<u-popup v-model="wishPop" mode="center" :border-radius="8" :zoom="false" mask-close-able width="600rpx" closeable>
			<view class="wish">
				<view class="wish-title">写下您的心愿单</view>
				<view class="wish-textarea">
					<textarea v-model="wishText" placeholder-style="color:#999;font-size:28rpx" placeholder="请选择或填写您的心愿,佛菩萨保佑您早日心愿成真哦!" />
				</view>
				<view class="u-flex tags">
					<view class="tags-item radius" v-for="item in tagsList" :key="item.id">{{ item.title }}</view>
				</view>
				<view class="u-m-30 wish-move">
					<u-icon name="order" color="#7192B9" size="32"></u-icon>
					<view class="u-p-t-10">摇一摇 换一组</view>
				</view>
				<view class="u-flex u-row-between">
					<u-icon
						:name="isPublice ? 'checkmark-circle-fill' : 'close-circle'"
						color="#7192B9"
						size="28"
						label="公开"
						:label-size="24"
						label-color="#7192B9"
						@click="isPublice = !isPublice"
					></u-icon>
					<u-button type="primary" ripple shape="circle" size="medium" :custom-style="{ width: '200rpx' }">完成</u-button>
					<view style="width: 60rpx;"></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
export default {
	data() {
		return {
			alertTitle: '绿度母烟供法绿度母烟供法绿度母烟供法绿度母烟供法绿度母烟供法',
			checked: true,
			wishPop: false,
			wishText: '',
			tagsList: [
				{ title: '早日生娃', id: 1 },
				{ title: '早日生娃', id: 1 },
				{ title: '早日生娃', id: 1 },
				{ title: '早日生娃', id: 1 },
				{ title: '早日生娃', id: 1 },
				{ title: '早日生娃', id: 1 }
			],
			isPublice: true
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '佐仓罗布林寺-绿度母烟供法...'
		});
	},
	methods: {
		showWishPop() {
			this.wishPop = !this.wishPop;
		},
		// 订单支付
		goOrder() {
			uni.navigateTo({
				url: '/pages/app/activity/order'
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import '@/styles/app/editor.scss';
.user-box {
	background-color: #ffffff;
	padding: 20rpx 30rpx;
	.user-dis {
		font-size: 24rpx;
		color: $u-type-primary;
	}
	.user-name {
		font-size: 30rpx;
		margin-left: 8rpx;
		color: #111;
	}
}
.dis-box {
	color: #999999;
	.dis {
		color: $u-type-primary;
	}
}
.form-wish {
	background-color: #f8f8f8;
	padding: 50rpx 20rpx;
	border: 1rpx solid #f0f0f0;
	color: grey;
	font-size: 28rpx;
}
.btn-box {
	font-size: 36rpx;
	border-radius: 50rpx;
	border: 1rpx solid $u-type-primary;
	overflow: hidden;
	text-align: center;
	.left-btn {
		background-color: #ffffff;
		color: #9fb5ce;
		padding: 10rpx;
	}
	.right-btn {
		background-color: $u-type-primary;
		color: #ffffff;
		padding: 10rpx;
	}
}
.wish {
	padding: 20rpx;
	font-size: 28rpx;
	width: 600rpx;
	.wish-title {
		text-align: center;
		font-size: 32rpx;
		color: #111;
		margin-bottom: 30rpx;
	}
	.wish-textarea {
		background-color: #f8f8f8;
		border-radius: 8rpx;
		width: 560rpx;
		height: 240rpx;
	}
	textarea {
		width: 560rpx;
		padding: 10rpx;
		// height: 300rpx;
	}
	.tags {
		flex-wrap: wrap;
		margin-top: 10rpx;
	}
	.tags-item {
		background-color: $u-type-primary;
		font-size: 28rpx;
		color: #cdd8e5;
		margin-right: 20rpx;
		margin-top: 10rpx;
		padding: 10rpx 18rpx;
	}
	.wish-move {
		color: $u-type-primary;
		font-size: 24rpx;
		text-align: center;
	}
}
</style>
