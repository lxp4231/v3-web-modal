<script setup lang="ts">
import { ref } from 'vue';
import useScreenWidth from '@/use/useScreenWidth';

const { screenWidth } = useScreenWidth();
const form = ref<any>({
  containerNo1: '',
  containerNo2: '1823919281@qq.com',
  containerNo3: '',
  containerNo4: '',
});
const isBtn = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const onBtn = () => {
  isBtn.value = !isBtn.value;
};
</script>
<template>
  <div class="personlMsg-title bg-white mb-16px rounded-8px">个人信息</div>
  <div class="personlMsg-account bg-white mb-16px rounded-8px">
    <div class="flex flex-wrap">
      <div class="flex-1">
        <div class="mb-16px">
          <div class="flex justify-start items-center">
            <div class="label w-56px flex justify-start items-center mr-15px">手机号：</div>
            <el-input v-model="form.containerNo1" class="msg-input mr-10px" placeholder="请输入手机号" />
            <div class="edit flex items-center w-62px">
              <img class="w-12px h-12px mr-5px" src="@/assets/img/icon_edit.png" alt="" />
              <span class="edit-font">更改</span>
            </div>
          </div>
        </div>
        <div class="mb-16px">
          <div class="flex justify-start items-center">
            <div class="label w-70px flex justify-start items-center">邮箱：</div>
            <el-input v-model="form.containerNo2" class="msg-input mr-10px" placeholder="请输入邮箱" />
            <div class="edit flex items-center w-62px">
              <img class="w-12px h-12px mr-5px" src="@/assets/img/icon_edit.png" alt="" />
              <span class="edit-font">更改</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="mb-16px">
          <div class="flex justify-start items-center">
            <div class="label w-70px flex justify-start items-center">实名信息：</div>
            <el-input v-model="form.containerNo3" class="msg-input mr-10px" placeholder="未实名" />
            <div class="edit flex items-center w-108px">
              <img class="w-12px h-12px mr-5px" src="@/assets/img/icon_shiming.png" alt="" />
              <span class="edit-font">进行实名认证</span>
            </div>
          </div>
        </div>
        <div class="mb-16px">
          <div class="flex items-center h-full">
            <div class="label flex justify-start items-center">是否启用密码：</div>
            <div class="edit flex items-center">
              <div @click="onBtn">
                <img v-if="!isBtn" class="w-36px h-19px mr-20px" src="@/assets/img/btn_guan.png" alt="" />
                <img v-else class="w-36px h-19px mr-20px" src="@/assets/img/btn_kai.png" alt="" />
              </div>
              <span class="edit-font">设置/更改密码</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-16px w-full">
        <div class="w-full h-1px rounded-4px" style="background: #f2f4fa"></div>
      </div>
    </div>
    <div class="flex w-full flex-row">
      <div class="label">绑定账号：</div>
      <div class="flex-1 flex flex-wrap h-auto">
        <div
          class="w-218px h-70px mr-20px mb-10px pl-15px pr-15px flex items-center justify-between bg-hex-fafbfb rounded-4px"
        >
          <div class="account-left flex">
            <img class="w-40px h-40px mr-10px" src="@/assets/img/icon_wechat_p.png" alt="" />
            <div class="account-left-font text-hex-6d7280 text-12px flex flex-col justify-between">
              <span>微信</span>
              <span>ID：Oasis</span>
            </div>
          </div>
          <div
            class="account-right text-hex-6d7280 text-12px w-56px h-26px flex justify-center items-center bg-hex-edf1f4 rounded-4px cursor-pointer"
          >
            解除绑定
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="personlMsg-service bg-white rounded-8px">
    <div class="personlMsg-service-title">服务列表</div>
    <div class="service-item flex items-center justify-between mb-16px mt-20px w-full bg-hex-FAFAFC rounded-4px">
      <div class="flex">
        <div class="service-img-box">
          <div class="service-type" :class="{ 'service-type-no': true, 'service-type-yes': false }">已开通</div>
          <img class="service-img w-180px h-126px mr-20px" src="@/assets/img/neihe.png" alt="" />
        </div>
        <div class="flex flex-col justify-between">
          <div class="text-hex-2F303D text-16px font-medium f-14-500">水路网络集装箱运输服务</div>
          <div>
            <span class="text-14px text-hex-6D7280 f-12-500">服务对象：</span
            ><span class="text-14px text-hex-2F303D">企业</span>
          </div>
          <div>
            <span class="text-14px text-hex-6D7280 f-12-500">需要资质：</span
            ><span class="text-14px text-hex-2F303D f-12-500">营业执照</span>
          </div>
          <div class="flex">
            <div
              class="w-56px h-26px flex items-center justify-center bg-hex-FFEBDE text-12px text-hex-FF7300 rounded-full mr-10px"
            >
              <span>需审核</span>
            </div>
            <div
              class="w-136px h-26px flex items-center justify-center bg-hex-DCEAFB text-12px text-hex-1D79FF rounded-full"
            >
              <span>审核时长：3个工作日</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center flex-col">
        <div class="customBtn bg-hex-1D79FF mb-12px text-white hover:bg-hex-5093f7">立即使用</div>
        <div class="customBtn bg-white text-hex-6D7280 border-1px border-solid border-hex-D2D8DC hover:bg-hex-f1f2f6">
          了解详情
        </div>
      </div>
    </div>
    <div class="service-item flex items-center justify-between mb-16px w-full bg-hex-FAFAFC rounded-4px">
      <div class="flex">
        <div class="service-img-box">
          <div class="service-type" :class="{ 'service-type-no': false, 'service-type-yes': true }">未开通</div>
          <img class="service-img w-180px h-126px mr-20px" src="@/assets/img/sk.png" alt="" />
        </div>
        <div class="flex flex-col justify-between">
          <div class="text-hex-2F303D text-16px font-medium f-14-500">水路网络集装箱运输服务</div>
          <div>
            <span class="text-14px text-hex-6D7280 f-12-500">服务对象：</span
            ><span class="text-14px text-hex-2F303D">企业</span>
          </div>
          <div>
            <span class="text-14px text-hex-6D7280 f-12-500">需要资质：</span
            ><span class="text-14px text-hex-2F303D f-12-500">营业执照</span>
          </div>
          <div class="flex">
            <div
              class="w-56px h-26px flex items-center justify-center bg-hex-FFEBDE text-12px text-hex-FF7300 rounded-full mr-10px"
            >
              <span>需审核</span>
            </div>
            <div
              class="w-136px h-26px flex items-center justify-center bg-hex-DCEAFB text-12px text-hex-1D79FF rounded-full"
            >
              <span>审核时长：3个工作日</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center flex-col">
        <!-- <div v-loading="isLoading" class="customBtn bg-hex-FFCB33 mb-12px text-hex-552002 hover:bg-hex-fde498">
          开通服务
        </div> -->
        <el-button
          :loading="isLoading"
          bg
          text
          style="width: 86px; height: 36px; background: #ffcb33"
          class="mb-12px hover:bg-hex-fde498"
          >开通服务</el-button
        >
        <div class="customBtn bg-white text-hex-6D7280 border-1px border-solid border-hex-D2D8DC hover:bg-hex-f1f2f6">
          了解详情
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.msg-input {
  width: 218px;
  height: 42px;
  font-size: 14px;
  > :deep(div) {
    box-shadow: none;
    background-color: #f8f9fb;
    border-radius: 2px;
  }
  // :deep(.el-input__wrapper) {
  //   // height: 42px;
  //   // box-shadow: none;
  // }
}
.personlMsg-title,
.personlMsg-service-title {
  font-weight: 500;
  font-size: 18px;
  color: #2f303d;
}
.personlMsg-title {
  padding: 15px 0 15px 30px;
}
.personlMsg-account {
  padding: 18px 30px 7px 30px;
  :deep(.el-form-item__label) {
    font-size: 14px;
    color: #6d7280;
    height: 42px;
    line-height: 42px;
    padding: unset;
  }
  .edit {
    cursor: pointer;
    .edit-font {
      font-size: 12px;
      color: #1d79ff;
    }
  }
}
.personlMsg-service {
  padding: 30px 28px 36px 30px;
  .service-item {
    padding: 20px;
    border: 1px solid #f2f4fa;
  }
}
.label {
  color: #6d7280;
  font-size: 14px;
}
.customBtn {
  @apply w-86px h-36px rounded-4px flex justify-center items-center text-14px cursor-pointer;
}
.service-img-box {
  position: relative;
  .service-type {
    width: 80px;
    height: 26px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    line-height: 26px;
    padding-left: 10px;
  }
  .service-type-yes {
    background: url('@/assets/img/btn_yikaitong.png') no-repeat;
    background-size: cover;
    color: #ffffff;
  }
  .service-type-no {
    background: url('@/assets/img/btn_weikaitong.png') no-repeat;
    background-size: cover;
    color: #2f303d;
  }
}
</style>
