<template>
  <div class="mt10px bg-white h-full pt-16px pl-16px pr-16px pb-16px">
    <div class="box-center">
      <div class="left">
        <div v-for="(item, index) in tableData" :key="index" class="left-line"></div>
      </div>
      <div class="right">
        <div v-for="(item, index) in tableData" :key="index" class="box-item">
          <div class="title">{{ item.title }}</div>
          <div class="close">
            <el-icon><Close /></el-icon>
          </div>
          <div class="ipt">
            <el-input
              v-model="item.value"
              clearable
              class="num-input w-66px h-32px"
              @input="validateNumber(item)"
            ></el-input>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// myArray.splice(indexToRemove, 1);
const validateNumber = (event: any) => {
  const inputValue = event.value;
  if (!/^\d+$/.test(inputValue)) {
    // eslint-disable-next-line no-param-reassign
    event.value = inputValue.slice(0, -1);
  }
};
const tableData = ref<any>([
  {
    title: '3min内一次通过率',
    value: 30,
  },
  {
    title: '3min内一次节点准确率',
    value: 20,
  },
  {
    title: '3min内最新通过率',
    value: 30,
  },
  {
    title: '3min内最新节点准确率',
    value: 20,
  },
]);
</script>

<style lang="scss" scoped>
.box-center {
  display: flex;
  .left {
    margin-top: 18px;
    .left-line {
      margin-right: 10px;
      border-top: 1px solid rgba(177, 186, 194, 0.5);
      border-left: 1px solid rgba(177, 186, 194, 0.5);
      width: 20px;
      height: 43px;
    }
    .left-line:last-of-type {
      border-left: unset !important;
    }
  }
  .box-item {
    display: flex;
    align-items: center;
    width: 840px;
    // line-height: 20px;
    margin-bottom: 12px;
    .title {
      width: 146px;
      font-size: 14px;
      font-weight: 400;
      color: #2f303d;
    }
    .close {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 22px;
      margin-right: 24px;
      height: 32px;
      color: #b1bac2;
      &:hover {
        color: #606266;
      }
    }
    .ipt {
      font-size: 14px;
      color: #2f303d;
      .num-input {
        width: 66px !important;
        margin-right: 10px;
      }
    }
  }
}
</style>
