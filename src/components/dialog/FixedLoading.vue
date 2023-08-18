<script lang="ts" setup>
import { toRefs } from 'vue';
import FixedDialog from './FixedDialog.vue';

interface IProps {
  modelValue: boolean;
}
const props = defineProps<IProps>();
const { modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue']);
</script>
<template>
  <FixedDialog bg-white :close-on-click-modal="false" :model-value="modelValue">
    <sgLayoutCenter column class="h-150px">
      <img class="loading" src="@/assets/img/loading.png" alt="" />
      <span class="mt-20px pl-7px">正在努力加载中...</span>
    </sgLayoutCenter>
  </FixedDialog>
</template>
<style scoped lang="scss">
.loading {
  width: 52px;
  height: 49px;
}
</style>
