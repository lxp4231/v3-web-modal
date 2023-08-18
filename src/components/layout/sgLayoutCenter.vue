<script lang="ts" setup>
import { CSSProperties, toRefs } from 'vue';

interface Props {
  column?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  column: false,
});
const { column } = toRefs(props);

const style = (): CSSProperties => {
  return {
    flexDirection: column.value ? 'column' : 'row',
  };
};
</script>
<template>
  <div class="flex justify-center items-center" :style="style()">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss"></style>
