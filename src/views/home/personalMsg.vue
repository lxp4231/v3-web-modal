<!-- eslint-disable no-use-before-define -->
<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { ref } from 'vue';

const map = ref();
// 创建map
const creatMap = () => {
  map.value = new BMapGL.Map('map', {
    showVectorStreetLayer: true, // 设置是否加载POI
    showVectorLine: true, // 设置是否加载路网数据，注意:路网数据的加载依赖必需加载POI。
  });
  map.value.enableScrollWheelZoom(true);

  map.value.setTilt(60);
  setMapCenter();
};
// 设置中心坐标并初始化
const setMapCenter = () => {
  const point = new BMapGL.Point(120.1616, 30.2801);
  map.value.centerAndZoom(point, 9);
};
// 设置视野（涉及到起点和终点时使用）
const setMapViewport = (obj: any) => {
  // const [a, b] = getMapCenter(obj)
  // map.value.centerAndZoom(new BMapGL.Point(a, b), 9)
  let startLng = '';
  let startLat = '';
  if (obj.isExistFactoryLocation) {
    startLng = obj.factoryLocationLng;
    startLat = obj.factoryLocationLat;
  } else {
    startLng = obj.startPlaceLng;
    startLat = obj.startPlaceLat;
  }
  map.value.setViewport([
    new BMapGL.Point(startLng, startLat),
    new BMapGL.Point(obj.destinationLng, obj.destinationLat),
  ]);
};
onMounted(() => {
  creatMap();
});
</script>
<template>
  <div id="map" class="my_map" />
</template>

<style lang="scss" scoped>
.my_map {
  width: 100%;
  height: 100%;
  justify-content: center;
  position: relative;
  padding: 500px;
  border-radius: 8px;
  background-color: #fff;
}
.anchorBL {
  display: none;
}
</style>
