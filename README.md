# EduMart — Giao diện AbeBooks (chạy bằng Vite)

Đây là bộ giao diện EduMart phong cách biên tập kiểu AbeBooks (tông kem – đỏ gạch, chữ serif) mà ta đã dựng, được đặt trong một dự án **Vite** để chạy và đóng gói thuận tiện trong VS Code. Giao diện giữ nguyên: HTML/CSS/JS thuần, không viết lại sang framework.

## Yêu cầu
- **Node.js 18 trở lên** (kèm npm). Kiểm tra: `node -v`. Chưa có thì tải ở nodejs.org.
- **Visual Studio Code**.

## Chạy trong VS Code

1. Mở thư mục: **File → Open Folder…** chọn `edumart-abebooks`.
2. Mở Terminal: **Terminal → New Terminal**.
3. Cài Vite (lần đầu):

       npm install

4. Chạy:

       npm run dev

   Trình duyệt sẽ tự mở ở địa chỉ in ra (thường `http://localhost:5173`). Sửa file trong `public/` và lưu là trang tự tải lại.

## Các lệnh khác
- `npm run build` — đóng gói vào thư mục `dist/`.
- `npm run preview` — xem thử bản đã build.

## Cấu trúc

    edumart-abebooks/
      index.html          Trang chính (ứng dụng người mua, SPA)
      public/
        styles.css        Toàn bộ giao diện + design tokens AbeBooks
        app.js            Định tuyến, dữ liệu mẫu, render các màn
        admin.html        Trang quản trị / người bán (tự chứa)
      vite.config.js
      package.json
      .vscode/            Gợi ý extension + cấu hình biên tập
      README.md

Lưu ý: CSS và JS của giao diện được đặt trong `public/` để Vite phục vụ nguyên trạng (chạy ở phạm vi toàn cục), nhờ đó mọi nút bấm và điều hướng `go(...)` trong giao diện AbeBooks hoạt động đúng như bản gốc.

## Các màn và liên kết
Ứng dụng người mua là SPA, điều hướng bằng hàm `go(view, arg)` trong `public/app.js`; các màn liên kết đầy đủ: trang chủ, danh mục & bộ lọc, chi tiết sản phẩm, giỏ hàng, thanh toán (3 bước), đăng nhập/đăng ký, tài khoản, và Quẻ sách thần số.
Link "Bán hàng cùng EduMart" trên thanh đầu mở `admin.html`; trong trang quản trị có nút "Về trang mua sắm" quay lại.

## Ghi chú
- Đây là frontend prototype: dữ liệu sản phẩm/đơn hàng là mẫu trong bộ nhớ, reset khi tải lại trang; chưa có backend hay thanh toán thật.
- Tính năng Quẻ sách gọi AI sẽ tự rơi về nội dung soạn sẵn khi chạy ngoài môi trường có sẵn API, nên vẫn hoạt động bình thường khi chạy local.

## Design tokens (trong public/styles.css, khối :root)
Đỏ gạch #c8362a, mực gần đen #2c2620, nền kem #f7f2ea, bề mặt #fffdf9, đường kẻ #e6dccb, panel kem #efe6d6, sao/đánh giá #d99a2b. Vùng huyền học nền chàm #20243d, nhấn vàng #cda349. Tiêu đề Lora (serif), thân Be Vietnam Pro — tải từ Google Fonts.

## Mã giảm giá demo
EDU10 (giảm 10%), GIAOVIEN (giảm 15%). Miễn phí ship đơn trên 300.000đ.
