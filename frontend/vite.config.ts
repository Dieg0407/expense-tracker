import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    base: './',
    server: {
        port: 3000,
        open: true,
        host: true
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            },
            output: {
                entryFileNames: 'assets/[name].js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
}); 