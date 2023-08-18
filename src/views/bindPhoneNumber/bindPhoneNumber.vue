<script setup lang="ts">
import { useBind } from '@/use/useBind';
import CodeButton from '@/components/button/CodeButton.vue';
import useCommon from '@/use/useCommon';

const { route } = useCommon();
const { isValid, isLogin, rules, rulesOpt, opt, paramsOtp, otpRuleFormRef, onBind, routeParams, isShaking, isLoading } =
  useBind();
if (route.query.identityProvider) {
  routeParams.value = route.query;
}
</script>
<template>
  <SgLayoutContainer>
    <SgLayoutCenter class="bg-bind w-full h-full bg-color bind-container">
      <div class="flex flex-col justify-center items-center bind-screen-499">
        <div class="bind-box bind-w100 w-480px min-w-400px h-500px bg-white rounded-8px">
          <div class="flex w-full justify-between mb-21px">
            <div class="bind-title w-216px h-47px mb-54px mt-13px"></div>
            <img class="w-110px h-109px" style="margin-right: -15px" src="@/assets/img/bg_phone.png" alt="" />
          </div>
          <el-form ref="otpRuleFormRef" :model="paramsOtp" :rules="isLogin ? rules : rulesOpt">
            <el-form-item prop="loginName" class="w-full">
              <el-input
                v-model.trim="paramsOtp.loginName"
                :class="{ shaking: isShaking && !paramsOtp.loginName }"
                class="login-input"
                size="large"
                placeholder="请输入手机号"
              >
                <template #prefix>
                  <div class="icon-ipt">
                    <img class="w-16px h-18px" src="@/assets/img/icon_shouji.png" alt="" />
                  </div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="otp" class="mt-20px w-full">
              <div class="flex w-full">
                <el-input
                  v-model.trim="paramsOtp.otp"
                  class="h-50px flex-1 login-input"
                  size="large"
                  placeholder="请输入验证码"
                  :class="{ shaking: isShaking && !paramsOtp.otp }"
                >
                  <template #prefix>
                    <div class="icon-ipt">
                      <img class="w-16px h-18px" src="@/assets/img/icon_yanzhengma.png" alt="" />
                    </div>
                  </template>
                </el-input>
                <CodeButton :is-valid="isValid" class="code-button ml-10px" size="large" @click="opt()"></CodeButton>
              </div>
            </el-form-item>
          </el-form>
          <el-button
            class="w-full mt-32px mb-58px"
            :loading="isLoading"
            style="height: 50px"
            size="large"
            type="primary"
            @click="onBind"
          >
            <span class="">确认绑定</span></el-button
          >
        </div>
        <div class="pageFooter">浙江四港联动发展有限公司</div>
      </div>
    </SgLayoutCenter>
  </SgLayoutContainer>
</template>
<style lang="scss" scoped>
.bg-bind {
  background: url('@/assets/img/bg_bottom.png') no-repeat;
  background-size: cover;
  overflow-x: hidden;
}
.login-input {
  > :deep(div) {
    box-shadow: none;
    background-color: #f8f9fb;
    font-size: 16px !important;
    border-radius: 4px;
  }
  :deep(.el-input__wrapper) {
    height: 50px;
    // box-shadow: none;
  }
  .icon-ipt {
    border-right: 1px solid #d8d8d8;
    padding-right: 14px;
    margin-right: 12px;
  }
}
.bind-box {
  box-shadow: 0px 0px 40px 0px rgba(177, 186, 194, 0.3);
  padding: 75px 55px 75px 55px;
}
.bind-title {
  background: url('@/assets/img/bind_text.png') no-repeat;
  background-size: cover;
}
.pageFooter {
  font-size: 12px;
  color: #b1bac2;
  padding-top: 40px;
  padding-bottom: 20px;
  text-align: center;
  position: -webkit-sticky;
  position: sticky;
  top: 100%;
}
</style>
