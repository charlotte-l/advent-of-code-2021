import path from 'path'
import { defineConfig } from 'vite'
import macrosPlugin from 'vite-plugin-babel-macros'
import notifier from 'vite-plugin-notifier'

const projectRootDir = path.resolve(__dirname)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [macrosPlugin(), notifier()],
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(projectRootDir, 'src') }],
  },
})
