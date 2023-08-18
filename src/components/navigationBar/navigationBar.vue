<template>
  <div class="navigationBarbgs">
    <div class="navigationBar">
      <img class="logo" src="@/assets/img/logo-light.png" alt="" />
      <div class="navigationBar-box">
        <div class="list">
          <div class="nav-list" @click="home">
            <p>首页</p>
          </div>
          <div
            id="housekeeperid"
            class="nav-list housekeeperNav"
            @mouseover="housekeeperMovein()"
            @mouseleave="housekeeperMoveout"
          >
            <p>物流管家</p>
            <img class="nav-list-ico" src="@/assets/img/icon_choose.png" alt="" />
            <div v-show="housekeeperShow" class="housekeeper">
              <div class="housekeeperbox" @click="toPlatform">
                <div class="housekeeperbox-center">
                  <div class="nav-list-list" @click="routername('visualSea/visualSeaExport')">
                    <i class="nav-icons nav-icon-view"></i>
                    <div class="nav-list-list-text">全程可视</div>
                  </div>
                  <div class="nav-list-list" @click="routername('vessel/jx')">
                    <i class="nav-icons nav-icon-jinxiang"></i>
                    <div class="nav-list-list-text">进箱公告</div>
                  </div>
                  <div class="nav-list-list" @click="routername('truck/punish')">
                    <i class="nav-icons nav-icon-jika"></i>
                    <div class="nav-list-list-text">集卡查询</div>
                  </div>
                  <div class="nav-list-list" @click="routername('vessel/plan')">
                    <i class="nav-icons nav-icon-chuanqi"></i>
                    <div class="nav-list-list-text">码头船期</div>
                  </div>
                  <div class="nav-list-list" @click="routername('shippingIndex')">
                    <i class="nav-icons nav-icon-hangyun"></i>
                    <div class="nav-list-list-text">航运指数</div>
                  </div>
                  <div class="nav-list-list" @click="routername('TariffService')">
                    <i class="nav-icons nav-icon-yunjia"></i>
                    <div class="nav-list-list-text">运价服务</div>
                  </div>
                  <div class="nav-list-list" @click="routername('zhechuanqi')">
                    <i class="nav-icons nav-icon-zcq"></i>
                    <div class="nav-list-list-text">浙船期</div>
                  </div>
                  <div class="nav-list-list" @click="routername('shuzhi/nologin')">
                    <i class="nav-icons nav-icon-shuzhi"></i>
                    <div class="nav-list-list-text">数智获客</div>
                  </div>
                  <div class="nav-list-list" @click="routername('air/full')">
                    <i class="nav-icons nav-icon-yyt-air"></i>
                    <div class="nav-list-list-text">航空服务</div>
                  </div>
                  <div class="nav-list-list" @click="routername('customsService')">
                    <i class="nav-icons nav-icon-yyt-customs"></i>
                    <div class="nav-list-list-text">关务查询</div>
                  </div>
                  <div class="nav-list-list" @click="toPlatform">
                    <i class="nav-icon-hyd"></i>
                    <div class="nav-list-list-text">货源分析</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="nav-list" @click="toYwzh">
            <p>一网智联</p>
          </div>
          <div class="nav-list" @click="bookhere">
            <p>物流纾困</p>
          </div>
          <div class="nav-list" @click="routername('dtCenter')">
            <p>数据中台</p>
          </div>
          <div class="nav-list" @click="routername('InlandRiver')">
            <p>内贸货运</p>
          </div>
          <div class="nav-list" @click="onStorageService">
            <p>仓储服务</p>
          </div>
          <div class="nav-list" @click="routername('finance')">
            <p>金融商城</p>
          </div>
          <div class="nav-list" @click="routername('LogisticsMall')">
            <p>物流商城</p>
          </div>
          <div class="nav-list" @click="routername('LinkZhejiang/digital')">
            <p>浙里联动</p>
          </div>
          <div class="nav-list" @click="routername('alliance')">
            <p>四港联盟</p>
          </div>
          <div class="nav-list" @click="routername('news/allNews?index=0&scrollTo=0&classifyName=全部新闻')">
            <p>新闻资讯</p>
          </div>
        </div>
        <!-- <div class="loginBox" v-if="loginIsShow">
					<div class="login">登录</div>
					<div class="register">注册</div>
				</div> -->
        <div v-if="!loginIsShow" class="loginUser">
          <!-- <track-view v-if="loginUserShow"></track-view> -->
          <div class="loginUser-Avatar" @mouseover="loginUserMovein" @mouseleave="loginUserMoveouts">
            <img class="loginUser-Avatar-img" src="@/assets/img/icon_avator_null.png" />
            <div v-show="loginUserShow" class="loginUser-Menu">
              <div class="loginUser-Menu-centent">
                <div class="loginUser-Menu-centent-warp">
                  <div class="loginUser-Menu-centent-warp-user">
                    <div class="ellipsis flex items-center loginUser-Menu-centent-warp-user-text">
                      {{ loginName || user.name || '' }}
                    </div>
                  </div>
                  <div class="loginUser-Menu-centent-warp-Exit" @click.stop="Exit()">
                    <div class="flex items-center loginUser-Menu-centent-warp-Exit-text">
                      <el-icon class="mr-3px"><SwitchButton /></el-icon>
                      <div>退出</div>
                    </div>
                  </div>
                </div>
                <!-- <div class="loginUser-Menu-centent-list">
                  <div class="loginUser-Menu-centent-list-text">我的订阅</div>
                </div> -->
                <!-- <div class="loginUser-Menu-centent-list">
                  <div class="loginUser-Menu-centent-list-text">账户中心</div>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useLoginOut from '@/use/useLoginOut';
import userIndexStore from '@/store/index';
import { useThirdPartyLogin } from '@/use/useThirdPartyLogin';

const { toPlatform } = useThirdPartyLogin();
const indexStore = userIndexStore();
const { user } = storeToRefs(indexStore);
// import {logout} from "@/api/login";
const loginIsShow = ref<boolean>(false);
const housekeeperShow = ref<boolean>(false);
const loginUserShow = ref<boolean>(false);
const { loginOut } = useLoginOut();
const { loginName } = user.value;
const home = () => {
  // push({path: "/"});
};
// 退出登录
const Exit = () => {
  loginOut();
  // logout().then((res) => {
  // });
};
const onStorageService = () => {
  const baseUrl = 'https://ums.nbport.com.cn/ums/';
  window.open(baseUrl, '_blank');
};
// 物流纾困
const bookhere = () => {
  const href =
    import.meta.env.VITE_NODE_ENV === 'production' ? 'https://wlsk.4portun.com' : 'https://test-wlsk.4portun.com';
  window.open(href, '_blank');
};
// 用户头像移入移出
const loginUserMovein = () => {
  loginUserShow.value = true;
};
const loginUserMoveouts = () => {
  loginUserShow.value = false;
};
// 管家移入移出
const housekeeperMovein = () => {
  housekeeperShow.value = true;
  const housekeeperElement = document.getElementById('housekeeperid');
  if (housekeeperElement !== null) {
    housekeeperElement.style.background = '#1D79FF';
  }
};
const housekeeperMoveout = () => {
  housekeeperShow.value = false;
  const housekeeperElement = document.getElementById('housekeeperid');
  if (housekeeperElement !== null) {
    housekeeperElement.style.background = 'none';
  }
};
// 跳转到一网智联
const toYwzh = () => {
  window.open('https://ywzl.4portun.com');
};
const routername = (val: string) => {
  const url = `${import.meta.env.VITE_APP_PLATFORM}${val}`;
  window.open(url);
};
</script>
<style scoped lang="scss">
.navigationBarbg {
  width: 100%;
  min-width: 1280px;
  height: auto;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  background: linear-gradient(360deg, rgba(47, 48, 61, 0) 0%, rgba(47, 48, 61, 0.5) 100%);
  z-index: 100;
}

.navigationBarbgs {
  width: 100%;
  min-width: 1280px;
  height: auto;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  background: linear-gradient(360deg, rgba(47, 48, 61, 0) 0%, rgba(47, 48, 61, 0.5) 100%);
  background: #252e45;
  z-index: 9999;
}

.navigationBarbg:hover {
  background: #252e45;
}

.navigationBar {
  position: relative;
  width: 1320px;
  height: 70px;
  display: flex;
  justify-content: space-between;
}

.logo {
  height: 50px;
  margin-top: 5px;
}

.navigationBar-box {
  display: flex;
  flex: 1;
}

.list {
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
  z-index: 11;
}

.nav-list {
  width: 80px;
  height: 58px;
  border-radius: 0px 0px 4px 4px;
  margin-left: 2px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.nav-list:nth-child(1) {
  margin-left: 0px;
}

.nav-list:hover {
  background: #1d79ff;
}

.nav-list p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fefeff;
  line-height: 20px;
  margin-top: 30px;
}

.nav-list-ico {
  width: 16px;
  height: 16px;
  margin-top: 32px;
}

.loginBox {
  display: flex;
}

.login {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fefeff;
  line-height: 20px;
  /* margin-left: opx; */
  margin-top: 30px;
  cursor: pointer;
}

.login:hover {
  color: #1d79ff;
}

.register {
  width: 60px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #1d79ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  // font-weight: 500;
  color: #1d79ff;
  line-height: 20px;
  margin-left: 16px;
  margin-top: 26px;
}

.register:hover {
  background: #1d79ff;
  color: #ffffff;
  cursor: pointer;
}

.loginUser {
  display: flex;
  position: relative;
}

.loginUser-Avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-top: 22px;
  margin-left: 40px;
  position: relative;
  cursor: pointer;
}

.loginUser-Avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.loginUser-Menu {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 200px;
  height: auto;
  /* background: #ccccf7; */
  display: flex;
  z-index: 99;
}

.loginUser-Menu-centent {
  width: 200px;
  height: 50px;
  background: #fefeff;
  border-radius: 8px;
  margin-top: 56px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.loginUser-Menu-centent-warp {
  width: 100%;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* .loginUser-Menu-centent-warp:hover>.loginUser-Menu-centent-warp-Exit{
  color: #1D79FF;
} */
.loginUser-Menu-centent-warp-user {
  width: 112px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b1bac2;
  line-height: 17px;
  display: flex;
  height: 100%;
}

.loginUser-Menu-centent-warp-user:hover > .loginUser-Menu-centent-warp-user-text {
  color: #1d79ff;
}

.loginUser-Menu-centent-warp-user-text {
  color: rgba(47, 48, 61, 0.9);
  // margin-top: 24px;
  margin-left: 16px;
}

.loginUser-Menu-centent-warp-Exit {
  width: 49px;
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #b1bac2;
  line-height: 17px;
  display: flex;
  height: 100%;
}

.loginUser-Menu-centent-warp-Exit:hover > .loginUser-Menu-centent-warp-Exit-text {
  color: #1d79ff;
}

.loginUser-Menu-centent-warp-Exit-text {
  color: rgba(47, 48, 61, 0.9);
  // margin-top: 24px;
  // margin-left: 8px;
}

.loginUser-Menu-centent-list {
  width: 100%;
  height: 37px;
  display: flex;
  align-items: center;
}

.loginUser-Menu-centent-list:hover > .loginUser-Menu-centent-list-text {
  color: #1d79ff;
}

.loginUser-Menu-centent-list-text {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2f303d;
  line-height: 17px;
  margin-left: 16px;
}

/* 管家 */
.housekeeperNav {
  position: relative;
}

.housekeeper {
  position: absolute;
  top: 58px;
  left: 0px;
}

.housekeeperbox {
  margin-top: 20px;
  width: 296px;
  height: 356px;
  background: #fefeff;
  box-shadow: 0px 25px 60px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  justify-content: center;
}

.housekeeperbox-center {
  width: 260px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 8px;
}

.nav-list-list {
  width: 118px;
  height: 44px;
  background: #f6f7fb;
  border-radius: 8px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
}

/* 图标 */
.nav-list-list .nav-icons {
  border-radius: 7px;
  margin-left: 4px;
  text-align: center;
}

.nav-icons {
  display: inline-block;
  background: rgba(29, 121, 255, 0.1);
  background: url('@/assets/img/menuIcons.png') no-repeat;
  background-size: 180px 144px;
}

.nav-icon-view {
  background-position: 0 0;
  width: 36px;
  height: 36px;
}

.nav-icon-jika {
  background-position: 0 -36px;
  width: 36px;
  height: 36px;
}

.nav-icon-hangyun {
  background-position: 0 -72px;
  width: 36px;
  height: 36px;
}

.nav-icon-zcq {
  background-position: 0 -108px;
  width: 36px;
  height: 36px;
}

.nav-icon-jinxiang {
  background-position: -36px 0;
  width: 36px;
  height: 36px;
}

.nav-icon-chuanqi {
  background-position: -36px -36px;
  width: 36px;
  height: 36px;
}

.nav-icon-yunjia {
  background-position: -36px -72px;
  width: 36px;
  height: 36px;
}

.nav-icon-shuzhi {
  background-position: -36px -108px;
  width: 36px;
  height: 36px;
}

.nav-icon-yyt-air {
  background-position: -144px -72px;
  width: 36px;
  height: 36px;
}

.nav-icon-yyt-customs {
  background-position: -72px -108px;
  width: 36px;
  height: 36px;
}

.nav-icon-hyd {
  border-radius: 7px;
  margin-left: 4px;
  text-align: center;
  display: inline-block;
  background: rgba(29, 121, 255, 0.1);
  background: url('@/assets/img/icon_hyd.png') no-repeat;
  background-size: 36px 36px;
  width: 36px;
  height: 36px;
}

.nav-list-list-text {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2f303d;
  line-height: 17px;
  margin-left: 12px;
}
</style>
