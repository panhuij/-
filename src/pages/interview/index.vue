<template>
  <div class="list">
    <div class="list-tab">
      <span
        v-for="(item,index) in tabList"
        :key="index"
        :class="item.id==ind? 'tab-item active' : 'tab-item'"
        @click="setIndex(item.id)"
      >{{item.title}}</span>
    </div>
    <div class="list-content">
      <ul v-if="signList.length">
        <li
          v-for="item in signList"
          :key="item.id"
          :id="item.id"
          class="list-item"
          @click="toItemDetail"
        >
          <p>
            {{item.company}}
            <span
              style="float:right"
            >{{item.status===0?"已打卡":item.status===1?"已放弃":"未开始"}}</span>
          </p>
          <p>{{item.address.address}}</p>
          <p>
            面试时间:{{item.start_time| capitalize}}
            <span
              style="float:right"
            >{{item.remind===0?"已提醒":"未提醒"}}</span>
          </p>
        </li>
      </ul>

      <p v-else style="text-align:center;margin-top:10px">暂时没有更多数据</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
const moment = require("moment");
export default {
  data: function() {
    return {
      tabList: [
        { id: -1, title: "未开始" },
        { id: 0, title: "已打卡" },
        { id: 1, title: "已放弃" },
        { id: 2, title: "全部" }
      ],
      ind: -1,
      signList: [],
      page: 1
    };
  },
  methods: {
    ...mapActions("sign", ["getSignList"]),
    setIndex: async function(index) {
      this.ind = index;
      this.signList = await this.getSignList({
        status: index,
        page: this.page
      });
    },
    toItemDetail(e) {
      wx.navigateTo({
        url: `/pages/viewItem/index?id=${e.currentTarget.id}`
      });
    },
    onPullDownRefresh() {
      console.log("触发下拉刷新");
      setTimeout(async () => {
        this.signList = await this.getSignList({ status: this.ind, page: 1 });
        wx.stopPullDownRefresh();
        console.log("结束上拉");
      }, 1000);
    },
    async onReachBottom() {
      this.page = this.page + 1;
      const result = await this.getSignList({
        status: this.ind,
        page: this.page
      });
      console.log(this.signList, "=============");
      console.log(result, "------------");
      console.log("触发上拉加载...");
    }
  },
  onShow() {
    this.setIndex(this.ind);
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
.list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
.list-tab {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  display: flex;
  background: #fff;
  .tab-item {
    flex: 1;
    font-size: 13px;
    @extend %juzhong;
    border-bottom: 1px solid transparent;
  }
}
.list-content {
  flex: 1;
  margin-top: 40px;
  .list-item {
    padding: 15px;
    background: #fff;
    margin-top: 10px;
    p {
      margin-bottom: 10px;
    }
    p:nth-child(1) {
      font-size: 14px;
      span {
        padding: 3px;
        border-radius: 3px;
        background: rgb(236, 210, 219);
        color: rgb(248, 32, 104);
      }
    }
    p:nth-child(2) {
      font-size: 13px;
      color: #ccc;
    }
    p:nth-child(3) {
      font-size: 15px;
      color: #666;
      span {
        padding: 3px;
        border-radius: 3px;
        background: rgb(241, 241, 241);
        color: rgb(61, 60, 60);
      }
    }
  }
}
.active {
  color: blue;
  border-bottom-color: blue !important;
}
</style>