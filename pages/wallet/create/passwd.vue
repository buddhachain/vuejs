<template>
    <view class="c-passwd-page-cont">
        <view class="card_body bg-white radius shadow">
            <view class="_title _flex">
                <text>设置钱包密码</text>
                <view class="image_wrap">
                    <image v-show="isShowPasswd === false" @click="isShowPasswd = true" src="../../../static/icons/attention.png" mode="" />
                    <image v-show="isShowPasswd === true" @click="isShowPasswd = false" src="../../../static/icons/attention_forbid.png" mode="" />
                </view>
                
            </view>
            <view class="passwd-ipt">
                <Input :value="passwd" type="text" :password="isShowPasswd" placeholder="数字和大小写字母，不少于8位" radius confirm-type="next" :errmsg="passwdErrMsg" @input="$onInput($event, 'passwd')"/>
            </view>
            <view class="passwd-ipt">
                <Input :value="confirm" type="text" :password="isShowPasswd" placeholder="再次输入您设置的佛界钱包密码" radius confirm-type="done" :errmsg="confirmErrMsg" @input="$onInput($event, 'confirm')"/>
            </view>
        </view>
        <view class="tips">
            <view>
                <text class="red">*钱包密码用于保护您的私钥，建议设置足够强度的密码</text>
            </view>
             <view>
                <text class="red">*钱包密码丢失将无法找回，请务必牢记您设置的密码</text>
            </view>
        </view>
        <view class="confirm_btn btn_wrap">
            <Button long :disabled="hasErrors" @click="confirmCreate">确认创建</Button>
        </view>
    </view>
</template>
<script>
import passwordActions from '../../../actions/password'
export default {
    data () {
        return {
            passwd:'',
            confirm: '',
            passwdErrMsg: '',
            confirmErrMsg: '',
            text: '',
            isShowPasswd: true
        }
    },
    computed: {
        hasErrors () {
            return Boolean(this.passwdErrMsg) || Boolean(this.confirmErrMsg) || (!Boolean(this.passwd) || this.passwd.length < 8) || (!Boolean(this.confirm) || this.confirm.length < 8)
        }
    },
    watch: {
        text(nV) {
            console.log(nV, 'nV')
        },
        passwd (nV) {
            if (/\d/.test(nV) && ( /[A-Z]/.test(nV) || /[a-z]/.test(nV))  && nV.length >= 8) {
                this.passwdErrMsg = ''
            } else {
                this.passwdErrMsg = '数字和大小写字母，不少于8位'
            }
        },
        confirm (nV) {
            if (this.confirm.length >= 8) {
                if (this.confirm !== this.passwd) {
                    this.confirmErrMsg = '两次输入不一致'
                } else {
                    this.confirmErrMsg = ''
                }
            }
        }
    },
    methods: {
        confirmCreate () {
            if (this.hasErrors) return;
            passwordActions.set(this.passwd);
            this.$to('/pages/wallet/backup/main?type=1')
        }
    },
}
</script>
<style lang="scss" scoped>
    .c-passwd-page-cont {
        padding: 40upx;
        .card_body {
            padding: 40upx;
            padding-bottom: 104upx;
            margin-bottom: 50upx;
            ._title {
                font-size: 28upx;
                line-height: 86upx;
                margin-bottom: 14upx;
                justify-content: space-between;
                align-items: center;
                >.image_wrap {
                    width: 50upx;
                    height: 50upx;
                    image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .passwd-ipt {
                margin-top: 40upx;
            }
        }
        .tips {
            >view {
                line-height: 52upx;
                font-size: 26upx;
            }
        }
        .confirm_btn {
            margin-top: 150upx;
        }
    }
</style>