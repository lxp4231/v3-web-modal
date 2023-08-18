<script lang="ts" setup>
import { ref, computed } from 'vue';
import useCommon from '@/use/useCommon';
import asyncRoutes from '@/router/route.async';

const emit = defineEmits(['onClose']);
const isCollapse = ref<boolean>(false);
const defaultActive = ref<string>('0');
const { push, route } = useCommon();
const childrenRoutes: any = computed(() => asyncRoutes[0]);
const menuList = ref<any>(childrenRoutes.value.children);
const onclickMenu = (item: any, index: any) => {
  emit('onClose');
  defaultActive.value = index;
  push(item.path);
};
</script>
<template>
  <el-menu
    :collapse-transition="false"
    class="w-full h-full f-h bg-menu rounded-8px"
    :default-active="defaultActive"
    :collapse="isCollapse"
  >
    <slot name="avator" />
    <template v-for="(item, index) in menuList" :key="index">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="index + ''">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon" class="icons"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item
          v-for="(it, itIndex) in item.children"
          :key="index + '-' + itIndex"
          :index="index + '-' + itIndex"
          @click="onclickMenu(it, index + '-' + itIndex)"
        >
          <template #title>{{ item.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="index + ''" @click="onclickMenu(item, index + '')">
        <template #title>
          <!-- 动态添加组件 -->
          <el-icon>
            <component :is="item.meta.icon" class="icons"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <div class="login-out cursor-pointer"><slot name="loginout" /></div>
  </el-menu>
</template>
<style scoped lang="scss">
.bg-menu {
  position: relative;
  padding: 17px 12px 17px 2px;
  padding-top: 43px;
  border-right: unset;
  :deep(.el-menu-item) {
    height: 52px;
    transition: all 0.2s;
    padding-left: 22px !important;
    border-bottom: 1px solid #f6f7fd;
  }
  :deep(.el-menu-item.is-active) {
    color: #1d79ff;
    height: 52px;
  }
  :deep(.el-menu-item.is-active:before) {
    content: '';
    position: absolute;
    left: 0;
    width: 2px;
    height: 22px;
    background-color: #1d79ff;
  }
  :deep(.el-sub-menu.is-active .el-sub-menu__title) {
    color: #121212;
  }
  .iconfont {
    margin-right: 10px;
  }
}
.login-out {
  position: absolute;
  bottom: 0;
  right: 0;
  &:hover {
    color: #b0b1b3;
  }
}
.f-h {
  // height: 620px;
  overflow-y: scroll;
}
</style>
