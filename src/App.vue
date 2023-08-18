<script setup lang="ts">
import { watch } from 'vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { storeToRefs } from 'pinia';
import useIndexStore from '@/store';
import useComment from '@/use/useCommon';
import FixedLoading from '@/components/dialog/FixedLoading.vue';
import userIndexStore from '@/store/index';

const indexStore = userIndexStore();
const { isShowLoading } = storeToRefs(indexStore);
const { push } = useComment();
const locale = zhCn;
const store = useIndexStore();
const { isLogin } = storeToRefs(store);
// console.log(window.location.pathname);
watch(isLogin, (v: any) => {
  if (!v) {
    push('login');
  }
});
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
    <FixedLoading v-model="isShowLoading" />
  </el-config-provider>
</template>
