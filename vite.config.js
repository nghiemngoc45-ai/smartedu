import { defineConfig } from 'vite'

// Dự án giao diện thuần (HTML/CSS/JS) — Vite chỉ dùng để chạy dev server
// và đóng gói. CSS/JS của giao diện AbeBooks nằm trong thư mục public/ nên
// được phục vụ nguyên trạng tại đường dẫn gốc (/styles.css, /app.js).
export default defineConfig(({ command }) => ({
  // Khi build để deploy lên GitHub Pages, site chạy tại /smartedu/.
  // Khi chạy dev (npm run dev) thì giữ ở gốc /.
  base: command === 'build' ? '/smartedu/' : '/',
  server: { open: true },
}))
