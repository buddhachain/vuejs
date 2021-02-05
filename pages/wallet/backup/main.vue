<template>
    <view class="page-cont backup-mnemonic">
        <view class="main_body bg-white shadow">
            <view class="body_title">
                佛界&nbsp;钱包{{ actionsItem.text }}已{{ actionsItem.action_text }}
            </view>
            <view class="cont">
                <view class="tip gray">
                    请妥善备份好您的{{ actionsItem.text }}，用于恢复您的佛界钱包
                </view>
                <view class="tip gray">
                    佛界钱包不会为您保存{{ actionsItem.text }}
                </view>
                <view class="mnemonic_list" v-if="type === _actions._mnemonic.type">
                    <view class="_row" v-for="(arr, i) in mnemonicArr" :key="i">
                        <view class="_item" v-for="(str, i) in arr" :key="i">{{ str }}</view>
                    </view>
                </view>
                <view class="priv_key" v-if="type === _actions._privateKey.type">
                    <view class="prv_key_inner">
                        0xasjdasfhasfasfyuaysfayagasyuYGAYSGFAUSFyasudygasuygdUGASjf17221
                    </view>
                </view>
                <view style="height: 30upx"></view>
            </view>
        </view>
        <view class="img_tips">
            <view class="_row">
                <view class="_item">
                    <image src="../../../static/pages/backup/img-tip-1.jpg" mode="" />
                    <view class="text">请勿拍照/截屏</view>
                </view>
                <view class="_item">
                    <image src="../../../static/pages/backup/img-tip-2.jpg" mode="" />
                    <view class="text">请勿使用网络传输</view>
                </view>
            </view>
            <view class="_row">
                <view class="_item">
                    <image src="../../../static/pages/backup/img-tip-3.jpg" mode="" />
                    <view class="text">请勿告知他人</view>
                </view>
                <view class="_item green">
                    <image src="../../../static/pages/backup/img-tip-4.jpg" mode="" />
                    <view class="text">使用纸笔抄录下来</view>
                </view>
            </view>
        </view>
        <view class="page_footer_wrap bg-white">
            <Button long v-if="_actions._mnemonic.type === this.type" @click="nextStep">下一步</Button>
            <Button long v-else-if="_actions._privateKey.type === this.type">完成</Button>
        </view>
        <CheckPasswd @success="successhandle"/>
    </view>
</template>
<script>
import Qs from 'qs'
import { actions, getTipItem } from './actions'
import { random } from '../../../lib/common'
import CheckPasswd from '../../../components/CheckPasswd'
export default {
    components: {
        CheckPasswd
    },
    data () {
        return {
            type: actions._mnemonic.type,
            accountModel: {}
        }
    },
    onLoad ({ type }) {
        type = Number(type)
        const typeArr = Object.keys(actions).map(_key => (actions[_key].type));
        const _index = typeArr.findIndex(t => t === type);
        if (_index > -1) {
            this.type = type;
        } else {
            this.type = typeArr[0];
        }
        uni.setNavigationBarTitle({
            title: getTipItem(this.type).title
        });
        if (this.type === 1) {
            // this.accountModel = xsdk.createAccount(
            //     Language.English,
            //     Strength.Middle,
            //     Cryptography.EccFIPS
            // );
            // console.log(xsdk.accountIns.create( Language.English,
            //     Strength.Middle,
            //     Cryptography.EccFIPS))
            //     console.log(xsdk.accountIns)
        }
    },
    computed: {
        _actions () {
            return actions
        },
        actionsItem () {
            return getTipItem(this.type)
        },
        mnemonicArr () {
            if (!this.accountModel.mnemonic) {
                return [[]]
            }
            const mnemonic = this.accountModel.mnemonic;
            const memicArr = mnemonic.split(' ')
            const len = Math.ceil(memicArr.length / 3)
            let mnemonicArr = []
            for (let i = 0; i < len; i++) {
                mnemonicArr.push(memicArr.splice(0, 3))
            }
            return mnemonicArr
        }
    },
    methods: {
        successhandle (passwd) {
            // 验证密码成功
        },
        nextStep () {
            const random = this.getRandom()
            const obj = {}
            random.forEach(i => {
                obj[i + 1] = this.accountModel.mnemonic.split(' ')[i]
            })
            const str = Qs.stringify(obj)
            console.log(obj)
            // this.$to('/pages/wallet/backup/verify?q=' + aesEncrypt(str, passwordActions.get().substr(0, 8)))
        },
        getRandom () {
            let arr = []
            while (arr.length < 3) {
                const num = random(0, this.accountModel.mnemonic.split(' ').length)
                if (arr.indexOf(num) === -1) {
                    arr.push(num)
                }
            }
            return arr.sort((a, b) => a - b)
        }
    },
}
</script>
<style lang="scss" scoped>
    .backup-mnemonic {
        padding: 30upx;
        border-radius: 8upx;
        .main_body {
            margin-bottom: 80upx;
            .body_title {
                line-height: 100upx;
                border-bottom: 2upx solid #f7f6fb;
                text-align: center;
                font-weight: bold;
                font-size: 28upx;
                color: #262626;
            }
            .tip {
                line-height: 50upx;
                font-size: 26upx;
            }
            .cont {
                padding: 0 20upx;
            }
            .mnemonic_list {
                padding: 20upx 0;
                ._row {
                    display: flex;
                    justify-content: space-between;
                    height: 60upx;
                    margin-bottom: 20upx;
                    ._item {
                        line-height: 60upx;
                        height: 100%;
                        width: 180upx;
                        text-align: center;
                        font-size: 26upx;
                        color: #575757;
                        background: #efefef;
                        border-radius: 4upx;
                    }
                }
            }
            .priv_key {
                background: #efefef;
                padding: 20upx;
                font-size: 28upx;
                color: #4f4f4f;
                word-break: break-all;
                margin-bottom: 30upx;
                .prv_key_inner {
                    line-height: 50upx;
                }
            }
           
        }
         .img_tips {
                padding-bottom: 140upx;
                ._row {
                    display: flex;
                    &:first-child {
                        margin-bottom: 40upx;
                    }
                    ._item {
                        border: 1upx solid #ad3920;
                        flex: 1;
                        &:first-child {
                            margin-right: 36upx;
                        }
                        height: 164upx;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        image {
                            width: 66upx;
                            height: 66upx;
                        }
                        view.text {
                            font-size: 26upx;
                            line-height: 40upx;
                            color: #ad3920;

                        }
                        &.green {
                            border-color: #397a50;
                            view.text {
                                color: #397a50;
                            }
                        }
                    }
                }
        }
        .next_btn_wrap {
            width: 80%;
            margin: 0 auto;
        }
    }
</style>  