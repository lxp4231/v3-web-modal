export function useThirdPartyLogin() {
  // 跳转到云平台
  const toPlatform = () => {
    window.open(import.meta.env.VITE_APP_PLATFORM);
  };
  // 微信
  const weChat = () => {
    const redirect_uri = encodeURIComponent(`${import.meta.env.VITE_APP_WX_OAUTH}weChat/login`);
    const appid = import.meta.env.VITE_APP_WX_APP_ID;
    // '_self'
    window.open(
      `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`,
    );
  };
  return {
    weChat,
    toPlatform,
  };
}
