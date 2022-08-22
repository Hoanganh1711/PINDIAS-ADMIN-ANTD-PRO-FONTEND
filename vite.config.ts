import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vitePluginImp({
            optimize: true,
            libList: [
                {
                    libName: 'antd',
                    libDirectory: 'es',
                    style: name => `antd/es/${name}/style`,
                },
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true, // 支持内联 JavaScript
            },
        },
    },
    resolve: {
        alias: [
            {
                find: /^~/,
                replacement: '',
            }, 
            // {
            //     find: /^@/,
            //     replacement: path.resolve(__dirname, 'src'),
            // }

            // {
            //     '@': path.resolve(__dirname, 'src'),
            //     '@components': path.resolve(__dirname, 'src/components'),
            //     '@pages': path.resolve(__dirname, 'src/pages'),
            //     '@utils': path.resolve(__dirname, 'src/utils'),
            //     '@assets': path.resolve(__dirname, 'src/assets'),
            //     '@styles': path.resolve(__dirname, 'src/styles'),
            //     '@constants': path.resolve(__dirname, 'src/constants'),
            //     '@api': path.resolve(__dirname, 'src/api'),
            //     '@router': path.resolve(__dirname, 'src/router'),
            //     '@store': path.resolve(__dirname, 'src/store'),
            //     '@images': path.resolve(__dirname, 'src/images'),
            //     find: path.resolve(__dirname, 'node_modules/find-up/dist/index.js'),
            //     '@find': path.resolve(__dirname, 'node_modules/find-up/dist/index.js'),
            //     '@find-up': path.resolve(__dirname, 'node_modules/find-up/dist/index.js'),
            //     '@find-up/dist': path.resolve(__dirname, 'node_modules/find-up/dist/index.js'),
            //     '@find-up/dist/index': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            //     '@find-up/dist/index.js': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            //     '@find-up/dist/index.js.js': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            //     '@find-up/dist/index.js.js.js': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            //     '@find-up/dist/index.js.js.js.js': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            //     '@find-up/dist/index.js.js.js.js.js': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            //     '@find-up/dist/index.js.js.js.js.js.js': path.resolve(
            //         __dirname,
            //         'node_modules/find-up/dist/index.js',
            //     ),
            // },
        ],
    },
})
