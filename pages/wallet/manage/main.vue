<template>
    <view class="manage-page-cont">
        <view class="_row">
            <view class="bg-white">
                备份助记词
            </view>
            <view class="bg-white">
                导出私钥

            </view>
        </view>
        <view class="_row">
            <view class="bg-white">
                修改密码
            </view>
            <view class="bg-white">
                导入钱包

            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
    .manage-page-cont {
        padding: 30upx;
        ._row {
            display: flex;
            padding: 0 60upx;
            >view{
                flex: 1;
                height: 170upx;
                line-height: 70upx;
                font-size: 28upx;
                padding-left: 20upx;
                margin-bottom: 96upx;
                &:first-child {
                    margin-right: 120upx;
                }
            }
        }        
    }
</style>