<template>
  <div class="map-wrapper">
    <div id="shipMap" class="map"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';
import mockShipPoints from '@/utils/mockShipPoints.json';
import mockCarPoints from '@/utils/mockCarPoints.json';

const ak = '74a1eacae3214fc4b947eb6974c43f5f';
const map = ref<any>('');
const initMapJobId = setInterval(() => {
  if (window.ShipxyAPI) {
    const options = {
      ak,
      centerPoint: [32.1, 122.11],
      // 初始缩放级别
      zoom: 4,
      // 最小缩放级别
      minZoom: 2,
      // 最大缩放级别
      maxZoom: 18,
      cjhdTileLayer: { isShow: true },
      miniMapControl: { isShow: true, options: {} }, // 鹰眼控件
    };
    map.value = new ShipxyAPI.Map('shipMap', options);
    ShipxyAPI.TrackService(map.value);
    clearInterval(initMapJobId);
    // 展示轨迹
    // this.showShipTrack();
  }
}, 1000);
</script>

<style lang="scss" scoped>
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #d9d9d9;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  border-radius: 8px;

  .map {
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: none;
    background-color: #a3ccff;
  }
}
</style>
