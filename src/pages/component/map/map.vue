<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="uni-common-mt">
      <view>
        <map :latitude="latitude" :longitude="longitude" :markers="covers"></map>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "Map",
  data() {
    return {
      title: "map",
      longitude: 116.29845,
      latitude: 39.95933,
      covers: [
        {
          latitude: 39.9085,
          longitude: 116.39747,
          // #ifdef APP-PLUS
          iconPath: "../../../static/app-plus/location@3x.png",
          // #endif
          // #ifndef APP-PLUS
          iconPath: "../../../static/location.png"
          // #endif
        },
        {
          latitude: 39.9,
          longitude: 116.39,
          // #ifdef APP-PLUS
          iconPath: "../../../static/app-plus/location@3x.png",
          // #endif
          // #ifndef APP-PLUS
          iconPath: "../../../static/location.png"
          // #endif
        }
      ]
    };
  },
  created(){
		 //获取自己的位置
    wx.getLocation({
      success: res => {
				console.log(res,"res....")
        this.latitude = res.latitude;
        this.longitude = res.longitude;
      }
    });
	}
};
</script>
<style>
map {
  width: 100%;
  height: 100%;
}
</style>
