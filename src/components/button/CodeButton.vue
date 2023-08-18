<script lang="ts" setup>
import { ref, toRefs } from 'vue';

interface IProps {
  length?: number;
  size?: 'large' | 'default' | 'small';
  isValid?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
  length: 60,
  size: 'large',
  isValid: true,
});
const { length, size, isValid } = toRefs(props);
const maxLength = ref(length.value);
const time = ref();
const isCounting = ref(false);

const handleCountDown = () => {
  isCounting.value = true;
  time.value = setInterval(() => {
    if (maxLength.value <= 0) {
      clearInterval(time.value);
      isCounting.value = false;
      maxLength.value = length.value;
    } else {
      // eslint-disable-next-line no-plusplus
      maxLength.value--;
    }
  }, 1000);
};
const handleClick = () => {
  if (!isValid.value) return;
  handleCountDown();
};
</script>
<template>
  <el-button
    class="defCodeBtn w-110px font-medium rounded-4px"
    :class="{ codeBtn: isCounting }"
    :disabled="isCounting"
    :size="size"
    @click="handleClick"
  >
    {{ isCounting ? `${maxLength}s` : '发送验证码' }}
  </el-button>
</template>
<style lang="scss" scoped>
.defCodeBtn {
  height: 50px;
  color: rgba(29, 121, 255, 0.5);
  border: 1px solid rgba(29, 121, 255, 0.5);
}
.codeBtn,
.codeBtn:hover {
  height: 50px;
  color: #b7b9be;
  border: 1px solid #e5e7ec;
}
</style>
