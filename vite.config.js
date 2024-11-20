import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    assetsInclude: ['**/*.png'],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 41499,
    },
    preview: {
        host: true,
        port: 41499,
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
            output: {
                assetFileNames: function (assetInfo) {
                    var extType = (assetInfo.name && assetInfo.name.split('.').at(-1)) || '';
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }
                    return '[name]-[hash][extname]';
                },
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: '[name]-[hash].js',
            },
        },
    },
});
