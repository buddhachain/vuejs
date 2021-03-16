<template>
	<view class="index-page-cont bg-white">
		<view class="model_title">
			<view>祈福佛事</view>
			<view class="gray">
				<text>更多</text>
				<u-icon class="u-m-l-4" name="arrow-right" color="#888888" size="28"></u-icon>
			</view>
		</view>
		<!-- list -->
		<view class="card_list bg-white">
			<view class="card_item" v-for="i in 10" :key="i" @click="goDetails()">
				<view class="banner"><image src="../../static/pages/app/banner.png" mode="" /></view>
				<view class="content">
					<view class="title">腊八节施粥</view>
					<view class="info"><text class="gray">恭迎释迦牟尼佛成道日，寒冬暖人心，龙天保佑幸福美满s</text></view>
					<view class="tag">
						<view>认供佛粥</view>
						<view>认供佛粥</view>
						<view>认供佛粥</view>
					</view>
					<view class="bom">
						<view class="addr">
							<image src="../../static/pages/app/icon/1.png" mode="" />
							<text class="gray">绍兴兴善寺</text>
						</view>
						<view class="count">
							<text class="gray">{{ 16 }}人参加</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import accountActions from '@/actions/account';
import { invoke } from '@/lib/XuperChainSdk.js';
export default {
	data() {
		return {};
	},
	onLoad() {
		const { address } = accountActions.get();
		if (!address) {
			uni.reLaunch({
				url: '/pages/wallet/index/index'
			});
		}else{
			this.getListType()
		}
	},
	methods: {
		goDetails() {
			uni.navigateTo({
				url: '/pages/app/activity/main'
			});
		},
		async getListType() {
			const res = await invoke('list_kinddeedtype', {}, '0');
			const list = await invoke('list_kinddeed', {}, '0');
		},
		
	}
};
</script>
<style lang="scss" scoped>
.index-page-cont {
	padding: 20upx;
	.model_title {
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		padding: 20upx 0;
		&,
		& > view {
			color: #101010;
			font-weight: bold;
		}
		> text {
			font-size: 26upx;
			font-weight: normal;
		}
	}
	.card_list {
		.card_item {
			margin-bottom: 20upx;
			display: flex;
			&:last-of-type {
				margin-bottom: 0;
			}
			.banner {
				width: 202upx;
				height: 262upx;
				flex-shrink: 0;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.content {
				flex: 1;
				margin-left: 20upx;
				> view {
					max-width: 100%;
				}
				.title {
					font-size: 32upx;
					color: #101010;
					line-height: 60upx;
				}
				.info {
					font-size: 28upx;
					line-height: 40upx;
					margin-bottom: 10upx;
				}
				.tag {
					display: flex;
					margin-bottom: 10upx;
					> view {
						font-size: 24upx;
						padding: 0 14upx;
						line-height: 40upx;
						margin-right: 10upx;
						background: rgba(248, 243, 239, 100);
						color: rgba(221, 198, 176, 100);
						&:last-child {
							margin-right: 0;
						}
					}
				}
				.bom {
					display: flex;
					font-size: 26upx;
					padding: 10upx 0upx;
					justify-content: space-between;
					image {
						width: 40upx;
						height: 40upx;
					}
					.addr {
						display: flex;
						align-items: center;
						image {
							margin-right: 10upx;
						}
					}
				}
			}
		}
	}
}
</style>
