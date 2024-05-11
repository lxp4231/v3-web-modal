<script setup lang="ts">
import { ref } from 'vue';
import useScreenWidth from '@/use/useScreenWidth';

const { screenWidth } = useScreenWidth();
const form = ref<any>({
  containerNo1: '',
  containerNo2: '1823919281@qq.com',
  containerNo3: '',
  containerNo4: '',
});
const isBtn = ref<boolean>(true);
const isLoading = ref<boolean>(false);

const onBtn = () => {
  isBtn.value = !isBtn.value;
};
</script>
<template>
  <div class="">
    12
  </div>
</template>

<style lang="scss" scoped>

</style>
