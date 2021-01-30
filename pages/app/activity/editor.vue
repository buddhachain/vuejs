<template>
    <view class="editor-page-cont">
        <view class="add_modal bg-white radius pd-20 _flex">
            <view class="_icon">
                <view class="">+</view>
            </view>
            <view class="_text">
                <view class="_title">添加功德主</view>
                <view class="_info">
                    <text class="gray">功德主资料将用于记录与反馈</text>
                </view>
            </view>
        </view>
        <view class="form_modal bg-white radius pd-20">
            <view class="form">
                <view class="form-group">
                    <view class="label">
                        <view>
                            <text>功德芳名</text>
                            <text class="required">*</text>
                        </view>
                        <text class="icon">ICON</text>
                    </view>
                    <Input placeholder="请填写功德主姓名" bg="white" :radius="true"/>
                </view>
                <view class="form-group">
                    <view class="label">
                        <view>
                            <text>功德芳名</text>
                            <text class="required">*</text>
                        </view>
                        <text class="icon">ICON</text>
                    </view>
                    <Input placeholder="请填写功德主姓名" bg="white" :radius="true"/>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    onLoad () {
         uni.setNavigationBarTitle({
            title: '佐仓罗布林寺-绿度母烟供法...'
        });
    }
}
</script>
<style lang="scss" scoped>
    @import "../../../styles/app/editor.scss";
</style>