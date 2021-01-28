<template>
    <view class="c-passwd-page-cont">
        <view class="card_body bg-white radius shadow">
            <view class="_title">设置钱包密码</view>
            <view class="passwd-ipt">
                <Input v-model="passwd" placeholder="数字和大小写字母，不少于8位" radius/>
            </view>
            <view class="passwd-ipt">
                <Input v-model="passwd" placeholder="再次输入您设置的佛界钱包密码" radius/>
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
            <Button>确认创建</Button>
        </view>
    </view>
</template>
<script>
export default {
    data () {
        return {
            passwd:''
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