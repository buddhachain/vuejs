<template>
    <view class="verify-page-cont">
        <Card title="请验证您备份的助记词">
            <view class="card_body">
                <view class="tip">
                    <text class="gray">请从下方列表中选择每个位置正确的单词</text>
                </view>
                <view class="select_list">
                    <view class="world" v-for="(val, attr, i) in verifyObj" :key="i">
                        <view class="bg-none mnemonic radius">{{ select[i] || '' }}</view>
                        <view class="_txt yellow"><text class="yellow">第{{ attr}}位</text></view>
                    </view>
                </view>
            </view>
        </Card>
        <!-- mnemonic list -->
        <view class="world_list bg-white radius shadow">
            <view class="row _flex" v-for="(arr, i) in mnemonicArr" :key="i">
                <view class="_item bg-none radius text_overflow" v-for="(obj, idx) in arr" :key="idx" @click="strClickHandle(obj.val)">
                    <text :class="{yellow: obj.isActive}">{{ obj.val }}</text>
                </view>
            </view>
        </view>
        <view class="page_footer_wrap">
            <view class="btn_wrap">
                <Button long :disabled="select.length !== 3" @click="checkMnemonicHandle">下一步</Button>
            </view>
        </view>
    </view>
</template>
<script>
import account from '@/actions/account'
import accountActions from '@/actions/account'
import PasswordActions from '@/actions/password.js'
import { createAccount } from '@/lib/XuperChainSdk'
export default {
    data () {
        return {
            mnemonic: '',
            verifyObj: {},
            select: []
        }
    },
    computed: {
          mnemonicArr () {
            if (!this.mnemonic) {
                return [[]]
            }
            const mnemonic = this.mnemonic;
            const memicArr = mnemonic.split(' ')
            const len = Math.ceil(memicArr.length / 3)
            let mnemonicArr = []
            for (let i = 0; i < len; i++) {
                const valArr = memicArr.splice(0, 3);
                const curArr = [];
                for (let j = 0; j< 3; j++) {
                    curArr.push({
                        isActive: this.select.findIndex(v => v === valArr[j]) > -1,
                        val: valArr[j]
                    })
                }
                 mnemonicArr.push(curArr);
                 valArr = null;
                 curArr = null;
               
            }
            return mnemonicArr
        }
    },
    onLoad () {
        const verify = accountActions.getVerify()
        // const { mnemonic } = createAccount();
		
		// const pwd = PasswordActions.getNoPwd()
		// console.log(pwd)
		const { mnemonic_lock } = accountActions.get();
		const mnemonic = accountActions.deCrypt(mnemonic_lock, 'cjm123456');
		
		console.log(mnemonic)
        const newAccountMnemonicArr = mnemonic.split(' ')
        const randomArr = this.$getRandom(0, newAccountMnemonicArr.length, 3)
        const verifyValues = Object.values(verify);
        randomArr.forEach((_idx, i) => {
            newAccountMnemonicArr[_idx] = verifyValues[i]
        })
        this.mnemonic = newAccountMnemonicArr.join(' ');
        this.verifyObj = verify;
		
		// const verify = accountActions.getVerify()
		// const pwd = PasswordActions.get()
		// const { mnemonic_lock } = accountActions.get();
		// const accountModel = accountActions.deCrypt(mnemonic_lock, pwd);
		// console.log(accountModel)
		// const { mnemonic } = accountModel
		// console.log(mnemonic)
		// const newAccountMnemonicArr = mnemonic.split(' ')
		// const randomArr = this.$getRandom(0, newAccountMnemonicArr.length, 3)
		// const verifyValues = Object.values(verify);
		// randomArr.forEach((_idx, i) => {
		//     newAccountMnemonicArr[_idx] = verifyValues[i]
		// })
		// this.mnemonic = newAccountMnemonicArr.join(' ');
		// this.verifyObj = verify;
    },
    methods: {
        strClickHandle (str) {
            // 如果是删除
            const _idx = this.select.findIndex(v => v === str);
            if (_idx > -1) {
                this.select.splice(_idx, 1)
                return
            }
            if (this.select.length >= 3) return;
            this.select.push(str)
        },
        checkMnemonicHandle () {
            let flag = true;
            const valsArr = Object.values(this.verifyObj)
            this.select.forEach((val, i) => {
                if (val !== valsArr[i]) {
                    flag = false;
                }
            })
            if (flag) {
                this.$toastSucc('验证成功', () => {
                    // 删除 verify storage
                    accountActions.delVerify()
                    uni.redirectTo({
                         url: '/pages/wallet/index/index'
                    })
                })
            } else {
                this.$toast('验证失败，请重试！')
            }
        }
    },
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
                line-height: 66upx;
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