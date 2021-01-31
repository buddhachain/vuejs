<template>
    <view class="input_wrap" :class="`bg-${bg} ${radius ? 'radius' : ''}`">
        <input class="uni_ipt" :type="type" v-model="val" v-bind="$attrs"> 
    </view>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default:'text'
        },
        value: {
            type: String,
            default: ''
        },
        radius: {
            type:Boolean,
            default: false
        },
        bg: {
            type: String,
            default: 'none'
        }
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    data () {
        return {
            val:''
        }
    },
    watch: {
        val (nV) {
            this.$emit('change', nV)
        },
        value (nV) {
            this.val = nV
        }
    }
}
</script>
<style lang="scss" scoped>
.input_wrap {
    width: 100%;
    // background: #f6f7fb;
    line-height: 78upx;
    height: 80upx;
    padding: 0 10upx;
    box-sizing: content-box;
    border: 1px solid rgba(187, 187, 187, 100);
    .uni_ipt {
        border: 0;
        background: none;
        font-size: 28upx;
        outline: 0;
        width: 100%;
        height: 100%;
    }
}
    
</style>