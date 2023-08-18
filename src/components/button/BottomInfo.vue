<script setup lang="ts">
import Collapse from './Collapse.vue';
</script>
<template>
  <Collapse />
  <SgLayoutCenter column class="pb-20px">
    <SgLayoutFlex class="mt-10px">
      <SgLayoutCenter column>
        <div class="mt-5px mb-5px lh20 c666">关注我们</div>
        <img class="w-80px h-80px b0" src="@/assets/img/qrcode_4portun.jpg" alt="" />
        <div class="flex flex-col items-center c666">
          <div class="pb15 text-10px lh20">联系电话：400-9039-683</div>
          <div class="pb15 text-10px lh20">公司地址：杭州市西湖区西溪新座7幢5楼</div>
        </div>
      </SgLayoutCenter>
    </SgLayoutFlex>
    <div class="c999 text-10px lh20 mt-20px">Copyright 2021-2022 浙ICP备2022018412号-2</div>
    <div class="c999 text-10px lh20">浙江四港联动发展有限公司</div>
  </SgLayoutCenter>
</template>

<style scoped lang="scss">
.lh20 {
  line-height: 20px;
}
.c666 {
  color: #666;
}
.c999 {
  color: #999;
}
.fs10 {
  font-size: 10px;
}
.pb30 {
  padding-bottom: 30px;
}
.b0 {
  border: none;
}
</style>
