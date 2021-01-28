<template>
    <view class="card_wrap bg-white shadow radius">
        <view class="body_title">
            {{ title }}
        </view>
        <view class="cont">
           <slot>
           </slot>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
    .card_wrap {
        .body_title {
            line-height: 100upx;
            border-bottom: 2upx solid #f7f6fb;
            text-align: center;
            font-weight: bold;
            font-size: 28upx;
            color: #262626;
        }
        .tip {
            line-height: 50upx;
            font-size: 26upx;
        }
        .cont {
            padding: 0 20upx;
        }
    }
</style>