<script lang="ts" setup>
import { toRefs } from 'vue';

const props = withDefaults(
  defineProps<{
    icon?: boolean;
  }>(),
  {
    icon: true,
  },
);
const { icon } = toRefs(props);
</script>
<template>
  <sg-layout-flex center class="title" :class="{ icon: icon }">
    <slot></slot>
  </sg-layout-flex>
</template>
<style scoped lang="scss">
.title {
  color: var(--sg-gray-dark-text-color);
  font-weight: bold;
  vertical-align: center;
  font-size: 14px;
  line-height: 20px;
}
.icon {
  padding-left: 6px;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: calc(50% - 6px);
    width: 3px;
    height: 12px;
    background: #0075c0;
  }
}
</style>
