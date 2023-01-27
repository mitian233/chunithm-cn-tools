import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build:{
    target: 'esnext',
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {args[0].title='CHUNITHM CN 工具箱';return args})
  },
})
