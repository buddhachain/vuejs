<template>
    <view class="activity-page-cont">
        <view class="auth_modal radius" v-if="isShowAuthModal">
            <view class="icon" @click="isShowAuthModal = false">X</view>
            <view class="title">已认证，请放心访问</view>
            <view class="detail">查看</view>
        </view>
        <!-- banner -->
        <view class="banner_wrap bg-white radius">
            <swiper class="swiper" style="height: 260upx" :indicator-dots="true" :autoplay="false" :duration="230" :circular="true">
                <swiper-item>
                    <view class="banner_item">
                        <image src="../../../static/pages/app/banner.png"></image>
                    </view>
                </swiper-item>
                <swiper-item>
                    <view class="banner_item">
                        <image src="../../../static/pages/app/banner.png"></image>
                    </view>
                </swiper-item>
            </swiper>
            <view class="activity_name">
                <text class="status">进行中</text>
                 绿度母烟供法会|| 遣除鬼魅，转运迅猛，功德利益巨大
            </view>
            <view class="info">
                <view class="_img">
                    <image src="../../../static/pages/app/banner.png" mode="" />
                </view>
                <view class="_center">
                    <view class="_name">佐仓罗布林寺</view>
                    <view class="_vis">
                        <text class="gray">已有10056人到访过</text>
                    </view>
                </view>
                <view class="_to">
                    <text class="gray">前往微站 ></text>
                </view>
            </view>
        </view>
        <!-- 富文本内容 -->
        <view class="html_node_root bg-white radius">
            <text>HTML文本内容</text>
        </view>
        <!-- 进展动态 -->
        <view class="progress_modal bg-white radius">
            <view class="title">进展动态</view>
            <view class="time_lines">
                <TimeLine :isHigh="true">
                    <view class="_content">
                        <view class="_text">
                            扎西得嘞，各位汉地居士大家好，佐仓罗布林寺十一月金刚手菩萨荟供法会今天圆满，本期十二月绿度母荟供法会在线登记中，愿你们蒙
                        </view>
                        <view class="open_btn align-right">
                            <text class="blue">展开</text>
                        </view>
                        <view class="photos">
                            <view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                            </view>
                            <view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                            </view>
                        </view>
                    </view>
                </TimeLine>
                <TimeLine>
                    <view class="_content">
                        <view class="_text">
                            扎西得嘞，各位汉地居士大家好，佐仓罗布林寺十一月金刚手菩萨荟供法会今天圆满，本期十二月绿度母荟供法会在线登记中，愿你们蒙
                        </view>
                        <view class="open_btn align-right">
                            <text class="blue">展开</text>
                        </view>
                        <view class="photos">
                            <view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                            </view>
                            <view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_item">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                            </view>
                            
                        </view>
                    </view>
                </TimeLine>
            </view>
        </view>
        <view class="page_footer_wrap bg-white">
           <view class="_left">
               <view class="icon">
                   <image src="../../../static/pages/app/icon/menu.svg" mode="" />
                   <view>菜单</view>
               </view>
           </view>
           <view class="_main">
               <button>他人拜佛一次，替你灭罪一次</button>
           </view>
        </view>
    </view>
</template>
<script>
export default {
    data () {
        return {
            isShowAuthModal: true,
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
    .activity-page-cont {
        padding: 20upx 30upx;
        padding-bottom: 120upx;
        .auth_modal {
            height: 80upx;
            margin-bottom: 10upx;
            background: rgba(202, 216, 230, 100);
            color: rgba(255, 255, 255, 100);
            font-size: 28upx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 20upx;
            >view {
                line-height: 80upx;
            }
            .title {
                flex: 1;
                text-align: center;
            }
            .icon {
                padding: 0 20upx;
                color: rgba($color: #000000, $alpha: .34);
            }
            .detail {
                height: 60upx;
                padding: 0 20upx;
                background: #fff;
                color: rgba(202, 216, 230, 100);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 30upx;
                font-size: 26upx;
            }
        }
        // banner
        .banner_item {
            width: 100%;
            height: 260upx;
            image {
                width: 100%;
                height: 100%;
            }
        }
        .banner_wrap {
            margin-bottom: 20upx;
            .activity_name {
                font-size: 30upx;
                line-height: 50upx;
                padding: 14upx 20upx;
                border-bottom: 1px solid rgba(236, 235, 235, 100);;
                .status {
                    padding: 0 20upx;
                    margin: 0 20upx;
                    display: inline-block;
                    background: rgb(202, 216, 230);
                    color: rgba(255, 255, 255, 100);
                    border: 1upx solid rgb(139, 173, 205);
                    color: rgb(139, 173, 205);
                    border-radius: 30upx;
                }
            }
            .info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20upx;
                font-size: 28upx;
                ._img {
                    width: 80upx;
                    height: 80upx;
                    border-radius: 50%;
                    overflow: hidden;
                    image {
                        width: 100%;
                        height: 100%;
                    }
                }
                ._to {
                    font-size: 26upx;
                }
                ._center {
                    flex: 1;
                    margin-left: 20upx;
                    ._vis {
                        font-size: 24upx;

                    }
                    ._name {
                        line-height: 46upx;
                    }
                }
            }
        }
        .html_node_root {
            padding: 20upx;
            margin-bottom: 20upx;
        }
        .progress_modal {
            padding: 0 20upx;
            .title {
                font-size: 30upx;
                line-height: 80upx;
                border-bottom: 1px solid rgba(236, 235, 235, 100);
            }
            .time_lines {
                padding: 20upx 0;
                ._content {
                    font-size: 28upx;
                    line-height: 46upx;
                    .open_btn {
                        font-size: 26upx;
                        line-height: 1;
                        padding: 10upx;
                    }
                    .photos {
                        padding: 20upx 0;
                        >view {
                            width: 100%;
                            display: flex;
                            height: 200upx;
                            justify-content: flex-start;
                            align-items: center;
                            margin-bottom: 20upx;
                            &:last-of-type {
                                margin-bottom: 0;
                            }
                            image {
                                width: 100%;
                                height: 100%;
                            }
                            ._item {
                                height: 100%;
                                flex: 1;
                                margin-right: 20upx;
                                max-width: 200upx;
                                &:last-child {
                                    margin-right: none;
                                }
                            }
                        }
                    }
                }
            }
        }
        .page_footer_wrap {
            display: flex;
            justify-content: space-between;
            padding-right: 0;
            ._left {
                font-size: 26upx;
                padding-right: 20upx;
                image {
                    width: 50upx;
                    height: 50upx;
                }
                >view {
                    line-height: 1;
                    color: rgba(113, 146, 185, 100);
                }
            }
            ._main {
                flex: 1;
                button {
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    font-size: 28upx;
                    border-radius: 0;
                    margin: 0;
                    line-height: 80upx;
                    background-color: rgba(113, 146, 185, 100);
                    &.button-hover {
                        background: #9fb5ce;
                    }
                }
            }
        }
    }
</style>