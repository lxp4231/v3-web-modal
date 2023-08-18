<script setup lang="ts">
import { ref } from 'vue';
import pcNav from './components/pcNav.vue';
import mobileNav from './components/mobileNav.vue';
import navigationBar from '@/components/navigationBar/navigationBar.vue';
import footerBar from '@/components/footer/footer.vue';
import mobileFooterBar from '@/components/mobileFooter/mobileFooter.vue';
import userIndexStore from '@/store/index';

const indexStore = userIndexStore();
const { user } = storeToRefs(indexStore);
const { loginName } = user.value;
const isShow = ref<boolean>(false);
const onShow = () => {
  isShow.value = !isShow.value;
};
</script>
<template>
  <navigationBar />
  <div id="sysnameList" class="w-full h-full">
    <div class="user-center bg w-full flex justify-center">
      <div class="user-center-container mt-26px mb-30px w-1280px">
        <el-container class="full">
          <!-- 菜单栏 -->
          <div class="user-center-left flex flex-col">
            <div class="w-196px h-160px flex justify-center items-center flex-col bg-white mb-16px rounded-8px">
              <div class="avator-box w-62px h-62px">
                <img class="w-full h-full" src="@/assets/img/icon_avator_null.png" alt="" />
                <div class="avator-icon w-16px h-16px flex justify-center items-center rounded-8px bg-hex-1d79ff">
                  <el-icon style="color: #fff; font-size: 10px"><CameraFilled /></el-icon>
                </div>
              </div>
              <div class="avator-name max-w-196px ellipsis mt-15px">{{ loginName ?? '用户头像' }}</div>
            </div>
            <pcNav class="flex-1" />
          </div>
          <!-- 右边内容区 -->
          <el-container direction="vertical">
            <el-main class="user-center-right bg flex-1">
              <mobileNav v-model="isShow" />
              <!-- 当小屏幕时显示 -->
              <div class="is-mobile">
                <div class="mobile-header justify-between items-center flex w-full h-60px bg-white">
                  <div class="justify-between items-center flex">
                    <img class="w-32px h-30px" src="@/assets/img/icon_logo.png" alt="" />
                    <span class="text-14px text-hex-2F303D ml-5px">用户中心</span>
                  </div>
                  <img class="w-25px h-25px cursor-pointer" src="@/assets/img/more.png" alt="" @click="onShow" />
                </div>
              </div>
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </div>

  <footerBar />
  <mobileFooterBar />
</template>

<style lang="scss" scoped>
// // 滚动条
// #sysnameList::-webkit-scrollbar {
//   width: 3px;
//   height: 8px;
// }

// // 滚动条头
// #sysnameList::-webkit-scrollbar-thumb {
//   border-radius: 1em;
//   background-color: rgba(0, 21, 41, 0.2);
// }

// // 滚动条轨道
// #sysnameList::-webkit-scrollbar-track {
//   border-radius: 1em;
//   background-color: rgba(181, 164, 164, 0.2);
// }
.user-center {
  // overflow-y: scroll;
  height: 100%;
}
.full {
  width: 100%;
  height: 100%;
}
.bg {
  background: #f6f7fb;
}
.user-center-left {
  .avator-name {
    font-size: 14px;
    font-weight: 400;
    color: rgba(47, 48, 61, 0.9);
  }
  .avator-box {
    position: relative;
    .avator-icon {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
.user-center-right {
  padding: 0 16px 10px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.mobile-header {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
  padding: 0 10px;
}
.is-mobile {
  display: none;
}
</style>
