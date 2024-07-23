<script lang="ts" setup>
import { onMounted, reactive, ref, toRefs, computed, watch } from 'vue';
import { upload } from '@/api/modules/login';

const imageList = reactive([]);
const imgCount = reactive(0);
function handleFileSelect(event) {
  const { files } = event.target;
  handleFiles(files);
}
// 复制粘贴上传
function handlePaste(event) {
  const { items } = event.clipboardData || event.originalEvent.clipboardData;
  const pasteFiles = [];
  for (const index in items) {
    const item = items[index];
    if (item.kind === 'file') {
      const file = item.getAsFile();
      pasteFiles.push(file);
    }
  }
  handleFiles(pasteFiles);
}

// 处理上传的文件
async function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const fileP = files[i];
    // 进行文件类型校验等操作
    const flag = ifImg(fileP);
    console.log('ifImg(file) flag', fileP);
    if (flag) {
      const file = new FormData();
      file.append('file', fileP);
      console.log(file, 'file');
      // 上传，fileUpload为上传地址
      await upload(file)
        .then((response) => {
          const _file = response.data;
          _file.hwyObsUrl = _file.obsPath;
          _file.url = _file.obsPath;
          // 添加到已上传图片数组
          imageList.push(_file);
          imgCount++;
        })
        .catch((error) => {});
    }
  }
}
// 进行文件类型校验
function ifImg(file) {
  let isImg = ['image/jpeg', 'image/png'].includes(file.type);
  if (!isImg) {
    // message.error('只能上传图片!')
    return isImg;
  }
  if (file.size / 1024 / 1024 > 3) {
    // message.error('图片大小不得超过3M!')
    isImg = false;
  } else if (imageList.length === 8 || imgCount === 8) {
    // message.error('最多只能上传8张图片!')
    isImg = false;
  }

  return isImg;
}
// 移除已上传的图片
function removeImage(index) {
  imageList.splice(index, 1);
  imgCount--;
}
</script>
<template>
  <!-- 拖拽粘贴 上传图片范围 -->
  <div class="imageList-area" @dragover.prevent @drop.prevent="handleDrop" @paste="handlePaste">
    <!-- 显示拖拽上传区域 -->
    <div class="upload-drop-area">
      <div class="imageList-area">
        <!-- 显示已上传的图片 -->
        <div v-for="(image, index) in imageList" :key="index" class="uploadedImage-item">
          <img :src="image.url" alt="uploaded image" @click="handlePreview(image)" />
          <button class="remove-btn" @click="removeImage(index)">×</button>
        </div>
      </div>
      <div class="text-area">
        拖放图片、Ctrl+V粘贴或
        <!-- 使用label包裹input元素 -->
        <label for="imageInput" class="browse-label">浏览</label>
        <input
          id="imageInput"
          type="file"
          style="display: none"
          accept="image/jpeg,
          image/png"
          multiple
          @change="handleFileSelect"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
// 照片 上传
.imageList-area {
  background-color: #fff;
  position: relative;

  .upload-drop-area {
    border: 1.5px dashed #dcdfe6;
    padding: 5px 10px;
    text-align: center;
    gap: 5px;
    color: #909aad;

    .text-area {
      padding: 0;
      .browse-label {
        cursor: pointer;
        color: blue;
        text-decoration: none;
        color: #6b778c;
      }
      .browse-label:hover {
        color: blue;
        text-decoration: underline;
      }
    }
  }

  .imageList-area {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 8px 16px;
  }
  .uploadedImage-item {
    position: relative;
    width: 70px;
    height: 70px;
  }
  .uploadedImage-item img {
    width: 100%;
    height: 100%;
  }
  .remove-btn {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    padding: 0;
    line-height: 20px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
  .remove-btn:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>

<style scoped lang="less"></style>
