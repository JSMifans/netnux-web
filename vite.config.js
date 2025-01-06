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
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                configure: (proxy, options) => {
                    // proxy.on('error', (err, req, res) => {
                    //     console.log('proxy error', err)
                    // })
                    // proxy.on('proxyReq', (proxyReq, req, res) => {
                    //     console.log('发送请求到:', proxyReq.path)
                    // })
                    // proxy.on('proxyRes', (proxyRes, req, res) => {
                    //     console.log('收到响应:', proxyRes.statusCode)
                    // })
                },
            },
        },
    },
})
