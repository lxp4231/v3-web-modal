<script lang="ts" setup></script>
<template>
  <div class="layout-box">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.layout-box {
  background: var(--sg-white-bg);
  padding: 15px;
  border-radius: 8px;
  width: 100%;
}
</style>
