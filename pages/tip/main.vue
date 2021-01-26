<template>
    <view class="tip-page-cont">
        <Card title="请认真阅读以下说明">
            <view class="tipList">
                <template v-if="type === 1">
                    <TipText>获得钱包私钥等于拥有钱包资产所有权</TipText>
                    <TipText>使用纸笔正确抄写，并保管至最安全的地方</TipText>
                    <TipText>私钥丢失将无法找回，请务必妥善保存</TipText>
                </template>
                <template v-else-if="type === 2">
                    <TipText>未备份助记词，将无法保障资产安全</TipText>
                    <TipText>助记词等同于您的银行卡号+密码，获得助记词等同于获得HD钱包的所有权</TipText>
                    <TipText>请确保在四周无人、没有摄像头的的安全环境下进行备份</TipText>
                    <TipText>请勿将助记词发送给任何人、包括任何自称是工作人员的人</TipText>
                    <TipText>如果您的手机丢失、损坏或者卸载APP后，您可以使用助记词回复佛界钱包</TipText>

                </template>
               
            </view>
        </Card>
        <view class="btn_wrap">
            <view class="confirm" style="margin-bottom: 40upx">
                <Button>开始{{ eventTypeText }}</Button>
            </view>
             <view style="margin-bottom: 40upx">
                <Button type="white">暂不{{ eventTypeText }}</Button>
            </view>
        </view>
    </view>
</template>
<script>
import { actions, getTipItem} from './tipActions'
export default {
    data () {
        return {
            type: actions._export.type,
        }
    },
    computed: {
       eventTypeText () {
          return getTipItem(this.type).text
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
    }
}
</script>
<style lang="scss" scoped>
    .tip-page-cont {
        padding: 0 30upx;
        .tipList {
            padding: 20upx 10upx 50upx;
        }
        .btn_wrap {
            // padding-top: 440upx;
            position: fixed;
            bottom: 50upx;
            left: 0;
            right: 0;
        }
    }
</style>