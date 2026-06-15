# EduMart — Danh sách tính năng đầy đủ

Sàn thương mại điện tử sách, văn phòng phẩm, thiết bị giáo dục, **ebook** và **sách nói**.
Bản prototype chạy hoàn toàn ở trình duyệt (HTML/CSS/JS thuần + Vite), dữ liệu lưu bằng **localStorage** nên mọi thao tác được giữ lại khi tải lại trang.

- Mã nguồn: `index.html`, `public/app.js`, `public/styles.css`, `public/admin.html`
- Demo: https://maithuhai.github.io/smartedu/ · Admin: `/smartedu/admin.html`

---

## A. Khách hàng — Điều hướng & Trang chủ
- Thanh tiện ích: giao đến Việt Nam, **Quẻ sách thần số**, **Tủ sách**, **Ưu đãi**, Đăng nhập/Tài khoản, Trợ giúp, Bán hàng cùng EduMart (Admin).
- Header: logo, **ô tìm kiếm** (tựa sách/tác giả/từ khóa/ISBN), nút **Thông báo**, **Yêu thích**, **Tài khoản**, **Giỏ hàng** — đều có **badge đếm** trực tiếp.
- Thanh danh mục: Sách, Sách giáo khoa, Sách tham khảo, **Ebook**, **Sách nói**, Văn phòng phẩm, Thiết bị giáo dục, Tiểu học, THPT, Sinh viên, Giáo viên, Trường học · Mua sỉ, Quẻ sách.
- Trang chủ: hero tìm kiếm 3 trường + link nhanh + thống kê; **Bộ sưu tập** (lưới ảnh); **Flash Sale** (đồng hồ đếm ngược giờ:phút:giây); **Mua theo đối tượng** (8 nhóm); **Sách bán chạy**, **Văn phòng phẩm**, **Thiết bị giáo dục**, **Ebook & Sách nói**; **Khám phá thêm** (bài viết).
- Footer 4 cột, toast thông báo, giao diện responsive.

## B. Tìm kiếm & Màn chuyên mục (listing)
- Tìm kiếm toàn sàn từ header + **tìm trong danh mục** (tên/tác giả/NXB).
- **Bộ lọc động theo từng chuyên mục:**
  - Đối tượng (Tiểu học → Trường học) — nhóm sách.
  - **Nhà xuất bản / Thương hiệu** tự sinh theo dữ liệu, kèm số lượng.
  - **Định dạng** (PDF/EPUB) — riêng Ebook.
  - Khoảng giá (4 mức).
  - **Đánh giá 4.8★ trở lên**, **Đang giảm giá**.
- **Chip lọc đang áp dụng** (xóa từng cái) + **Xóa tất cả / Đặt lại**; tự reset khi đổi chuyên mục.
- Sắp xếp: bán chạy / đánh giá cao / giá tăng / giá giảm; đếm số sản phẩm; mô tả chuyên mục; empty state có nút xóa lọc.

## C. Trang chi tiết sản phẩm
- Ảnh bìa/cover gradient, breadcrumb, giá – giá gốc – % giảm, đánh giá, đã bán.
- **Sách giấy:** chọn biến thể (bìa mềm/cứng…), số lượng, Thêm vào giỏ / Mua ngay, ưu đãi vận chuyển.
- **Ebook:** thông số (định dạng, số trang, dung lượng), **Đọc thử**, **Mua & đọc ngay**, **Thuê 7/30 ngày**.
- **Sách nói:** thời lượng, người đọc, **Nghe thử**, **Mua & nghe ngay**, thuê.
- Tabs: **Mô tả**, **Đánh giá** (gửi sao + nội dung + ảnh, lưu thật), **Hỏi đáp** (đặt câu hỏi, lưu thật).
- Sản phẩm liên quan + **Đã xem gần đây**.

## D. Yêu thích, Giỏ hàng, Thanh toán
- **Yêu thích (wishlist):** thả tim trên mọi thẻ, trang Yêu thích riêng, badge đếm.
- **Giỏ hàng:** nhiều sản phẩm, tăng/giảm/xóa, **mã giảm giá** (EDU10, GIAOVIEN), phí ship (miễn phí đơn > 300k), tóm tắt đơn.
- **Thanh toán:** địa chỉ nhận, phương thức vận chuyển, thanh toán (MoMo/ZaloPay/VNPay/COD/ATM-Visa); **đơn toàn sản phẩm số → miễn ship, giao vào Tủ sách**.
- Đặt hàng: cộng điểm thưởng, sinh mã đơn, thông báo; **theo dõi đơn** với timeline 5 mốc, mô phỏng cập nhật, **mua lại**, yêu cầu đổi/trả.

## E. Tài khoản
- Đăng nhập/Đăng ký theo **vai trò**: Học sinh/Sinh viên, Giáo viên, Phụ huynh, Trường học; nút đăng nhập Zalo/Google/Facebook (mô phỏng); **lưu phiên** qua localStorage.
- Hồ sơ cá nhân, **Sổ địa chỉ**, **Điểm thưởng & hạng thành viên**, **Xác thực giáo viên**, **Yêu cầu báo giá của tôi**, đăng xuất.
- **Đơn hàng của tôi** + liên kết theo dõi từng đơn.

## F. Ebook (sách số)
- Danh mục Ebook riêng, nhãn **E-BOOK**, đọc thử miễn phí chương 1.
- **Trình đọc:** đọc theo chương, chọn chương, **chỉnh cỡ chữ**, **3 nền (sáng/sepia/tối)**, **lưu tiến độ tự động**, **paywall** khóa chương khi chưa sở hữu.
- **Ghi chú & đánh dấu trang:** bookmark chương (chip nhảy nhanh), thêm/xóa ghi chú theo chương — lưu theo từng sách.
- **Mua đứt** (sở hữu vĩnh viễn) hoặc **Thuê 7/30 ngày** (giá rẻ hơn, **đếm ngược hạn**, hết hạn tự thu hồi quyền đọc).

## G. Audiobook (sách nói)
- Danh mục Sách nói riêng, nhãn **AUDIO**, nút phát trên bìa.
- **Trình phát:** play/pause, **tua ±15s**, kéo thanh tiến trình, **chỉnh tốc độ 1x–2x**, hiển thị thời gian, **lưu vị trí nghe**; **nghe thử 2 phút** rồi paywall.
- Mua đứt hoặc thuê 7/30 ngày.

## H. Tủ sách của tôi
- Gộp ebook + sách nói **đã sở hữu** và **đang thuê**.
- Badge **Sở hữu** / **Thuê · còn N ngày**; nút **Đọc tiếp** (đúng chương) / **Nghe tiếp** (đúng vị trí).

## I. B2B — Trường học & Tổ chức
- **Yêu cầu báo giá (RFQ):** form tổ chức + danh sách sản phẩm + ghi chú, **bậc chiết khấu** (50/200/500 sản phẩm), lưu lại và xem trong tài khoản.
- **Mua theo danh sách lớp:** chọn lớp → bộ đồ dùng chuẩn → **Thêm cả bộ vào giỏ**.

## J. Khuyến mãi & Khách thân thiết
- **Trung tâm ưu đãi** (hub).
- **Vòng quay may mắn** (1 lần/ngày, hiệu ứng quay, trúng điểm/voucher).
- **Nhiệm vụ & điểm danh** (chuỗi ngày liên tiếp, cộng điểm, theo dõi tiến độ).
- **Giới thiệu bạn bè (referral):** mã cá nhân, hướng dẫn 3 bước.
- Danh sách voucher (lưu mã).

## K. Tiện ích khác
- **Thông báo** đa sự kiện (đặt hàng, thuê, vòng quay…), đánh dấu đã đọc.
- **Đã xem gần đây**.
- **Quẻ sách thần số:** nhập ngày sinh → số chủ đạo, **trợ lý AI** luận tính cách & gợi ý 3 cuốn sách (gọi API Claude, có bản dự phòng ngoại tuyến).

## L. Quản trị (Admin · `admin.html`)
- **Bảng điều khiển:** KPI doanh thu/đơn/người dùng/tồn kho, biểu đồ 7 ngày, đơn gần đây, bán chạy, cảnh báo tồn kho.
- **Sản phẩm:** thêm/sửa/xóa (modal, **lưu thật**), danh mục Sách/Ebook/Sách nói/VPP/Thiết bị, tồn kho (**Bản số ∞** cho hàng số), đăng hàng loạt qua Excel (mô phỏng).
- **Đơn hàng:** lọc theo trạng thái, **cập nhật trạng thái** (đẩy từng bước, lưu thật).
- **Người dùng:** danh sách vai trò, điểm, số đơn.
- **Khuyến mãi:** tạo mới (modal), **bật/tắt**, lưu thật.
- **Cài đặt hệ thống:** phí sàn, vận chuyển, cổng thanh toán, hóa đơn VAT, phân quyền (mục cấu hình).

## M. Nền tảng & Triển khai
- Lưu localStorage: giỏ hàng, phiên đăng nhập, đơn hàng, wishlist, đã xem, thông báo, đánh giá, hỏi đáp, RFQ, tủ sách, hợp đồng thuê, bookmark, ghi chú, tiến độ đọc, vị trí nghe.
- Vite dev/build; **tự động deploy lên GitHub Pages** mỗi lần push (GitHub Actions).

---

## Ghi chú phạm vi (mô phỏng / chưa có)
Đây là prototype giao diện, nên các phần sau là **mô phỏng** hoặc **chưa triển khai**:
- Thanh toán, OTP/SMS/Zalo ZNS, đăng nhập mạng xã hội, hóa đơn điện tử — mô phỏng.
- Phát audiobook là mô phỏng (chưa gắn file âm thanh thật).
- Chưa có **backend/cơ sở dữ liệu** thật → dữ liệu chỉ lưu trên trình duyệt của máy đang dùng (không đồng bộ nhiều thiết bị/người dùng).
- Chưa có: 2FA, gói đăng ký đọc không giới hạn (subscription), cổng người bán độc lập, app di động, tìm kiếm bằng ảnh/giọng nói.
