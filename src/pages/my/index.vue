<template>
  <div class="wrap">
    <div v-if="phone.length">
      <div class="phone">
        <div></div>
        <div>{{phone|handlerPhone }}</div>
      </div>
      <navigator class="item" url="/pages/interview/index" hover-class="navigator-hover">
        <icon type="waiting" size="20" class="icon" />
        <span>我的面试</span>
        <span>></span>
      </navigator>
      
      <button open-type="contact" bindcontact="handleContact" class="item">
        <icon type="info" size="20" class="icon" />
        <span>客服中心</span>
        <span>></span>
      </button>
    </div>
    <button
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      v-show="!phone.length"
    >获取用户手机号</button>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["phone"])
  },
  methods: {
    ...mapActions("user", ["userDecrypt"]),
    getPhoneNumber(res) {
      if (res.detail.errMsg === "getPhoneNumber:ok") {
        let { iv, encryptedData } = res.detail;
        this.userDecrypt({ iv, encryptedData });
      } else {
        wx.showToast({
          title: "为了更好的享受服务，请先绑定手机号", //提示的内容,
          icon: "none" //图标,
        });
      }
    },
    handleContact(e) {
      console.log(e.detail.path);
      console.log(e.detail.query);
    }
  },
  filters: {
    handlerPhone: function(value) {
      if (!value) return "";
      return value.substring(0, 3) + "****" + value.substring(value.length - 4);
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
.wrap {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.phone {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  float: left;
  background-color: #eeeeee;
  div:nth-of-type(1) {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px auto;
    background-color: aqua;
  }
  div:nth-of-type(2) {
    font-size: 14px;
    text-align: center;
  }
}
.item {
  clear: both;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  @extend %juzhong;
  .icon {
    width: 20%;
    @extend %juzhong;
  }
  span {
    color: #666;
  }
  span:nth-of-type(1) {
    display: inline-block;
    width: 60%;
    font-size: 14px;
  }
  span:nth-of-type(2) {
    display: inline-block;
    width: 20%;
    font-size: 20px;
    color: #999;
  }
}
button {
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #fff;
}
</style>