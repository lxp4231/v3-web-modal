import { ElMessage, ElMessageBox } from 'element-plus';

export const showError = async (messageText: string, duration: number) => {
  await ElMessage.error({
    message: messageText,
    duration,
    showClose: duration === 0,
    offset: 80,
    dangerouslyUseHTMLString: true,
  });
};

export const longError = async (message: string) => {
  await showError(message, 0);
};

export const shortError = async (message: string) => {
  await showError(message, 3000);
};

export const shortSuccess = (message: string) => {
  ElMessage.success({
    message,
    offset: 80,
    dangerouslyUseHTMLString: true,
  });
};

export const showWarning = (message: string) => {
  ElMessage.warning({
    message,
    offset: 80,
    dangerouslyUseHTMLString: true,
  });
};

export const ElMessageHTML = (type: 'success' | 'warning' | 'error' | 'info', message: string) => {
  ElMessage({
    type,
    showClose: true,
    dangerouslyUseHTMLString: true,
    duration: 5000,
    message,
  });
};

export const messageConfirm = (message: string, fn: any, fnCatch?: any) => {
  ElMessageBox.confirm(message, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    dangerouslyUseHTMLString: true,
  })
    .then(() => {
      fn();
    })
    .catch(() => {
      // eslint-disable-next-line no-unused-expressions
      fnCatch && fnCatch();
    });
};
