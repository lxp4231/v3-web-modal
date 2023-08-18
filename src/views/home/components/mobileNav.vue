<script lang="ts" setup>
import { toRefs } from 'vue';
import menuNav from './menuNav.vue';
import useLoginOut from '@/use/useLoginOut';
import userIndexStore from '@/store/index';

const indexStore = userIndexStore();
const { user } = storeToRefs(indexStore);
const { loginOut } = useLoginOut();
const { loginName } = user.value;
interface IProps {
  modelValue: boolean;
}
const props = defineProps<IProps>();
const { modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue']);
const onClose = () => {
  emit('update:modelValue', false);
};
// 退出登录
const Exit = () => {
  loginOut();
  // logout().then((res) => {
  // });
};
</script>
<template>
  <el-drawer
    v-model="modelValue"
    direction="ltr"
    size="50%"
    title="I am the title"
    :with-header="false"
    @close="onClose"
  >
    <menuNav class="w-full h-full" @on-close="onClose">
      <template #avator>
        <div class="w-full flex justify-center items-center flex-col bg-white mb-16px mt-16px rounded-8px">
          <div class="avator-box w-62px h-62px">
            <img class="w-full h-full" src="@/assets/img/icon_avator_null.png" alt="" />
            <div class="avator-icon w-16px h-16px flex justify-center items-center rounded-8px bg-hex-1d79ff">
              <el-icon style="color: #fff; font-size: 10px"><CameraFilled /></el-icon>
            </div>
          </div>
          <div class="avator-name ellipsis mt-15px">{{ loginName ?? '用户头像' }}</div>
        </div>
        <div class="w-full h-1px bg-hex-EAECEF mb-10px"></div>
      </template>
      <template #loginout>
        <div class="flex justify-end items-center" @click.stop="Exit()">
          <!-- <img class="w-16px h-16px" src="@/assets/img/icon_exit.png" alt="" /> -->
          <el-icon class="mr-3px"><SwitchButton /></el-icon>
          <span class="text-12px">退出登录</span>
        </div>
      </template>
    </menuNav>
  </el-drawer>
</template>
<style scoped lang="scss">
.avator-name {
  font-size: 14px;
  font-weight: 400;
  color: rgba(47, 48, 61, 0.9);
}
.avator-box {
  position: relative;
  .avator-icon {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
