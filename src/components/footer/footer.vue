<template>
  <div class="foot">
    <div class="foot-container">
      <div class="foot-sider">
        <img class="foot-logo" src="@/assets/img/logo-light.png" alt="" />
      </div>
      <div class="foot-content">
        <div class="foot-center-list">
          <div class="foot-center-list-title">新闻资讯</div>
          <div
            class="foot-center-list-text"
            @click="routername('news/allNews?index=1&id=3&scrollTo=0&classifyName=新闻资讯')"
          >
            新闻资讯
          </div>
          <div
            class="foot-center-list-text"
            @click="routername('news/allNews?index=2&id=1&scrollTo=0&classifyName=通知公告')"
          >
            通知公告
          </div>
          <div
            class="foot-center-list-text"
            @click="routername('news/allNews?index=3&id=4&scrollTo=0&classifyName=法律法规')"
          >
            法律法规
          </div>
          <div
            class="foot-center-list-text"
            @click="routername('news/allNews?index=4&id=2&scrollTo=0&classifyName=公司动态')"
          >
            公司动态
          </div>
        </div>
        <div class="foot-center-list">
          <div class="foot-center-list-title">物流管家</div>
          <div class="foot-center-list-text" @click="routername('visualSea/visualSeaExport')">全程可视</div>
          <div class="foot-center-list-text" @click="routername('shuzhi/nologin')">数智获客</div>
          <div class="foot-center-list-text" @click="routername('TariffService')">运价服务</div>
          <div class="foot-center-list-text" @click="MoreService">更多服务 ></div>
          <div class="foot-wuliu-box" :class="{ active: active.wuliu }" @mouseleave="active.wuliu = false">
            <div class="foot-wuliu-item" @click="routername('visualSea/visualSeaExport')">全程可视</div>
            <div class="foot-wuliu-item" @click="routername('vessel/jx')">进箱公告</div>
            <div class="foot-wuliu-item" @click="routername('truck/punish')">集卡查询</div>
            <div class="foot-wuliu-item" @click="routername('vessel/plan')">码头船期</div>
            <div class="foot-wuliu-item" @click="routername('shippingIndex')">航运信息服务</div>
            <div class="foot-wuliu-item" @click="routername('TariffService')">运价服务</div>
            <div class="foot-wuliu-item" @click="routername('zhechuanqi')">浙船期</div>
            <div class="foot-wuliu-item" @click="routername('shuzhi/nologin')">数智获客</div>
            <div class="foot-wuliu-item" @click="routername('air/full')">航空服务</div>
          </div>
        </div>
        <div class="foot-center-list">
          <div class="foot-center-list-title" @click="routername('LogisticsMall')">物流商城</div>
          <div class="foot-center-list-text" @click="routername('InlandRiver')">内贸货运</div>
          <div class="foot-center-list-text" @click="routername('dtCenter')">数据中台</div>
          <div class="foot-center-list-text" @click="routername('LinkZhejiang/digital')">浙里联动</div>
        </div>
        <div class="foot-center-list">
          <div class="foot-center-list-title">加入我们</div>
          <div class="foot-center-list-text" @click="routername('joinAlliance')">加入联盟</div>
          <div class="foot-center-list-text" @click="routername('Careers')">招聘岗位</div>
          <div class="foot-center-list-text" @click="routername('About')">关于我们</div>
        </div>
        <div class="foot-center-list">
          <div class="foot-center-list-title">友情链接</div>
          <a href="http://www.zjseaport.com/jtww/" target="_blank" class="foot-nav-val">浙江省海港集团</a>
          <a href="http://www.cncico.com/" target="_blank" class="foot-nav-val">浙江省交投集团</a>
          <a href="http://www.zjsairport.com/" target="_blank" class="foot-nav-val">浙江省机场集团</a>
          <a class="foot-center-list-text" @click="Morefriendly">点击查看更多 ></a>
          <div class="foot-friendly-box" :class="{ active: active.friendly }" @mouseleave="active.friendly = false">
            <a href="http://www.zjseaport.com/jtww/" target="_blank" class="foot-nav-val"
              >浙江省海港投资运营集团有限公司</a
            >
            <a href="http://www.cncico.com/" target="_blank" class="foot-nav-val">浙江省交通投资集团有限公司</a>
            <a href="http://www.zjsairport.com/" target="_blank" class="foot-nav-val">浙江省机场集团有限公司</a>
            <a href="http://www.china-railway.com.cn/" target="_blank" class="foot-nav-val"
              >中国铁路上海局集团有限公司</a
            >
            <a href="http://zj.chinapost.com.cn/" target="_blank" class="foot-nav-val">中国邮政集团公司浙江省分公司</a>
            <a href="https://www.etransfar.com/" target="_blank" class="foot-nav-val">传化集团有限公司</a>
            <a href="http://www.sf-express.com" target="_blank" class="foot-nav-val">顺丰控股股份有限公司</a>
            <a href="http://www.zjport.gov.cn" target="_blank" class="foot-nav-val">浙江电子口岸有限公司</a>
            <a href="http://www.ytoholding.com" target="_blank" class="foot-nav-val"
              >上海圆通蛟龙投资发展(集团)有限公司</a
            >
            <a href="https://www.alibabagroup.com/" target="_blank" class="foot-nav-val">阿里巴巴集团</a>
            <a href="https://home.baidu.com/" target="_blank" class="foot-nav-val">百度集团</a>
          </div>
        </div>
        <div class="foot-center-list">
          <div class="foot-center-list-title">客服热线</div>
          <div class="foot-cneter-hotline">4009039683</div>
          <div class="foot-center-timetext">8:00至22:00 7*14小时</div>
        </div>
        <div class="foot-center-list">
          <div class="foot-center-list-title">关注我们</div>
          <div class="foot-qrcode">
            <img src="@/assets/img/qrcode_4portun.jpg" />
          </div>
        </div>
      </div>
    </div>
    <div class="foot-end">
      <div class="foot-end-text">
        <span class="spanlink" @click="windowsOpen('https://beian.miit.gov.cn')"
          >Copyright 2021-2022 浙江四港联动发展有限公司 浙ICP备2022018412号-2</span
        >
        <span class="spanlink" @click="windowsOpen('https://beian.miit.gov.cn')">工业和信息化部备案管理系统网站</span>
        <span class="spanlink">地址:浙江省杭州市西湖区西溪路钱江西溪新座7幢A座5楼</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useThirdPartyLogin } from '@/use/useThirdPartyLogin';

const { toPlatform } = useThirdPartyLogin();
const active = reactive<any>({
  friendly: false,
  wuliu: false,
});

// 内贸货运
const onInlandRiver = () => {
  //    push({ name: "InlandRiver" })
};
// 进入数据中台
const toDtcenter = () => {
  // push({name:'dtCenter'});
};
const joinAlliance = () => {
  // push({name: "joinAlliance"})
};
// 企业文化--招聘---关于我们
const onAboutPage = () => {
  //   push({name: "AboutPage"})
};
// 打开友情链接的扩展面板
const Morefriendly = () => {
  active.friendly = true;
};
const MoreService = () => {
  active.wuliu = true;
};
const windowsOpen = (url: any) => {
  window.open(url, '_blank');
};
const toLisk = () => {
  // push({name: "digital"})
};
const routername = (val: string) => {
  const url = `${import.meta.env.VITE_APP_PLATFORM}${val}`;
  window.open(url);
};
</script>
<style scoped lang="scss">
.foot {
  width: 100%;
  min-width: 1280px;
  background: #252e45;
  height: 215px;
}
.foot-container {
  width: 1440px;
  margin: 0 auto;
  z-index: 10;
  display: flex;
  padding: 20px 0px;
}
.foot-sider {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #c2c2c9;
  flex: 1;
}
.foot-sider .foot-logo {
  width: 311px;
  height: 67.5px;
  margin-right: 32px;
}
.foot-content {
  position: relative;
  display: flex;
  flex: 2;
  justify-content: space-around;
}
.foot-center-list {
  min-width: 120px;
  height: auto;
  display: flex;
  flex-direction: column;
}
.foot-center-list-title {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fefeff;
  line-height: 29px;
  cursor: pointer;
}
.foot-center-list-text {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #c2c2c9;
  line-height: 24px;
  cursor: pointer;
  text-decoration: none;
}
.foot-center-list-text:nth-child(1) {
  margin-top: 24px;
}
.foot-center-list-text:hover {
  color: #1d79ff;
}
.foot-cneter-hotline {
  font-size: 21px;
  line-height: 42px;
  color: #c2c2c9;
}
.foot-center-timetext {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #c2c2c9;
  line-height: 24px;
}
.foot-box {
  width: 1080px;
  flex-wrap: wrap;
  color: #c2c2c9;
}
.foot-nav-val {
  display: inline-block;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #c2c2c9;
  line-height: 24px;
  cursor: pointer;
  text-decoration: none;
}
.foot-nav-val:hover {
  color: #1d79ff;
}
.foot-wuliu-box {
  display: none;
  position: absolute;
  top: 0;
  left: 0px;
  width: 0;
  height: 135px;
  background: #252e45;
  padding-left: 10px;
  z-index: 11;
}
.foot-wuliu-box.active {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;
  width: 0px;
  height: 135px;
  animation: wuliu-show 0.3s ease;
  animation-fill-mode: forwards;
  overflow: hidden;
}
.foot-wuliu-item {
  display: inline-block;
  width: 120px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #c2c2c9;
  line-height: 24px;
  cursor: pointer;
  text-decoration: none;
}
.foot-wuliu-item:hover {
  color: #1d79ff;
}
.foot-friendly-box {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  width: 0;
  height: 135px;
  background: #252e45;
  z-index: 11;
}
.foot-friendly-box.active {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  left: 100%;
  width: 0px;
  height: 135px;
  animation: friendly-show 0.3s ease;
  animation-fill-mode: forwards;
  overflow: hidden;
}
.spanlink {
  cursor: pointer;
}
@keyframes friendly-show {
  0% {
    left: 100%;
    width: 0px;
    opacity: 0.3;
  }
  100% {
    left: 0px;
    padding-left: 10px;
    width: 100%;
  }
}
@keyframes wuliu-show {
  0% {
    width: 0px;
    opacity: 0.3;
  }
  100% {
    width: 100%;
  }
}
.foot-end {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.foot-end-text {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fefeff;
  line-height: 17px;
  display: flex;
  align-items: center;
}
.foot-end-text span {
  margin: 20px;
}
.foot-qrcode img {
  width: 70px;
  margin-top: 6px;
}
</style>
