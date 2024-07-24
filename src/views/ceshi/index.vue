<template>
  <div class="container" @paste="handlePaste">
    <el-input v-model="textInput" type="textarea" placeholder="请输入问题或粘贴图片" :rows="10"></el-input>
    <div v-if="image" class="image-preview">
      <img :src="image" alt="Pasted Image Preview" />
      <el-button type="danger" @click="removeImage">移除图片</el-button>
    </div>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const textInput = ref('');
const image = ref<string | null>(null);

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (items) {
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            image.value = e.target?.result as string;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
};

const removeImage = () => {
  image.value = null;
};

const submit = () => {
  if (textInput.value || image.value) {
    const formData = new FormData();
    formData.append('text', textInput.value);
    console.log(textInput.value, 'textInput.value');
    return;
    if (image.value) {
      const byteString = atob(image.value.split(',')[1]);
      const mimeString = image.value.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      console.log(blob, 'blob');
      formData.append('image', blob, 'pasted_image.png');
    }

    // Here you can handle the formData, e.g., send it to your server
    ElMessage.success('提交成功！');
    // Reset inputs after submission
    textInput.value = '';
    image.value = null;
  }
  ElMessage.error('请输入问题或粘贴图片！');
};
</script>

<style scoped>
.container {
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.image-preview {
  margin-top: 10px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  display: block;
  margin-bottom: 10px;
}
</style>
