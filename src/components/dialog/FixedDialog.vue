<script lang="ts" setup>
import { toRefs } from 'vue';

interface IProps {
  modelValue: boolean;
  bgWhite?: boolean;
  closeOnClickModal?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  bgWhite: false,
  closeOnClickModal: true,
});
const { modelValue, bgWhite, closeOnClickModal } = toRefs(props);
const emit = defineEmits(['update:modelValue']);
const clickMask = () => {
  if (!closeOnClickModal.value) {
    return;
  }
  emit('update:modelValue', false);
};
</script>
<template>
  <div class="popup">
    <!-- 蒙层 -->
    <transition name="fade">
      <el-overlay v-show="modelValue" :class="{ bgWhite }" @click="clickMask"></el-overlay>
    </transition>
    <!-- 弹出层 -->
    <transition name="slide-center">
      <div
        v-if="modelValue"
        class="popup-content popup-content-center"
        :class="{ 'popup-content-transparent': bgWhite }"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="scss">
.bgWhite {
  background: transparent;
}
.popup-content {
  position: fixed;
  z-index: 2001;
  background: #fff;
  border-radius: 4px;
}
.popup-content-transparent {
  background: rgba(255, 255, 255, 0.9);
}
.popup-content-center {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  max-width: 100vw;
  min-width: 200px;
  min-height: 150px;
  max-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-center-enter-from,
.slide-center-leave-to {
}

.slide-center-enter-active {
  animation: bounce-in 0.3s reverse;
}
//.slide-center-enter-from,
.slide-center-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
