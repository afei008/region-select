/** @format */

import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            // 打包之后库的名称
            name: 'RegionSelect',
            // 打包生成的文件名
            fileName: 'region-select',
        },
        outDir: 'lib',
        rollupOptions: {
            // 纯 js 项目无需配置
            // 确保外部化处理那些你不想打包进库的依赖
            // external: ['vue'],
            // output: {
            //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            //     globals: {
            //         vue: 'Vue',
            //     },
            // },
        },
    },
});
