<template>
  <div class="viewitem">
    <p>
      面试地址:
      <span>{{detail.company}}</span>
    </p>
    <p>
      面试时间:
      <span>{{detail.start_time|capitalize}}</span>
    </p>
    <p>
      联系方式:
      <span>{{detail.phone}}</span>
    </p>
    <p>
      是否提醒:
      <span>{{detail.remind===0?"已提醒":"未提醒"}}</span>
    </p>
    <p>
      面试状态:
      <span>{{detail.status===0?"已打卡":detail.status===1?"已放弃":"未开始"}}</span>
    </p>
    <p v-show="detail.status===-1">
      取消提醒:
      <switch
        name="取消提醒"
        style="margin-left:8px"
        :checked="switchChecked"
        @change="switch1Checked"
      />
    </p>
    <div class="btns" v-if="detail.status===-1">
      <span @click="clockIn">去打卡</span>
      <span @click="abandon">放弃面试</span>
    </div>
    <div v-else></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
const moment = require("moment");
export default {
  data: function() {
    return {
      switchChecked: false,
      detail: {},
      id: 0
    };
  },
  methods: {
    ...mapActions("sign", ["getInterviewDetail", "upInterviewDetail"]),
    abandon() {
      wx.showModal({
        title: "温馨提示",
        content: "确定要放弃本次面试吗？",
        success: async res => {
          if (res.confirm) {
            let result = await this.upInterviewDetail({
              id: this.id,
              status: 1,
              remind: Number(this.switchChecked)
            });
            if (result && result.data.code === 0) {
              this.detail = await this.getInterviewDetail({ id: this.id });
            }
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    switch1Checked(e) {
      this.switchChecked = e.detail.value;
    },
    clockIn() {
      const { company, latitude, longitude } = this.detail;
      wx.navigateTo({
        url: `/pages/clockIn/index?company=${company}&latitude=${latitude}&longitude=${longitude}`
      });
    },
    onShareAppMessage: function(res) {
      return {
        title: "面试详情",
        path: "/page/viewitem/index"
      };
    }
  },
  onLoad: async function(option) {
    this.id = option.id;
    this.detail = await this.getInterviewDetail({ id: option.id });
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      return moment(Number(value)).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="scss">
%juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
.viewitem {
  width: 100%;
  height: 100%;
  font-size: 15px;
  p {
    height: 44px;
    font-size: 14px;
    line-height: 44px;
    color: #666;
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
    span {
      color: black;
      margin-left: 10px;
    }
  }
  .btns {
    width: 100%;
    height: 44px;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      color: #fff;
      @extend %juzhong;
    }
    span:nth-child(1) {
      margin-right: 5px;
      background: rgb(18, 22, 231);
    }
    span:nth-child(2) {
      background: rgb(223, 49, 49);
    }
  }
}
</style>