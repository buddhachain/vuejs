<template>
    <view class="verify-page-cont">
        <Card title="请验证您备份的助记词">
            <view class="card_body">
                <view class="tip">
                    <text class="gray">请从下方列表中选择每个位置正确的单词</text>
                </view>
                <view class="select_list">
                    <view class="world">
                        <view class="bg-none mnemonic radius"></view>
                        <view class="_txt yellow"><text class="yellow">第{{ 1 }}位</text></view>
                    </view>
                    <view class="world">
                        <view class="bg-none mnemonic radius"></view>
                        <view class="_txt "><text class="yellow">第{{ 7 }}位</text></view>
                    </view>
                    <view class="world">
                        <view class="bg-none mnemonic radius"></view>
                        <view class="_txt yellow"><text class="yellow">第{{ 10 }}位</text></view>
                    </view>
                </view>
            </view>
        </Card>
        <!-- mnemonic list -->
        <view class="world_list bg-white radius shadow">
            <view class="row _flex" v-for="(arr, i) in mnemonic" :key="i">
                <view class="_item bg-none radius text_overflow" v-for="(str, idx) in arr" :key="idx">
                    <text :class="{yellow: idx === 2}">{{ str }}</text>
                </view>
            </view>
        </view>
        <view class="page_footer_wrap">
            <view class="btn_wrap">
                <Button long >下一步</Button>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data () {
        return {
            mnemonic: [['SAASDaSDADSASDasdasd', 'ASDASD', 'ASDSDAS'], ['aaaaa', 'bvvasd', 'asdasffasf'], ['asdfsdfsad', 'asdggg', 'dddd'], ['ssss', 'aaa', 'wwww']]
        }
    }
}
</script>
<style lang="scss" scoped>
.verify-page-cont {
    padding: 40upx;
    .card_body {
        padding-bottom: 34upx;
        .tip {
            font-size: 26upx;
            line-height: 76upx;
        }
        .select_list {
            display: flex;
            padding: 10upx 0;
            .mnemonic {
                margin-bottom: 10upx;
                height: 66upx;
            }
            >view {
                flex: 1;
                margin-right: 59upx;
                font-size: 26upx;
                text-align: center;
                &:last-of-type {
                    margin-right: 0;
                }
                ._txt {
                    line-height: 50upx;
                }
            }
        }
    }
    .world_list {
        padding: 40upx;
        margin-top: 40upx;
        .row {
            justify-content: space-between;
            >._item {
                flex: 1;
                margin-right: 57upx;
                margin-bottom: 30upx;
                line-height: 60upx;
                text-align: center;
                color: #545454;
                font-size: 26upx;
                &:last-of-type {
                    margin-right: none;
                }
            }
        }
    }
}
    
</style>