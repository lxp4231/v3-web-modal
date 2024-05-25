<!-- eslint-disable no-use-before-define -->
<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { ref } from 'vue';

const map = ref();
const infoWindowContent = ref(null);
// 创建map
const creatMap = () => {
  map.value = new BMapGL.Map('map', {
    showVectorStreetLayer: true, // 设置是否加载POI
    showVectorLine: true, // 设置是否加载路网数据，注意:路网数据的加载依赖必需加载POI。
  });
  map.value.enableScrollWheelZoom(true);

  map.value.setTilt(60);
  getCmsYard();
  setMapViewport();
};
// 设置视野使
const setMapViewport = () => {
  map.value.setViewport([new BMapGL.Point(121.920334, 29.918696), new BMapGL.Point(121.0840042, 30.6345242)]);
};
const IconMap = {
  icon: new BMapGL.Icon(new URL('./img/icon_zhongdian@2x.png', import.meta.url).href, new BMapGL.Size(36, 42), {
    anchor: new BMapGL.Size(18, 42),
  }),
};
// 添加图标
const onDrawMarker = (point: any, icon?: any) => {
  const marker = new BMapGL.Marker(point);
  // eslint-disable-next-line no-unused-expressions
  icon && marker.setIcon(icon);
  // rotation && marker.setRotation(rotation); // 设置偏移角度
  marker.addEventListener('click', async () => {
    // 定义信息窗口内容容器
    const infoWindowContainer = infoWindowContent.value;
    // 创建信息窗口
    const infoWindow = new BMapGL.InfoWindow(infoWindowContainer, {
      width: 300, // 信息窗口宽度
      height: 0, // 信息窗口高度
      title: 'item.yardName',
      enableMessage: false, // 是否允许信息窗发送短息
    });
    map.value.openInfoWindow(infoWindow, point);
    // 添加关闭事件监听器
    infoWindow.addEventListener('close', function () {
      console.log('init()');
    });
  });
  map.value.addOverlay(marker);
};
// 设置中心坐标并初始化
// const setMapCenter = () => {
//   const point = new BMapGL.Point(120.786, 29.8683);
//   map.value.centerAndZoom(point, 9);
// };
const getCmsYard = () => {
  const list = [
    { lng: 121.0840042, lat: 30.6345242 },
    { lng: 121.920334, lat: 29.918696 },
  ];
  list.forEach((item) => {
    onDrawMarker(item, IconMap.icon);
  });
};
onMounted(() => {
  creatMap();
});
</script>
<template>
  <div id="map" class="my_map" />
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
        <div class="model-center">
          <!-- :scroll="{ x: 'max-content' }" -->
        </div>
        <div class="model-bottom">
          <span
            ><span class="">合计</span>：<span class="fw">{{ containerSourceNum?.unitNum || 0 }}</span
            >自然箱
          </span>
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
    /* 去除阴影 */
    box-shadow: none !important;
  }
  .ctn-infoWindowContent::-webkit-scrollbar {
    width: 6px; /* 垂直滚动条的宽度 */
    height: 16px !important; /* 水平滚动条的高度 */
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
