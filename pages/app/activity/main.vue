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
                                <view class="_item" @click="previewImg(0)">
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
        <view class="trends_modal bg-white radius">
            <view class="tab_wrap">
                <view class="tab_items" v-for="(tab, i) in trendsTabList" :key="i" @click="trendsTabIndex = i" :class="{'active': trendsTabIndex === i}">
                    <text :class="{ gray: trendsTabIndex !== i }">{{ tab }}</text>
                </view>
            </view>
            <view class="list">
                <view class="list-item" :class="{_open: isOpen}">
                    <view class="_top _flex">
                        <view class="_wrap _flex">
                            <view class="img_box">
                                <image src="../../../static/pages/app/banner.png" mode="" />
                            </view>
                            <view class="_u_name">用户1111</view>
                        </view>
                        
                        <view class="_right">
                            <view class="_quantity align-right">108 BUD</view>
                            <view class="_time align-right">
                                <text class="gray" v-if="trendsTabIndex === 0">01-11 03:10</text>
                            </view>
                        </view>
                    </view>
                    <view class="_body">
                        <view class="_msg" v-if="trendsTabIndex === 0">手术完美恢复 容颜貌美 消除鬼魅 心想事成</view>
                        <!-- hidden -->
                        <template v-if="isOpen">
                            <view class="hidden_msg _msg">
                                <view class="_time">
                                    <text class="gray">01-12 03:10</text>
                                </view>
                                <text>手术完美恢复 容颜貌美 消除鬼魅 心想事成</text>
                            </view>
                            <view class="hidden_msg _msg">
                                <view class="_time">
                                    <text class="gray">01-12 03:10</text>
                                </view>
                                <text>手术完美恢复 容颜貌美 消除鬼魅 心想事成</text>
                            </view>
                        </template>
                         <view class="_open align-right" v-if="trendsTabIndex === 0">
                            <text v-if="!isOpen" @click="isOpen = true">展开 ICON</text>
                            <text v-else @click="isOpen = false">收起 ICON</text>
                        </view>
                        
                    </view>
                    
                </view>
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
               <button @click="changePopup(true)">他人拜佛一次，替你灭罪一次</button>
           </view>
        </view>
        <uni-popup ref="popup" type="bottom">
            <view class="popup_body bg-white">
                <view class="_header _flex">
                    <view class="title">
                        <text class="gray">参与流程：选择类型 - 填写信息 - 参与成功</text>
                    </view>
                    <view class="close">
                        <text class="gray" @click="changePopup(false)">X</text>
                    </view>
                </view>
                <view class="types">
                    <view class="_item" v-for="i in 3" :key="i" @click="curActiveType = i" :class="{active: curActiveType === i}">
                        <view class="_wrap">
                            <view class="_info _flex">
                                <view class="_img">
                                    <image src="../../../static/pages/app/banner.png" mode="" />
                                </view>
                                <view class="_name">
                                    解脱香+哈达+青稞+朵马
                                </view>
                                <view class="_price">
                                    508 BUD
                                </view>
                            </view>
                            <view class="_action" v-if="curActiveType === i">
                                <button class="sub" :disabled="type_quantity === 1" @click="actionHandles(-1)">-</button>
                                <view class="_qty">{{ type_quantity }}</view>
                                <button class="add" @click="actionHandles(1)">+</button>
                            </view>
                        </view>
                    </view> 
                </view>
                <view class="_foot" @click="next()">
                    <button>下一步</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>
<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
export default {
    components: {
        uniPopup,
        uniPopupMessage,
        uniPopupDialog
    },
    data () {
        return {
            isShowAuthModal: true,
            curActiveType: 1,
            type_quantity: 1,
            isOpen: false,
            trendsTabList: ['参与动态', '功德榜'],
            trendsTabIndex: 0
        }
    },
    onLoad () {
        uni.setNavigationBarTitle({
            title: '佐仓罗布林寺-绿度母烟供法...'
        });
    },
    watch: {
        curActiveType () {
            this.type_quantity = 1;
        }
    },
    methods: {
        actionHandles (num) {
            console.log(num, 'actionHandles')
            let _n = this.type_quantity + num;
            console.log(_n)
            if (_n === 0) {
                return
            }
            console.log('aaa')
            this.type_quantity = _n;
        },
        previewImg (i) {
            uni.previewImage({
                urls: ['../../../static/pages/app/banner.png', '../../../static/pages/app/banner.png', '../../../static/pages/app/banner.png'],
                longPressActions: {
                    itemList: ['发送给朋友', '保存图片', '收藏'],
                    success: function(data) {
                        console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                    },
                    fail: function(err) {
                        console.log(err.errMsg);
                    }
                }
            });
        },
        changePopup (type) {
            if (type) {
                this.$refs.popup.open()
            } else {
                this.$refs.popup.close()
            }
        },
		next(){
			uni.navigateTo({
				url:"/pages/app/activity/editor"
			})
		}
    },
}
</script>
<style lang="scss" scoped>
   @import "../../../styles/app/activity.scss";
</style>