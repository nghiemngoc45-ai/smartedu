# Tài liệu Phân tích Yêu cầu
## Chức năng: Dashboard Tổng quan — Phân hệ Trường học / Tổ chức
### EduMart — Sàn sách & thiết bị giáo dục

---

## 1. Thông tin tài liệu

| Trường | Nội dung |
|--------|----------|
| Dự án | EduMart |
| Phiên bản | 1.1 |
| Ngày tạo | 20/06/2026 |
| Trạng thái | Đang triển khai |
| Phạm vi | Màn hình Dashboard trong Cổng Trường học / Tổ chức (`school.html`) |

---

## 2. Bối cảnh & Mục tiêu

### 2.1. Bối cảnh

EduMart cung cấp cổng B2B dành riêng cho trường học và tổ chức giáo dục. Sau khi đăng nhập với vai trò `school`, người dùng được chuyển đến `school.html` — một ứng dụng độc lập chia sẻ phiên đăng nhập với ứng dụng chính thông qua `localStorage` (`edumart_user`). Dashboard là màn hình mặc định khi vào cổng, cung cấp bức tranh tổng thể về tình hình mua sắm, ngân sách, quy trình phê duyệt và tài chính của tổ chức trong năm học hiện tại.

### 2.2. Mục tiêu chức năng

- Hiển thị 6 chỉ số vận hành quan trọng (KPI) ở một màn hình duy nhất giúp lãnh đạo nắm bắt tình hình nhanh.
- Cung cấp biểu đồ trực quan về xu hướng chi tiêu theo thời gian, theo danh mục và theo phòng ban.
- Cảnh báo kịp thời các vấn đề cần xử lý: ngân sách gần hạn, hóa đơn quá hạn, yêu cầu chờ duyệt.
- Liệt kê hoạt động gần đây (yêu cầu mua, đơn hàng, hóa đơn) để truy cập nhanh mà không cần điều hướng sâu.

### 2.3. Ngoài phạm vi (Out of Scope)

- Chỉnh sửa dữ liệu trực tiếp từ màn hình Dashboard (chỉ xem và điều hướng nhanh).
- Lọc dữ liệu theo khoảng thời gian tùy chỉnh (thuộc module Báo cáo riêng).
- Push notification / email alert thời gian thực (phiên bản sau).
- Quản lý phiên đăng nhập — do ứng dụng chính (`app.js`) xử lý.

---

## 3. Người dùng (Actor)

| Actor | Mô tả | Quyền trên Dashboard |
|-------|-------|----------------------|
| **Hiệu trưởng** | Lãnh đạo tổ chức, toàn quyền trong cổng | Xem toàn bộ |
| **Nhân viên** | Nhân viên phòng ban, tạo và theo dõi yêu cầu mua hàng | Xem toàn bộ |

Tài liệu này áp dụng cho cả hai actor — demo account mặc định `truonghoc@demo.vn` mang vai trò **Nhân viên**.

---

## 4. Yêu cầu Chức năng (Functional Requirements)

### FR-01 · 6 Thẻ KPI Tổng quan

| ID | FR-01 |
|----|-------|
| Tên | Hiển thị 6 thẻ KPI vận hành |
| Mô tả | Hàng đầu trang gồm 6 thẻ chỉ số, mỗi thẻ hiển thị: giá trị chính, nhãn, thông tin phụ, tỷ lệ biến động so kỳ trước |
| Kích hoạt | Tự động khi vào Dashboard |
| Điều kiện tiên quyết | Người dùng đã xác thực với `role === 'school'` |

#### Danh sách KPI

| STT | Chỉ số | Giá trị hiển thị | Thông tin phụ | Biến động |
|-----|--------|-----------------|---------------|-----------|
| 1 | **Ngân sách còn lại** | `2,4 tỷ` | / 4,2 tỷ tổng năm học | `+8.2%` ▲ xanh lá |
| 2 | **Yêu cầu chờ duyệt** | `12` | 3 yêu cầu cần duyệt gấp | `+4%` ▲ xanh lá |
| 3 | **Đơn hàng đang xử lý** | `8` | 2 đơn đang giao hàng | `+1%` ▲ xanh lá |
| 4 | **Hóa đơn chưa thanh toán** | `5` | Tổng 165 triệu đồng | `−2%` ▼ đỏ |
| 5 | **Công nợ hiện tại** | `328tr` | Hạn NET30: 25/06/2026 | `+12%` ▲ vàng cảnh báo |
| 6 | **Ebook đang sử dụng** | `450` | / 500 license tổ chức | *(không hiển thị)* |

#### Quy tắc màu biến động

- `▲ X%` màu xanh lá (`tr-up`) → tăng trưởng có lợi (ngân sách tăng, tiến độ tốt)
- `▼ X%` màu đỏ (`tr-dn`) → biến động bất lợi (hóa đơn tồn đọng tăng)
- `▲ X%` màu vàng cam (`tr-wn`) → cảnh báo cần chú ý (công nợ tăng)
- Không hiển thị thẻ biến động khi giá trị là chuỗi rỗng

#### Màu icon KPI

| Chỉ số | Nền icon | Màu icon |
|--------|----------|----------|
| Ngân sách còn lại | `#eff6ff` | `#2563eb` |
| Yêu cầu chờ duyệt | `#fff7ed` | `#ea580c` |
| Đơn hàng đang xử lý | `#eff6ff` | `#2563eb` |
| Hóa đơn chưa thanh toán | `#fef2f2` | `#dc2626` |
| Công nợ hiện tại | `#fff7ed` | `#ea580c` |
| Ebook đang sử dụng | `#eff6ff` | `#2563eb` |

---

### FR-02 · Biểu đồ Chi tiêu theo Tháng

| ID | FR-02 |
|----|-------|
| Tên | Biểu đồ đường — xu hướng chi tiêu 12 tháng |
| Mô tả | Biểu đồ đường trơn (Catmull-Rom bezier) thể hiện chi tiêu từng tháng trong năm học 2024-2025 |
| Vị trí | Hàng biểu đồ thứ nhất, cột trái (chiếm phần lớn chiều rộng) |

#### Dữ liệu hiển thị

| Trường | Giá trị |
|--------|---------|
| Trục X | 12 tháng: T8/24 → T7/25 |
| Trục Y | Đơn vị: triệu đồng, thang đến 320tr |
| Tiêu đề phụ | "Năm học 2024-2025 · Đơn vị: triệu đồng" |
| Nút hành động | **Xuất** — tải về báo cáo (icon tải xuống) |

#### Dữ liệu mẫu (theo thứ tự T8/24 → T7/25)

`175, 135, 115, 180, 305, 285, 120, 145, 220, 290, 305, 315` (triệu đồng)

---

### FR-03 · Biểu đồ Chi tiêu theo Danh mục

| ID | FR-03 |
|----|-------|
| Tên | Biểu đồ donut — phân bổ chi tiêu theo danh mục |
| Mô tả | Biểu đồ vòng tròn rỗng (stroke-dasharray) thể hiện cơ cấu chi tiêu theo danh mục sản phẩm trong tháng hiện tại |
| Vị trí | Hàng biểu đồ thứ nhất, cột phải (300px cố định) |

#### Danh mục & Màu sắc

| Danh mục | Tỷ lệ | Màu |
|----------|-------|-----|
| SGK | 35% | Xanh dương `#3b82f6` |
| VPP | 22% | Cam `#f97316` |
| Thiết Bị | 28% | Xanh lá `#22c55e` |
| Ebook | 10% | Tím `#a855f7` |
| Khác | 5% | Xám `#94a3b8` |

#### Quy tắc

- Hiển thị chú thích (legend) bên dưới donut: chấm màu · tên danh mục · thanh bar mini · tỷ lệ %.
- Tổng các tỷ lệ = 100%.
- Tiêu đề phụ hiển thị tháng đang xem: "Tháng 6/2026".

---

### FR-04 · Biểu đồ Chi tiêu theo Phòng ban

| ID | FR-04 |
|----|-------|
| Tên | Biểu đồ cột — chi tiêu theo phòng ban |
| Mô tả | Biểu đồ cột đứng (SVG `rect`) thể hiện tổng chi tiêu của từng phòng ban / khối trong 6 tháng gần nhất |
| Vị trí | Hàng biểu đồ thứ hai, cột trái |

#### Dữ liệu hiển thị

| Trường | Giá trị |
|--------|---------|
| Trục X | Tên phòng ban / khối |
| Trục Y | Đơn vị: triệu đồng, thang đến 220tr |
| Tiêu đề phụ | "6 tháng gần nhất · Đơn vị: triệu đồng" |
| Màu cột | Cam `#f97316` |

#### Dữ liệu mẫu

| Phòng ban | Chi tiêu |
|-----------|----------|
| BGH | 110tr |
| Tự Nhiên | 205tr |
| Xã Hội | 175tr |
| Thể Dục | 90tr |
| Ngoại Ngữ | 165tr |
| HC | 70tr |

---

### FR-05 · Thông báo Hệ thống

| ID | FR-05 |
|----|-------|
| Tên | Danh sách thông báo nội bộ |
| Mô tả | Panel hiển thị các thông báo hệ thống mới nhất liên quan đến hoạt động mua sắm, ngân sách và hợp đồng của tổ chức |
| Vị trí | Hàng biểu đồ thứ hai, cột phải (300px cố định) |

#### Loại thông báo & Màu chấm

| Màu | Loại sự kiện | Ví dụ |
|-----|-------------|-------|
| Cam `#f97316` | Cảnh báo ngân sách / yêu cầu chờ duyệt | "Ngân sách Khối Tự Nhiên đạt 85% hạn mức" |
| Xanh lá `#22c55e` | Giao hàng / hoàn thành thành công | "DH-1232 đã giao hàng thành công" |
| Đỏ `#dc2626` | Hóa đơn quá hạn / vi phạm | "HD-0455 quá hạn thanh toán 10 ngày" |
| Xanh dương `#4f46e5` | Hợp đồng / thông tin chung | "HĐ NXB Giáo Dục hết hạn 15/07/2026" |

#### Quy tắc hiển thị

- Hiển thị **5 thông báo** gần nhất, sắp xếp mới nhất lên trên.
- Mỗi dòng: chấm màu · nội dung · thời gian tương đối.
- Badge số lượng (`cnt-badge`) trên tiêu đề panel hiển thị tổng thông báo chưa đọc.
- Thời gian hiển thị dạng tương đối: "2 giờ trước", "1 ngày trước".

---

### FR-06 · Hoạt động Gần đây (3 Bảng)

| ID | FR-06 |
|----|-------|
| Tên | Lưới 3 cột — hoạt động gần đây |
| Mô tả | Phần cuối Dashboard gồm 3 panel song song liệt kê các bản ghi mới nhất từ 3 phân hệ: Yêu cầu mua hàng, Đơn hàng, Hóa đơn |
| Vị trí | Hàng cuối, dưới hai hàng biểu đồ |

#### Panel 1 — Yêu cầu mua gần đây

Hiển thị **5 yêu cầu mua** gần nhất.

| Trường | Mô tả |
|--------|-------|
| Tiêu đề | Tên yêu cầu (font đậm, cắt bớt nếu dài) |
| Metadata | Mã YC · Phòng ban · Ngày tạo |
| Badge trạng thái | Xem bảng trạng thái bên dưới |
| Giá trị | Tổng tiền định dạng VNĐ |

Trạng thái yêu cầu mua:

| Trạng thái | Nhãn | Badge |
|------------|------|-------|
| `pending` | Chờ duyệt | `bo` (cam) |
| `approved` | Đã duyệt | `bg` (xanh lá) |
| `returned` | Trả lại | `by` (vàng) |
| `ordered` | Đã đặt hàng | `bb` (xanh dương) |
| `rejected` | Từ chối | `br` (đỏ) |
| `done` | Hoàn thành | `bs` (xám) |

#### Panel 2 — Đơn hàng gần đây

Hiển thị **4 đơn hàng** gần nhất.

| Trường | Mô tả |
|--------|-------|
| Tiêu đề | Tên nhà cung cấp |
| Metadata | Mã DH · Ngày đặt |
| Badge trạng thái | Xem bảng trạng thái bên dưới |
| Giá trị | Tổng tiền đơn hàng |

Trạng thái đơn hàng:

| Trạng thái | Nhãn | Badge |
|------------|------|-------|
| `ship` | Đang giao | `bb` (xanh dương) |
| `proc` | Đang xử lý | `bo` (cam) |
| `done` | Hoàn thành | `bg` (xanh lá) |
| `cancel` | Đã hủy | `br` (đỏ) |

#### Panel 3 — Hóa đơn gần đây

Hiển thị **4 hóa đơn** gần nhất.

| Trường | Mô tả |
|--------|-------|
| Tiêu đề | Tên nhà cung cấp |
| Metadata | Mã HD · Ngày đến hạn |
| Badge trạng thái | Xem bảng trạng thái bên dưới |
| Giá trị | Số tiền hóa đơn |

Trạng thái hóa đơn:

| Trạng thái | Nhãn | Badge |
|------------|------|-------|
| `unpaid` | Chưa thanh toán | `bo` (cam) |
| `overdue` | Quá hạn | `br` (đỏ) |
| `paid` | Đã thanh toán | `bg` (xanh lá) |

#### Quy tắc chung cho 3 panel

- Mỗi panel có liên kết **"Xem tất cả ↗"** ở góc trên phải điều hướng đến màn hình tương ứng.
- Các dòng phân cách bằng `border-bottom`; dòng cuối không có đường kẻ.
- Layout 3 cột (`repeat(3, 1fr)`) thu về 1 cột khi màn hình < 960px.

---

### FR-07 · Điều hướng Sidebar

| ID | FR-07 |
|----|-------|
| Tên | Menu điều hướng sidebar cho Cổng Trường học |
| Mô tả | Sidebar trái tối màu hiển thị toàn bộ các màn hình trong cổng, nhóm theo chức năng |

#### Cấu trúc menu

| Nhóm | Mục | Mã view | Trạng thái |
|------|-----|---------|-----------|
| **TỔNG QUAN** | Dashboard | `dashboard` | ✅ Hoạt động |
| **TỔ CHỨC** | Tổ chức | `organization` | ✅ Hoạt động |
| | Thành viên & Phòng ban | `members` | ✅ Hoạt động |
| **MUA SẮM** | Danh mục mua sắm | `marketplace` | ✅ Hoạt động |
| | School Kit | `schoolkit` | ✅ Hoạt động |
| **QUY TRÌNH** | Yêu cầu mua hàng | `purchase` | ✅ Hoạt động |
| | Phê duyệt *(badge: 3)* | `approvals` | ✅ Hoạt động |
| | Đơn hàng | `orders` | ✅ Hoạt động |
| **TÀI CHÍNH** | Ngân sách | `budget` | ✅ Hoạt động |
| | Hóa đơn & Thanh toán | `invoices` | ✅ Hoạt động |
| | Hợp đồng | `contracts` | ✅ Hoạt động |
| **TÀI NGUYÊN** | Ebook & Tài nguyên số | `ebook` | ✅ Hoạt động |
| | Báo giá B2B | `rfq` | ✅ Hoạt động |
| **PHÂN TÍCH** | Báo cáo | `reports` | ✅ Hoạt động |
| **KHÁC** | Hỗ trợ | `support` | ✅ Hoạt động |

#### Quy tắc hiển thị sidebar

- Mục đang active: nền `var(--ink)` (#1f4773), chữ trắng, font 500.
- Mục không active: chữ `#cdd9e6`, hover nền `rgba(255,255,255,.06)`.
- Badge số trên mục "Phê duyệt": nền vàng marigold, chữ đậm.
- Cuối sidebar: avatar chữ cái đầu, tên người dùng, email, nút đăng xuất.
- Logo trên cùng: mark icon vàng + "EduMart" / "Cổng Trường học".

---

### FR-08 · Thanh công cụ trên (Topbar)

| ID | FR-08 |
|----|-------|
| Tên | Thanh tiêu đề và công cụ toàn cục |
| Mô tả | Thanh nằm ngang phía trên nội dung, hiển thị tiêu đề màn hình hiện tại và hai nút hành động: Giỏ yêu cầu và Thông báo |
| Kích hoạt | Luôn hiển thị sau khi `renderShell()` được gọi; cố định trên cùng (`position: sticky; top: 0`) |

#### Thành phần

| Phần tử | ID / Selector | Mô tả |
|---------|--------------|-------|
| Tiêu đề trang | `#pageTitle` | Tên màn hình hiện tại, lấy từ `NAV.find(n => n.v === curV)?.l` |
| Nút Giỏ yêu cầu | `#cartBtn` | Icon xe đẩy, `onclick="openCart()"` — mở dialog Giỏ yêu cầu dạng `modal-xl` |
| Badge giỏ hàng | `#cartBadge` | Hiển thị tổng số lượng sản phẩm trong `CART`; nền đỏ san hô `var(--coral)`; ẩn khi giỏ trống |
| Nút Thông báo | `.tb-btn` (chuông) | Icon chuông, `onclick="toast('Không có thông báo mới')"` |

#### Hành vi `#cartBadge`

- Giỏ trống: `display: none`
- Giỏ có hàng: `display: flex`, hiển thị `CART.reduce((s, i) => s + i.qty, 0)` — **tổng số lượng**, không phải số mặt hàng
- Vị trí: góc trên phải của `#cartBtn` (`top: -5px; right: -5px`)
- Được làm mới mỗi khi gọi `updateCartBadge()` — kích hoạt bởi `addToCart`, `cartDeleteItem`, `cartUpdateQty`, `cartSubmit`

#### Hành vi khi click `#cartBtn` — `openCart()`

- Thêm class `modal-xl` vào `#modal` (mở rộng max-width lên 780px)
- Gọi `openModal(cartDialogHTML())` — render dialog Giỏ yêu cầu
- Dialog bao gồm: form nhập tên yêu cầu + ngày cần hàng + mô tả, checkbox lưu School Kit, bảng sản phẩm, tổng kết, nút "Tạo yêu cầu mua hàng" (`cartSubmit`)

---

## 5. Yêu cầu Phi chức năng (Non-functional Requirements)

| ID | Loại | Yêu cầu |
|----|------|---------|
| NFR-01 | Hiệu năng | Dashboard render hoàn toàn trong < 300ms sau khi `init()` đọc được phiên đăng nhập |
| NFR-02 | Responsive | Đúng từ 360px đến 1920px; sidebar ẩn, layout chuyển 1 cột khi < 960px |
| NFR-03 | Bảo mật | Chỉ `user.role === 'school'` mới được render nội dung; mọi trường hợp khác chuyển hướng về `./` (login chính) |
| NFR-04 | Phiên đăng nhập | Đọc từ `localStorage.getItem('edumart_user')` — chia sẻ với ứng dụng chính; không tạo phiên riêng |
| NFR-05 | Nhất quán | Dùng chung design token (CSS variables) với admin.html: `--ink:#1f4773`, `--sidebar:#163554`, `--marigold:#f0a92e` |
| NFR-06 | Không thư viện | Biểu đồ dựng thuần SVG (không dùng Chart.js hay D3); không có framework JS |
| NFR-07 | Khả năng mở rộng | Dữ liệu mock có thể thay bằng API call mà không thay đổi cấu trúc hàm render |

---

## 6. Mô hình dữ liệu (Data Model)

### 6.1. Chỉ số KPI

```
KpiCard {
  val:  string      // Giá trị rút gọn hiển thị, ví dụ: '2,4 tỷ', '12', '328tr'
  lbl:  string      // Nhãn chỉ số
  sub:  string      // Thông tin phụ (dòng nhỏ bên dưới)
  tr:   string      // Chuỗi biến động, ví dụ: '+8.2%', '−2%'; rỗng nếu không hiển thị
  tc:   string      // CSS class màu: 'tr-up' | 'tr-dn' | 'tr-wn' | ''
  bg:   string      // Màu nền icon (hex)
  fg:   string      // Màu icon (hex)
  svg:  string      // Nội dung SVG path cho icon
}
```

### 6.2. Dữ liệu biểu đồ đường (Chi tiêu theo tháng)

```
LineChartData {
  data:   number[]  // Mảng 12 giá trị (triệu đồng), từ T8 đến T7
  labels: string[]  // Nhãn tháng tương ứng ['T8/24','T9',...]
  maxV:   number    // Giá trị tối đa trục Y (320)
}
```

### 6.3. Dữ liệu biểu đồ donut (Chi tiêu theo danh mục)

```
DonutSegment {
  l: string   // Tên danh mục
  p: number   // Tỷ lệ phần trăm (tổng = 100)
  c: string   // Màu hex
}
```

### 6.4. Dữ liệu biểu đồ cột (Chi tiêu theo phòng ban)

```
BarChartData {
  labels: string[]  // Tên phòng ban ['BGH','Tự Nhiên',...]
  vals:   number[]  // Chi tiêu tương ứng (triệu đồng)
  color:  string    // Màu cột (hex) — mặc định '#f97316'
}
```

### 6.5. Thông báo hệ thống

```
Notification {
  dot:  'orange' | 'green' | 'red' | 'blue'  // Màu chấm phân loại
  txt:  string                                 // Nội dung thông báo
  time: string                                 // Thời gian tương đối, ví dụ: '2 giờ trước'
}
```

### 6.6. Yêu cầu mua gần đây

```
RecentPR {
  id:    string   // Mã yêu cầu, ví dụ: 'YC-0891'
  title: string   // Tên yêu cầu
  dept:  string   // Phòng ban yêu cầu
  date:  string   // Ngày tạo 'DD/MM'
  total: number   // Tổng tiền (VNĐ)
  st:    'pending' | 'approved' | 'returned' | 'ordered' | 'rejected' | 'done'
}
```

### 6.7. Đơn hàng gần đây

```
RecentOrder {
  id:    string   // Mã đơn hàng, ví dụ: 'DH-1234'
  sup:   string   // Tên nhà cung cấp
  date:  string   // Ngày đặt 'DD/MM'
  total: number   // Tổng tiền (VNĐ)
  st:    'ship' | 'proc' | 'done' | 'cancel'
}
```

### 6.8. Hóa đơn gần đây

```
RecentInvoice {
  id:    string   // Mã hóa đơn, ví dụ: 'HD-0456'
  sup:   string   // Tên nhà cung cấp
  due:   string   // Ngày đến hạn 'DD/MM'
  total: number   // Số tiền (VNĐ)
  st:    'unpaid' | 'overdue' | 'paid'
}
```

---

## 7. Luồng người dùng (User Flow)

```
[Người dùng truy cập /]
        │
        ▼
[Chọn vai trò "Trường học / Tổ chức" → Đăng nhập]
        │
        ▼
[app.js xác thực → saveUser() → chuyển hướng school.html]
        │
        ▼
[school.html · init()]
        │
   ┌────┴───────────────────────┐
   │ edumart_user tồn tại?      │
   │ role === 'school'?         │
   └────────────────────────────┘
        │ Có                    │ Không
        ▼                       ▼
[currentUser = user]    [window.location.href = './']
[renderShell()]
[render() → dashboard()]
        │
        ▼
[Hiển thị Dashboard]
   ┌────┴──────────────────────────────────────────┐
   │                                               │
[Click "Xem tất cả ↗"              [Click nav-item sidebar]
 trên panel gần đây]                       │
   │                                       ▼
   ▼                               [nav(view) →
[nav('purchase'/'orders'/'invoices')  curV = view →
 → render view tương ứng]             render() →
                                       màn hình tương ứng]
```

---

## 8. Mockup bố cục

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  EduMart                  Dashboard                               🛒[badge] 🔔  │
│  Cổng Trường học          ─────────────────────────────────────────────────────  │
├────────────────┬────────────────────────────────────────────────────────────────┤
│ TỔNG QUAN      │                                                                │
│  ● Dashboard   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────┐ ┌──────┐ │
│                │  │ 💳       │ │ 📋       │ │ 📦       │ │ 🧾       │ │ 💰   │ │ 📚   │ │
│ TỔ CHỨC        │  │ 2,4 tỷ  │ │ 12       │ │ 8        │ │ 5        │ │328tr │ │ 450  │ │
│  Tổ chức       │  │ Ngân sách│ │ Yêu cầu  │ │ Đơn hàng │ │ Hóa đơn  │ │Công  │ │Ebook │ │
│  Thành viên    │  │ còn lại  │ │ chờ duyệt│ │ đ.xử lý  │ │ c.thanh  │ │nợ    │ │ dùng │ │
│                │  │ ▲8.2%   │ │ ▲4%      │ │ ▲1%      │ │ ▼2%      │ │▲12%  │ │      │ │
│ MUA SẮM        │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────┘ └──────┘ │
│  Danh mục      │                                                                │
│  School Kit    │  ┌────────────────────────────────────────┐ ┌────────────────┐ │
│                │  │ Chi tiêu theo tháng              Xuất ↓│ │Chi tiêu theo   │ │
│                │  │ Năm học 2024-2025 · Đơn vị: triệu đồng │ │danh mục        │ │
│ QUY TRÌNH      │  │ 320tr ──────────────────────────────── │ │ Tháng 6/2026   │ │
│  Yêu cầu mua   │  │       ╭────╮    ╭─────╮   ╭─────      │ │   ╭───╮        │ │
│  Phê duyệt [3] │  │      ╭╯    ╰────╯     ╰───╯           │ │  ╱     ╲       │ │
│  Đơn hàng      │  │ 0tr ─────────────────────────────────  │ │ │  38%  │      │ │
│                │  │      T8  T9  T10  T11  T12  T1 ... T7  │ │  ╲     ╱       │ │
│ TÀI CHÍNH      │  └────────────────────────────────────────┘ │   ╰───╯        │ │
│  Ngân sách     │                                             │ ● SGK      35% │ │
│  Hóa đơn       │  ┌────────────────────────────┐ ┌──────────┤ ● VPP      22% │ │
│  Hợp đồng      │  │ Chi tiêu theo phòng ban    │ │Thông báo │ ● Thiết bị 28% │ │
│                │  │ 6 tháng gần nhất · triệu đ │ │hệ thống●5│ ● Ebook    10% │ │
│ TÀI NGUYÊN     │  │      █                     │ │────────  │ ● Khác      5% │ │
│  Ebook         │  │    █ █ █   █               │ │● Ngân sách└────────────────┘ │
│  Báo giá B2B   │  │  █ █ █ █ █ █              │ │  85% hạn 2h trước           │
│                │  │ BGH TN XH TD NN HC         │ │● YC-0891 3h trước           │
│ PHÂN TÍCH      │  └────────────────────────────┘ │● DH-1232 6h trước  └───────┘ │
│  Báo cáo       │                                 │● HD-0455 1 ngày trước       │
│                │  ┌────────────────┐ ┌───────────┤● HĐ NXB  1 ngày trước      │
│ KHÁC           │  │Yêu cầu mua     │ │Đơn hàng   │ ┌──────────────────┐       │
│  Hỗ trợ        │  │gần đây Xem tất ↗│ │gần đây    │ │Hóa đơn gần đây  │       │
│                │  │────────────────│ │Xem tất cả ↗│ │Xem tất cả ↗     │       │
│ ─────────────  │  │SGK Lớp 10... ● │ │NXB Giáo..  │ │NXB Giáo Dục VN  │       │
│ [TH] Tên       │  │YC-0891·TN·15/06│ │DH-1234·16/6│ │HD-0456·Hạn 30/06│       │
│ email          │  │ Chờ duyệt 45,2M│ │Đang giao 45│ │Chưa TT  45,200đ │       │
│ [⇥ Đăng xuất] │  │...             │ │...         │ │...              │       │
└────────────────┴──┴────────────────┴─┴────────────┴─┴─────────────────┴───────┘
```

---

## 9. Điều kiện chấp nhận (Acceptance Criteria)

| ID | Tiêu chí | Cách kiểm tra |
|----|----------|---------------|
| AC-01 | Người dùng không có `role='school'` không thể xem dashboard | Đăng nhập với `role='hocsinh'` → `school.html` chuyển hướng về `./` |
| AC-02 | 6 thẻ KPI hiển thị đủ giá trị, nhãn và biến động | Đếm `.kpi` trên DOM → phải bằng 6 |
| AC-03 | Màu biến động đúng: xanh lá / đỏ / vàng cam | Thẻ "Hóa đơn chưa thanh toán" có class `tr-dn`; "Công nợ" có `tr-wn` |
| AC-04 | Biểu đồ đường hiển thị 12 điểm dữ liệu | SVG `path` đường cong tồn tại trong panel "Chi tiêu theo tháng" |
| AC-05 | Biểu đồ donut hiển thị 5 phân khúc, tổng = 100% | `35+22+28+10+5 === 100`; 5 `circle` stroke tồn tại trong SVG |
| AC-06 | Biểu đồ cột hiển thị 6 phòng ban | 6 phần tử `rect` tồn tại trong panel "Chi tiêu theo phòng ban" |
| AC-07 | Panel thông báo hiển thị 5 mục | `document.querySelectorAll('.notif-item').length === 5` |
| AC-08 | Panel "Yêu cầu mua gần đây" hiển thị 5 mục | Đếm `.ri` trong panel đầu tiên của `.recent-grid` → phải bằng 5 |
| AC-09 | Nút "Xem tất cả ↗" điều hướng đúng màn hình | Click trên panel Đơn hàng → `curV === 'orders'` |
| AC-10 | Badge trạng thái đúng màu theo từng loại | YC-0891 "Chờ duyệt" → class `bo` (cam); YC-0890 "Đã duyệt" → class `bg` (xanh) |
| AC-11 | Sidebar active đúng mục khi vào Dashboard | `.nav-item[data-v="dashboard"]` có class `on` |
| AC-12 | Tên người dùng và email hiển thị đúng trong side-foot | Lấy từ `currentUser.name` và `currentUser.email` (từ `edumart_user`) |
| AC-13 | Layout 1 cột khi màn hình < 960px | Tại 959px: `.recent-grid` hiển thị `grid-template-columns: 1fr` |
| AC-14 | Không có lỗi JS trong console | `console.error` = 0 khi render Dashboard |
| AC-15 | `#cartBadge` ẩn khi giỏ trống, hiển thị số lượng khi có sản phẩm | `CART` rỗng → `#cartBadge.style.display === 'none'`; sau `addToCart(1)` với qty=2 → badge hiện giá trị `2` |
| AC-16 | Click `#cartBtn` mở đúng dialog Giỏ yêu cầu dạng modal-xl | Click `#cartBtn` → `#modalBg.classList.contains('show') === true` và `#modal.classList.contains('modal-xl') === true` |

---

## 10. Rủi ro & Hạn chế (Risks & Constraints)

| # | Rủi ro | Mức độ | Giải pháp |
|---|--------|--------|-----------|
| R-01 | Dữ liệu KPI là mock tĩnh, không tính từ dữ liệu thực | Trung bình | Đánh dấu "Demo data"; tách hàm lấy dữ liệu để thay bằng API sau |
| R-02 | Phiên đăng nhập phụ thuộc `localStorage` — mất khi clear storage | Thấp | Luồng `init()` đã xử lý fallback về trang login |
| R-03 | Không có auto-refresh — số liệu không cập nhật theo thời gian thực | Thấp | Thêm polling hoặc WebSocket khi có backend |
| R-04 | Biểu đồ SVG không responsive hoàn toàn theo chiều ngang | Trung bình | SVG dùng `viewBox` + `width:100%` — tự co giãn; chiều cao cố định |
| R-05 | Người dùng có thể xem dashboard dù token hết hạn (chưa có expire) | Trung bình | Thêm trường `expireAt` vào `edumart_user` và kiểm tra trong `init()` |
| R-06 | Badge "Phê duyệt: 3" là giá trị cứng, không đồng bộ với dữ liệu thực | Thấp | Tính động từ mảng `PRS.filter(p => p.status === 'pending').length` |

---

## 11. Lịch sử thay đổi

| Ngày | Phiên bản | Thay đổi |
|------|-----------|---------|
| 20/06/2026 | 1.0 | Tạo tài liệu ban đầu, bao gồm FR-01 → FR-07, data models, mockup ASCII, acceptance criteria |
| 20/06/2026 | 1.1 | Bổ sung FR-08 (Topbar — Giỏ yêu cầu & Thông báo), AC-15, AC-16; cập nhật mockup ASCII topbar; phiên bản 1.0 → 1.1 |
