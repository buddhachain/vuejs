<template>
    <view class="check_passwd_modal">
        <view class="content bg-white radius">
            <view class="_title">{{ title }}</view>
            <view class="_body">
                <Input v-model="passwd" :password="true" placeholder="密码" bg="white" @input="$onInput($event, 'passwd')"/>
            </view>
            <view class="_footer">
                <button @click="confirmHandle">确定</button>
            </view>
        </view>
    </view>
</template>
<script>
import PasswordActions from '../actions/password'
export default {
    data () {
        return {
            passwd: ''
        }
    },
    props: {
        title: {
            type: String,
            default: '输入钱包密码'
        }
    },
    methods: {
        confirmHandle () {
            if (!this.passwd) {
                return this.$toast('请输入密码')
            }
            const res = PasswordActions.check(this.passwd)
            if (!res) {
                return this.$toast('密码错误')
            }
            this.$emit('success', this.passwd)
            this.passwd = ''
        }
    },
}
</script>
<style lang="scss" scoped>
    .check_passwd_modal {
        height: 100vh;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 999;
        background: rgba($color: #000000, $alpha: .4);
        .content {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            width: 80%;
            height: 280upx;
            ._title {
                height: 80upx;
                font-size: 28upx;
                text-align: center;
                line-height: 80upx;
                border-bottom: 1upx solid #cecece;
            }
            ._body {
                padding: 20upx;
            }
             ._footer {
                 border-top: 1upx solid #cecece;
                 button {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    line-height: 80upx;
                    border: none;
                    background: none;
                    color: #f5a34f;
                    font-size: 28upx;
                     &::after {
                         border: none;
                     }
                     &.button-hover {
                         background: rgba($color: #000000, $alpha: .1);
                     }
                 }
            }
        }
       
    }
</style>