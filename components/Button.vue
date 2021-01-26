<template>
    <button v-bind="$attrs">
        <slot></slot>
    </button>
</template>
<script>
</script>
<style lang="scss" scoped>
    button {
        padding: 0;
        margin: 0;
        display: inline-block;
        padding: 0 20upx;
        background: #ffc829;
        color: #4d3700;
        border-radius: 8upx;
        line-height: 80upx;
        font-size: 34upx;
        border: none;
        width: 100%;
        &.button-hover {
            background: #ffdf7b;
        }
        &[type=white] {
            background: #fff;
            color: #909090;
            &.button-hover {
                background: #ececec;
            }
        }
    }
</style>