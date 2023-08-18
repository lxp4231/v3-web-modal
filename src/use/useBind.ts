import { computed, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { storeToRefs } from 'pinia';
import { isMobile, setCookie } from '@/utils';
import { userLogin, userOpt, userInfo } from '@/api/modules/login';
import { shortSuccess } from '@/utils/message';
import useCommon from '@/use/useCommon';
import userIndexStore from '@/store/index';

export function useBind() {
  const { push } = useCommon();
  const routeParams = ref<any>({});
  const indexStore = userIndexStore();
  const { user } = storeToRefs(indexStore);
  const isLoading = ref<boolean>(false);
  const paramsOtp = reactive({
    loginName: '',
    otp: '',
  });
  const isValid = computed(() => {
    return isMobile(paramsOtp.loginName);
  });
  const validatorLoginName = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('手机号不能为空'));
    } else if (!isMobile(value)) {
      callback(new Error('请输入有效手机号'));
    } else {
      callback();
    }
  };
  const rules = reactive<FormRules>({
    loginName: [{ validator: validatorLoginName, trigger: 'blur' }],
    otp: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
  });
  const rulesOpt = reactive<FormRules>({
    loginName: [{ validator: validatorLoginName, trigger: 'blur' }],
    otp: [{ required: false }],
  });
  // 短信验证码
  const otpRuleFormRef = ref<FormInstance>();
  const isLogin = ref(false);
  // 重置
  const onReset = () => {
    otpRuleFormRef.value?.resetFields();
  };
  const isShaking = ref<boolean>(false);
  // 获取用户信息
  const getUserInfo = () => {
    userInfo()
      .then((res: any) => {
        if (res.success && res.data) {
          user.value = res.data;
          setCookie('user', res.data);
          shortSuccess('登录成功');
          // 回到首页或重定向到跳转过来之前的路由
          push('home');
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  // 绑定并登录
  const onBind = () => {
    isLogin.value = true;
    otpRuleFormRef.value?.validate((valid) => {
      if (!valid) {
        isShaking.value = true;
      }
      if (valid) {
        const nParams = Object.assign(paramsOtp, routeParams.value);
        userLogin(nParams)
          .then((res: any) => {
            if (res.success && res.data) {
              isLoading.value = true;
              setCookie('access_token', res.data);
              getUserInfo();
            }
          })
          .catch((e) => {
            isLoading.value = true;
            console.log(e);
          });
      }
    });
  };
  // 发送验证码
  const opt = () => {
    isLogin.value = false;
    otpRuleFormRef.value?.validate((valid) => {
      if (valid) {
        userOpt({
          receiver: paramsOtp.loginName,
        })
          .then((res) => {
            if (res.success) {
              shortSuccess('发送成功');
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  };
  return {
    isLogin,
    isValid,
    onBind,
    opt,
    rules,
    rulesOpt,
    paramsOtp,
    otpRuleFormRef,
    onReset,
    routeParams,
    isShaking,
    isLoading,
  };
}
