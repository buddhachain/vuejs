<template>
    <view class="coin_bar bg-white shadow" @click="clickHandle">
        <view class="_l">
            <image :src="$attrs.img" mode="image" />
            <view>{{ $attrs.name }}</view>
        </view>
		<u-icon name="arrow-right" color="#999" size="28"></u-icon>
    </view>
</template>
<script>
export default {
    methods: {
        clickHandle (e) {
            this.$emit('click', e)
        }
    }
}
</script>
<style lang="scss" scoped>
    .coin_bar {
        height: 100upx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40upx;
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