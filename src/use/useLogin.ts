import { computed, reactive, ref } from 'vue';
import { FormInstance, FormRules } from 'element-plus';
import { storeToRefs } from 'pinia';
import { isMobile, isEmail, isPsw, isLoginName, setCookie } from '@/utils';
import { userLogin, userPwdLogin, userOpt, userInfo } from '@/api/modules/login';
import { shortSuccess } from '@/utils/message';
import userIndexStore from '@/store/index';
import useCommon from '@/use/useCommon';

export function useLogin() {
  const { push, route } = useCommon();
  const indexStore = userIndexStore();
  const { user } = storeToRefs(indexStore);
  const paramsOtp = reactive({
    loginName: '',
    otp: '',
    check: false,
  });
  const paramsPsw = reactive({
    loginName: '',
    password: '',
    check: false,
  });
  const isShaking = ref<boolean>(false);
  const isValid = computed(() => {
    return isMobile(paramsOtp.loginName);
  });
  const isLoading = ref<boolean>(false);
  // 手机号校验
  const validatorLoginName = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('手机号/邮箱不能为空'));
    } else if (!isMobile(value) && !isEmail(value)) {
      callback(new Error('请输入有效手机号/邮箱'));
    } else {
      callback();
    }
  };
  // 自定义检验复选框
  const checkValidator = (rule: any, value: any, callback: any) => {
    if (value === false) {
      callback(new Error('请勾选我已阅读并同意'));
    } else {
      callback();
    }
  };
  // 密码校验
  const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('密码不能为空'));
    }
    if (!isPsw(value)) {
      callback(new Error('密码格式:包含大小写字母+数字,密码长度至少6位'));
    } else {
      callback();
    }
  };
  // 用户名校验
  const validateUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入手机号/邮箱/用户名'));
    } else if (isLoginName(value)) {
      callback(new Error('用户名长度不小于4位'));
    } else {
      callback();
    }
  };
  // 邮箱校验
  // const checkEmail = (rule, value, callback) => {
  //   if (value === '') {
  //     callback(new Error('邮箱不能为空'));
  //   } else if (!isEmail(value)) {
  //     callback(new Error('请输入有效邮箱'));
  //   } else {
  //     callback();
  //   }
  // };
  const rules = reactive<FormRules>({
    loginName: [{ validator: validatorLoginName, trigger: 'blur' }],
    otp: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
    check: [
      {
        validator: checkValidator,
      },
    ],
  });
  const rulesOpt = reactive<FormRules>({
    loginName: [{ validator: validatorLoginName, trigger: 'blur' }],
    otp: [{ required: false }],
  });
  const rulesPsw = reactive<FormRules>({
    loginName: [{ validator: validateUserName, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    check: [
      {
        validator: checkValidator,
      },
    ],
  });
  // 短信验证码登录
  const otpRuleFormRef = ref<FormInstance>();
  // 密码登录
  const pswRuleFormRef = ref<FormInstance>();
  const isLogin = ref(false);
  // 重置
  const onReset = () => {
    otpRuleFormRef.value?.resetFields();
    pswRuleFormRef.value?.resetFields();
  };
  // 获取用户信息
  const getUserInfo = () => {
    userInfo()
      .then((res: any) => {
        if (res.success && res.data) {
          user.value = res.data;
          setCookie('user', res.data);
          shortSuccess('登录成功');
          // 回到首页或重定向到跳转过来之前的路由
          if (route.query.redirect) {
            push(route.query.redirect);
          } else {
            push('home');
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // 登录
  const loginFun = (cb: any, tabIndex: any) => {
    const params = tabIndex === '0' ? paramsOtp : paramsPsw;
    const fun = tabIndex === '0' ? userLogin : userPwdLogin;
    cb?.validate((valid: any) => {
      if (!valid) {
        isShaking.value = true;
      }
      if (valid) {
        const nParams = JSON.parse(JSON.stringify(params));
        delete nParams.check;
        fun(nParams)
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
  const login = (cb: any, tabIndex: any) => {
    isLogin.value = true;
    loginFun(cb, tabIndex);
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
    login,
    opt,
    rules,
    rulesOpt,
    rulesPsw,
    paramsPsw,
    paramsOtp,
    otpRuleFormRef,
    pswRuleFormRef,
    onReset,
    isShaking,
    isLoading,
  };
}
