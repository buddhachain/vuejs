<template>
    <button :class="`${type ? type : ''} ${disabled ? '_disabled' : ''} ${line ? '_line' : ''} _${ size} ${long ? '_long' : ''}`" v-bind="$attrs" @click="clickHandle">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: {
        size: {
            type:String,
            default: ''
        },
        long: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        line: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickHandle (e) {
            this.$emit('click', e)
        }
    },
}
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
        padding: 0 40upx;
        // disabled
        &._disabled {
            background: #ffdf7b;
            color: #bd9e5b;
        }
        &.button-hover {
            background: #ffdf7b;
            color: #bd9e5b;
        }
        &.white {
            background: #fff;
            color: #909090;
            &.button-hover {
                background: #ececec;
            }
        }
        // line
        &._line {
            background: none;
            border: 1upx solid #ffc829;
            color: #ffc829;
            &.button-hover {
                background: #f6f6f6;
            }
        }
        &._small {
            font-size: 26upx;
            line-height: 60upx;
        }
        &._long {
            width: 100%;
        }
    }
</style>