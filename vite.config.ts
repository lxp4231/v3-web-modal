import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import presets from './presets/presets';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  // env 环境变量
  const viteEnv = loadEnv(env.mode, process.cwd());
  // console.log(import.meta.env.VITE_APP_BASE_URL, ' import.meta.env.VITE_APP_BASE_URL');
  return {
    base: viteEnv.VITE_BASE,
    // 插件
    plugins: [presets(env)],
    // 别名设置
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
      },
    },
    // 服务设置
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      port: 8060, // 端口号
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      // 接口代理
      proxy: {
        '/api': {
          target: 'https://test-api.4portun.com/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            Origin: 'https://4portun.com',
          },
        },
      },
    },
    build: {
      reportCompressedSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      minify: 'esbuild',
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    css: {
      preprocessorOptions: {
        // 全局引入了 scss 的文件
        scss: {
          additionalData: `
          @import "@/assets/styles/variables.scss";
        `,
          javascriptEnabled: true,
        },
      },
    },
  };
});
