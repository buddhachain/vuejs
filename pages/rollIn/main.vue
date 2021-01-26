<template>
    <view class="rollin-page-cont">
        <CoinBar img="https://s2.feixiaoquan.com/logo/1/bitcoin.png?x-oss-process=style/coin_36_webp" name="BTC" style="border-radius: 8upx"></CoinBar>
        <view class="charge_body bg-white">
            <view class="tip">
                <text class="gray">扫二维码，转入BTC</text>
            </view>
            <view class="qrcode">
                <image src="../../static/pages/recharge/qr.jpg" mode="" />
            </view>
            <view class="tip">
                <text class="gray">我的地址</text>
            </view>
            <view class="address">
                0xasjdasfhasfasfyuaysfayagasyuYGAYSGFAUSFyasudygasuygdUGASjf17221
            </view>
        </view>
        <view class="danger_text">
            <text class="red">
                *本地址仅用于接收BTC，请勿将其他资产转入本地址
            </text>
        </view>
    </view>
</template>
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
        }
        .danger_text {
            font-size: 26upx;
            line-height: 120upx;
        }
    }
</style>