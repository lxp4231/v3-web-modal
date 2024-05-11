<script setup lang="ts">
import { ref } from 'vue';
import { GaodeMap } from '@antv/l7-maps';
import { PolygonLayer } from '@antv/l7';
import { Scene } from '@antv/l7';
import data from './data.json'
// 同样你也可以初始化一个 Mapbox 地图
const scene = new Scene({
  id: 'map',
  map: new GaodeMap({
    pitch: 35.210526315789465,
    style: 'dark',
    center: [104.288144, 31.239692],
    zoom: 4.4,
  }),
});
const chinaPolygonLayer = new PolygonLayer({})
  .source(data)
  .color('name', [
    'rgb(239,243,255)',
    'rgb(189,215,231)',
    'rgb(107,174,214)',
    'rgb(49,130,189)',
    'rgb(8,81,156)',
  ]);
  scene.addLayer(chinaPolygonLayer);
</script>
<template>
 <div style="min-height:100%; justify-content: center;position: relative" id="map" />
</template>

<style lang="scss" scoped>

</style>
