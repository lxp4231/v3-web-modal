<template>
  <div class="map-box">
    <div id="map" class="my_map"></div>
    <div class="map">
      <el-popover
        v-model:visible="popVisible"
        show-arrow="false"
        placement="bottom-start"
        width="400"
        trigger="click"
        popper-style="{
          boxShadow: '0px 2px 4px 0px rgba(177,186,194,0.2)',
          borderRadius: '4px',
          padding: '0',
          background: 'rgba(255,255,255,0)',
          border: 0,
        }"
      >
        <template #reference>
          <el-input v-model="keyword" placeholder="请输入船名/呼号/MMSI/IMO" clearable @focus="openPopover" />
        </template>
      </el-popover>
    </div>
    <div v-show="false">
      <div ref="infoWindowContent" style="max-height: 300px; overflow-y: auto" @click.stop>
        <div class="ctn-infoBox"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const map = ref();
const popVisible = ref(false);
const keyword = ref('');
const infoWindowContent = ref(null);
let activeInfoBox = null;

const points = ref([new BMapGL.Point(121.0840042, 30.6345242), new BMapGL.Point(121.920334, 29.918696)]);

const IconMap = {
  icon: new BMapGL.Icon(new URL('./img/icon_zhongdian@2x.png', import.meta.url).href, new BMapGL.Size(36, 42), {
    anchor: new BMapGL.Size(18, 42),
  }),
};

// 创建地图
const createMap = () => {
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

  // 添加全局点击事件监听器
  window.addEventListener('click', handleWindowClick);
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

  marker.addEventListener('click', (event) => {
    event.domEvent.stopPropagation(); // 阻止事件传播到地图
    if (activeInfoBox) {
      activeInfoBox.close();
    }
    const infoWindowContainer = infoWindowContent.value;
    const infoBox = new BMapGLLib.InfoBox(map.value, infoWindowContainer, {
      boxStyle: {
        width: '300px',
        height: 'auto',
        borderRadius: '4px',
      },
      closeIconUrl: new URL('./img/close.png', import.meta.url).href,
      closeIconMargin: '5px',
      enableAutoPan: true,
      align: BMAP_ANCHOR_TOP_LEFT,
      offset: new BMapGL.Size(30, -300),
    });

    infoBox.open(marker);
    activeInfoBox = infoBox;

    infoBox.addEventListener('close', () => {
      console.log('InfoBox closed');
      activeInfoBox = null;
    });
  });

  map.value.addOverlay(marker);
};

// 关闭弹窗
const handleWindowClick = () => {
  if (activeInfoBox) {
    activeInfoBox.close();
    console.log('InfoBox closed by window click');
    activeInfoBox = null;
  }
};

// 获取标注点并添加到地图
const getCmsYard = () => {
  points.value.forEach((point) => {
    onDrawMarker(point, IconMap.icon);
  });
};

// 打开弹窗
const openPopover = () => {
  popVisible.value = true;
};

// 挂载地图
onMounted(() => {
  createMap();
});
</script>

<style lang="scss">
.map-box {
  position: relative;
}
.map {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
}
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
  background: url('./img/mapW.png');
  background-size: 300px 310px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
</style>
