import { storeToRefs } from 'pinia';
import useIndexStore from '@/store';
import { Storage } from '@/utils/storage';
import { handlePhoneNumber } from '@/utils';
import { messageConfirm } from '@/utils/message';

export default function useLoginOut() {
  const indexStore = useIndexStore();
  const { isLogin, user } = storeToRefs(indexStore);
  const handlePhone = (value: any) => {
    return handlePhoneNumber(value);
  };
  const loginOut = () => {
    messageConfirm('确定退出登录吗？', () => {
      // user.value = '';
      Storage.clearStorage();
      isLogin.value = false;
    });
  };
  return {
    isLogin,
    loginOut,
    handlePhone,
  };
}
