<template>
  <div id="container"></div>
</template>

<script setup lang="ts">
const map = new BMapGL.Map('container');
const point = new BMapGL.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}
#container {
  width: 500px;
  height: 500px;
}
</style>
