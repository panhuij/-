<template>
  <view class="box">
    <form report-submit="true" :rules="rules"  @submit="formSubmit" @reset="formReset" class="form">
      <view class="uni-form-item uni-column">
        <p class="title text">面试信息</p>
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">公司名称</view>
        <input class="uni-input" name="company" placeholder="请输入公司名称" value="汾酒集团" />
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">公司电话</view>
        <input class="uni-input" name="phone" placeholder="这是一个输入框" value="15034458360" />
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">面试时间</view>
        <picker
          mode="multiSelector"
          :range="dateRange"
          :value="multiIndex"
          @change="bindDateChange"
        >
          <view>{{dateShow}}</view>
        </picker>
      </view>
      <view class="uni-form-item uni-column">
        <view class="title">面试地址</view>
        <navigator url="/pages/address/index" hover-class="navigator-hover">
          <input class="uni-input" name="address" placeholder="请选择面试地址" :value="address" />
        </navigator>
      </view>
      <view class="uni-form-item uni-column" style="border-bottom:0;padding-top:0">
        <p class="title text">备注信息</p>
      </view>
      <view class="uni-form-item uni-column" style="padding:10px;width:auto">
        <textarea placeholder="备注信息(可选,100个字以内)" name="description" value="测试面试接口"></textarea>
      </view>
      <view class="btn-area" style="border:0">
        <button formType="submit">确认</button>
        <!-- <button formType="reset">Reset</button> -->
      </view>
    </form>
  </view>
</template>
<script>
import { mapActions } from "vuex";
const moment = require("moment");
 const range = [
  [0,1,2,3,4,5,6,7,8,9],
  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  ['00分','10分','20分','30分','40分','50分']
];

export default {
  data: function() {
    return {
      address: "",
      latitude: "",
      longitude: "",
      multiIndex: [0, 0, 0]
    };
  },
  created() {
    // 如果当前时间是十一点之后，过滤掉今天
    if (moment().hour() == 23) {
      this.multiIndex = [1, 0, 0];
    }
    
  },
  computed: {
    // 处理面试日期
    dateRange() {
      let dateRange = [...range];
      // 如果时间是今天，过滤掉现在之前的小时  如果现在是9点就只显示比9大的数字  [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      if (!this.multiIndex[0]) {
        dateRange[1] = dateRange[1].filter(item => {
          return item > moment().hour();
        });
      } else {
        dateRange[1] = range[1];
      }
      // 格式化小时 ["11点", "12点", "13点", "14点", "15点", "16点", "17点", "18点", "19点", "20点", "21点", "22点","23点"]
      dateRange[1] = dateRange[1].map(item => {
        return item + "点";
      });
      // 计算当前日期之后的十天   例如:["23号", "24号", "25号", "26号", "27号", "28号", "29号", "30号", "31号", "1号"]
      dateRange[0] = dateRange[0].map(item => {
        return (
          moment()
            .add(item, "days")
            .date() + "号"
        );
      });
      return dateRange;
    },
    // 显示的日期
    dateShow() {
      return moment()
        .add(
          moment().hour() == 23 ? this.multiIndex[0] - 1 : this.multiIndex[0],
          "d"
        )
        .add(this.multiIndex[1] + 1, "h")
        .minute(this.multiIndex[2] * 10)
        .format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    ...mapActions("sign", ["addSign"]),
    //添加面试
    formSubmit: async function(e) {
      let result = await this.addSign({
        ...e.detail.value,
        form_id: e.detail.formId,
        latitude: this.latitude,
        longitude: this.longitude,
        address: this.address,
        start_time:moment(this.dateShow).unix()*1000
      });

      //添加面试成功
      if (result&&result.data.code === 0) {
        wx.showModal({
          title: "温馨提示",
          content: result.data.msg,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateTo({ url: "/pages/interview/index" });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    },
    formReset: function(e) {
      console.log("清空数据");
    },
    // 监听多列选择器每列变化
    bindDateChange(e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.multiIndex = e.detail.value;
    }
  },
  onShow() {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    const { isaddress, latitude, longitude } = currPage.data;
    this.address = isaddress;
    this.latitude = latitude;
    this.longitude = longitude;
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  font-size: 14px;
}

.form {
  background: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.uni-column {
  display: flex;
  flex-direction: row;
}
.uni-form-item {
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 13px;
  }
  .text {
    color: black;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    padding-left: 20px;
    background-color: #eeeeee;
  }
  input {
    font-size: 13px;
  }
}
.uni-form-item .title {
  padding: 10rpx 20px;
}
.uni-form-item:first-child {
  padding: 0;
}
.uni-form-item:not(:last-child) {
  border-bottom: 1rpx solid #ccc;
}
textarea {
  flex: 1;
  height: 100px;
  border: 1px solid #ccc;
  padding: 5px;
  font-size: 13px;
}

navigator,
picker {
  flex: 1;
}
</style>