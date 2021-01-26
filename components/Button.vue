<template>
    <button v-bind="$attrs">
        <slot></slot>
    </button>
</template>
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
        &.button-hover {
            background: #ffdf7b;
        }
    }
</style>