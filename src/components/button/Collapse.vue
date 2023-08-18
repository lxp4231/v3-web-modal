<script lang="ts" setup>
import { ref } from 'vue';
import { useThirdPartyLogin } from '@/use/useThirdPartyLogin';

const { toPlatform } = useThirdPartyLogin();
const routername = (val: string) => {
  const url = `${import.meta.env.VITE_APP_PLATFORM}${val}`;
  window.open(url);
};
const activeName = ref<string>('');
// 跳转到一网智联
const toYwzh = () => {
  window.open('https://ywzl.4portun.com');
};
</script>
<template>
  <div class="sg-collapse ml-20px mr-20px">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="新闻资讯" name="1">
        <div class="collapse-item text-hex-666">
          <div @click="routername('news/allNews?index=1&id=3&scrollTo=0&classifyName=新闻资讯')">
            <span>新闻资讯</span>
          </div>
          <div @click="routername('news/allNews?index=2&id=1&scrollTo=0&classifyName=通知公告')">
            <span>通知公告</span>
          </div>
          <div @click="routername('news/allNews?index=3&id=4&scrollTo=0&classifyName=法律法规')">
            <span>法律法规</span>
          </div>
          <div @click="routername('news/allNews?index=4&id=2&scrollTo=0&classifyName=公司动态')">
            <span>公司动态</span>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="物流管家" name="2">
        <div class="collapse-item text-hex-666">
          <div @click="routername('visualSea/visualSeaExport')"><span>全程可视</span></div>
          <div @click="routername('shuzhi/nologin')"><span>数智获客</span></div>
          <div @click="routername('TariffService')"><span>运价服务</span></div>
          <div @click="toPlatform"><span>更多服务 ></span></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="物流商城" name="3">
        <div class="collapse-item text-hex-666">
          <div @click="routername('InlandRiver')"><span>内贸货运</span></div>
          <div @click="routername('dtCenter')"><span>数据中台</span></div>
          <div @click="toYwzh"><span>一网智联</span></div>
          <div @click="routername('LinkZhejiang/digital')"><span>浙里联动</span></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="加入我们" name="4">
        <div class="collapse-item text-hex-666">
          <div @click="routername('joinAlliance')"><span>加入联盟</span></div>
          <div @click="routername('Careers')"><span>招聘岗位</span></div>
          <div @click="routername('About')"><span>关于我们</span></div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="友情链接" name="5">
        <div class="collapse-item text-hex-666">
          <div><a href="http://www.zjseaport.com/jtww/" target="_blank">浙江省海港集团</a></div>
          <a href="http://www.cncico.com/" target="_blank">浙江省交投集团</a>
          <a href="http://www.zjsairport.com/" target="_blank">浙江省机场集团</a>
          <div @click="toPlatform"><span>更多链接 ></span></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<style lang="scss" scoped>
.sg-collapse {
  .collapse-item {
    div {
      margin: 10px 0;
    }
    div:first-child {
      margin-top: 0 !important;
    }
    div:last-child {
      margin-bottom: 0 !important;
    }
  }
}
</style>
