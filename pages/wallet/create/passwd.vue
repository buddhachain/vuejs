<template>
    <view class="c-passwd-page-cont">
        <view class="card_body bg-white radius shadow">
            <view class="_title _flex">
                <text>{{ title }}</text>
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
            <Button long :disabled="hasErrors" @click="confirmCreate()">确认创建</Button>
        </view>
        <CheckPasswd v-if="isShowCheckPassword" title="原钱包密码" @success="confirmCreate"/>
    </view>
</template>
<script>
import { xuperSDK, createAccount } from '../../../lib/XuperChainSdk'
import passwordActions from '../../../actions/password'
import accountActions from '../../../actions/account'
import account from '../../../actions/account'
export default {
    data () {
        return {
            passwd:'',
            confirm: '',
            passwdErrMsg: '',
            confirmErrMsg: '',
            text: '',
            isShowPasswd: true,
            type: 1,
            isShowCheckPassword: false
        }
    },
    computed: {
        hasErrors () {
            return Boolean(this.passwdErrMsg) || Boolean(this.confirmErrMsg) || (!Boolean(this.passwd) || this.passwd.length < 8) || (!Boolean(this.confirm) || this.confirm.length < 8)
        },
        title () {
            return this.type === 1 ? '设置钱包密码' : '修改钱包密码'
        }
    },
    onLoad ({t=1}) {
        this.type = Number(t)  
        if (this.type === 2) {
            uni.setNavigationBarTitle({
                title: '修改钱包密码'
            });
        }
    },
    watch: {
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
        },
        successhandle (passwd) {

        }
    },
    methods: {
        confirmCreate (oldPasswd) {
            if (this.hasErrors) return;
            if (this.type === 2 && !oldPasswd) {
                return this.isShowCheckPassword = true;
            }
            passwordActions.set(this.passwd);
            if (this.type === 1) {
                // 此处应该先创建钱包， 使用用户设置的密码将助记词加密后存储到本地；
                const account = createAccount()
                accountActions.save(account, this.passwd)
                this.$to('/pages/wallet/transfer/coinFinance?c=bud')
            } else if (this.type === 2) {
                // 如果是修改钱包密码
                // 应该先取出使用旧密码加密过的
                const { mnemonic_lock, address } = accountActions.get()
                const mnemonic = accountActions.deCrypt(mnemonic_lock, oldPasswd)
                // 使用新密码加密后存储
                accountActions.save({
                    mnemonic,
                    address
                }, this.passwd)
                // 修改成功
                this.$toastSucc('修改成功', () => {
                    this.passwd = '';
                    this.confirm = '';
                    uni.navigateBack({
                         delta: 2
                    });
                })
            }
          
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