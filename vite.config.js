import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 🔥 关键：这里必须写死你的仓库名
  base: '/visitor_demo/'
})