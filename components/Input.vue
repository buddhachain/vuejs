<template>
    <view class="input_wrap" :class="`${isError ? '_error' : ''}`">
        <view class="input_inner" :class="`bg-${bg} ${radius ? 'radius' : ''} ${isActive ? '_active' :''} `">
            <input class="uni_ipt" @blur="activeChange(false)" @focus="activeChange(true)"  v-bind="$attrs" v-on="$listeners"> 
        </view>
        <view class="err_msg">
            <text class="red">{{ errmsg }}</text>
        </view>
    </view>
</template>
<script>
export default {
    inheritAttrs: false,
    props: {
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
        },
        errmsg: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            val:'',
            isActive: false
        }
    },
    watch: {
        value (nV) {
            this.val = nV
        }
    },
    computed: {
        isError () {
            return Boolean(this.errmsg)
        }
    },
    methods: {
        activeChange (flag) {
            this.isActive = flag
        }
    },
}
</script>
<style lang="scss" scoped>
.input_wrap {
     width: 100%;
    min-height: 80upx;
    box-sizing: border-box;
    .input_inner {
        width: 100%;
        line-height: 78upx;
        height: 80upx;
        padding: 0 10upx;
        box-sizing: content-box;
        border: 1px solid rgba(187, 187, 187, 100);
        transition: border linear .2s;
        &._active {
        border-color: #ffc829;
        }
        
    }
    &._error {
        .input_inner {
            border-color: #df646e;
        }
    }
   
    .uni_ipt {
        border: 0;
        background: none;
        font-size: 28upx;
        outline: 0;
        width: 100%;
        height: 100%;
    }
    .err_msg {
        font-size: 26upx;
        line-height: 36upx;
        padding: 0 10upx;
    }
}
    
</style>