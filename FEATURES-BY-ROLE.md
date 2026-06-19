# EduMart — Danh sách tính năng theo phân hệ người dùng

> **Ký hiệu trạng thái:**
> ✅ Đã có · 🔧 Một phần / giả lập · 📋 Cần bổ sung
>
> **Ưu tiên (chỉ áp dụng cho 📋):**
> 🔴 Phải có · 🟠 Lợi thế cạnh tranh · 🟡 Dài hạn

---

## Phân hệ

| # | Phân hệ | Bao gồm |
|---|---------|---------|
| **1** | **Người mua** | Khách vãng lai (chưa đăng nhập) + Đã đăng ký: học sinh, sinh viên, phụ huynh |
| **2** | **Trường học / Tổ chức** | Trường học, trung tâm giáo dục, cơ quan nhà nước mua sỉ |
| **3** | **Người bán / NCC** | Nhà xuất bản, nhà cung cấp, nhà phân phối, cá nhân bán sách |
| **4** | **Quản trị viên** | Admin vận hành toàn sàn |

---

---

## 1. NGƯỜI MUA

> Gồm **Học sinh**, **Sinh viên**, **Phụ huynh** — cùng mô hình quyền.
> **Khách vãng lai** (chưa đăng nhập) có quyền cơ bản: xem, tìm kiếm, thêm giỏ hàng. Sau đăng ký mở toàn bộ quyền còn lại.

---

### 1.1 Trang chủ & Khám phá *(Khách + Đã đăng ký)*

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem trang chủ (hero, flash sale, thể loại, bán chạy, banner, bài viết) | Xem | ✓ | ✓ | ✅ |
| Xem cửa hàng chuyên biệt: Kho sách số, VPP Store, TBGD Store | Xem, điều hướng | ✓ | ✓ | ✅ |
| Đồng hồ đếm ngược flash sale | Xem tự động | ✓ | ✓ | ✅ |
| Xem bộ sưu tập editorial (100 cuốn nên đọc, Luyện thi THPT…) | Xem, click | ✓ | ✓ | ✅ |
| Xem bài viết / blog giáo dục | Xem | ✓ | ✓ | ✅ |
| Lọc sản phẩm nhanh theo đối tượng (Tiểu học → Giáo viên) | Click tile | ✓ | ✓ | ✅ |
| Cá nhân hóa trang chủ theo lịch sử duyệt | Xem (AI) | — | ✓ | 📋 🟠 |
| Banner tự động theo mùa thi / khai giảng | Xem | ✓ | ✓ | 📋 🟡 |

---

### 1.2 Tìm kiếm & Lọc

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Tìm kiếm theo tựa sách, tác giả, từ khóa | Nhập + Enter | ✓ | ✓ | ✅ |
| Tìm kiếm 3 chiều (tựa + tác giả + ISBN) từ trang chủ | Nhập 3 ô | ✓ | ✓ | ✅ |
| Lọc theo đối tượng, NXB, định dạng, giá, đánh giá, đang giảm | Chọn bộ lọc | ✓ | ✓ | ✅ |
| Lọc danh mục con VPP (Bút, Vở, Dụng cụ, Họa phẩm, Balo) | Chọn tab | ✓ | ✓ | ✅ |
| Lọc danh mục con TBGD (Máy tính, Thí nghiệm, Bản đồ, Dạy học, Công nghệ) | Chọn tab | ✓ | ✓ | ✅ |
| Sắp xếp kết quả (Mới nhất, Bán chạy, Giá tăng/giảm, Đánh giá) | Chọn | ✓ | ✓ | 🔧 |
| Autocomplete / Gợi ý từ khóa khi gõ | Dropdown tức thì | ✓ | ✓ | 📋 🔴 |
| Sửa lỗi chính tả ("toan hoc" → "toán học") | Tự động | ✓ | ✓ | 📋 🔴 |
| Lịch sử tìm kiếm | Xem, xóa từng mục, xóa tất cả | — | ✓ | 📋 🟠 |
| Tìm kiếm bằng hình ảnh (chụp bìa sách) | Upload ảnh | ✓ | ✓ | 📋 🟡 |
| Lọc theo nhiều NXB cùng lúc (multi-select) | Chọn nhiều | ✓ | ✓ | 📋 🟠 |
| Gợi ý sách theo lớp + bộ sách (KNTT / Chân trời / Cánh diều) | Chọn lớp | — | ✓ | 📋 🔴 |

---

### 1.3 Xem chi tiết sản phẩm

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem ảnh bìa / icon sản phẩm | Xem | ✓ | ✓ | ✅ |
| Xem thông tin: tên, tác giả, NXB, giá, giảm %, đánh giá, số đã bán | Xem | ✓ | ✓ | ✅ |
| Xem tab Tổng quan / Chi tiết / Đánh giá / Hỏi đáp | Chuyển tab | ✓ | ✓ | ✅ |
| Chọn số lượng (±1) | Tăng / Giảm | ✓ | ✓ | ✅ |
| Chọn định dạng sản phẩm (PDF / EPUB / Bìa cứng / Bìa mềm) | Chọn variant | ✓ | ✓ | ✅ |
| Xem sản phẩm liên quan & đã xem gần đây | Xem, click | ✓ | ✓ | ✅ |
| Đặt câu hỏi về sản phẩm | Nhập, gửi | ✓ | ✓ | ✅ |
| Xem danh sách đánh giá | Xem | ✓ | ✓ | ✅ |
| Viết đánh giá (tên, số sao, nội dung, ảnh) | Tạo mới | — | ✓ | ✅ |
| Chỉnh sửa / xóa đánh giá của mình | Chỉnh sửa, xóa | — | ✓ | 📋 🟠 |
| Báo cáo đánh giá vi phạm | Click báo cáo | — | ✓ | 📋 🟡 |
| Xem gallery nhiều ảnh (zoom, lướt) | Xem, zoom | ✓ | ✓ | 📋 🟠 |
| Xem video giới thiệu sản phẩm | Phát video | ✓ | ✓ | 📋 🟠 |
| Xem mức tồn kho ("Chỉ còn X sản phẩm") | Xem | ✓ | ✓ | 📋 🟠 |
| So sánh sản phẩm (tối đa 3) | Chọn, xem bảng | ✓ | ✓ | 📋 🟡 |
| Chia sẻ sản phẩm (copy link, Zalo, Facebook) | Chia sẻ | ✓ | ✓ | 📋 🟠 |
| Badge xác thực NXB / chống hàng giả | Xem, quét QR | ✓ | ✓ | 📋 🟡 |

---

### 1.4 Đọc thử & Nghe thử

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Đọc thử ebook (Chương 1 miễn phí) | Đọc | ✓ | ✓ | ✅ |
| Nghe thử sách nói (3 phút đầu) | Nghe | ✓ | ✓ | 🔧 giả lập |
| Xem mục lục ebook | Xem | ✓ | ✓ | ✅ |
| Xem danh sách track audiobook | Xem | ✓ | ✓ | ✅ |
| Đọc ebook thật (PDF.js / epub.js rendering) | Đọc trang thật | ✓ | ✓ | 📋 🔴 |
| Phát audio thật (HTML5 Audio + file MP3) | Nghe thật | ✓ | ✓ | 📋 🔴 |

---

### 1.5 Giỏ hàng

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Thêm sản phẩm vào giỏ | Thêm | ✓ | ✓ | ✅ |
| Xem giỏ hàng | Xem | ✓ | ✓ | ✅ |
| Thay đổi số lượng trong giỏ | Tăng / Giảm / Nhập | ✓ | ✓ | ✅ |
| Xóa sản phẩm khỏi giỏ | Xóa từng sản phẩm | ✓ | ✓ | ✅ |
| Xóa toàn bộ giỏ hàng | Xóa tất cả | ✓ | ✓ | 📋 🟡 |
| Áp mã giảm giá (voucher) | Nhập mã, áp dụng | ✓ | ✓ | ✅ |
| Xem tổng tiền, tiết kiệm, phí ship | Xem | ✓ | ✓ | ✅ |
| Gợi ý "Thường mua kèm" trong giỏ | Xem, thêm | ✓ | ✓ | 📋 🟠 |
| Lưu giỏ hàng khách → merge khi đăng nhập | Tự động | ✓ | ✓ | 📋 🟠 |

---

### 1.6 Yêu thích (Wishlist)

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Thêm / bỏ sản phẩm yêu thích | Toggle ❤ | ✓ | ✓ | ✅ |
| Xem danh sách yêu thích | Xem | ✓ | ✓ | ✅ |
| Thêm từ wishlist vào giỏ | Thêm | ✓ | ✓ | ✅ |
| Xóa nhiều sản phẩm cùng lúc | Chọn nhiều, xóa | — | ✓ | 📋 🟡 |
| Nhận thông báo khi sản phẩm wishlist giảm giá | Tự động notify | — | ✓ | 📋 🟠 |
| Chia sẻ wishlist (link công khai) | Tạo link | — | ✓ | 📋 🟡 |

---

### 1.7 Đặt hàng & Thanh toán

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Chọn địa chỉ giao hàng | Chọn từ sổ địa chỉ | — | ✓ | ✅ |
| Thanh toán nhanh không cần tài khoản (Guest Checkout) | Nhập email + địa chỉ | ✓ | — | 📋 🔴 |
| Chọn phương thức thanh toán (COD, Chuyển khoản, MoMo, VNPay, ZaloPay, Thẻ) | Chọn | ✓ | ✓ | ✅ form |
| Đặt hàng (tạo đơn) | Xác nhận | ✓ | ✓ | ✅ |
| Xem trang xác nhận đơn với mã đơn hàng | Xem | ✓ | ✓ | ✅ |
| Nhập ghi chú cho đơn hàng | Nhập | — | ✓ | 📋 🟠 |
| Xuất hóa đơn VAT | Điền thông tin công ty, xuất PDF | — | ✓ | 📋 🟠 |
| Thanh toán thật qua MoMo API | Thanh toán | ✓ | ✓ | 📋 🔴 |
| Thanh toán thật qua VNPay | Thanh toán | ✓ | ✓ | 📋 🔴 |
| Thanh toán thật qua ZaloPay | Thanh toán | ✓ | ✓ | 📋 🔴 |
| Thanh toán thẻ tín dụng (Stripe / PayOS) | Nhập thẻ | ✓ | ✓ | 📋 🔴 |
| Trả góp 0% cho đơn ≥ 2 triệu | Chọn kỳ hạn | — | ✓ | 📋 🟠 |
| Thanh toán theo hợp đồng công nợ (B2B) | Chọn | — | ✓ | 📋 🟠 |

---

### 1.8 Quản lý đơn hàng

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem danh sách đơn hàng (lọc: Tất cả / Đang xử lý / Đang giao / Hoàn thành / Đã hủy) | Xem, lọc | — | ✓ | ✅ |
| Xem chi tiết đơn (sản phẩm, địa chỉ, timeline trạng thái) | Xem | — | ✓ | ✅ |
| Mua lại đơn hàng cũ | Click "Mua lại" | — | ✓ | ✅ |
| Hủy đơn hàng (khi chưa giao) | Hủy, xác nhận lý do | — | ✓ | 🔧 |
| Yêu cầu đổi / trả hàng | Điền form lý do, gửi | — | ✓ | ✅ |
| Xem trạng thái hoàn tiền / xử lý đổi trả | Xem timeline | — | ✓ | 📋 🟠 |
| Tải hóa đơn PDF | Tải xuống | — | ✓ | 📋 🟠 |
| Theo dõi vận chuyển thật (GHN / GHTK tracking) | Xem trạng thái | — | ✓ | 📋 🔴 |
| Nhận thông báo push khi đơn cập nhật | Tự động | — | ✓ | 📋 🔴 |
| Yêu cầu báo giá sỉ (RFQ) cho trường/tổ chức | Điền form, gửi | ✓ | ✓ | ✅ |
| Xem danh sách RFQ đã gửi + trạng thái | Xem | — | ✓ | ✅ |
| Nhập danh sách đặt hàng từ file Excel | Upload | — | ✓ | 📋 🟠 |
| Xuất danh sách đặt hàng ra Excel/CSV | Tải xuống | — | ✓ | 📋 🟠 |
| Mua theo danh sách lớp (class list bundle) | Chọn lớp, thêm tất cả vào giỏ | ✓ | ✓ | ✅ |
| Tạo danh sách lớp tùy chỉnh (giáo viên) | Tạo mới, thêm/xóa sản phẩm | — | ✓ | 📋 🟠 |
| Chia sẻ link danh sách lớp với phụ huynh | Copy link | — | ✓ | 📋 🟠 |
| Chiết khấu tự động theo số lượng (50+: 10%, 200+: 15%, 500+: 20%) | Tự động áp | — | ✓ | 🔧 |

---

### 1.9 Tài khoản & Hồ sơ

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Đăng ký tài khoản (email + mật khẩu) | Tạo mới | ✓ | — | ✅ |
| Đăng nhập (email/SĐT + mật khẩu) | Đăng nhập | ✓ | — | ✅ |
| Đăng nhập bằng Google / Facebook / Apple | OAuth | ✓ | — | 📋 🔴 |
| Đăng nhập bằng OTP (Zalo / SMS) | Nhập OTP | ✓ | — | 📋 🔴 |
| Đăng xuất | Đăng xuất | — | ✓ | ✅ |
| Quên mật khẩu / đặt lại qua email | Nhập email, nhận link | ✓ | ✓ | 📋 🔴 |
| Chỉnh sửa hồ sơ (họ tên, email, SĐT) | Chỉnh sửa, lưu | — | ✓ | ✅ |
| Thay đổi ảnh đại diện | Upload, cắt ảnh | — | ✓ | 📋 🟠 |
| Đổi mật khẩu | Nhập mật khẩu cũ + mới | — | ✓ | 🔧 |
| Xác minh email | Nhận email, click link | — | ✓ | 📋 🟠 |
| Bật / Tắt xác thực 2 bước (2FA) | Bật/tắt | — | ✓ | 📋 🟡 |
| Xóa tài khoản | Xác nhận, xóa | — | ✓ | 📋 🟡 |
| Thêm / chỉnh sửa / xóa địa chỉ giao hàng | CRUD | — | ✓ | ✅ |
| Đặt địa chỉ mặc định | Chọn | — | ✓ | ✅ |
| Tự động điền tỉnh/quận/phường (API ĐVHCVN) | Dropdown cascade | — | ✓ | 📋 🟠 |
| Thêm hồ sơ con (tên, lớp học) | Thêm / Chỉnh / Xóa | — | ✓ | ✅ |
| Xem gợi ý sách theo lớp của con | Xem | — | ✓ | 📋 🟠 |
| Nộp xác minh sinh viên / giáo viên / tổ chức (upload tài liệu) | Upload, gửi | — | ✓ | 🔧 |
| Xem trạng thái duyệt xác minh | Xem | — | ✓ | 📋 🟠 |
| Nhận ưu đãi sau xác minh (giảm 10% SV / 15% GV) | Tự động | — | ✓ | 📋 🟠 |

---

### 1.10 Thư viện số (Ebook & Sách nói)

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Mua ebook / audiobook (sở hữu vĩnh viễn) | Mua | — | ✓ | ✅ |
| Thuê ebook / audiobook (7 ngày / 30 ngày) | Thuê, chọn gói | — | ✓ | ✅ |
| Xem thư viện cá nhân (lọc: Đã sở hữu / Đang thuê / Ebook / Sách nói) | Xem, lọc | — | ✓ | ✅ |
| Xem tiến độ đọc (Chương X / Y) | Xem | — | ✓ | ✅ |
| Xem số ngày còn lại của thuê | Xem | — | ✓ | ✅ |
| Gia hạn thuê | Gia hạn | — | ✓ | 🔧 |
| Đọc ebook: mục lục, chuyển chương, tiến độ | Đọc | — | ✓ | ✅ |
| Điều chỉnh font chữ (14–26px) | Chỉnh | — | ✓ | ✅ |
| Chuyển chủ đề đọc (Sáng / Sepia / Tối) | Chọn | — | ✓ | ✅ |
| Đánh dấu (bookmark) chương | Thêm / Bỏ | — | ✓ | ✅ |
| Ghi chú tại chương | Thêm, xem, xóa | — | ✓ | ✅ |
| Nghe audiobook: phát/tạm dừng, tua ±15s, tốc độ (×0.75 / ×1 / ×1.25 / ×1.5 / ×2) | Điều khiển | — | ✓ | ✅ |
| Chọn track / chương audiobook | Chọn | — | ✓ | ✅ |
| Lưu vị trí nghe (tiếp tục từ chỗ dừng) | Tự động | — | ✓ | ✅ |
| Đọc ebook offline (PWA / Service Worker) | Bật chế độ offline | — | ✓ | 📋 🔴 |
| Đồng bộ tiến độ đọc/nghe đa thiết bị | Tự động sync | — | ✓ | 📋 🔴 |
| Highlight văn bản trong ebook | Bôi chọn, chọn màu | — | ✓ | 📋 🟠 |
| Tạo flashcard từ đoạn highlight | Chọn đoạn → tạo thẻ | — | ✓ | 📋 🟠 |
| Ôn flashcard (flip card / spaced repetition) | Ôn hằng ngày | — | ✓ | 📋 🟡 |
| Từ điển inline (double-click → hiện nghĩa) | Click | — | ✓ | 📋 🟠 |
| Tìm kiếm văn bản trong ebook | Nhập từ khóa | — | ✓ | 📋 🟠 |
| Tải ebook xuống (DRM-protected) | Tải file | — | ✓ | 📋 🟡 |
| Xuất ghi chú ra file PDF / TXT | Xuất | — | ✓ | 📋 🟡 |
| Đồng bộ văn bản + audio theo giọng đọc (WhisperSync) | Tự động bôi sáng | — | ✓ | 📋 🟡 |
| Ngủ hẹn giờ tắt audio (sleep timer) | Đặt giờ | — | ✓ | 📋 🟡 |
| Thiết lập mục tiêu đọc (X chương/ngày hoặc X phút/ngày) | Đặt, theo dõi | — | ✓ | 📋 🟠 |
| Thống kê thời gian đọc/nghe theo tuần | Xem biểu đồ | — | ✓ | 📋 🟠 |
| Xem báo cáo học tập (cho phụ huynh xem của con) | Xem dashboard | — | ✓ | 📋 🟠 |

---

### 1.11 Điểm thưởng & Hạng thành viên

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem điểm hiện tại và hạng (Đồng / Bạc / Vàng / Kim cương) | Xem | — | ✓ | ✅ |
| Xem lịch sử điểm (nguồn, số điểm, ngày) | Xem | — | ✓ | ✅ |
| Nhận điểm khi mua hàng, viết đánh giá | Tự động | — | ✓ | 🔧 |
| Điểm danh hằng ngày (+1 điểm, streak bonus) | Click | — | ✓ | ✅ |
| Hoàn thành nhiệm vụ để nhận điểm | Click hoàn thành | — | ✓ | ✅ |
| Quay vòng quay may mắn | Quay | ✓ | ✓ | ✅ |
| Đổi điểm lấy voucher | Chọn phần thưởng, đổi | — | ✓ | 📋 🟠 |
| Đổi điểm gia hạn thuê sách | Đổi | — | ✓ | 📋 🟠 |
| Xem bảng xếp hạng thành viên | Xem Top | — | ✓ | ✅ |
| Nhận quà sinh nhật (voucher tự động) | Tự động | — | ✓ | 📋 🟠 |
| Ưu đãi theo hạng (ship miễn phí, giảm thêm %) | Tự động áp | — | ✓ | 📋 🟠 |

---

### 1.12 Chương trình giới thiệu

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem mã giới thiệu cá nhân | Xem | — | ✓ | ✅ |
| Copy mã / link giới thiệu | Click copy | — | ✓ | ✅ |
| Chia sẻ qua Zalo, Facebook, Messenger | Chia sẻ | — | ✓ | ✅ |
| Nhận điểm khi bạn bè đăng ký + mua đơn đầu | Tự động | — | ✓ | 🔧 |
| Xem lịch sử giới thiệu (ai đăng ký, ai mua) | Xem bảng | — | ✓ | 📋 🟠 |
| Chương trình affiliate hoa hồng (KOL / reviewer) | Đăng ký, xem dashboard | — | ✓ | 📋 🟡 |

---

### 1.13 Khuyến mãi & Tiện ích

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem Trung tâm ưu đãi (voucher, flash sale) | Xem | ✓ | ✓ | ✅ |
| Copy mã voucher | Click copy | ✓ | ✓ | ✅ |
| Quẻ sách thần số (nhập ngày sinh → gợi ý sách) | Nhập ngày, xem kết quả | ✓ | ✓ | ✅ |
| Đăng ký nhận thông báo flash sale qua email | Nhập email | ✓ | ✓ | 📋 🟠 |
| Xem lịch sự kiện (ra mắt sách, livestream tác giả) | Xem, đăng ký | ✓ | ✓ | 📋 🟡 |

---

### 1.14 Thông báo

| Tính năng | Thao tác | Khách | Đã đăng ký | Trạng thái |
|-----------|----------|:-----:|:----------:|------------|
| Xem danh sách thông báo | Xem | — | ✓ | ✅ |
| Đánh dấu đã đọc, đếm badge chưa đọc | Click | — | ✓ | ✅ |
| Xóa thông báo (từng cái / tất cả) | Xóa | — | ✓ | 📋 🟠 |
| Cài đặt loại thông báo muốn nhận | Bật/tắt từng loại | — | ✓ | 📋 🟠 |
| Thông báo push trình duyệt (Web Push) | Tự động | — | ✓ | 📋 🔴 |
| Thông báo qua email (xác nhận đơn, trạng thái giao) | Tự động gửi | — | ✓ | 📋 🔴 |
| Thông báo qua Zalo ZNS | Tự động gửi | — | ✓ | 📋 🟠 |

---

---

## 2. TRƯỜNG HỌC / TỔ CHỨC (B2B)

> Tài khoản dành cho trường học, trung tâm giáo dục, cơ quan nhà nước mua sỉ sách & thiết bị.
> Phân biệt với Bạn đọc ở chỗ: mua theo hợp đồng/PO, hóa đơn VAT, quản lý nhiều người dùng nội bộ, và có thư viện số toàn trường.

---

### 2.1 Đăng ký & Onboarding tổ chức

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Đăng ký tài khoản tổ chức (tên trường, MST, địa chỉ, người đại diện, SĐT, email) | Tạo mới | 📋 🔴 |
| Upload hồ sơ pháp lý (Quyết định thành lập, GPKD, con dấu) | Upload file | 📋 🔴 |
| Ký hợp đồng khung điện tử với EduMart | Ký online | 📋 🟠 |
| Xem trạng thái duyệt tài khoản tổ chức (Chờ duyệt / Đã duyệt / Từ chối) | Xem | 📋 🔴 |
| Chỉnh sửa thông tin tổ chức (địa chỉ, người đại diện, logo) | Chỉnh sửa, lưu | 📋 🟠 |
| Xem và tải lại hợp đồng đã ký | Tải PDF | 📋 🟡 |

---

### 2.2 Quản lý người dùng nội bộ

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Thêm tài khoản thành viên nội bộ (Kế toán, Thủ thư, Giáo vụ, Giáo viên) | Tạo mới (nhập email, vai trò) | 📋 🔴 |
| Chỉnh sửa vai trò / thông tin thành viên | Chỉnh sửa | 📋 🔴 |
| Xóa / vô hiệu hóa tài khoản thành viên | Xóa / Toggle | 📋 🔴 |
| Xem danh sách thành viên và quyền hạn | Xem | 📋 🔴 |
| Phân quyền chi tiết: ai được đặt hàng, ai được duyệt, ai được xem báo cáo | Cấu hình | 📋 🟠 |
| Đặt hạn mức chi tiêu theo từng thành viên (VD: GV chỉ đặt ≤ 5 triệu/tháng) | Đặt hạn mức | 📋 🟡 |
| Xem log hoạt động của từng thành viên (ai đặt gì, khi nào) | Xem | 📋 🟡 |

---

### 2.3 Danh mục mua sắm tổ chức

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Duyệt & tìm kiếm sản phẩm (giống Bạn đọc) | Xem, tìm kiếm, lọc | ✅ |
| Xem giá sỉ riêng (hiển thị sau khi đăng nhập tài khoản B2B) | Xem | 📋 🔴 |
| Xem chiết khấu tự động theo số lượng (50+: 10% / 200+: 15% / 500+: 20%) | Xem, tự động áp | 🔧 |
| Xem sản phẩm được ưu tiên cho trường học (badge "Dành cho trường") | Xem | 📋 🟠 |
| Lưu danh sách sản phẩm thường mua (Favorites tổ chức) | Thêm, xóa, xem | 📋 🟠 |
| Mua theo danh sách lớp có sẵn (class list bundle theo khối lớp) | Chọn khối, thêm vào giỏ | ✅ |
| Tạo danh sách mua sắm tùy chỉnh (custom purchase list) | Tạo mới, thêm/xóa sản phẩm, đặt tên | 📋 🟠 |
| Chia sẻ danh sách mua sắm nội bộ (giữa các thành viên trong tổ chức) | Copy link nội bộ | 📋 🟠 |
| Nhập danh sách đặt hàng từ file Excel (mã SP, số lượng) | Upload file, map cột | 📋 🟠 |
| Xuất danh sách đặt hàng ra file Excel/CSV | Tải xuống | 📋 🟠 |

---

### 2.4 Yêu cầu báo giá (RFQ)

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Tạo yêu cầu báo giá mới (thêm sản phẩm, nhập số lượng, ghi chú yêu cầu) | Tạo mới | ✅ |
| Chỉnh sửa RFQ trước khi gửi (thêm/xóa sản phẩm, thay đổi số lượng) | Chỉnh sửa | 📋 🟠 |
| Xóa / hủy RFQ chưa gửi | Xóa | 📋 🟠 |
| Gửi RFQ đến EduMart | Gửi | ✅ |
| Xem danh sách RFQ đã gửi (lọc: Chờ báo giá / Đã báo giá / Đã đặt hàng / Hủy) | Xem, lọc | ✅ |
| Xem chi tiết báo giá nhận được (bảng giá, điều khoản, thời hạn hiệu lực) | Xem | 📋 🔴 |
| Chấp nhận báo giá → chuyển thành đơn hàng | Click chấp nhận | 📋 🔴 |
| Từ chối báo giá + ghi lý do | Click từ chối, nhập lý do | 📋 🔴 |
| Đàm phán lại (yêu cầu điều chỉnh giá / điều khoản) | Gửi phản hồi | 📋 🟡 |
| Lưu báo giá để tham chiếu sau | Lưu | 📋 🟡 |
| Tải báo giá xuống dạng PDF | Tải | 📋 🟠 |

---

### 2.5 Đặt hàng & Phê duyệt nội bộ

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Thêm sản phẩm vào giỏ hàng tổ chức | Thêm | ✅ |
| Đặt hàng trực tiếp (không qua RFQ, cho đơn nhỏ) | Đặt | ✅ |
| Đặt hàng từ báo giá đã được duyệt | Xác nhận từ báo giá | 📋 🔴 |
| Luồng phê duyệt nội bộ: thành viên tạo đơn → trưởng bộ phận duyệt → đặt hàng | Gửi duyệt / Duyệt / Từ chối | 📋 🟠 |
| Nhận thông báo khi đơn cần duyệt | Tự động | 📋 🟠 |
| Gắn mã đề nghị mua sắm / mã PO nội bộ vào đơn hàng | Nhập mã | 📋 🟠 |
| Nhập ghi chú cho đơn (mục đích mua, tên chương trình, năm học) | Nhập | 📋 🟠 |
| Đặt hàng định kỳ (recurring order theo học kỳ / năm học) | Đặt lịch, chỉnh sửa, hủy | 📋 🟡 |
| Hủy đơn hàng (khi chưa xử lý) | Hủy, xác nhận lý do | 📋 🟠 |

---

### 2.6 Thanh toán B2B

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Thanh toán chuyển khoản ngân hàng | Chọn, upload chứng từ | 📋 🔴 |
| Thanh toán theo hợp đồng công nợ (NET 30 / NET 60 ngày) | Chọn hình thức | 📋 🟠 |
| Thanh toán qua MoMo Business / VNPay Business | Thanh toán | 📋 🟠 |
| Xem hạn mức tín dụng hiện tại và đã sử dụng | Xem | 📋 🟠 |
| Xem lịch sử thanh toán (ngày, số tiền, phương thức, trạng thái) | Xem | 📋 🔴 |
| Xem công nợ còn lại và ngày đến hạn | Xem | 📋 🔴 |
| Nhận nhắc nhở thanh toán trước ngày đến hạn (3 ngày / 1 ngày) | Tự động (email + Zalo) | 📋 🟠 |
| Upload chứng từ thanh toán chuyển khoản | Upload ảnh/PDF | 📋 🔴 |
| Xuất hóa đơn GTGT (VAT) theo từng đơn hoặc theo tháng | Xuất PDF | 📋 🔴 |
| Xuất bảng kê chi tiết thanh toán theo kỳ | Xuất Excel | 📋 🟠 |
| Đối soát công nợ cuối tháng / cuối năm | Xem, xuất biên bản | 📋 🟡 |

---

### 2.7 Theo dõi & Quản lý đơn hàng

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem danh sách tất cả đơn hàng của tổ chức (lọc: theo người đặt, trạng thái, thời gian) | Xem, lọc | 📋 🔴 |
| Xem chi tiết đơn (sản phẩm, số lượng, giá, người đặt, trạng thái giao) | Xem | 📋 🔴 |
| Theo dõi trạng thái giao hàng (timeline + mã vận đơn) | Xem | 📋 🔴 |
| Xác nhận đã nhận hàng | Click xác nhận | 📋 🟠 |
| Yêu cầu đổi / trả hàng (kèm hình ảnh và lý do) | Tạo yêu cầu, theo dõi trạng thái | 📋 🟠 |
| Tải biên bản bàn giao hàng hóa (PDF) | Tải | 📋 🟠 |
| Xuất toàn bộ lịch sử đơn hàng (Excel) | Xuất | 📋 🟠 |

---

### 2.8 Thư viện số toàn trường

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Mua giấy phép ebook toàn trường (site license: 1 đầu sách × N học sinh) | Chọn gói, thanh toán | 📋 🔴 |
| Xem danh sách ebook đã mua license (tên sách, số lượng slot, đã cấp / còn trống) | Xem | 📋 🔴 |
| Thêm ebook mới vào thư viện trường | Tìm kiếm, thêm | 📋 🔴 |
| Xóa ebook khỏi thư viện (sau khi hết hạn license) | Xóa | 📋 🟠 |
| Cấp quyền đọc ebook cho học sinh (theo lớp hoặc từng cá nhân) | Chọn lớp / chọn HS, cấp quyền | 📋 🔴 |
| Thu hồi quyền đọc (cuối năm học, chuyển trường) | Chọn, thu hồi hàng loạt / từng người | 📋 🟠 |
| Gia hạn license khi sắp hết hạn | Gia hạn, chọn gói | 📋 🟠 |
| Nhập danh sách học sinh từ file Excel (họ tên, lớp, email/SĐT) | Upload, map cột, import | 📋 🔴 |
| Thêm học sinh mới vào danh sách | Thêm từng người | 📋 🟠 |
| Chỉnh sửa thông tin học sinh (lớp, email) | Chỉnh sửa | 📋 🟠 |
| Xóa / vô hiệu hóa học sinh đã nghỉ học | Xóa / Toggle | 📋 🟠 |
| Quản lý danh sách lớp học (tạo lớp, thêm/chuyển học sinh) | Tạo lớp, thêm/xóa thành viên | 📋 🔴 |
| Giao sách đọc bắt buộc cho lớp (assign reading) | Chọn lớp, chọn sách, đặt deadline | 📋 🟠 |
| Xem tiến độ đọc của từng lớp / từng học sinh | Xem bảng, lọc theo lớp | 📋 🟠 |
| Xuất báo cáo sử dụng thư viện (ai đọc gì, bao lâu, tiến độ) | Xuất Excel/PDF | 📋 🟠 |
| Gửi nhắc nhở học sinh chưa đọc tài liệu được giao | Gửi (email / Zalo) | 📋 🟡 |

---

### 2.9 Quản lý giáo viên trong tổ chức

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Thêm giáo viên vào hệ thống (tên, môn dạy, lớp phụ trách, email) | Tạo mới | 📋 🟠 |
| Chỉnh sửa / xóa thông tin giáo viên | Chỉnh sửa, xóa | 📋 🟠 |
| Xem danh sách giáo viên và lớp phụ trách | Xem | 📋 🟠 |
| Cấp quyền giáo viên tạo danh sách lớp riêng (class list) | Toggle quyền | 📋 🟠 |
| Duyệt danh sách lớp do giáo viên tạo trước khi chia sẻ phụ huynh | Xem, duyệt / từ chối | 📋 🟡 |
| Xem thống kê tài nguyên mà giáo viên đã tải / sử dụng | Xem | 📋 🟡 |

---

### 2.10 Báo cáo & Phân tích (B2B)

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem tổng chi tiêu theo tháng / học kỳ / năm học | Xem biểu đồ | 📋 🟠 |
| Xem chi tiêu theo danh mục (Sách / VPP / TBGD / Ebook) | Xem, lọc | 📋 🟠 |
| Xem chi tiêu theo người đặt hàng (thành viên nội bộ) | Xem bảng | 📋 🟠 |
| So sánh chi tiêu giữa các kỳ (năm nay vs năm ngoái) | Xem biểu đồ so sánh | 📋 🟡 |
| Xuất báo cáo chi tiêu tổng hợp (PDF / Excel) | Chọn kỳ, xuất | 📋 🟠 |
| Xuất báo cáo sử dụng thư viện số toàn trường | Chọn kỳ, xuất | 📋 🟠 |
| Xem thống kê mua hàng theo môn học / khối lớp | Xem | 📋 🟡 |
| Dashboard tổng quan: ngân sách đã dùng / còn lại, đơn đang xử lý, sách sắp hết hạn license | Xem real-time | 📋 🟠 |

---

---

## 3. NGƯỜI BÁN / NCC (NHÀ CUNG CẤP)

> Cổng riêng `seller.html` — hiện chưa triển khai.
> Bao gồm: Nhà xuất bản, nhà phân phối sách, nhà cung cấp VPP & TBGD, cá nhân bán sách cũ.

---

### 2.1 Onboarding

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Đăng ký tài khoản người bán (CCCD, GPKD, thông tin ngân hàng) | Tạo mới | 📋 🔴 |
| Xác minh danh tính eKYC (upload CCCD, chụp mặt) | Upload, xác nhận | 📋 🔴 |
| Ký hợp đồng điện tử với EduMart | Ký online | 📋 🟠 |
| Chỉnh sửa hồ sơ gian hàng (logo, mô tả, banner) | Chỉnh sửa, lưu | 📋 🟠 |
| Xem hướng dẫn bán hàng | Xem | 📋 🟠 |

---

### 2.2 Quản lý sản phẩm

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Thêm sản phẩm mới (tên, mô tả, ảnh, giá, danh mục, đối tượng) | Tạo mới | 📋 🔴 |
| Chỉnh sửa thông tin sản phẩm | Chỉnh sửa, lưu | 📋 🔴 |
| Xóa sản phẩm | Xóa | 📋 🔴 |
| Ẩn / Hiện sản phẩm (không xóa) | Toggle | 📋 🔴 |
| Upload ebook (PDF, EPUB) với DRM | Upload file | 📋 🔴 |
| Upload audiobook (MP3, M4A) với DRM | Upload file | 📋 🔴 |
| Nhập sản phẩm hàng loạt từ file Excel/CSV | Upload | 📋 🟠 |
| Xem trước sản phẩm trước khi đăng | Preview | 📋 🟠 |
| Quản lý tồn kho (nhập, xuất, cảnh báo hết hàng) | Cập nhật số lượng | 📋 🔴 |
| Quản lý biến thể (bìa cứng/mềm, màu sắc, kích cỡ) | Thêm / xóa biến thể | 📋 🟠 |
| Gửi sản phẩm để admin duyệt | Gửi, xem trạng thái | 📋 🟠 |

---

### 2.3 Quản lý đơn hàng

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem danh sách đơn hàng mới (lọc theo trạng thái) | Xem, lọc | 📋 🔴 |
| Xác nhận / từ chối đơn hàng | Click | 📋 🔴 |
| Cập nhật trạng thái đơn (Đóng gói → Đã giao bưu tá) | Cập nhật | 📋 🔴 |
| Tạo phiếu giao hàng tự động (GHN / GHTK) | Click tạo, in phiếu | 📋 🟠 |
| Xử lý yêu cầu đổi / trả | Xem, phê duyệt / từ chối | 📋 🟠 |
| Xuất báo cáo đơn hàng (CSV/Excel) | Xuất | 📋 🟠 |

---

### 2.4 Tài chính & Doanh thu

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem doanh thu theo ngày / tuần / tháng | Xem biểu đồ | 📋 🟠 |
| Xem phí hoa hồng sàn (EduMart commission) | Xem chi tiết | 📋 🟠 |
| Yêu cầu rút tiền về tài khoản ngân hàng | Nhập số tiền, xác nhận | 📋 🟠 |
| Xem lịch sử thanh toán / rút tiền | Xem | 📋 🟠 |
| Xuất báo cáo doanh thu (PDF / Excel) | Xuất | 📋 🟡 |

---

### 2.5 Marketing & Khuyến mãi

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Tạo voucher riêng cho gian hàng | Tạo mới, đặt điều kiện, vô hiệu | 📋 🟠 |
| Đăng ký tham gia flash sale của sàn | Đăng ký, đặt giá flash | 📋 🟠 |
| Quảng cáo sản phẩm nổi bật (Sponsored) | Đặt ngân sách, chọn sản phẩm | 📋 🟡 |
| Xem thống kê quảng cáo (hiển thị, click, chuyển đổi) | Xem | 📋 🟡 |
| Livestream bán hàng (ghim sản phẩm trong stream) | Bắt đầu stream, quản lý | 📋 🟡 |

---

### 2.6 Tài nguyên giáo dục (NXB / Giáo viên bán)

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Upload giáo án / tài liệu tự tạo (có doanh thu) | Upload, chỉnh sửa, xóa, đặt giá | 📋 🟠 |
| Xem thống kê lượt tải tài liệu đã đăng | Xem dashboard | 📋 🟠 |
| Tạo gói tài nguyên trọn bộ theo bộ sách | Tạo combo, đặt giá | 📋 🟡 |

---

---

## 4. QUẢN TRỊ VIÊN (ADMIN)

> Cổng riêng `admin.html` — hiện chưa triển khai

---

### 3.1 Dashboard tổng quan

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem KPI: GMV, đơn hàng, người dùng mới, tỉ lệ hoàn tiền | Xem real-time | 📋 🔴 |
| Xem biểu đồ doanh thu theo ngày/tuần/tháng/năm | Xem, chọn khoảng | 📋 🔴 |
| Xem top sản phẩm bán chạy / xu hướng tìm kiếm | Xem bảng | 📋 🟠 |
| Xem bản đồ nhiệt theo tỉnh thành | Xem bản đồ | 📋 🟡 |

---

### 3.2 Quản lý người dùng

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem danh sách tài khoản (lọc theo vai trò, trạng thái, ngày đăng ký) | Xem, lọc, tìm kiếm | 📋 🔴 |
| Xem chi tiết tài khoản (hồ sơ, đơn hàng, điểm, hoạt động) | Xem | 📋 🔴 |
| Khóa / mở khóa tài khoản | Toggle | 📋 🔴 |
| Reset mật khẩu cho người dùng | Click, gửi email | 📋 🟠 |
| Duyệt / từ chối xác minh giáo viên / sinh viên / tổ chức | Xem hồ sơ, quyết định | 📋 🔴 |
| Điều chỉnh điểm thưởng thủ công | Nhập số điểm, lý do | 📋 🟠 |
| Xem log hoạt động tài khoản | Xem | 📋 🟡 |

---

### 3.3 Quản lý sản phẩm

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Duyệt sản phẩm mới từ người bán | Xem, duyệt / từ chối / yêu cầu sửa | 📋 🔴 |
| Thêm / chỉnh sửa / xóa / ẩn sản phẩm trực tiếp | CRUD + toggle ẩn/hiện | 📋 🔴 |
| Nhập sản phẩm hàng loạt (Excel/CSV import) | Upload, mapping | 📋 🟠 |
| Quản lý danh mục và danh mục con | Thêm, chỉnh sửa, sắp xếp, xóa | 📋 🔴 |
| Gán / bỏ tag sản phẩm (hot, new, flash-sale) | Chọn, áp dụng | 📋 🟠 |
| Kiểm duyệt đánh giá / hỏi đáp vi phạm | Xem, ẩn, xóa | 📋 🟠 |
| Xử lý báo cáo sản phẩm vi phạm (sách lậu) | Xem, xử lý, gỡ sản phẩm | 📋 🟠 |
| Quản lý tồn kho tổng hợp toàn sàn | Xem, cập nhật | 📋 🟠 |

---

### 3.4 Quản lý đơn hàng

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem tất cả đơn hàng trên sàn | Xem, lọc, tìm kiếm | 📋 🔴 |
| Can thiệp xử lý đơn tranh chấp | Xem, quyết định | 📋 🟠 |
| Duyệt / từ chối yêu cầu đổi trả | Click | 📋 🟠 |
| Khởi tạo hoàn tiền | Nhập số tiền, xác nhận | 📋 🟠 |
| Xuất báo cáo đơn hàng (CSV/PDF) | Xuất | 📋 🟠 |

---

### 3.5 Khuyến mãi & Marketing

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Tạo flash sale (chọn sản phẩm, đặt giá, thời gian bắt đầu/kết thúc) | Tạo mới, chỉnh sửa, xóa | 📋 🔴 |
| Tạo và phát hành voucher (loại, giá trị, điều kiện, thời hạn, số lượng) | Tạo mới, vô hiệu | 📋 🔴 |
| Tạo / chỉnh sửa / xóa bộ sưu tập editorial | CRUD, sắp xếp thứ tự | 📋 🟠 |
| Cấu hình banner trang chủ (upload ảnh, đặt link, sắp xếp) | CRUD | 📋 🟠 |
| Gửi email marketing hàng loạt (newsletter) | Tạo nội dung, chọn đối tượng, gửi | 📋 🟠 |
| Gửi thông báo push toàn sàn hoặc theo nhóm | Tạo nội dung, gửi | 📋 🟠 |
| Cấu hình chương trình điểm thưởng (tỉ lệ tích điểm, ngưỡng tier) | Chỉnh sửa quy tắc | 📋 🟠 |

---

### 3.6 Quản lý người bán

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Xem danh sách người bán / NXB | Xem, lọc | 📋 🔴 |
| Duyệt / từ chối đăng ký người bán | Click | 📋 🔴 |
| Xem hiệu suất bán hàng từng NXB (GMV, đơn, đánh giá) | Xem | 📋 🟠 |
| Cấu hình phí hoa hồng theo danh mục | Chỉnh sửa % | 📋 🟠 |
| Tạm ngừng / chấm dứt hợp tác với người bán | Toggle, ghi lý do | 📋 🟠 |
| Thanh toán doanh thu định kỳ cho người bán | Chạy batch, xác nhận | 📋 🟠 |

---

### 3.7 Nội dung & SEO

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Quản lý bài viết / blog (thêm, chỉnh sửa, xóa, xuất bản) | CRUD | 📋 🟠 |
| Cấu hình SEO (meta title, description, canonical) | Chỉnh sửa | 📋 🟠 |
| Tạo trang landing page theo chiến dịch | Tạo mới, chỉnh sửa, xóa | 📋 🟡 |
| Quản lý sitemap tự động | Xem, tạo lại | 📋 🟡 |

---

### 3.8 Báo cáo & Phân tích

| Tính năng | Thao tác | Trạng thái |
|-----------|----------|------------|
| Báo cáo bán hàng tổng hợp (GMV, đơn, doanh thu ròng) | Xem, xuất | 📋 🔴 |
| Báo cáo người dùng (MAU, DAU, đăng ký mới, churn rate) | Xem | 📋 🟠 |
| Báo cáo sản phẩm (tỉ lệ chuyển đổi, view-to-buy rate) | Xem | 📋 🟠 |
| Báo cáo tìm kiếm (từ khóa hot, truy vấn không có kết quả) | Xem | 📋 🟠 |
| Báo cáo nội dung số (lượt đọc, tỉ lệ hoàn thành ebook/audio) | Xem | 📋 🟠 |
| Tích hợp Google Analytics / Meta Pixel | Cấu hình | 📋 🟠 |
| Tích hợp Hotjar (heatmap, session replay) | Cấu hình | 📋 🟡 |

---

---

## Tổng hợp

| Phân hệ | ✅ Đã có | 🔧 Một phần | 📋 Cần bổ sung | Tổng |
|---------|:-------:|:-----------:|:--------------:|:----:|
| 1. Người mua | 70 | 15 | 62 | **147** |
| 2. Trường học / Tổ chức | 2 | 1 | 60 | **63** |
| 3. Người bán / NCC | 0 | 0 | 30 | **30** |
| 4. Quản trị viên | 0 | 0 | 40 | **40** |
| **Tổng** | **72** | **16** | **192** | **280** |

---

## Roadmap theo giai đoạn

### Giai đoạn 1 — Nền tảng vận hành (0–3 tháng) 🔴
- Backend thật (API + database, thay localStorage)
- Đăng nhập OAuth (Google / Facebook) + OTP Zalo/SMS
- Quên mật khẩu / đặt lại qua email
- Guest Checkout (mua không cần tài khoản)
- Thanh toán thật: MoMo, VNPay, ZaloPay, thẻ
- Ebook reader thật (PDF.js / epub.js)
- Audiobook player thật (HTML5 Audio + file thật)
- Search autocomplete + sửa lỗi chính tả
- Theo dõi vận chuyển thật (GHN / GHTK)
- Push notification (Web Push + Email)

### Giai đoạn 2 — Lợi thế cạnh tranh (3–6 tháng) 🟠
- Seller Portal (onboarding, quản lý sản phẩm, đơn, doanh thu)
- Admin Portal cơ bản (người dùng, sản phẩm, đơn hàng, flash sale)
- PWA + đọc ebook offline
- Đồng bộ tiến độ đọc/nghe đa thiết bị
- Gợi ý SGK theo lớp + bộ sách (KNTT / Chân trời / Cánh diều)
- Highlight, ghi chú, từ điển inline trong reader
- Hệ thống điểm thưởng thật (tích tự động, đổi quà)
- Xác minh sinh viên/giáo viên → ưu đãi tự động
- Thư viện trường học (site license)
- Hóa đơn VAT

### Giai đoạn 3 — Vượt trội dài hạn (6–12 tháng) 🟡
- AI gợi ý sản phẩm cá nhân hóa
- Flashcard / spaced repetition từ highlight
- Cộng đồng đọc sách (book club)
- Livestream bán hàng
- Trả góp / BNPL
- Thị trường sách cũ (P2P)
- Báo cáo học tập cho phụ huynh
- Tích hợp hệ thống quản lý trường
- AI trợ lý giải đáp nội dung sách
