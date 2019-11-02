<template>
  <div class="wrap">
    <sign-map class="sign-map" :markers="markers"></sign-map>
    <cover-view v-for="(item,index) in distance" :key="index">{{item}}dsg</cover-view>
    <button @click="navigate">打卡</button>
  </div>
</template>
<script>
import { signMap } from "../../components/sign-map";
import QQMapWX from "../../util/qqmap-wx-jssdk.min.js";

export default {
  data() {
    return {
      markers: [],
      distance: []
    };
  },
  components: {
    signMap
  },
  created() {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"
    });
  },
  onShow() {
    const { company, latitude, longitude } = this.$mp.query;
    wx.setNavigationBarTitle({ title: company });
    this.markers = [
      {
        latitude: +latitude,
        longitude: +longitude,
        width: 25,
        height: 25,
        title: company,
        iconPath: "https://www.apple.com/favicon.ico"
      }
    ];
    this.formSubmit();
  },
  methods: {
    navigate() {
      const { company, latitude, longitude } = this.$mp.query;
      let plugin = requirePlugin("routePlan");
      let key = "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"; //使用在腾讯位置服务申请的key
      let referer = "一面而就"; //调用插件的app的名称
      let endPoint = JSON.stringify({
        //终点
        name: company,
        latitude,
        longitude
      });
      wx.navigateTo({
        url:
          "plugin://routePlan/index?key=" +
          key +
          "&referer=" +
          referer +
          "&endPoint=" +
          endPoint
      });
    },
    formSubmit(e) {
      //调用距离计算接口
      this.qqmapsdk.calculateDistance({
        //mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from:
          {
            latitude: this.$children[0].latitude,
            longitude: this.$children[0].longitude
          } || "", //若起点有数据则采用起点坐标，若为空默认当前地址
        to: [
          {
            latitude: this.markers[0].latitude,
            longitude: this.markers[0].longitude
          }
        ], //终点坐标
        success: function(res) {
          //成功后的回调
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }
          //设置并更新distance数据
          this.distance = dis;
          console.log(this.distance);
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
button {
  height: 100rpx;
  width: 100%;
  background: #000;
  color: #fff;
}
button.active {
  color: green;
}
.sign-map {
  flex: 1;
  width: 100%;
}
</style>