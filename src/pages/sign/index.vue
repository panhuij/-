<template>
  <div class="wrap">
    <navigator url="/pages/my/index" hover-class="navigator-hover" class="my"></navigator>
    <sign-map class="sign-map"></sign-map>
    <button @click="addInterview">添加面试</button>
  </div>
</template>

<script>
import {signMap} from '../../components/sign-map'
export default {
  components: {
    signMap
  },
  methods: {
    addInterview() {
      wx.navigateTo({
        url: "/pages/addInterview/index"
      });
    }
  },
  async created() {
    // 判断是否需要指纹识别
    let fingerInfo = wx.getStorageSync("finger");
    if (
      !fingerInfo ||
      !fingerInfo.finger ||
      +new Date() - fingerInfo.timestamp > 24 * 60 * 60 * 1000
    ) {
      wx.navigateTo({ url: "/pages/finger/index" });
      return;
    }
  }
};
</script>


<style lang="scss" scoped>
.wrap {
  height: 100%;
}
.my{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: black;
  position: fixed;
  z-index: 999;
  right: 10%;
  bottom: 20%;
}
.sign-map {
  width: 100%;
  height: 91%;
  display: block;
}
button {
  background: black;
  color: #fff;
  border-radius: 0;
}
</style>