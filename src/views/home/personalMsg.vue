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

  marker.addEventListener('click', async () => {
    const infoWindowContainer = infoWindowContent.value;
    const infoWindow = new BMapGL.InfoWindow(infoWindowContainer, {
      width: 300,
      height: 0,
      title: 'item.yardName',
      enableMessage: false,
    });
    map.value.openInfoWindow(infoWindow, point);
    infoWindow.addEventListener('close', function () {
      console.log('init()');
    });
  });

  map.value.addOverlay(marker);
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
  <div class="ctn-box">
    <div v-show="false">
      <div ref="infoWindowContent" class="ctn-infoWindowContent" style="max-height: 300px; overflow-y: auto">
        <div class="model-top">
          <CheckboxGroup
            v-model:checked="checkboxValue"
            class="custom-checkbox-group"
            :default-value="['D']"
            @change="onCheckboxGroupChange"
          >
            <Checkbox value="D">在场</Checkbox>
            <Checkbox value="S">在船</Checkbox>
          </CheckboxGroup>
        </div>
        <div class="model-center"></div>
        <div class="model-bottom">
          <span
            ><span class="">合计</span>：<span class="fw">{{ containerSourceNum?.unitNum || 0 }}</span
            >自然箱</span
          >
          <span style="margin-left: 10px"
            ><span class="fw">{{ containerSourceNum?.teuNum || 0 }}</span
            >TEU</span
          >
        </div>
      </div>
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
.ctn-flex {
  display: flex;
  justify-content: center;
}
.shadow {
  display: none !important;
  box-shadow: none !important;
}
.shadow div img {
  display: none !important;
}
.ctn-box {
  display: flex;
  justify-content: center;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  padding: 8px 8px 8px 8px;
  margin: auto;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 4px;
  .ctnMap {
    width: 100%;
    height: 100%;
  }
  .BMap_bubble_title {
    font-weight: 700 !important;
  }
  .BMap_bubble_pop {
    border: unset !important;
    height: 334px !important;
    box-shadow: 0 4px 8px rgba(90, 89, 89, 0.1);
  }
  .custom-info-window {
    box-shadow: none !important;
  }
  .ctn-infoWindowContent::-webkit-scrollbar {
    width: 6px;
    height: 16px !important;
  }
  .ctn-infoWindowContent {
    max-height: 300px;
  }
  .ctn-infoWindowContent::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .ctn-infoWindowContent::-webkit-scrollbar-thumb {
    background: #c3c4c6;
    border-radius: 8px;
  }

  .ctn-infoWindowContent::-webkit-scrollbar-thumb:hover {
    background: #a2a3a5;
  }
}
.model-top {
  position: sticky;
  top: 0;
  background: white;
  box-shadow: 0 -2px 5px rgba(211, 210, 210, 0.1);
  z-index: 1;
  .custom-checkbox-group .ant-checkbox-wrapper {
    font-size: 14px;
  }
  .custom-checkbox-group .ant-checkbox-inner {
    width: 18px;
    height: 18px;
  }
  .custom-checkbox-group .ant-checkbox {
    transform: scale(0.8);
    margin-right: 4px;
  }
  .ant-checkbox + span {
    padding-right: 3px !important;
    padding-left: 3px !important;
  }
}
.model-center {
  height: 300px;
  width: 100%;
}
.model-bottom {
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: white;
  box-shadow: 0 -2px 5px rgba(211, 210, 210, 0.1);
  z-index: 9999;
  font-size: 14px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 28px;
  .fw {
    font-weight: 700;
  }
}
</style>
