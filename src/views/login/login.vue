<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { useLogin } from '@/use/useLogin';
import { useThirdPartyLogin } from '@/use/useThirdPartyLogin';
import CodeButton from '@/components/button/CodeButton.vue';
import useCommon from '@/use/useCommon';

const { push } = useCommon();
const { weChat } = useThirdPartyLogin();
const {
  isValid,
  isLogin,
  rules,
  rulesOpt,
  login,
  opt,
  paramsOtp,
  otpRuleFormRef,
  rulesPsw,
  paramsPsw,
  pswRuleFormRef,
  onReset,
  isShaking,
  isLoading,
} = useLogin();
const tabIndex = ref<any>('0');
const activeName = ref<string>('验证码登录');
const handleClick = (tab: TabsPaneContext) => {
  tabIndex.value = tab.index;
  isShaking.value = false;
  onReset();
};

// 打开用户协议
const onAgreement = () => {
  window.open(
    'https://payment-admin-frontend.oss-cn-hangzhou.aliyuncs.com/agreement/%E3%80%8A%E5%B9%B3%E5%AE%89%E9%93%B6%E8%A1%8C%E7%94%B5%E5%AD%90%E5%95%86%E5%8A%A1%E6%94%AF%E4%BB%98%E7%BB%93%E7%AE%97%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE%E3%80%8B.pdf',
  );
};
// 微信登录
const onWeChat = () => {
  weChat();
};
</script>
<template>
  <SgLayoutContainer style="overflow-y: auto; overflow-x: hidden">
    <SgLayoutCenter class="bg-login w-full h-full login-container">
      <div class="flex flex-col justify-center items-center login-screen-499">
        <div class="login-box login-w100 w-460px min-w-400px h-656px bg-white rounded-8px">
          <div class="welcome w-185px h-54px mb-54px"></div>
          <el-tabs v-model="activeName" class="login-tabs" @tab-click="handleClick">
            <el-tab-pane label="验证码登录" name="验证码登录">
              <el-form ref="otpRuleFormRef" :model="paramsOtp" :rules="isLogin ? rules : rulesOpt">
                <el-form-item prop="loginName" class="w-full">
                  <el-input
                    v-model.trim="paramsOtp.loginName"
                    class="login-input"
                    size="large"
                    placeholder="请输入手机号/邮箱"
                    :class="{ shaking: isShaking && !paramsOtp.loginName }"
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
                    <CodeButton
                      :is-valid="isValid"
                      class="code-button ml-10px"
                      size="large"
                      @click="opt()"
                    ></CodeButton>
                  </div>
                </el-form-item>
                <!-- ff6462 -->
                <el-form-item
                  label=""
                  prop="check"
                  class="agreement"
                  :class="{ shaking: isShaking && !paramsOtp.check }"
                >
                  <el-checkbox v-model="paramsOtp.check" style="font-weight: 400" label="我已阅读并同意"></el-checkbox>
                  <span class="agreement-title" @click="onAgreement">《服务协议》</span>
                  <span>和</span>
                  <span class="agreement-title" @click="onAgreement">《隐私条款》</span>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="密码登录" name="密码登录">
              <el-form ref="pswRuleFormRef" :model="paramsPsw" :rules="rulesPsw">
                <el-form-item prop="loginName" class="w-full">
                  <el-input
                    v-model.trim="paramsPsw.loginName"
                    class="login-input"
                    size="large"
                    placeholder="请输入手机号/邮箱/用户名"
                    :class="{ shaking: isShaking && !paramsPsw.loginName }"
                  >
                    <template #prefix>
                      <div class="icon-ipt">
                        <img class="w-16px h-18px" src="@/assets/img/icon_shouji.png" alt="" />
                      </div>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password" class="mt-20px w-full">
                  <div class="flex w-full">
                    <el-input
                      v-model.trim="paramsPsw.password"
                      class="h-50px flex-1 login-input"
                      size="large"
                      type="password"
                      show-password
                      placeholder="请输入密码"
                      :class="{ shaking: isShaking && !paramsPsw.password }"
                    >
                      <template #prefix>
                        <div class="icon-ipt">
                          <img class="w-16px h-18px" src="@/assets/img/icon_password.png" alt="" />
                        </div>
                      </template>
                    </el-input>
                  </div>
                </el-form-item>
                <el-form-item
                  label=""
                  prop="check"
                  class="agreement"
                  :class="{ shaking: isShaking && !paramsPsw.check }"
                >
                  <el-checkbox v-model="paramsPsw.check" style="font-weight: 400" label="我已阅读并同意"></el-checkbox>
                  <span class="agreement-title" @click="onAgreement">《服务协议》</span>
                  <span>和</span>
                  <span class="agreement-title" @click="onAgreement">《隐私条款》</span>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <el-button
            class="w-full mt-32px mb-58px"
            style="height: 50px"
            size="large"
            type="primary"
            :loading="isLoading"
            @click="login(tabIndex === '0' ? otpRuleFormRef : pswRuleFormRef, tabIndex)"
          >
            <span class="">登录/注册</span></el-button
          >
          <div class="flex justify-center items-center other mb-21px">
            <div class="w-60px h-1px left"></div>
            <div class="center text-14px ml-10px mr-10px">第三方账号登录</div>
            <div class="w-60px h-1px right"></div>
          </div>
          <!-- 三方登录 -->
          <div class="flex justify-center items-center">
            <div class="flex justify-center items-center login-icon w-44px h-44px" @click="onWeChat">
              <img class="w-23px h-20px" src="@/assets/img/icon_wechat.png" alt="" />
            </div>
          </div>
        </div>
        <div class="pageFooter">浙江四港联动发展有限公司</div>
      </div>
    </SgLayoutCenter>
  </SgLayoutContainer>
</template>
<style lang="scss" scoped>
.bg-login {
  background: url('@/assets/img/bg_bottom.png') no-repeat;
  background-size: cover;
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
.login-box {
  box-shadow: 0px 0px 40px 0px rgba(177, 186, 194, 0.3);
  padding: 54px 45px 30px 45px;
}
.welcome {
  background: url('@/assets/img/text_title.png') no-repeat;
  background-size: cover;
}
.login-tabs {
  margin: 0 2px;
  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
  }
  :deep(.el-tabs__header) {
    margin: 0 0 30px;
  }
  :deep(.el-tabs__item.is-active) {
    font-weight: 500;
    font-size: 16px;
    color: #2f303d !important;
  }
  :deep(.el-tabs__item) {
    font-weight: 400;
    font-size: 14px;
    color: #6d7280 !important;
  }
}
.agreement {
  font-size: 14px;
  font-weight: 400;
  color: #6d7280;
  line-height: 20px;
  .agreement-title {
    color: #1d79ff;
    cursor: pointer;
  }
}
.other {
  .left,
  .right {
    background: #dedede;
  }
  .center {
    color: #b1bac2;
  }
}
.login-icon {
  cursor: pointer;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(109, 114, 128, 0.2);
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
