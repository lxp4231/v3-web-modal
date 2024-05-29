<!-- eslint-disable no-use-before-define -->
<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const map = ref();
const infoWindowContent = ref(null);

const points = ref([new BMapGL.Point(121.0840042, 30.6345242), new BMapGL.Point(121.920334, 29.918696)]);

const IconMap = {
  icon: new BMapGL.Icon(new URL('./img/icon_zhongdian@2x.png', import.meta.url).href, new BMapGL.Size(36, 42), {
    anchor: new BMapGL.Size(18, 42),
  }),
};

// 创建地图
const creatMap = () => {
  map.value = new BMapGL.Map('map', {
    showVectorStreetLayer: true,
    showVectorLine: true,
  });
  map.value.enableScrollWheelZoom(true);
  map.value.setTilt(60);

  // 添加标注点
  getCmsYard();

  // 设置视野使所有点在视图内
  setMapViewport();
};

// 设置视野
const setMapViewport = () => {
  if (points.value.length > 0) {
    map.value.setViewport(points.value, {
      margins: [50, 50, 50, 50], // 边距设置为50像素
      zoomFactor: -1, // 调整缩放级别以适应所有点
    });
  }
};

// 添加标注
const onDrawMarker = (point: BMapGL.Point, icon?: BMapGL.Icon) => {
  const marker = new BMapGL.Marker(point);
  if (icon) marker.setIcon(icon);

  marker.addEventListener('click', () => {
    const infoWindowContainer = infoWindowContent.value;
    const infoBox = new BMapGLLib.InfoBox(map.value, infoWindowContainer, {
      boxStyle: {
        width: '300px',
        height: 'auto',
        borderRadius: '4px',
        // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        // padding: '10px',
      },
      closeIconUrl: new URL('./img/close.png', import.meta.url).href,
      closeIconMargin: '5px',
      enableAutoPan: true,
      align: BMAP_ANCHOR_TOP_LEFT,
      offset: new BMapGL.Size(30, -300),
    });
    infoBox.open(marker);
    infoBox.addEventListener('close', () => {
      console.log('InfoBox closed');
    });
    // 保存对 infoBox 的引用
    const closeInfoBox = () => {
      infoBox.close();
      console.log('InfoBox closed by click outside');
    };
    // 添加新的全局点击事件监听器
    window.addEventListener('mousedown', closeInfoBoxOnClickOutside(closeInfoBox));
  });
  map.value.addOverlay(marker);
};
// 关闭弹窗
const closeInfoBoxOnClickOutside = (closeInfoBox: () => void) => {
  return () => {
    const infoWindowContainer = infoWindowContent.value;
    if (infoWindowContainer) {
      closeInfoBox();
      // 移除地图点击事件监听器，避免多次关闭弹窗
      map.value.removeEventListener('mousedown', closeInfoBoxOnClickOutside);
    }
  };
};
// 获取标注点并添加到地图
const getCmsYard = () => {
  points.value.forEach((point) => {
    onDrawMarker(point, IconMap.icon);
  });
};

// 挂载地图
onMounted(() => {
  creatMap();
});
</script>

<template>
  <div id="map" class="my_map"></div>
  <div v-show="false">
    <div ref="infoWindowContent" style="max-height: 300px; overflow-y: auto">
      <div class="ctn-infoBox"></div>
    </div>
  </div>
</template>

<style lang="scss">
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
.infoBox img {
  z-index: 9999;
  width: 20px !important; // 设置关闭按钮的宽度
  height: 20px !important; // 设置关闭按钮的高度
}
.ctn-infoBox {
  width: 300px;
  height: 310px;
  // height: 500px;
  background: url('./img/mapW.png');
  background-size: 300px 310px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
