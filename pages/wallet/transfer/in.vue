<template>
    <view class="rollin-page-cont">
        <CoinBar img="https://s2.feixiaoquan.com/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp" :name="coinUpper" style="border-radius: 8upx" @click="$to('./coinFinance?c=' + coinUpper)"></CoinBar>
        <view class="charge_body bg-white">
            <view class="tip">
                <text class="gray">扫二维码，转入{{ coinUpper }}</text>
            </view>
            <view class="qrcode">
                <canvas canvas-id="qrcode" style="width: 240upx;height: 240upx;" />
            </view>
            <view class="tip">
                <text class="gray">我的地址</text>
            </view>
            <view class="address">
                {{ address }}
            </view>
            <view class="cp_addr">
                <Button line size="small" @click="$copy(address)">复制地址</Button>
            </view>
        </view>
        <view class="danger_text">
            <text class="red">
                *本地址仅用于接收{{ coinUpper }}，请勿将其他资产转入本地址
            </text>
        </view>
    </view>
</template>
<script>
import uQRCode from '../../../lib/uQrcode'
import accountActions from '../../../actions/account'
export default {
    data () {
        return {
            coin: '',
            address:'',
            qrcodePath: ''
        }
    },
    onLoad ({c}) {
        this.coin = c;
        const { address } = accountActions.get()
        this.address = address;
        uQRCode.make({
            canvasId: 'qrcode',
            componentInstance: this,
            text: address,
            margin: 10,
            size: 120,
            backgroundColor: '#ffffff',
            foregroundColor: '#000000',
            fileType: 'jpg',
            errorCorrectLevel: uQRCode.errorCorrectLevel.H,
        })
    },
    computed: {
        coinUpper () {
            return this.coin.toUpperCase()
        }
    },
    methods: {
        copyHandle () {

        }
    }
}
</script>
<style lang="scss" scoped>
    .rollin-page-cont {
        padding: 20upx 30upx;
        .charge_body {
            margin-top: 40upx;
            padding: 20upx;
            border-radius: 8upx;
            .tip {
                line-height: 96upx;
                font-size: 26upx;
                text-align: center;
            }
            .qrcode {
                padding: 16upx 0;
                text-align: center;
                display: flex;
                justify-content: center;
                image {
                    width: 220upx;
                    height: 220upx;
                }
            }
            .address {
                padding: 20upx;
                word-break: break-all;
                font-size: 28upx;
                line-height: 50upx;
                color: #747474;
            }
            .cp_addr {
                text-align: center;
            }
        }
        .danger_text {
            font-size: 26upx;
            line-height: 120upx;
        }
    }
</style>