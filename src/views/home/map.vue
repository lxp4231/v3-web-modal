<!-- 原生写法 -->
<template>
  <div class="ctn-box">
    <div id="ctnMap" class="ctnMap"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Button } from 'ant-design-vue';
import { queryPage } from '../../../../../../../../../@/api/cmsBasic/yard';

export default defineComponent({
  name: 'CtnSourceMap',
  components: {
    [Button.name]: Button,
  },
  setup() {
    const map = ref();
    const cmsYardList = ref([]);
    // 创建map
    const onCreatMap = () => {
      map.value = new BMapGL.Map('ctnMap', {
        showVectorStreetLayer: true,
        showVectorLine: true,
      });
      map.value.enableScrollWheelZoom(true);

      map.value.setTilt(60);
      setMapCenter();
      getCmsYard();
    };
    // 设置中心坐标并初始化
    const setMapCenter = () => {
      const point = new BMapGL.Point(120.786, 29.8683);
      map.value.centerAndZoom(point, 9);
    };
    // 设置视野（涉及到起点和终点时使用）
    // const setMapViewport = (obj: any) => {
    //   let startLng = '';
    //   let startLat = '';
    //   // 确定坐标点
    //   map.value.setViewport([
    //     new BMapGL.Point(startLng, startLat),
    //     new BMapGL.Point(destinationLng, destinationLat),
    //   ]);
    // };
    // 清除所有覆盖物
    const removeOverlays = () => {
      map.value.clearOverlays();
    };
    // 堆场的图标
    const IconMap = {
      icon: new BMapGL.Icon(new URL('./img/icon_zhongdian@2x.png', import.meta.url).href, new BMapGL.Size(26, 32), {
        anchor: new BMapGL.Size(13, 32),
      }),
    };
    // 表格数据
    const containerSourceVOList = ref([
      {
        ctnNumber: 23,
        ctnOwner: 'MSK',
        ctnPosition: '在场',
        ctnPositionType: 'D',
        ctnSizeType: '20GP',
      },
      {
        ctnNumber: 24,
        ctnOwner: 'MSK1',
        ctnPosition: '在场',
        ctnPositionType: 'D',
        ctnSizeType: '22GP',
      },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
      // {
      //   ctnNumber: 24,
      //   ctnOwner: 'MSK1',
      //   ctnPosition: '在场',
      //   ctnPositionType: 'D',
      //   ctnSizeType: '22GP',
      // },
    ]);
    // 创建表格
    const createTable = (data) => {
      const generateTableRows = (data) => {
        return data
          .map(
            (item) => `
      <tr>
        <td style="border: 1px solid black; padding: 5px;">${item.ctnOwner}</td>
        <td style="border: 1px solid black; padding: 5px;">${item.ctnSizeType}</td>
        <td style="border: 1px solid black; padding: 5px;">${item.ctnNumber}</td>
        <td style="border: 1px solid black; padding: 5px;">${item.ctnPositionType}</td>
      </tr>
    `,
          )
          .join('');
      };
      const generateTable = (data) => {
        return `
      <table style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 5px;">箱主</th>
            <th style="border: 1px solid black; padding: 5px;">箱型</th>
            <th style="border: 1px solid black; padding: 5px;">数量</th>
            <th style="border: 1px solid black; padding: 5px;"></th>
          </tr>
        </thead>
        <tbody>
          ${generateTableRows(data)}
        </tbody>
      </table>
    `;
      };
      return generateTable(data);
    };
    // 制作弹窗
    const getInfoWindowContainer = (data) => {
      return `
          <div title="自定义信息窗口" style="max-height: 300px; overflow-y: auto;">
            <div style="position: sticky; top: 0; background: white;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);z-index: 1;">
              <label><input type="checkbox" id="checkbox1" checked />在场箱</label>
              <label><input type="checkbox" id="checkbox2" />在船箱</label>
            </div>
            <div id="content1" class="content">${createTable(data)}</div>
            <div id="content2" class="content" style="display: none;">${createTable(data)}</div>
            <div id="content3" class="content" style="display: none;">${createTable(data)}</div>
            <div id="noData" class="content" style="display: none;">无数据</div>
            <div style="position: sticky; bottom: 0; background: white;box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); z-index: 1;font-size:14px;height: 20px;">
              <span>合计：256自然箱 </span><span>350TEU</span>
            </div>
          </div>
        `;
    };
    // 添加图标&画弹窗
    const onDrawMarker = (point: any, icon?: any, item) => {
      const marker = new BMapGL.Marker(point);
      icon && marker.setIcon(icon);
      // rotation && marker.setRotation(rotation); // 设置偏移角度
      // 绑定点击事件，打开信息窗口
      marker.addEventListener('click', () => {
        console.log(item, 'item');
        // 定义信息窗口内容容器
        const infoWindowContainer = getInfoWindowContainer(containerSourceVOList.value);
        // 创建信息窗口
        const infoWindow = new BMapGL.InfoWindow(infoWindowContainer, {
          width: 0, // 信息窗口宽度
          height: 0, // 信息窗口高度
          title: item.yardName,
          enableMessage: false, // 是否允许信息窗发送短息
        });
        map.value.openInfoWindow(infoWindow, point);
        // 添加点击事件
        setTimeout(() => {
          const checkbox1 = document.getElementById('checkbox1');
          const checkbox2 = document.getElementById('checkbox2');
          if (checkbox1 && checkbox2) {
            checkbox1.addEventListener('change', handleCheckboxChange);
            checkbox2.addEventListener('change', handleCheckboxChange);
          }
        }, 100);
      });
      map.value.addOverlay(marker);
    };
    // 获取堆场数据list
    const getCmsYard = () => {
      queryPage({ current: 1, size: 100 }).then((res) => {
        if (res?.records.length) {
          cmsYardList.value = res.records;
          if (res?.records.length) {
            res.records.forEach((item) => {
              onDrawMarker({ lng: item.lng, lat: item.lat }, IconMap.icon, item);
            });
          }
        }
      });
    };
    // 点击事件
    const handleCheckboxChange = () => {
      const checkbox1 = document.getElementById('checkbox1');
      const checkbox2 = document.getElementById('checkbox2');
      const content1 = document.getElementById('content1');
      const content2 = document.getElementById('content2');
      const content3 = document.getElementById('content3');
      const noData = document.getElementById('noData');
      if (checkbox1 && checkbox2 && content1 && content2 && content3 && noData) {
        if (checkbox1.checked && checkbox2.checked) {
          content1.style.display = 'none';
          content2.style.display = 'none';
          content3.style.display = 'block';
          noData.style.display = 'none';
        } else if (checkbox1.checked) {
          content1.style.display = 'block';
          content2.style.display = 'none';
          content3.style.display = 'none';
          noData.style.display = 'none';
        } else if (checkbox2.checked) {
          content1.style.display = 'none';
          content2.style.display = 'block';
          content3.style.display = 'none';
          noData.style.display = 'none';
        } else {
          content1.style.display = 'none';
          content2.style.display = 'none';
          content3.style.display = 'none';
          noData.style.display = 'block';
        }
      }
    };
    onMounted(() => {
      // window.handleCheckboxChange = handleCheckboxChange;
      onCreatMap();
    });
    return {
      map,
      onCreatMap,
      setMapCenter,
      cmsYardList,
      getCmsYard,
      removeOverlays,
      IconMap,
      onDrawMarker,
      handleCheckboxChange,
      createTable,
      containerSourceVOList,
      getInfoWindowContainer,
      // createTable,
    };
  },
});
</script>

<style lang="less">
.flex {
  display: flex;
  justify-content: center;
}
.ctn-box {
  .flex;
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
}
.custom-info-window {
  /* 去除阴影 */
  box-shadow: none !important;
}

.shadow {
  box-shadow: none !important;
}

.shadow img {
  display: none;
}
// 背景图
.BMap_bubble_pop {
  // background-color: pink !important;
}
</style>
