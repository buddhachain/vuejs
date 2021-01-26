<template>
    <view class="tip-text-line">
        <slot></slot>
    </view>
</template>
<style lang="scss" scoped>
    .tip-text-line {
        max-width: 100%;
        position: relative;
        line-height: 60upx;
        font-size: 26upx;
        color: #4f4f4f;
        padding-left: 40upx;
        &::before {
            content: "";
            display: block;
            width: 20upx;
            height: 20upx;
            background: #fac426;
            position: absolute;
            top: 20upx;
            left: 0;
            border-radius: 50%;
        }
    }
</style>