import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
    '@': path.resolve(__dirname, 'src'),
    },
  },
  // 配置代理，解决跨域问题
  server: {
    proxy: {
      // 代理路径
      '/api': {
        target: 'https://api.aipiaxi.com', // 目标服务器地址
        changeOrigin: true, // 是否修改请求头中的 Origin 字段,避免目标服务器拒绝请求。
        // 重写路径，
        // 这个配置会将路径中的 /api 替换为空，确保请求到目标服务器时路径正确。例如，/api/user 会被转发为 /user。
        rewrite: (path) => path.replace(/^\/api/, ''), 
     
      },
    },
  },
})
