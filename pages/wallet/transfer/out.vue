<template>
    <view class="rollout-page-cont">
        <CoinBar img="https://s2.feixiaoquan.com/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp" :name="coinUpper" style="border-radius: 8upx" @click="$to('./coinFinance?c=' + coinUpper)"></CoinBar>
        <view class="transfer-form shadow radius bg-white">
            <!-- addr -->
            <view class="form-group">
                <view class="label">
                    <text>转出地址</text>
                    <text class="icon">ICON</text>
                </view>
                <Input placeholder="输入或长按粘贴地址"/>
            </view>
             <!-- quantity -->
            <view class="form-group">
                <view class="label">
                    <text>转出数量</text>
                    <text class="yellow">全部转出</text>
                </view>
                <Input placeholder="输入或长按粘贴地址"/>
            </view>
            <view class="gas">
                <text class="gray">矿工费：{{ gas }}</text>
                <text class="coin_name gray">{{ coinUpper }}</text>
            </view>
        </view>
        <!-- passwd -->
        <view class="transfer-form passwd-form shadow radius bg-white">
            <!-- passwd -->
            <view class="label">
                <text>验证钱包密码</text>
            </view>
            <Input placeholder="输入佛界钱包密码"/>
        </view>
        <view class="tip">
            <text class="red">*转账时请注意核对地址，资产一旦转出将无法找回</text>
        </view>
        <view class="page_footer_wrap">
            <view class="btn_wrap">
                <Button long>确定转出</Button>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data () {
        return {
            gas: 0.0001,
            coin: 'bud'
        }
    },
    computed: {
        coinUpper () {
            return this.coin.toUpperCase()
        }
    },
    onLoad ({ c }) {
        if (c) {
            this.coin = c;
        }
    }
}
</script>
<style lang="scss" scoped>
    .rollout-page-cont {
        padding: 30upx;
        .transfer-form {
            padding: 40upx;
            margin: 44upx 0;
            .form-group {
                margin-bottom: 50upx;
            }
            .label {
                font-size: 28upx;
                line-height: 28upx;
                margin-bottom: 36upx;
                display: flex;
                justify-content: space-between;
                text:last-child {
                    font-size: 26upx;
                }
            }
            .gas {
                font-size: 26upx;
                .coin_name {
                    padding: 20upx;
                }
            }
        }
        .tip {
            font-size: 26upx;
        }
    }
</style>