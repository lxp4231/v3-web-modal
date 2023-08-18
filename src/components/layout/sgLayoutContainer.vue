<script lang="ts" setup></script>
<template>
  <SgLayoutFlex column class="full-h w100">
    <slot></slot>
  </SgLayoutFlex>
</template>
<style scoped lang="scss">
.w100 {
  width: 100%;
  box-sizing: border-box;
}
.full-h {
  height: 100%;
  overflow-y: scroll;
}
</style>
