<script lang="ts" setup>
import { toRefs } from 'vue';

interface IProps {
  flex?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  flex: false,
});
const { flex } = toRefs(props);
</script>
<template>
  <div class="view-scroll" :class="{ flex: flex }">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.view-scroll {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
}
.view-scroll::-webkit-scrollbar {
  display: none !important;
}
</style>
