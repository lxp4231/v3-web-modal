<script lang="ts" setup>
import type { Component } from 'vue';

interface IProps {
  icon: Component;
}
const props = defineProps<IProps>();
</script>
<template>
  <sg-layout-flex center class="title pb-10 border-b-1 border-b-solid border-b-#eaeaea">
    <div class="mr-5 w-14 h-14 color-#0075C0">
      <el-icon>
        <component :is="props.icon" />
      </el-icon>
    </div>
    <slot></slot>
  </sg-layout-flex>
</template>
<style scoped lang="scss">
.title {
  color: var(--sg-gray-dark-text-color);
  font-weight: bold;
}
</style>
