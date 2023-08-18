<script lang="ts" setup>
import { CSSProperties, toRefs } from 'vue';

interface Props {
  column?: boolean;
  between?: boolean;
  center?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  column: false,
  between: false,
  center: false,
});
const { column, between, center } = toRefs(props);

const style = (): CSSProperties => {
  return {
    flexDirection: column.value ? 'column' : 'row',
    justifyContent: between.value ? 'space-between' : 'flex-start',
    alignItems: center.value ? 'center' : 'flex-start',
  };
};
</script>
<template>
  <div class="flex" :style="style()">
    <slot></slot>
  </div>
</template>
<style scoped lang="scss"></style>
