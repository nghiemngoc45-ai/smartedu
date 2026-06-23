# Tài liệu Phân tích Yêu cầu
## Phân hệ Báo cáo & Thống kê — EduMart Cổng Trường học

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Báo cáo & Thống kê cung cấp cho quản lý trường học công cụ phân tích toàn diện về tình hình chi tiêu, sử dụng ngân sách và hiệu quả hợp tác nhà cung cấp. Đây là thành phần hỗ trợ ra quyết định chiến lược trong quản lý mua sắm giáo dục, đảm bảo tính minh bạch tài chính và tối ưu hóa ngân sách nhà trường.

### 1.2 Phạm vi

Phân hệ bao gồm ba nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Báo cáo Chi tiêu** | Thống kê tổng chi tiêu, biểu đồ xu hướng theo thời gian, cơ cấu danh mục và phân bổ theo phòng ban |
| **Báo cáo Ngân sách** | Theo dõi tiến độ sử dụng ngân sách theo năm học và học kỳ, cảnh báo vượt ngưỡng |
| **Báo cáo Nhà cung cấp** | Xếp hạng nhà cung cấp theo số đơn hàng, giá trị giao dịch và tỷ lệ chi tiêu |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Quản trị trường (admin)** | Người dùng trường học vai trò admin | Toàn bộ tính năng báo cáo + xuất file |
| **Quản lý phòng ban (manager)** | Trưởng phòng, tổ trưởng | Xem báo cáo, không xuất file |
| **Nhân viên mua sắm (buyer)** | Nhân viên thực hiện mua sắm | Xem báo cáo phạm vi phòng ban của mình |
| **Xem báo cáo (viewer)** | Vai trò chỉ đọc | Xem báo cáo, không thao tác |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Bộ lọc toàn cục

#### FR-01.1 Lọc theo năm học

**Mô tả:** Dropdown chọn năm học để lọc toàn bộ dữ liệu báo cáo.

**Tùy chọn:**
- Năm học 2024-2025
- Năm học 2025-2026 *(mặc định)*
- Năm học 2026-2027

**Quy tắc:** Thay đổi năm học làm mới toàn bộ biểu đồ và số liệu ở tab đang hiển thị.

#### FR-01.2 Lọc theo học kỳ

**Mô tả:** Dropdown chọn học kỳ để thu hẹp phạm vi thống kê.

**Tùy chọn:**
- Tất cả học kỳ *(mặc định)*
- Học kỳ 1
- Học kỳ 2

#### FR-01.3 Lọc theo phòng ban

**Mô tả:** Dropdown lọc dữ liệu theo đơn vị nội bộ.

**Tùy chọn:**
- Tất cả phòng ban *(mặc định)*
- Ban giám hiệu
- Hành chính
- Kế toán
- Thư viện
- Tổ bộ môn

#### FR-01.4 Lọc theo danh mục

**Mô tả:** Dropdown lọc dữ liệu theo danh mục sản phẩm.

**Tùy chọn:**
- Tất cả danh mục *(mặc định)*
- SGK (Sách giáo khoa)
- Văn phòng phẩm
- Thiết bị
- Ebook
- Khác

#### FR-01.5 Xóa bộ lọc

**Mô tả:** Nút "✕ Xóa lọc" xuất hiện khi có ít nhất một bộ lọc khác mặc định, reset tất cả về giá trị mặc định.

**Quy tắc:** Nút chỉ hiển thị khi `rptYear ≠ '2025-2026'` hoặc bất kỳ bộ lọc nào khác `'all'`.

---

### 2.2 FR-02: Tab Chi tiêu

#### FR-02.1 Thẻ KPI tổng quan

**Mô tả:** Hàng 4 thẻ thống kê nhanh về tình hình chi tiêu trong kỳ đã lọc.

**Dữ liệu hiển thị:**

| Thẻ | Giá trị ví dụ | Màu | Mô tả |
|-----|--------------|-----|-------|
| Tổng chi tiêu | 2,4 tỷ đ | Xanh dương `#3b82f6` | Tổng giá trị đã chi trong kỳ |
| Đơn hàng thành công | 38 | Xanh lá `#22c55e` | Số đơn hoàn thành |
| Giá trị tiết kiệm | 185 triệu | Cam `#f97316` | Chênh lệch so với giá tham chiếu |
| NCC hợp tác | 12 | Tím `#a855f7` | Số nhà cung cấp có giao dịch |

**Bố cục:** Grid 4 cột đều nhau, mỗi thẻ có số liệu lớn ở trên và nhãn nhỏ ở dưới.

#### FR-02.2 Biểu đồ Chi tiêu theo thời gian

**Mô tả:** Biểu đồ đường (line chart) thể hiện xu hướng chi tiêu theo ba khung thời gian.

**Toggle chuyển đổi kỳ:**

| Lựa chọn | Nhãn trục X | Số điểm dữ liệu | Giá trị tối đa |
|----------|------------|----------------|---------------|
| Theo tháng *(mặc định)* | T8 → T7 (12 tháng) | 12 | 320 triệu/tháng |
| Theo học kỳ | HK1/23-24 → HK2/24-25 | 4 | 900 triệu/kỳ |
| Theo năm | 2023-24 → 2025-26 | 3 | 1.600 triệu/năm |

**Kỹ thuật vẽ:** Đường cong Bezier cubic, gradient fill màu indigo `#4f46e5` mờ dần từ trên xuống. Đơn vị trục Y: triệu đồng.

#### FR-02.3 Biểu đồ Cơ cấu chi tiêu

**Mô tả:** Biểu đồ donut thể hiện tỷ trọng chi tiêu theo danh mục.

**Dữ liệu mẫu:**

| Danh mục | Tỷ lệ | Màu |
|---------|-------|-----|
| SGK | 35% | `#3b82f6` |
| Thiết Bị | 28% | `#22c55e` |
| VPP | 22% | `#f97316` |
| Ebook | 10% | `#a855f7` |
| Khác | 5% | `#94a3b8` |

**Chú giải:** Hiển thị bên phải biểu đồ, mỗi dòng có chấm màu + tên danh mục + phần trăm.

#### FR-02.4 Biểu đồ Chi tiêu theo phòng ban

**Mô tả:** Biểu đồ cột (bar chart) so sánh mức chi giữa các phòng ban.

**Phòng ban hiển thị:** BGH, Tự Nhiên, Xã Hội, Thể Dục, Ngoại Ngữ, HC. Đơn vị: triệu đồng. Cột màu cam `#f97316`, bo góc 5px.

---

### 2.3 FR-03: Tab Ngân sách

#### FR-03.1 Ngân sách theo năm học

**Mô tả:** Danh sách thẻ hiển thị tình trạng sử dụng ngân sách cho từng năm học.

**Dữ liệu mỗi thẻ:**

| Trường | Mô tả |
|--------|-------|
| Tên năm học | "Năm học XXXX-XXXX" |
| Thanh tiến trình | Tỷ lệ % đã dùng so với tổng ngân sách |
| % đã dùng | Badge màu theo ngưỡng |
| Tổng ngân sách | Tổng được phân bổ |
| Đã sử dụng | Giá trị đã chi (màu accent) |
| Còn lại | Phần chưa dùng (màu xanh lá `#15803d`) |

**Màu sắc cảnh báo trên thanh tiến trình:**

| Ngưỡng | Màu % đã dùng |
|--------|--------------|
| ≥ 90% | Đỏ `#dc2626` |
| ≥ 75% | Cam `#f97316` |
| < 75% | Accent (mặc định) |

**Dữ liệu mẫu:**

| Năm học | Tổng ngân sách | Đã dùng | % |
|---------|---------------|---------|---|
| 2023-2024 | 3,8 tỷ đ | 3,5 tỷ đ | 92% |
| 2024-2025 | 4,2 tỷ đ | 2,4 tỷ đ | 57% |
| 2025-2026 | 4,5 tỷ đ | 0,8 tỷ đ | 18% |

#### FR-03.2 Ngân sách theo học kỳ

**Mô tả:** Grid 2 cột hiển thị ngân sách HK1 và HK2 của năm học đang chọn.

**Dữ liệu mỗi thẻ:** Tên học kỳ + thanh tiến trình + "đã dùng / tổng" + % màu theo ngưỡng tương tự FR-03.1.

---

### 2.4 FR-04: Tab Nhà cung cấp

#### FR-04.1 Bảng xếp hạng nhà cung cấp

**Mô tả:** Bảng liệt kê nhà cung cấp theo thứ tự giá trị giao dịch giảm dần.

**Cột dữ liệu:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Nhà cung cấp | Số thứ tự (#1, #2...) + tên NCC | Màu số thứ tự xám nhạt |
| Số đơn | Tổng số đơn hàng đã đặt | Canh giữa, font đậm |
| Tổng giá trị | Tổng tiền giao dịch (đơn vị đồng) | Font đậm, không wrap |
| Tỷ lệ chi tiêu | Mini bar + % so tổng toàn trường | Bar màu accent |

**Sắp xếp:** Tự động theo `total` giảm dần.

**Dữ liệu mẫu:**

| # | Nhà cung cấp | Số đơn | Tổng giá trị |
|---|------------|--------|-------------|
| 1 | NXB Giáo Dục | 6 | 680.000.000 đ |
| 2 | Thiết bị GD Việt Nam | 8 | 450.000.000 đ |
| 3 | Nhà sách Tri Thức | 12 | 280.000.000 đ |
| 4 | VPP Bút Chì Xanh | 15 | 120.000.000 đ |
| 5 | VPP Minh Long | 9 | 95.000.000 đ |
| 6 | Thiết bị EduTech VN | 4 | 82.000.000 đ |

---

### 2.5 FR-05: Xuất báo cáo

#### FR-05.1 Xuất Excel

**Mô tả:** Nút "↓ Xuất Excel" trên toolbar, kích hoạt quá trình tạo file .xlsx.

**Vị trí:** Góc phải toolbar, kiểu nút thứ cấp (`act-sm`).

#### FR-05.2 Xuất PDF

**Mô tả:** Nút "↓ Xuất PDF" trên toolbar, kích hoạt quá trình tạo file .pdf.

**Vị trí:** Cạnh nút Xuất Excel, kiểu nút chính (`btn-pr`).

**Lưu ý:** Ở phiên bản hiện tại, cả hai nút hiển thị toast thông báo "Đang xuất..." — tính năng export thực tế nằm trong roadmap.

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Chuyển tab (Chi tiêu / Ngân sách / Nhà cung cấp) phản hồi ngay lập tức (< 50ms) — xử lý client-side hoàn toàn
- Thay đổi bộ lọc tái render biểu đồ không gây giật lag
- Biểu đồ SVG được tạo động với `viewBox` responsive, co giãn theo kích thước màn hình

### 3.2 NFR-02: Trực quan hóa dữ liệu

- Biểu đồ đường dùng Bezier cubic để đường cong mượt mà
- Thanh tiến trình ngân sách đổi màu tự động theo ngưỡng (< 75% / ≥ 75% / ≥ 90%)
- Biểu đồ cột và donut có grid lines và label trục rõ ràng
- Tất cả số tiền format theo locale vi-VN (dấu chấm phân cách hàng nghìn, ký hiệu "đ" hoặc "tỷ/triệu")

### 3.3 NFR-03: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 768px | Grid 4 KPI card chuyển sang 2 cột |
| ≤ 600px | Bộ lọc wrap xuống dòng; grid ngân sách học kỳ chuyển sang 1 cột |

### 3.4 NFR-04: Nhất quán UI

- Bảng màu danh mục nhất quán giữa biểu đồ donut và legend
- Tab active hiển thị đường gạch dưới `2.5px` màu `--ink`, font weight 600
- Nút toggle "Theo tháng / Học kỳ / Năm" dùng cùng component `.fchip` với các màn hình khác

### 3.5 NFR-05: Định dạng số liệu

**Hàm định dạng:**

| Hàm | Quy tắc | Ví dụ |
|-----|---------|-------|
| `fmtV(n)` | ≥ 1 tỷ → "Xtỷ"; ≥ 1 triệu → "Xtr"; ≥ 1k → "Xk" | 680000000 → "680tr" |
| `fmtC(n)` | `toLocaleString('vi-VN')` + "đ" | 4500000000 → "4.500.000.000đ" |

---

## 4. Mô hình dữ liệu

### 4.1 Trạng thái bộ lọc (State variables)

```javascript
let rptYear   = '2025-2026';  // Năm học đang chọn
let rptSem    = 'all';        // Học kỳ: 'all' | 'hk1' | 'hk2'
let rptDept   = 'all';        // Phòng ban: 'all' | 'bgh' | 'hc' | 'kt' | 'tv' | 'bm'
let rptCat    = 'all';        // Danh mục: 'all' | 'sgk' | 'vpp' | 'tb' | 'ebook' | 'other'
let rptTab    = 'spending';   // Tab hiện tại: 'spending' | 'budget' | 'suppliers'
let rptPeriod = 'month';      // Kỳ biểu đồ: 'month' | 'semester' | 'year'
```

### 4.2 Cấu trúc dữ liệu KPI Chi tiêu

```javascript
const kpis = [
  { v: '2,4 tỷ đ',    l: 'Tổng chi tiêu',          c: '#3b82f6' },
  { v: '38',           l: 'Đơn hàng thành công',     c: '#22c55e' },
  { v: '185 triệu',   l: 'Giá trị tiết kiệm',       c: '#f97316' },
  { v: '12',           l: 'NCC hợp tác',             c: '#a855f7' },
];
```

### 4.3 Cấu trúc dữ liệu Ngân sách

```javascript
// Ngân sách theo năm học
const yearBudget = {
  y:     string,   // '2023-2024'
  total: number,   // Tổng ngân sách (đơn vị đồng)
  used:  number,   // Đã sử dụng
  // rem = total - used (tính runtime)
  // pct = Math.round(used / total * 100)
};

// Ngân sách theo học kỳ
const semBudget = {
  l:      string,  // 'Học kỳ 1 — 2025-2026'
  budget: number,  // Ngân sách học kỳ
  used:   number,  // Đã sử dụng
};
```

### 4.4 Cấu trúc dữ liệu Nhà cung cấp

```javascript
const supplier = {
  name:   string,  // Tên nhà cung cấp
  orders: number,  // Tổng số đơn hàng
  total:  number,  // Tổng giá trị giao dịch (đồng)
  // tỷ lệ = total / grandTotal * 100 (tính runtime)
  // mini-bar width = total / maxTotal * 100%
};
```

### 4.5 Cấu trúc dữ liệu biểu đồ Chi tiêu theo thời gian

```javascript
// Theo tháng (mặc định)
chartVals   = [175, 135, 115, 180, 305, 285, 120, 145, 220, 290, 305, 315];
chartLabels = ['T8','T9','T10','T11','T12','T1','T2','T3','T4','T5','T6','T7'];
maxV        = 320; // triệu đồng

// Theo học kỳ
chartVals   = [560, 870, 510, 430];
chartLabels = ['HK1/23-24','HK2/23-24','HK1/24-25','HK2/24-25'];
maxV        = 900;

// Theo năm
chartVals   = [980, 1230, 1540];
chartLabels = ['2023-24','2024-25','2025-26'];
maxV        = 1600;
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng phân tích chi tiêu theo tháng

```
Người dùng → Menu "Báo cáo" (nhóm Phân tích)
  → Trang "Báo cáo & Thống kê" mở mặc định tab "Chi tiêu"
  → Xem 4 thẻ KPI tổng quan
  → Biểu đồ đường hiển thị mặc định "Theo tháng"
  → Nhấn "Theo học kỳ" → biểu đồ cập nhật 4 điểm dữ liệu học kỳ
  → Nhấn "Theo năm" → biểu đồ so sánh 3 năm học
  → Xem biểu đồ donut cơ cấu danh mục
  → Xem biểu đồ cột phân bổ theo phòng ban
```

### 5.2 Luồng theo dõi ngân sách còn lại

```
Người dùng → Tab "Ngân sách"
  → Xem danh sách 3 năm học với thanh tiến trình
  → Phát hiện 2023-2024 đạt 92% → badge đỏ cảnh báo
  → Xem ngân sách học kỳ 2025-2026 (HK1: X%, HK2: Y%)
  → Đổi bộ lọc "Năm học" sang 2024-2025
  → Số liệu ngân sách học kỳ cập nhật theo năm đã chọn
```

### 5.3 Luồng đánh giá hiệu quả nhà cung cấp

```
Người dùng → Tab "Nhà cung cấp"
  → Bảng xếp hạng NCC theo giá trị giảm dần
  → Xem cột "Tỷ lệ chi tiêu" — mini bar trực quan tương quan
  → Lọc theo Phòng ban "Tổ bộ môn" → dữ liệu NCC theo phạm vi
  → So sánh số đơn vs giá trị → đánh giá đơn giá trị trung bình
```

### 5.4 Luồng xuất báo cáo

```
Người dùng → Cài đặt bộ lọc (năm học, học kỳ, phòng ban)
  → Chọn tab báo cáo cần xuất
  → Nhấn "↓ Xuất Excel" → toast "Đang xuất Excel..."
  → Hoặc nhấn "↓ Xuất PDF" → toast "Đang xuất PDF..."
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Toolbar và Bộ lọc

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Báo cáo & Thống kê                     [↓ Xuất Excel] [↓ Xuất PDF]     │
├──────────────────────────────────────────────────────────────────────────┤
│  [Năm học 2025-2026 ▼] [Tất cả học kỳ ▼] [Tất cả phòng ban ▼]          │
│  [Tất cả danh mục ▼]                                                     │
└──────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Tab Chi tiêu — Thẻ KPI

```
┌────────────────────────────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────┐│
│  │   2,4 tỷ đ  │ │      38     │ │  185 triệu  │ │   12  ││
│  │ Tổng chi tiêu│ │  Đơn thành  │ │Giá trị tiết │ │NCC hợp││
│  │              │ │   công      │ │   kiệm      │ │  tác  ││
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────┘│
└────────────────────────────────────────────────────────────────┘
```

### 6.3 Tab Chi tiêu — Biểu đồ

```
┌──────────────────────────────────────────────────┬──────────────┐
│  Chi tiêu theo thời gian                         │ Cơ cấu       │
│  Năm học 2025-2026 · Đơn vị: triệu đồng         │ chi tiêu     │
│  [Theo tháng] [Theo học kỳ] [Theo năm]           │              │
│                                                  │   (donut)    │
│  320 ┤           ╭─╮                             │              │
│  240 ┤      ╭────╯ ╰────                         │ ● SGK  35%   │
│  160 ┤ ╭────╯                                    │ ● TB   28%   │
│   80 ┤─╯                                         │ ● VPP  22%   │
│    0 ┼──────────────────────────────             │ ● Ebook 10%  │
│      T8 T9 T10 T11 T12 T1  T2  T3               │ ● Khác  5%   │
└──────────────────────────────────────────────────┴──────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  Chi tiêu theo phòng ban · Đơn vị: triệu đồng                   │
│                                                                  │
│  220 ┤                ██                                         │
│  165 ┤       ██  ██   ██  ██                                    │
│  110 ┤  ██   ██  ██   ██  ██  ██                                │
│   55 ┤  ██   ██  ██   ██  ██  ██                                │
│    0 ┼──────────────────────────────────                        │
│      BGH TN  XH  TD  NN  HC                                     │
└──────────────────────────────────────────────────────────────────┘
```

### 6.4 Tab Ngân sách

```
Ngân sách theo năm học
┌──────────────────────────────────────────────────────────────────┐
│  Năm học 2023-2024                               92% đã dùng     │
│  ████████████████████████████████████████████░░  (màu đỏ)        │
│  Tổng ngân sách    Đã sử dụng       Còn lại                      │
│  3.800.000.000đ   3.500.000.000đ   300.000.000đ                  │
├──────────────────────────────────────────────────────────────────┤
│  Năm học 2024-2025                               57% đã dùng     │
│  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░  (màu accent)    │
│  Tổng ngân sách    Đã sử dụng       Còn lại                      │
│  4.200.000.000đ   2.400.000.000đ   1.800.000.000đ                │
└──────────────────────────────────────────────────────────────────┘

Ngân sách theo học kỳ (2025-2026)
┌──────────────────────────────┬───────────────────────────────────┐
│  Học kỳ 1 — 2025-2026        │  Học kỳ 2 — 2025-2026            │
│  ████████░░░░░░░░░░░░         │  ████░░░░░░░░░░░░░░░░            │
│  1.800.000.000đ / 2.400...đ  │  600.000.000đ / 2.100.000.000đ  │
│                          75% │                              29% │
└──────────────────────────────┴───────────────────────────────────┘
```

### 6.5 Tab Nhà cung cấp

```
┌─────────────────────────────────────────────────────────────────────┐
│  NHÀ CUNG CẤP              SỐ ĐƠN   TỔNG GIÁ TRỊ   TỶ LỆ CHI TIÊU │
├─────────────────────────────────────────────────────────────────────┤
│  #1 NXB Giáo Dục              6       680tr đ      ████████ 36.6%   │
│  #2 Thiết bị GD Việt Nam      8       450tr đ      █████░░░ 24.2%   │
│  #3 Nhà sách Tri Thức        12       280tr đ      ███░░░░░ 15.1%   │
│  #4 VPP Bút Chì Xanh         15       120tr đ      █░░░░░░░  6.5%  │
│  #5 VPP Minh Long              9        95tr đ      █░░░░░░░  5.1%  │
│  #6 Thiết bị EduTech VN        4        82tr đ      █░░░░░░░  4.4%  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Điều hướng và tải trang

- [ ] Nhấn "Báo cáo" trên sidebar → trang "Báo cáo & Thống kê" hiển thị, tab "Chi tiêu" active mặc định
- [ ] Tiêu đề topbar hiển thị "Báo cáo"
- [ ] Tất cả 4 thẻ KPI, biểu đồ đường, biểu đồ donut, biểu đồ cột xuất hiện đúng vị trí

### AC-02: Bộ lọc hoạt động

- [ ] Chọn "Năm học 2024-2025" → nhãn phụ biểu đồ đường cập nhật "Năm học 2024-2025"
- [ ] Chọn bộ lọc bất kỳ khác mặc định → nút "✕ Xóa lọc" xuất hiện
- [ ] Nhấn "✕ Xóa lọc" → tất cả dropdown về mặc định, nút biến mất

### AC-03: Toggle kỳ biểu đồ Chi tiêu

- [ ] Nhấn "Theo học kỳ" → trục X hiển thị 4 nhãn học kỳ, đường cong vẽ lại
- [ ] Nhấn "Theo năm" → trục X hiển thị 3 nhãn năm học
- [ ] Nhấn "Theo tháng" → trở về 12 tháng T8–T7
- [ ] Button đang active có style `.fchip.on` nổi bật

### AC-04: Chuyển tab

- [ ] Nhấn tab "Ngân sách" → ẩn biểu đồ, hiện thẻ ngân sách theo năm + học kỳ
- [ ] Nhấn tab "Nhà cung cấp" → hiện bảng xếp hạng NCC
- [ ] Tab active có đường gạch dưới và font đậm

### AC-05: Cảnh báo ngân sách

- [ ] Năm học có ≥ 90% → badge "% đã dùng" màu đỏ `#dc2626`
- [ ] Năm học có ≥ 75% và < 90% → badge màu cam `#f97316`
- [ ] Năm học có < 75% → màu mặc định

### AC-06: Bảng Nhà cung cấp

- [ ] Danh sách sắp xếp theo tổng giá trị giảm dần, NCC đứng đầu có mini-bar dài nhất (100%)
- [ ] Mỗi NCC hiển thị đúng số đơn và giá trị định dạng "Xtrđ"
- [ ] Tỷ lệ % cộng lại xấp xỉ 100%

### AC-07: Nút xuất file

- [ ] Nhấn "↓ Xuất Excel" → toast "Đang xuất Excel..."
- [ ] Nhấn "↓ Xuất PDF" → toast "Đang xuất PDF..."

### AC-08: Giao diện responsive

- [ ] Trên màn hình ≤ 600px → 4 thẻ KPI xếp thành 2 hàng 2 cột
- [ ] Grid biểu đồ (line + donut) chuyển sang xếp dọc
- [ ] Bộ lọc wrap xuống dòng khi không đủ chiều ngang

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Dữ liệu mock cứng, không phản ánh thực tế | Cao | Ưu tiên tích hợp API lấy dữ liệu thực từ database đơn hàng và ngân sách |
| Xuất file chưa hoạt động thực sự | Cao | Triển khai server-side PDF/Excel generation trong sprint tiếp theo |
| Biểu đồ không render đúng trên màn hình nhỏ | Trung bình | SVG dùng `viewBox` + `width:100%` tự co giãn; cần test thực tế trên mobile |
| Ngưỡng cảnh báo ngân sách (75%, 90%) cứng | Trung bình | Cho phép cấu hình ngưỡng trong phần cài đặt hệ thống |
| Bộ lọc phòng ban không ảnh hưởng dữ liệu mock | Thấp | Ghi rõ trong comment code; sẽ hoạt động đúng sau khi có API |
| Không có quyền phân cấp theo vai trò | Thấp | Trong roadmap: viewer chỉ xem phòng ban mình, buyer xem theo scope |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Kết nối dữ liệu thực** | Thay dữ liệu mock bằng API tổng hợp từ module Đơn hàng, Ngân sách, Hợp đồng |
| P1 | **Xuất Excel / PDF thực tế** | Server-side generation với dữ liệu đã lọc; tên file theo năm học và kỳ |
| P2 | **Phân quyền xem báo cáo** | Viewer chỉ xem phòng ban mình; manager xem toàn trường |
| P2 | **Biểu đồ drill-down** | Nhấn vào cột phòng ban → xem chi tiết danh mục của phòng ban đó |
| P2 | **So sánh năm học** | Hiển thị delta % so với năm học trước trên thẻ KPI |
| P3 | **Cảnh báo ngân sách tự động** | Notification khi một phòng ban vượt 80% ngân sách phân bổ |
| P3 | **Báo cáo tùy chỉnh** | Cho phép tự chọn metrics, kỳ và phòng ban để tạo báo cáo riêng |
| P3 | **Lịch sử xuất file** | Xem lại các báo cáo đã xuất trước đó |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
