<template>
  <div class="address">
    <div class="form-input">
      <label for>北京</label>
      <input type="text" v-model="keyword" @blur="handBlur" placeholder="面试地址" />
    </div>
    <div class="map-list">
      <dl v-for="item in includesAddress" :key="item.id" :id="item.id" @click="navigateClick">
        <dt>
          <img src="http://pic.51yuansu.com/pic3/cover/00/75/56/58b85b83d66a1_610.jpg" alt />
        </dt>
        <dd>
          <p v-text="item.title"></p>
          <p v-text="item.address"></p>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
import QQMapWX from "../../util/qqmap-wx-jssdk.min.js";

export default {
  data: function() {
    return {
      keyword: "",
      includesAddress: []
    };
  },
  async created() {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"
    });
  },
  methods: {
    navigateClick: function(e) {
      let id = e.currentTarget.id;
      let index = this.includesAddress.findIndex(item => item.id === id);

      const {
        address,
        location: { lat, lng },
        title
      } = this.includesAddress[index];
      this.keyword = title;
      let pages = getCurrentPages();

      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        isaddress: address,
        latitude: lat,
        longitude: lng
      });
      wx.navigateBack({
        delta: 1 // 返回上一级页面。
      });
    },
    handBlur() {
      this.qqmapsdk.getSuggestion({
        //获取输入框值并设置keyword参数
        keyword: this.keyword, //用户输入的关键词，可设置固定值,如keyword:'KFC' //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
        region: "北京",
        success: res => {
          //搜索成功后的回调
          this.includesAddress = res.data;
        }
      });
    }
  }
};
</script>


<style lang="scss" scoped>
%juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
.address{
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.form-input {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 0 10px;
  label {
    font-size: 14px;
    flex: 3;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ccc;
  }
  input {
    flex: 7;
    margin-left: 10px;
  }
}
.map-list {
  flex: 1;
  overflow: auto;
  dl {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    @extend %juzhong;
    dt {
      flex: 2;
      @extend %juzhong;
      img {
        width: 30px;
        height: 30px;
      }
    }
    dd {
      flex: 8;
      p {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>