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
                    <textarea v-model="mnemonic" placeholder="请输入助记词，单词之间以空格分开"></textarea>
                </view>
                 <view class="tip_text">
                    设置钱包密码
                </view>
                <view class="set_passwd bg-none">
                    <input type="text" placeholder="输入初始HD钱包密码，数字和大小写字母，不少于8位">
                </view>
                 <view class="set_passwd bg-none">
                    <input type="text" placeholder="再次输入您设置的HD钱包密码">
                </view>
            </view>
           
        </view>
        <view class="tip_danger">
            <text class="red">
                *导入新钱包后现有<text>HD钱包</text>将被覆盖，请确保您已经备份了现有钱包数据
            </text>
        </view>
        <view class="btn_wrap">
            <Button long style="width: 100%">开始导入</Button>
        </view>
    </view>
</template>
<script>
export default {
    data () {
        return {
            tabCurr: 0,
            tabs:['助记词导入', '私钥导入'],
            mnemonic: '',
        }
    },
    computed: {
        tipText () {
            if (this.tabCurr === 1) {
                return '请输入私钥明文'
            }
            return '请输入助记词'
        }
    }
}
</script>
<style lang="scss" scoped>
    .import-page-cont {
        padding: 20upx 30upx;
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
            }
            .input_area {
                margin-bottom: 52upx;
                padding: 10upx;
            }
            .set_passwd {
                margin-bottom: 50upx;
                height: 80upx;
                line-height: 80upx;
                padding: 0 10upx;
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