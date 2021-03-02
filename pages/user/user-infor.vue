<template>
	<view class="user-infor">
		<view class="box radius">
			<u-cell-group :border="false">
				<u-cell-item title="头像" :arrow="false">
					<view class="" slot="right-icon" >
						<u-avatar :size="130" :src="src" mode="circle" @click="goUser"></u-avatar>
					</view>
				</u-cell-item>
				<u-cell-item title="昵称" value="111"></u-cell-item>
				<u-cell-item title="性别" value="111"></u-cell-item>
				<u-cell-item title="手机号" value="13232131"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script></script>

<style lang="scss">
.user-infor {
	padding: 30rpx 20rpx;
	.box{
		background-color: #FFFFFF;
	}
}
</style>
