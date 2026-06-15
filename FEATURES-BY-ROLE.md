# EduMart — Danh sách tính năng theo phân quyền

Tài liệu mô tả tính năng theo từng **vai trò người dùng** trong hệ thống. Xem danh sách
tính năng tổng thể tại [FEATURES.md](FEATURES.md).

## Các vai trò
1. **Khách vãng lai** — chưa đăng nhập.
2. **Bạn đọc** — đã đăng nhập (Học sinh / Sinh viên / Phụ huynh).
3. **Giáo viên** — bạn đọc đã **xác thực nghề giáo** (có ưu đãi riêng).
4. **Trường học / Tổ chức (B2B)** — tài khoản mua sỉ.
5. **Người bán / Nhà cung cấp** — quản lý gian hàng (cổng riêng `seller.html`).
6. **Quản trị viên hệ thống (Admin)** — vận hành toàn sàn (cổng riêng `admin.html`).

---

## 1) Khách vãng lai (Guest)
Mục tiêu: khám phá và mua sắm nhanh không cần tài khoản.
- Duyệt trang chủ, danh mục, chuyên mục; **tìm kiếm** và **lọc nâng cao** (đối tượng, NXB/thương hiệu, định dạng, giá, đánh giá, đang giảm).
- Xem **chi tiết sản phẩm**, đánh giá, hỏi đáp; xem **sản phẩm liên quan** & **đã xem gần đây**.
- **Yêu thích (wishlist)** và **Giỏ hàng**, áp mã giảm giá, **thanh toán nhanh không cần đăng nhập** (guest checkout).
- **Đọc thử** ebook (chương 1) và **nghe thử** sách nói (2 phút).
- Gửi **Yêu cầu báo giá (RFQ)** cho trường học/tổ chức.
- Xem **Trung tâm ưu đãi**, lưu voucher, quay **Vòng quay may mắn**; **Quẻ sách thần số** (AI).
- **Thông báo** cơ bản.
- ❌ Không tích điểm/hạng; không lưu hồ sơ; **Nhiệm vụ/Điểm danh, Giới thiệu bạn** yêu cầu đăng nhập; không có lịch sử đơn gắn tài khoản.

## 2) Bạn đọc (đã đăng nhập)
Bao gồm mọi quyền của Khách, cộng thêm:
- **Tài khoản:** hồ sơ cá nhân, **sổ địa chỉ**, đăng xuất, **lưu phiên** đăng nhập.
- **Đơn hàng của tôi:** lịch sử đơn, **theo dõi đơn** (timeline trạng thái), **mua lại**, yêu cầu đổi/trả.
- **Điểm thưởng & hạng thành viên:** cộng điểm khi mua; **Điểm danh** (chuỗi ngày), **Nhiệm vụ**, **Vòng quay** cộng điểm, **Giới thiệu bạn (mã referral)**.
- **Đánh giá & Hỏi đáp** dưới danh nghĩa tài khoản (kèm ảnh), cộng điểm khi đánh giá.
- **Tủ sách:** ebook/sách nói **đã sở hữu** và **đang thuê**; **đọc tiếp/nghe tiếp** đúng vị trí; **ghi chú & đánh dấu trang**; lưu tiến độ.
- Mua đứt hoặc **thuê 7/30 ngày** (đếm ngược hạn).
- Quản lý **Yêu cầu báo giá của tôi**.

## 3) Giáo viên (đã xác thực)
Bao gồm mọi quyền của Bạn đọc, cộng thêm:
- **Xác thực nghề giáo viên** (tải thẻ/quyết định công tác) để mở khóa ưu đãi.
- **Ưu đãi riêng đến 15%** (mã `GIAOVIEN`) và hiển thị mức ưu đãi trong mục Điểm thưởng.
- Định hướng **mua sỉ cho lớp** (kết hợp Mua theo danh sách lớp / RFQ).

## 4) Trường học / Tổ chức (B2B)
Bao gồm quyền mua sắm của Bạn đọc, cộng thêm năng lực mua sỉ:
- **Yêu cầu báo giá (RFQ):** thông tin tổ chức + danh sách sản phẩm + ghi chú, **bậc chiết khấu** (≥50 / ≥200 / ≥500 sản phẩm), theo dõi trong tài khoản.
- **Mua theo danh sách lớp:** chọn lớp → bộ đồ dùng chuẩn → thêm cả bộ vào giỏ.
- △ *Theo đặc tả, sẽ bổ sung: công nợ theo kỳ, hạn mức tín dụng, hóa đơn VAT/hợp đồng điện tử, quy trình phê duyệt nhiều cấp, báo cáo chi tiêu — hiện chưa triển khai.*

## 5) Người bán / Nhà cung cấp
Cổng người bán riêng (`seller.html`), tách khỏi Admin, phạm vi **chỉ trong gian hàng của mình**:
- **Tổng quan gian hàng:** KPI doanh thu / đơn / **lượt xem** / cảnh báo tồn kho, biểu đồ 7 ngày, đơn gần đây, sản phẩm bán chạy.
- **Sản phẩm của tôi:** thêm / sửa / xóa (lưu thật), mọi danh mục gồm Ebook/Sách nói, tồn kho (Bản số ∞ cho hàng số), đăng hàng loạt (mô phỏng).
- **Đơn hàng:** lọc theo trạng thái, **cập nhật trạng thái**, **in vận đơn**.
- **Khuyến mãi gian hàng:** tạo mã riêng, bật/tắt.
- **Đánh giá & Hỏi đáp:** xem và **trả lời** khách.
- **Tài chính:** số dư khả dụng, đang đối soát, đã rút lũy kế, lịch sử giao dịch, **yêu cầu rút tiền**.
- **Hồ sơ gian hàng:** thông tin gian hàng, mã số thuế/GPKD, địa chỉ kho, trạng thái **xác thực doanh nghiệp**, cập nhật giấy tờ.
- Dữ liệu lưu riêng (`edumart_seller_*`), độc lập với dữ liệu Admin/sàn.

## 6) Quản trị viên hệ thống (Admin)
Trang quản trị riêng (`admin.html`), phạm vi **toàn sàn**:
- **Bảng điều khiển:** KPI doanh thu/đơn/người dùng/tồn kho, biểu đồ 7 ngày, đơn gần đây, sản phẩm bán chạy, cảnh báo tồn kho.
- **Quản lý sản phẩm:** thêm / sửa / xóa (lưu thật), danh mục Sách/Ebook/Sách nói/VPP/Thiết bị, tồn kho (**Bản số ∞** cho hàng số), đăng hàng loạt (mô phỏng).
- **Quản lý đơn hàng:** lọc theo trạng thái, **cập nhật trạng thái** từng bước.
- **Quản lý người dùng:** danh sách vai trò, điểm, số đơn.
- **Quản lý khuyến mãi:** tạo mã, **bật/tắt**.
- **Cài đặt hệ thống:** phí sàn, vận chuyển, cổng thanh toán, hóa đơn VAT, phân quyền (mục cấu hình).

## 6) Người bán / Nhà cung cấp
- *Hiện chưa có cổng người bán độc lập.* Các chức năng bán hàng (sản phẩm, đơn, khuyến mãi, tồn kho) đang nằm trong **trang Admin**.
- △ *Theo đặc tả, có thể tách riêng: đăng ký gian hàng, bảng điều khiển doanh thu, đối soát tài chính, quảng cáo nội sàn.*

---

## Ma trận phân quyền (tính năng × vai trò)
Chú thích: ✓ có quyền · — không · △ dự kiến (chưa triển khai)

| Tính năng | Khách | Bạn đọc | Giáo viên | Trường học | Người bán | Admin |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| Duyệt / tìm kiếm / lọc chuyên mục | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| Xem chi tiết sản phẩm | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| Yêu thích (wishlist) | ✓ | ✓ | ✓ | ✓ | — | — |
| Giỏ hàng & thanh toán | ✓ | ✓ | ✓ | ✓ | — | — |
| Guest checkout | ✓ | ✓ | ✓ | ✓ | — | — |
| Đọc thử / nghe thử | ✓ | ✓ | ✓ | ✓ | — | — |
| Quẻ sách thần số (AI) | ✓ | ✓ | ✓ | ✓ | — | — |
| Gửi yêu cầu báo giá (RFQ) | ✓ | ✓ | ✓ | ✓ | — | — |
| Tích điểm & hạng thành viên | — | ✓ | ✓ | ✓ | — | — |
| Điểm danh / nhiệm vụ / referral | — | ✓ | ✓ | ✓ | — | — |
| Hồ sơ & sổ địa chỉ | — | ✓ | ✓ | ✓ | — | — |
| Lịch sử & theo dõi đơn, mua lại | — | ✓ | ✓ | ✓ | — | — |
| Đánh giá & hỏi đáp (định danh) | — | ✓ | ✓ | ✓ | — | — |
| Tủ sách, ghi chú, đánh dấu, tiến độ | — | ✓ | ✓ | ✓ | — | — |
| Mua đứt / thuê ebook–sách nói | ✓¹ | ✓ | ✓ | ✓ | — | — |
| Ưu đãi giáo viên (đến 15%) | — | — | ✓ | — | — | — |
| Mua theo danh sách lớp | ✓ | ✓ | ✓ | ✓ | — | — |
| Công nợ / hóa đơn VAT / phê duyệt B2B | — | — | — | △ | — | — |
| Tổng quan & báo cáo gian hàng | — | — | — | — | ✓ | — |
| Quản lý sản phẩm gian hàng (CRUD) | — | — | — | — | ✓ | — |
| Quản lý đơn gian hàng / in vận đơn | — | — | — | — | ✓ | — |
| Khuyến mãi riêng gian hàng | — | — | — | — | ✓ | — |
| Trả lời đánh giá & hỏi đáp | — | — | — | — | ✓ | — |
| Tài chính & rút tiền gian hàng | — | — | — | — | ✓ | — |
| Hồ sơ & xác thực gian hàng | — | — | — | — | ✓ | — |
| Bảng điều khiển toàn sàn | — | — | — | — | — | ✓ |
| Quản lý sản phẩm/đơn toàn sàn | — | — | — | — | — | ✓ |
| Quản lý người dùng & người bán | — | — | — | — | — | ✓ |
| Khuyến mãi cấp sàn | — | — | — | — | — | ✓ |
| Cài đặt hệ thống (phí, vận chuyển…) | — | — | — | — | — | ✓ |

¹ *Trong prototype, Tủ sách lưu theo thiết bị (localStorage) nên khách vẫn mua/thuê được;*
*khi có backend, quyền sở hữu sẽ gắn với tài khoản đăng nhập.*

---

## Ghi chú phạm vi
Prototype giao diện, dữ liệu lưu **localStorage** (theo thiết bị, chưa đồng bộ tài khoản/đa thiết bị).
Thanh toán, OTP/2FA, hóa đơn điện tử, phân quyền chi tiết (RBAC) phía máy chủ là **mô phỏng** —
sẽ hiện thực khi bổ sung backend.
