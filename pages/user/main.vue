<template>
	<view class="user">
		<u-navbar back-icon-name="setting" :custom-back="goSetting" :border-bottom="false" back-icon-color="#fff"  :background="background">
			<view class="nav-right" slot="right">
				<u-icon class="u-m-r-10" name="star" color="#fff" size="38"></u-icon>
				<u-icon name="grid" color="#fff" size="38"></u-icon>
			</view>
		</u-navbar>
		<!-- 用户信息 -->
		<view class="user-infor">
			<!-- 头像 -->
			<view class="u-flex">
				<u-avatar :size="130" :src="src" mode="circle" @click="goUser"></u-avatar>
				<view class="u-m-l-20" v-if="userInfor.id">
					<view class="">{{ userInfor.nickname || '未设置昵称' }}</view>
					<!-- <view class="">角色</view> -->
				</view>
				<view class="u-m-l-20" v-else>登录/注册</view>
				<view class="u-m-l-a">
					<u-button type="primary" ripple shape="circle" size="mini" :custom-style="customStyle">
						<text>个人主页</text>
						<u-icon name="arrow-right" color="#933f40" size="24"></u-icon>
					</u-button>
				</view>
			</view>
			<!-- 充币 -->
			<view class="u-flex u-row-between money-action">
				<view class="money-action-item" v-for="(item, index) in moneyAction" :key="index" @click="goTransfer(item.url)">{{ item.title }}</view>
			</view>
		</view>
		<!-- 我的钱包 -->
		<my-card title="我的钱包" class="my-active" @head-click="goMoneyBag">
			<view class="money-bag">
				<view class="title">般若钻余额（BUD）</view>
				<view class="money">{{ balance }}</view>
				<view class="title">钱包地址</view>
				<view class="adezrss">{{ userInfor.account }}</view>
			</view>
			<!-- card 购买 出售 -->
			<view class="u-flex u-row-center user-buy">
				<u-button type="primary" ripple shape="circle" size="medium" :custom-style="{ background: '#fcf3df', width: '200rpx', height: '60rpx', color: '#111' }">
					购买（BUD）
				</u-button>
				<u-button type="primary" ripple shape="circle" size="medium" :custom-style="{ background: '#fcf0ef', width: '200rpx', height: '60rpx', color: '#111' }">
					出售（BUD）
				</u-button>
			</view>
		</my-card>
		<!-- 我的善举活动 -->
		<my-card title="我的善举活动" class="my-active">
			<u-grid :col="5" :border="false">
				<u-grid-item v-for="item in tabList" :key="item.id" :custom-style="{ padding: '40rpx 0rpx 20rpx' }">
					<u-icon name="star" :size="46"></u-icon>
					<view class="grid-text">{{ item.title }}</view>
				</u-grid-item>
			</u-grid>
		</my-card>
		<!-- 我的创作 -->
		<my-card title="我的创作" class="my-active">
			<u-grid :col="produceList.length" :border="false">
				<u-grid-item v-for="item in produceList" :key="item.id" :custom-style="{ padding: '40rpx 0rpx 20rpx' }">
					<u-icon name="star" :size="46"></u-icon>
					<view class="grid-text">{{ item.title }}</view>
				</u-grid-item>
			</u-grid>
		</my-card>
		<!-- cell 菜单 -->
		<cell-list />
	</view>
</template>
<script>
import myCard from './components/card.vue';
import cellList from './components/bottom-cell.vue';
export default {
	components: { myCard, cellList },
	data() {
		return {
			toolbarOpacity: 0,
			src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			customStyle: {
				width: '160rpx',
				background: '#fcf1e2',
				color: '#933f40'
			},
			moneyAction: [{ title: '充币', url: '' }, { title: '提币', url: '' }, { title: '划转', url: '' }, { title: '明细', url: '/pages/wallet/records/records' }],
			tabList: [
				{ title: '处理中', url: '', id: 1, icon: 'lock' },
				{ title: '上传凭证', url: '', id: 2, icon: 'lock' },
				{ title: '审核', url: '', id: 3, icon: 'lock' },
				{ title: '待评价', url: '', id: 4, icon: 'lock' },
				{ title: '全部订单', url: '', id: 5, icon: 'lock' }
			],
			produceList: [
				{ title: '我的作品', url: '', id: 1, icon: 'lock' },
				{ title: '点赞视频', url: '', id: 2, icon: 'lock' },
				{ title: '我的关注', url: '', id: 3, icon: 'lock' },
				{ title: '我的粉丝', url: '', id: 4, icon: 'lock' }
			],
			userInfor: '',
			balance: 0
		};
	},
	computed: {
		background() {
			let obj = {
				backgroundColor:'#943f3e'// `rgba(147,63,64,${this.toolbarOpacity})`
			};
			return obj;
		}
	},
	onLoad() {
		this.getUserDtails();
	},
	onPageScroll(e) {
		let t = e.scrollTop / 50;
		if (t < 0.0) {
			t = 0.0;
		} else if (t > 1.0) {
			t = 1.0;
		}
		this.toolbarOpacity = t;
	},
	methods: {
		goSetting() {
			uni.navigateTo({
				url: '/pages/user/setting'
			});
		},
		goMoneyBag() {
			uni.navigateTo({
				url: '/pages/wallet/transfer/coinFinance'
			});
		},
		goTransfer(url) {
			uni.navigateTo({
				url: url
			});
		},
		goUser() {
			uni.navigateTo({
				url: '/pages/user/user-infor'
			});
		},
		// user
		async getUserDtails() {
			const res = await this.$u.api.userApi.getUser();
			this.userInfor = res;
			this.getBalance(res.account);
		},
		// balance
		async getBalance(account) {
			const balance = await this.$u.api.walletApi.getBalance(account);
			this.balance = balance;
		}
	}
};
</script>
<style lang="scss">
.user {
	padding-bottom: 20rpx;
	.nav-right {
		padding-right: 24rpx;
	}
	.user-infor {
		padding: 10rpx 30rpx 30rpx;
		height: 300rpx;
		background-color: #943f3e;
		font-size: 28rpx;
		color: #ffffff;
		position: relative;
		.money-action {
			margin-top: 40rpx;
			.money-action-item {
				background-color: rgba(112, 47, 50, 0.5);
				padding: 10rpx 40rpx;
				border: 1rpx solid rgba(255, 255, 255, 0.2);
				border-radius: 10rpx;
				font-size: 26rpx;
			}
		}
	}
	.money-bag {
		margin: 20rpx;
		.title {
			font-size: 26rpx;
			color: #111;
			margin-bottom: 4rpx;
		}
		.money {
			font-size: 32rpx;
			margin-bottom: 20rpx;
			color: #943f3e;
		}
		.adezrss {
			font-size: 24rpx;
			word-break: break-all;
		}
	}
	.user-buy {
		.box {
			padding: 10rpx 24rpx;
			font-size: 26rpx;
			color: #111;
			border-radius: 10rpx;
			background-color: #fcf3df;
			text-align: center;
			border-radius: 30rpx;
		}
		.box-sell {
			background-color: #fcf0ef;
			margin-left: 100rpx;
		}
	}
	.my-active {
		margin: 20rpx 30rpx 0;
		/deep/.grid-text {
			padding-top: 10rpx;
			font-size: 24rpx;
			color: #999;
		}
	}
}
</style>
