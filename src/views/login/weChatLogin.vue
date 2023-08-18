<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import userIndexStore from '@/store/index';
import { userByidpLogin, userInfo } from '@/api/modules/login';
import useCommon from '@/use/useCommon';
import { setCookie } from '@/utils';
import { shortSuccess } from '@/utils/message';

const { push, route } = useCommon();
const indexStore = userIndexStore();
const { isShowLoading, user } = storeToRefs(indexStore);
const code = ref<any>(route.query.code || '');
// 获取用户信息
const getUserInfo = () => {
  userInfo()
    .then((res) => {
      if (res.success && res.data) {
        user.value = res.data;
        setCookie('user', res.data);
        shortSuccess('登录成功');
        push('home');
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
onMounted(() => {
  // 没有code，回到登录页
  if (!code.value) {
    push('login');
  }
  if (!user.value || !user.value.id) {
    // 第一次登录绑定手机号
    push('bindPhoneNumber', { identityProvider: 'wechat', identityProviderUid: code.value });
  } else {
    const params = {
      identityProvider: 'wechat',
      identityProviderUid: code.value,
    };
    userByidpLogin(params)
      .then((res: any) => {
        if (res.success && res.data) {
          setCookie('access_token', res.data);
          getUserInfo();
        } else {
          // push('login');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  isShowLoading.value = true;
});
onUnmounted(() => {
  isShowLoading.value = false;
});
// 是否第一次登录并 询问是否绑定手机，getUser后
</script>
<template>
  <SgLayoutContainer>
    <SgLayoutCenter class="bg-login w-full h-full">
      <div class="flex flex-col justify-center items-center"></div>
    </SgLayoutCenter>
  </SgLayoutContainer>
</template>
<style lang="scss" scoped>
.bg-login {
  background: url('@/assets/img/bg_bottom.png') no-repeat;
  background-size: cover;
}
</style>
