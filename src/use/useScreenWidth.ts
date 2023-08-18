import { ref, onMounted, onUnmounted } from 'vue';
import { throttle } from 'lodash';

export default function useScreenWidth() {
  const screenWidth = ref(window.innerWidth);
  const handleResize = throttle(() => {
    screenWidth.value = window.innerWidth;
  }, 200);
  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
  //   const unHandleResize = () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  return {
    screenWidth,
    // unHandleResize,
  };
}
