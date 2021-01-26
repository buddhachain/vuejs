<template>
    <view class="coin_bar bg-white">
        <view class="_l">
            <image :src="$attrs.img" mode="image" />
            <view>{{ $attrs.name }}</view>
        </view>
        
        <view>></view>
    </view>
</template>
<style lang="scss" scoped>
    .coin_bar {
        height: 100upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20upx;
        ._l {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            image {
                width: 60upx;
                height: 60upx;
            }
            view {
                padding-left: 20upx;
                font-size: 36upx;                
                color: #272727;
            }
        }
    }
</style>