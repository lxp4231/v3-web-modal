<template>
  <div>
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      default-expand-all
      :header-cell-style="handerMethod"
    >
      <el-table-column prop="date" label="组名" />
      <el-table-column prop="name" label="" />
      <el-table-column prop="address" label="" />
      <el-table-column label="" width="100" fixed="right">
        <template #default="scope">
          <el-button v-if="scope.row?.type" size="small" type="primary" link @click="onEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
const tableData: any[] = [
  {
    id: 3,
    date: '四港',
    isGroup: true,
    children: [
      {
        id: 31,
        name: 'wangxiaohu',
        isGroup: false,
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        id: 32,
        date: '云平台',
        isGroup: true,
        children: [
          {
            id: 332,
            date: '物流宝',
            name: 'wangxiaohu',
            address: 'No. 189, Grove St, Los Angeles',
            type: true,
            isGroup: false,
          },
          {
            id: 213,
            date: '纾困',
            name: 'wangxiaohu',
            address: 'No. 189, Grove St, Los Angeles',
            isGroup: false,
          },
        ],
      },
    ],
  },
];
const onEdit = (row: any) => {
  console.log(row, 'row');
};
// eslint-disable-next-line consistent-return
const handerMethod = (row: any) => {
  // 第一级表头
  if (row.row[0].level === 1) {
    // 合并第一三列
    // eslint-disable-next-line no-param-reassign
    row.row[0].colSpan = 4;
    // row.row[1].colSpan = 0;
    // 设置第一列表头的样式
    if (row.columnIndex === 0) {
      return {
        background: '#F5F7FA',
        color: '#18233F',
        fontSize: 'bold',
        fontFamily: 'PingFangSC, PingFang SC',
      };
    }
  } else {
    // 其他级别表头样式
    return { backgroundColor: '#143f6a', color: '#fff' };
  }
};
</script>

<style lang="scss" scoped></style>
