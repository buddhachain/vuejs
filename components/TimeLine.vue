<template>
    <view class="time-line-item"  :class="{_high: isHigh}">
        <slot></slot>
        <view class="lines">
            <view class="desc">
                <view class="bg-white"></view>
            </view>
            <view class="line"></view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        isHigh: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="scss" scoped>
    .time-line-item {
        padding-left: 50upx;
        position: relative;
         &._high {
             .desc, .line {
                background: #f5a34f;
             }
        }
        .lines {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 30upx;
        }
        .desc {
            width: 32upx;
            height: 32upx;
            background: #cccccc;
            position: absolute;
            left: 0;
            top: 10upx;
            border-radius: 50%;
            z-index: 50;
            >view {
                width: 12upx;
                height: 12upx;
                border-radius: 50%;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }
        }
        .line {
            position: absolute;
            left: 14upx;
            width: 4upx;
            height: 100%;
            top: 0;
            z-index: 49;
            background: #ccc;
        }
    }
</style>