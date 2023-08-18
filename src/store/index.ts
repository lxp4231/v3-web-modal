import { defineStore } from 'pinia';

export interface IndexState {
  user: any;
  isLogin: boolean;
  isLogged: boolean; // 是否首次登录
  isShowLoading: boolean;
}
const useIndexStore = defineStore({
  // id唯一
  id: 'user',
  state: (): IndexState => {
    return {
      user: '',
      isLogin: true,
      isLogged: false,
      isShowLoading: false,
    };
  },
  getters: {},
  actions: {
    changeLsLogged() {
      this.isLogged = true;
    },
  },
  persist: {
    // 开启持久化
    enabled: true,
    // 选择存储方式和内容
    strategies: [
      { storage: localStorage, paths: ['user'] },
      //   {
      //     storage: sessionStorage,
      //     paths: [],
      //   },
    ],
  },
});

export default useIndexStore;
