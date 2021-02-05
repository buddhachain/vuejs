<template>
    <view class="import-page-cont">
        <view class="main_body bg-white">
            <view class="tab_wrap">
                <view class="tab_item" v-for="(text, i) in tabs" :key="i" @click="tabCurr = i" :class="{'bg-white active': tabCurr === i}">助记词导入</view>
            </view>
            <view class="content">
                 <view class="tip_text">
                    {{ tipText }}
                </view>
                <view class="input_area bg-none">
                    <textarea placeholder="请输入助记词，单词之间以空格分开" @input="$onInput($event, 'mnemonic')"></textarea>
                </view>
                 <view class="tip_text passwd">
                    <view>设置钱包密码</view>
                    <view class="image_wrap">
                        <image v-show="isPassword === false" @click="isPassword = true" src="../../../static/icons/attention.png" mode="" />
                        <image v-show="isPassword === true" @click="isPassword = false" src="../../../static/icons/attention_forbid.png" mode="" />
                    </view>
                </view>
                <view class="set_passwd">
                    <!-- <input type="text" :password="isPassword" placeholder="输入初始HD钱包密码，数字和大小写字母，不少于8位" @input="$onInput($event, 'password')"> -->
                    <Input :value="passwd" :border="false" type="text" :password="isPassword" placeholder="输入初始钱包密码，数字和大小写字母，不少于8位" radius confirm-type="next" :errmsg="passwderrmsg" @input="$onInput($event, 'passwd')"/>
                </view>
                 <view class="set_passwd">
                    <!-- <input type="text" :password="isPassword" placeholder="" @input="$onInput($event, 'confirm')"> -->
                    <Input :value="confirm" :border="false" type="text" :password="isPassword" placeholder="再次输入您设置的钱包密码" radius confirm-type="next" :errmsg="confirmerrmsg" @input="$onInput($event, 'confirm')"/>

                </view>
            </view>
           
        </view>
        <view class="tip_danger">
            <text class="red">
                *导入新钱包后现有<text>HD钱包</text>将被覆盖，请确保您已经备份了现有钱包数据
            </text>
        </view>
        <view class="page_footer_wrap bg-white btn_wrap" style="width:100%">
            <Button long style="width: 100%" @click="startHandle" :disabled="hasErrors">开始导入</Button>
        </view>
    </view>
</template>
<script>
import { xuperSDK, Language, Strength, Cryptography } from '../../../lib/XuperChainSdk'
import accountActions from '../../../actions/account'
import passwordActions from '../../../actions/password'
export default {
    data () {
        return {
            tabCurr: 0,
            tabs:['助记词导入', '私钥导入'],
            mnemonic: '',
            passwd: '',
            confirm: '',
            isPassword: true
        }
    },
    onLoad () {
        console.log(xuperSDK)
    },
    computed: {
        hasErrors () {
            return Boolean(this.passwderrmsg) || Boolean(this.confirmerrmsg) || (!Boolean(this.passwd) || this.passwd.length < 8) || (!Boolean(this.confirm) || this.confirm.length < 8) || this.mnemonic.length == 0
        },
        tipText () {
            if (this.tabCurr === 1) {
                return '请输入私钥明文'
            }
            return '请输入助记词'
        },
        passwderrmsg () {
            if (/\d/.test(this.passwd) && ( /[A-Z]/.test(this.passwd) || /[a-z]/.test(this.passwd))  && this.passwd.length >= 8) {
                return ''
            } else {
               return '数字和大小写字母，不少于8位'
            }
        },
        confirmerrmsg () {
            if (this.confirm.length >= 8) {
                if (this.confirm !== this.passwd) {
                    return '两次输入不一致'
                }
            }
            return ''
        }
    },
    methods: {
        startHandle () {
            const checkResult = xuperSDK.checkMnemonic(this.mnemonic, Language.English)
            if (!checkResult) {
                return this.$toast('助记词格式不正确')
            }
            uni.showLoading({
                title: '导入中...'
            });
            const accountModel = xuperSDK.revertAccount(this.mnemonic, Language.English, Cryptography.EccFIPS);
            accountActions.save(accountModel, this.passwd)
            passwordActions.set(this.passwd)
            uni.hideLoading();
            this.$toastSucc('导入成功！', () => {
                uni.redirectTo({
                    url: '/pages/wallet/index/index'
                });
            })
        }
    },
}
</script>
<style lang="scss" scoped>
    .import-page-cont {
        padding: 20upx 30upx;
        padding-bottom: 120upx;
        .main_body {
            border-radius: 10upx;
            padding-bottom: 30upx;
            box-shadow: 0 0 16upx 0upx #d7d7d7;
            margin-bottom: 50upx;
            .content {
                padding: 0 20upx;
            }
            .tab_wrap {
                background: #f6f7fb;
                margin-bottom: 20upx;
                .tab_item {
                    flex: 1;
                    text-align: center;
                    &:first-child {
                        border-top-left-radius: 10upx;
                    }
                    &:last-child {
                        border-top-right-radius: 10upx;
                    }
                    &.bg-white {
                        font-weight: bold;
                    }
                }
            }
            .tip_text {
                line-height: 144upx;
                font-size: 28upx;
                color: #757575;
                &.passwd {
                    line-height: initial;
                    padding: 20upx;
                    display: flex;
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
            }
            .input_area {
                margin-bottom: 52upx;
                padding: 10upx;
            }
            .set_passwd {
                margin-bottom: 50upx;
                height: 80upx;
                line-height: 80upx;
                input {
                    width: 100%;
                    height: 80upx;
                    font-size: 28upx;
                }
            }

        }
        .tip_danger {
            font-size: 28upx;
            line-height: 46upx;
        }
        .btn_wrap {
            width: 60%;
            margin: 0 auto;
            margin-top: 110upx;
        }
    }
</style>