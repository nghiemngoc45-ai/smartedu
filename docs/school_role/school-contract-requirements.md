# Tài liệu Phân tích Yêu cầu
## Phân hệ Ebook & Tài nguyên số — EduMart (Role: Trường học)

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Ebook & Tài nguyên số đóng vai trò là kho quản lý tài sản số (Digital Asset Management) của tổ chức giáo dục. Thay vì là nơi mua sắm, đây là nơi quản lý toàn bộ Ebook và license đã được kích hoạt thành công — bao gồm theo dõi mức độ sử dụng từng license, cảnh báo hết hạn và khởi động quy trình gia hạn qua Báo giá B2B. Phân hệ là điểm đến cuối trong vòng đời mua sắm nội dung số: sau khi RFQ được duyệt, đơn hàng thanh toán và license được kích hoạt, tài sản sẽ xuất hiện tại đây.

### 1.2 Phạm vi

Phân hệ bao gồm bốn nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Dashboard KPI** | 6 chỉ số tổng quan: tổng ebook, tổng license, đang dùng, còn trống, sắp hết hạn, đã hết hạn |
| **Danh sách Ebook** | Xem toàn bộ tài sản số đang sở hữu với trạng thái license theo thời gian thực |
| **Chi tiết Ebook** | Thông tin license, lịch sử giao dịch (nguồn RFQ/PO) và lịch sử gia hạn |
| **Gia hạn license** | Khởi tạo RFQ gia hạn với dữ liệu ebook và nhà cung cấp được điền sẵn tự động |

**Ngoài phạm vi:**
- Mua Ebook mới (thực hiện tại phân hệ Báo giá B2B)
- Phân phối license cho từng học sinh/giáo viên (roadmap)
- Quản lý nội dung ebook (tích hợp đọc trực tuyến — roadmap)
- Thanh toán gia hạn (đi qua quy trình Đơn mua hàng sau khi RFQ được chọn)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Admin** | Quản trị viên tổ chức | Xem toàn bộ, xem chi tiết, khởi tạo gia hạn |
| **Manager** | Trưởng phòng ban | Xem danh sách, xem chi tiết, khởi tạo gia hạn |
| **Buyer** | Nhân viên mua sắm | Xem danh sách, xem chi tiết, khởi tạo gia hạn |
| **Viewer** | Chỉ xem | Xem danh sách và chi tiết, không khởi tạo gia hạn |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Dashboard KPI

**Mô tả:** Bảng 6 thẻ chỉ số tổng hợp hiển thị ngay bên dưới tiêu đề trang, cập nhật theo dữ liệu EBOOKS hiện tại.

**Các thẻ KPI:**

| # | Tiêu đề | Giá trị | Màu |
|---|---------|---------|-----|
| 1 | Tổng Ebook sở hữu | `EBOOKS.length` | Xanh dương `#2563eb` / nền `#eff6ff` |
| 2 | Tổng license | Tổng `lic` toàn bộ ebook | Xanh lá `#15803d` / nền `#f0fdf4` |
| 3 | Đang sử dụng | Tổng `used` toàn bộ ebook | Tím `#7c3aed` / nền `#faf5ff` |
| 4 | License còn trống | Tổng `lic` − Tổng `used` | Xanh ngọc `#059669` / nền `#f0fdf4` |
| 5 | Sắp hết hạn | Số ebook có `exp` ≤ 30 ngày kể từ hôm nay (và chưa hết hạn) | Cam `#c2410c` / nền `#fff7ed` |
| 6 | Đã hết hạn | Số ebook có `exp` < hôm nay | Đỏ `#dc2626` / nền `#fef2f2` |

**Layout:** Grid 6 cột đều nhau, mỗi thẻ hiển thị số lớn phía trên và nhãn nhỏ phía dưới.

---

### 2.2 FR-02: Danh sách Ebook

#### FR-02.1 Hiển thị bảng

**Mô tả:** Bảng liệt kê toàn bộ Ebook đang sở hữu.

**Các cột:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Tên Ebook | Tên đầy đủ (font đậm) + tên NXB (nhỏ, màu nhạt) | 2 dòng |
| Danh mục | Badge xám | Toán, Khoa học, Ngoại ngữ, Lịch sử… |
| Loại license | Text nhỏ | VD: "Số lượng/năm" |
| Tổng | Tổng số license | Căn phải |
| Đang dùng | Số license đang sử dụng | Căn phải, màu theo % sử dụng |
| Còn trống | `lic − used` | Căn phải, xanh nếu > 0, đỏ nếu = 0 |
| Ngày kích hoạt | `DD/MM/YYYY` | Ngày bắt đầu hiệu lực |
| Ngày hết hạn | `DD/MM/YYYY` | Ngày license hết hiệu lực |
| Trạng thái | Badge màu theo ngưỡng thời gian | Xem FR-02.2 |
| Hành động | Nút "Chi tiết" + Nút "Gia hạn" | Luôn hiển thị cả hai |

**Màu cột "Đang dùng" theo % sử dụng (`used / lic`):**

| Ngưỡng | Màu |
|--------|-----|
| ≥ 90% | Đỏ `#dc2626` |
| 70% – 89% | Cam `#d97706` |
| < 70% | Xanh lá `#22c55e` |

#### FR-02.2 Trạng thái license

Trạng thái được tính tự động từ ngày hết hạn (`exp`) so sánh với ngày hiện tại (`new Date()`):

| Trạng thái | Điều kiện | Badge |
|------------|-----------|-------|
| Hết hạn | `exp < now` | Đỏ |
| Sắp hết hạn | `now < exp ≤ now + 30 ngày` | Cam |
| Còn hạn | `exp > now + 30 ngày` | Xanh lá |
| Không xác định | `exp` không parse được | Xám |

**Hàm tính:** `ebookStatus(e)` — trả về `[nhãn, css-class]`.

---

### 2.3 FR-03: Chi tiết Ebook

#### FR-03.1 Mở modal chi tiết

**Trigger:** Click nút "Chi tiết" trên dòng bất kỳ trong danh sách.

**Loại modal:** `modal-xl` (tối đa 780px) — đủ chỗ cho bảng lịch sử gia hạn.

#### FR-03.2 Nội dung hiển thị

**Phần đầu:**
- Tiêu đề lớn: tên Ebook
- Dòng phụ: `[Tên NXB] · [Badge danh mục]`

**Thông tin license (3 thẻ mini):**

| Thẻ | Giá trị | Màu |
|-----|---------|-----|
| Tổng license | `e.lic` | Xanh dương `#2563eb` / nền `#eff6ff` |
| Đang sử dụng | `e.used` | Màu theo % sử dụng (giống cột bảng) |
| Còn trống | `e.lic − e.used` | Xanh nếu > 0, đỏ nếu ≤ 0 |

**Grid thông tin:**

| Trường | Mô tả |
|--------|-------|
| Loại license | `e.licType` |
| Trạng thái | Badge từ `ebookStatus(e)` |
| Ngày kích hoạt | `e.activatedAt` hoặc "—" nếu không có |
| Ngày hết hạn | `e.exp` |

#### FR-03.3 Lịch sử giao dịch

**Điều kiện hiển thị:** Chỉ xuất hiện khi ebook có ít nhất một trong `rfq` hoặc `po`.

**Nội dung (grid 2 cột):**

| Trường | Mô tả |
|--------|-------|
| Nguồn RFQ | Mã RFQ nguồn gốc (VD: `RFQ-2025-031`) |
| Đơn mua hàng | Mã đơn hàng (VD: `ORD-2025-0950`) |
| Nhà cung cấp | `e.sup` |
| Ngày mua | `e.purchasedAt` |
| Giá trị HĐ | `e.contractVal` định dạng VND có dấu phẩy |

#### FR-03.4 Lịch sử gia hạn

**Điều kiện hiển thị:** Chỉ xuất hiện khi `renewHistory.length > 0`.

**Bảng lịch sử:**

| Cột | Nội dung |
|-----|---------|
| Ngày gia hạn | `DD/MM/YYYY` |
| Số license | Số lượng license của lần gia hạn đó |
| Thời hạn | VD: "1 năm", "2 năm" |
| Chi phí | Giá trị VND định dạng có dấu phẩy |

#### FR-03.5 Footer modal

Hai nút:
- **Đóng** — đóng modal, không thay đổi dữ liệu
- **Gia hạn license** — đóng modal và kích hoạt luồng gia hạn (`renewLicense(id)`)

---

### 2.4 FR-04: Gia hạn license

#### FR-04.1 Trigger

Hai điểm kích hoạt:
1. Nút "Gia hạn" trực tiếp trên dòng bảng danh sách
2. Nút "Gia hạn license" ở footer modal Chi tiết

#### FR-04.2 Luồng gia hạn

Hệ thống **không gia hạn trực tiếp**. Thay vào đó, khởi tạo một RFQ mới qua phân hệ Báo giá B2B:

```
Người dùng click "Gia hạn"
  → rfqType = 'ebook'
  → rfqEbookRef = ebook object
  → Tìm nhà cung cấp trong SUPPLIERS theo tên e.sup
      Nếu tìm thấy → thêm vào rfqSupList dưới dạng 'registered' (chip xanh)
      Nếu không tìm thấy → rfqSupList = [] (cần chọn thủ công)
  → openRFQ() — mở form RFQ với dữ liệu điền sẵn
```

#### FR-04.3 Dữ liệu điền sẵn trong form RFQ

Khi form RFQ mở từ luồng gia hạn:

| Trường | Giá trị điền sẵn |
|--------|-----------------|
| Tiêu đề modal | "Gia hạn license — [Tên ebook, tối đa 32 ký tự…]" |
| Loại yêu cầu | "Ebook & License" (cố định theo `rfqType='ebook'`) |
| Tên Ebook | `rfqEbookRef.title` (pre-fill, người dùng có thể sửa) |
| Số lượng license | `rfqEbookRef.lic` (pre-fill, người dùng có thể sửa) |
| Thời hạn license | Mặc định "1 năm" (dropdown) |
| Nhà cung cấp | Chip của `e.sup` đã được chọn sẵn (nếu có trong SUPPLIERS) |

#### FR-04.4 Lưu RFQ gia hạn

Khi người dùng xác nhận "Gửi yêu cầu":

1. Validate: tiêu đề không rỗng, ít nhất một nhà cung cấp đã được chọn
2. Sinh mã RFQ tự động: `RFQ-2026-NNN` (số tự tăng từ max hiện có)
3. Tiêu đề RFQ có prefix `[Ebook]` để phân biệt trong danh sách Báo giá B2B
4. Thêm vào đầu mảng `RFQS` (hiển thị mới nhất lên trên)
5. Toast: "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"
6. Reset toàn bộ state RFQ về mặc định
7. Re-render màn hình

---

### 2.5 FR-05: Chọn nhà cung cấp trong form RFQ

**Mô tả:** Người dùng có thể thêm/bỏ nhà cung cấp khi điền form RFQ gia hạn.

#### FR-05.1 Nhà cung cấp trong hệ thống

**Gợi ý mặc định cho loại Ebook:** Fahasa, NXB Giáo dục, Nhà sách Tri Thức (từ `SUP_SUGGEST['ebook']`).

**Tìm kiếm:** Ô input lọc `SUPPLIERS` theo tên hoặc danh mục (không phân biệt hoa/thường). Kết quả hiển thị dropdown tối đa 8 mục.

**Thêm NCC:** Click vào kết quả → NCC xuất hiện dưới dạng chip xanh. Chip đã chọn không thể chọn lại (opacity giảm, cursor default, hiển thị "✓ Đã chọn").

**Xóa NCC:** Click "✕" trên chip → xóa khỏi danh sách đã chọn.

#### FR-05.2 Nhà cung cấp ngoài hệ thống

Nút "**+ Thêm NCC ngoài hệ thống**" mở form inline (nền tím nhạt, viền nét đứt):

| Trường | Bắt buộc |
|--------|----------|
| Tên nhà cung cấp | Có |
| Người liên hệ | Không |
| Email | Có |
| Số điện thoại | Không |
| Website | Không |
| Ghi chú | Không |

NCC ngoài hệ thống hiển thị chip tím (phân biệt với chip xanh của NCC hệ thống).

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tính toán `ebookStatus()` và tổng hợp KPI hoàn thành client-side trong < 50ms
- Danh sách EBOOKS render không block UI dù trang có > 100 ebook
- Dropdown tìm kiếm NCC phản hồi ngay khi gõ (`oninput`), không debounce vì tập dữ liệu nhỏ

### 3.2 NFR-02: Chính xác thời gian

- Trạng thái license (`ebookStatus`) dùng `new Date()` tại thời điểm render — cập nhật mỗi lần người dùng navigate lại màn hình
- Ngưỡng "Sắp hết hạn" là 30 ngày dương lịch (không phải ngày làm việc)
- Ngày trong `exp` và `activatedAt` lưu dạng `DD/MM/YYYY`, parse bằng hàm `parsePrDate()`

### 3.3 NFR-03: Bảo mật

- **XSS Prevention:** Tên ebook, tên NXB, tên nhà cung cấp phải qua `escHtml()` hoặc tương đương trước khi render vào DOM
- Tên ebook trong `onclick` handler không được truyền trực tiếp chuỗi — dùng ID số nguyên (`onclick="openEbookDetail(${e.id})"`) để tránh JS injection

### 3.4 NFR-04: Nhất quán màu sắc

- Màu badge trạng thái (`Còn hạn` / `Sắp hết hạn` / `Hết hạn`) nhất quán giữa bảng danh sách và modal chi tiết
- Màu % sử dụng (đỏ/cam/xanh theo ngưỡng 90%/70%) nhất quán với phân hệ Ngân sách
- Chip NCC trong hệ thống: nền `rgba(22,53,84,.07)` — Chip NCC ngoài hệ thống: nền tím `rgba(124,58,237,.07)`

### 3.5 NFR-05: Lưu trữ dữ liệu

- `EBOOKS`: dữ liệu tĩnh (seed), chưa persist qua `localStorage` — các ebook mới sinh từ luồng RFQ/PO sẽ được thêm vào runtime
- `RFQS`: persist (unshift khi tạo RFQ mới từ gia hạn)
- `renewHistory` của mỗi ebook được cập nhật sau khi quy trình RFQ → PO → thanh toán hoàn tất (roadmap)

### 3.6 NFR-06: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 1100px | Grid KPI 6 cột xuống 3 cột |
| ≤ 768px | Grid KPI xuống 2 cột; bảng danh sách scroll ngang |
| ≤ 480px | Grid KPI 1 cột; modal-xl thu về full-width |

---

## 4. Mô hình dữ liệu

### 4.1 Ebook Object

```javascript
{
  id: number,            // ID duy nhất
  title: string,         // Tên đầy đủ của Ebook
  pub: string,           // Tên nhà xuất bản (hiển thị dòng phụ)
  sup: string,           // Tên nhà cung cấp (dùng để auto-fill khi gia hạn)
  cat: string,           // Danh mục: 'Toán' | 'Khoa học' | 'Ngoại ngữ' | 'Lịch sử' | ...
  licType: string,       // Loại license: VD 'Số lượng/năm'
  lic: number,           // Tổng số license được cấp
  used: number,          // Số license đang sử dụng

  // Thời hạn
  activatedAt: string,   // Ngày kích hoạt: 'DD/MM/YYYY'
  exp: string,           // Ngày hết hạn: 'DD/MM/YYYY'

  // Lịch sử giao dịch (có thể thiếu một số trường)
  rfq: string,           // Mã RFQ nguồn: 'RFQ-YYYY-NNN'
  po: string,            // Mã đơn hàng: 'ORD-YYYY-NNNN'
  purchasedAt: string,   // Ngày mua: 'DD/MM/YYYY'
  contractVal: number,   // Giá trị hợp đồng (VND)

  // Lịch sử gia hạn (mảng rỗng nếu chưa từng gia hạn)
  renewHistory: Array<{
    date: string,        // 'DD/MM/YYYY'
    lic: number,         // Số license gia hạn
    period: string,      // '1 năm' | '2 năm' | '3 năm' | 'Vĩnh viễn'
    cost: number,        // Chi phí (VND)
  }>
}
```

### 4.2 Supplier Object (trong mảng SUPPLIERS)

```javascript
{
  id: string,    // 'sup-NNN'
  name: string,  // Tên nhà cung cấp
  cat: string,   // Danh mục: 'Văn phòng phẩm' | 'Sách & Giáo dục' | 'Thiết bị giáo dục'
}
```

### 4.3 RfqSup Object (state tạm trong form RFQ)

```javascript
// Nhà cung cấp đã đăng ký trong hệ thống
{ type: 'registered', id: string, name: string, cat: string }

// Nhà cung cấp ngoài hệ thống
{ type: 'external', name: string, contact: string, email: string,
  phone: string, website: string, note: string }
```

### 4.4 State variables (UI — runtime only)

```javascript
// Trạng thái luồng gia hạn
let rfqType = 'general'        // 'general' | 'ebook' | 'software' | 'device' | 'service'
let rfqEbookRef = null         // Ebook object khi đến từ renewLicense()

// Trạng thái chọn NCC trong form RFQ
let rfqSupList = []            // Danh sách NCC đã chọn (RfqSup[])
let rfqSupSearch = ''          // Từ khóa tìm kiếm NCC
let rfqSupDropOpen = false     // Dropdown NCC đang mở
let rfqExtOpen = false         // Form NCC ngoài hệ thống đang mở
```

### 4.5 Logic tính trạng thái license

```
ebookStatus(e):
  now = new Date()
  exp = parsePrDate(e.exp)     // 'DD/MM/YYYY' → Date object
  if !exp → ['Không xác định', 'bs']
  if exp < now → ['Hết hạn', 'br']
  d30 = new Date(now); d30.setDate(d30.getDate() + 30)
  if exp <= d30 → ['Sắp hết hạn', 'bo']
  → ['Còn hạn', 'bg']
```

### 4.6 Gợi ý nhà cung cấp theo loại RFQ (SUP_SUGGEST)

```javascript
const SUP_SUGGEST = {
  general:  ['sup-001', 'sup-002', 'sup-007', 'sup-009'], // VPP
  ebook:    ['sup-003', 'sup-004', 'sup-005'],             // Sách & Giáo dục
  software: ['sup-003', 'sup-008'],
  device:   ['sup-006', 'sup-008'],
  service:  ['sup-006'],
}
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng kiểm tra tổng thể tài sản số

```
Admin/Manager → Tab "Ebook & Tài nguyên số"
  → Xem 6 thẻ KPI tổng quan
  → Phát hiện "Sắp hết hạn: 1" hoặc "Đã hết hạn: 1"
  → Nhìn xuống bảng → tìm dòng có badge đỏ/cam
  → Quyết định gia hạn hoặc thay thế
```

### 5.2 Luồng xem chi tiết và gia hạn từ modal

```
Buyer → Bảng danh sách → Click "Chi tiết" (Hóa học hữu cơ thực hành)
  → Modal-xl mở:
      Tổng: 25 / Đang dùng: 25 / Còn trống: 0
      Trạng thái: ● Sắp hết hạn (cam)
      Ngày hết hạn: 30/06/2026
      Lịch sử giao dịch: RFQ-2025-019 · ORD-2025-0680 · NXB KHKT · 3.750.000đ
      Lịch sử gia hạn: 01/07/2025 · 25 license · 1 năm · 3.750.000đ
  → Click "Gia hạn license"
  → Modal đóng → form RFQ mở với:
      Tiêu đề: "Gia hạn license — Hóa học hữu cơ thực hành"
      Loại: Ebook & License
      Tên Ebook: "Hóa học hữu cơ thực hành" (điền sẵn)
      Số license: 25 (điền sẵn)
      NCC: Chip "NXB KHKT · Hệ thống" đã được chọn sẵn (nếu có trong SUPPLIERS)
  → Nhập Ngân sách, Hạn chót
  → Click "Gửi yêu cầu"
  → Toast "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"
  → RFQ mới "[Ebook] Hóa học hữu cơ thực hành" xuất hiện trong màn Báo giá B2B
```

### 5.3 Luồng gia hạn nhanh từ bảng danh sách

```
Admin → Bảng danh sách → Click "Gia hạn" (Sinh học phổ thông tập 1)
  → Form RFQ mở ngay (bỏ qua bước xem chi tiết)
  → Dữ liệu điền sẵn: tên, số license, NCC "NXB Giáo Dục"
  → Có thể sửa Số lượng license nếu cần thay đổi
  → Gửi yêu cầu → chuyển sang quy trình RFQ B2B
```

### 5.4 Luồng thêm nhà cung cấp ngoài hệ thống khi gia hạn

```
Buyer → Gia hạn "Tiếng Anh B1-B2 Cambridge Suite"
  → Form RFQ mở, NCC "Cambridge Press VN" KHÔNG có trong SUPPLIERS
  → Chip NCC trống (không auto-fill)
  → Click "+ Thêm NCC ngoài hệ thống"
  → Form inline xuất hiện (nền tím nhạt, viền nét đứt):
      Tên: "Cambridge Press Vietnam"
      Email: "vietnam@cambridge.org"
  → Click "Thêm vào danh sách"
  → Chip tím "Cambridge Press Vietnam · Ngoài HT" xuất hiện
  → Tiếp tục điền ngân sách và gửi yêu cầu
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình chính — Dashboard + Danh sách

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Ebook & Tài nguyên số                                                      │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│    6     │   265    │   204    │    61    │    1     │    1     │
│ Tổng EB  │ Tổng lic │ Đang dùng│Còn trống │Sắp hết HH│ Đã hết HH│
│ sở hữu   │          │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

┌──────────────┬────┬─────────────┬────┬────┬─────┬────────┬────────┬─────┬──────────┐
│ TÊN EBOOK    │DMỤC│ LOẠI LIC    │TỔNG│DÙNG│TRỐNG│KÍCH H. │HẾT H. │TRẠNG│  HĐ      │
├──────────────┼────┼─────────────┼────┼────┼─────┼────────┼────────┼─────┼──────────┤
│Toán học NC 12│Toán│Số lượng/năm │ 50 │ 38 │  12 │01/09/25│31/08/26│●Còn │[CT] [GH] │
│NXB Giáo dục  │    │             │    │    │     │        │        │ hạn │          │
├──────────────┼────┼─────────────┼────┼────┼─────┼────────┼────────┼─────┼──────────┤
│Hóa học HC TH │KHọc│Số lượng/năm │ 25 │ 25 │   0 │01/07/25│30/06/26│●Sắp │[CT] [GH] │
│NXB KHKT      │    │             │    │    │     │        │        │hết HH│          │
├──────────────┼────┼─────────────┼────┼────┼─────┼────────┼────────┼─────┼──────────┤
│Sinh học PT T1│KHọc│Số lượng/năm │ 20 │ 20 │   0 │01/01/25│31/05/26│●Hết │[CT] [GH] │
│NXB Giáo dục  │    │             │    │    │     │        │        │ hạn │          │
└──────────────┴────┴─────────────┴────┴────┴─────┴────────┴────────┴─────┴──────────┘
CT = Chi tiết  ·  GH = Gia hạn
```

### 6.2 Modal Chi tiết Ebook (modal-xl)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Hóa học hữu cơ thực hành                                                │
│  NXB KHKT · [Khoa học]                                                   │
│                                                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│  │ Tổng license     │  │ Đang sử dụng     │  │ Còn trống        │       │
│  │ 25               │  │ 25               │  │ 0                │       │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│         (xanh)              (đỏ ≥90%)               (đỏ = 0)            │
│                                                                          │
│  Loại license:    Số lượng/năm    Trạng thái:   ● Sắp hết hạn           │
│  Ngày kích hoạt:  01/07/2025      Ngày hết hạn:  30/06/2026             │
│                                                                          │
│  ── Lịch sử giao dịch ────────────────────────────────────────────────  │
│  Nguồn RFQ:  RFQ-2025-019          Đơn mua hàng: ORD-2025-0680          │
│  Nhà CC:     NXB KHKT              Ngày mua:      28/06/2025             │
│  Giá trị HĐ: 3.750.000đ                                                 │
│                                                                          │
│  ── Lịch sử gia hạn ──────────────────────────────────────────────────  │
│  ┌──────────────┬─────────────┬──────────┬──────────────┐               │
│  │ NGÀY GH      │ SỐ LICENSE  │ THỜI HẠN │ CHI PHÍ      │               │
│  ├──────────────┼─────────────┼──────────┼──────────────┤               │
│  │ 01/07/2025   │ 25 license  │ 1 năm    │ 3.750.000đ   │               │
│  └──────────────┴─────────────┴──────────┴──────────────┘               │
│                                                                          │
│                           [Đóng]  [Gia hạn license →]                   │
└──────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Form RFQ gia hạn (tự động điền từ luồng Gia hạn)

```
┌─────────────────────────────────────────────────────┐
│  Gia hạn license — Hóa học hữu cơ thực hành         │
│                                                     │
│  Loại yêu cầu                                       │
│  [Ebook & License                              ▼]   │
│                                                     │
│  Tên Ebook / Phần mềm *                             │
│  [Hóa học hữu cơ thực hành                    ]    │
│                                                     │
│  Số lượng license    Thời hạn license               │
│  [25              ]  [1 năm                    ▼]   │
│                                                     │
│  Nhà cung cấp nhận báo giá *                        │
│  ╔══════════════════════════════════╗               │
│  ║ NXB KHKT · Hệ thống  [✕]        ║               │
│  ╚══════════════════════════════════╝               │
│  [Tìm kiếm nhà cung cấp trong hệ thống...   ]      │
│  + Thêm NCC ngoài hệ thống                          │
│                                                     │
│  Ngân sách ước tính (đ)   Hạn chót nhận báo giá    │
│  [                    ]   [          📅          ]  │
│                                                     │
│  Mô tả yêu cầu                                      │
│  [                                              ]   │
│                                                     │
│  [Hủy]                        [Gửi yêu cầu]        │
└─────────────────────────────────────────────────────┘
```

### 6.4 Badge trạng thái license

```
● Còn hạn        →  badge xanh lá   (exp > now + 30 ngày)
● Sắp hết hạn    →  badge cam       (now < exp ≤ now + 30 ngày)
● Hết hạn        →  badge đỏ        (exp < now)
○ Không xác định →  badge xám       (exp không parse được)
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: KPI Dashboard đúng

- [ ] Mở tab "Ebook & Tài nguyên số", 6 thẻ KPI hiển thị đúng giá trị
- [ ] Thẻ "Tổng Ebook sở hữu" = tổng số ebook trong mảng EBOOKS
- [ ] Thẻ "Đang sử dụng" = tổng cộng `used` của tất cả ebook
- [ ] Thẻ "Sắp hết hạn" đếm đúng ebook có exp trong vòng 30 ngày (và chưa hết hạn)
- [ ] Thẻ "Đã hết hạn" đếm đúng ebook có exp < hôm nay

### AC-02: Bảng danh sách hiển thị đúng

- [ ] Tất cả ebook trong EBOOKS hiển thị đủ 10 cột
- [ ] Cột "Còn trống" = `lic − used`, màu đỏ khi = 0
- [ ] Mỗi dòng có 2 nút: "Chi tiết" và "Gia hạn"

### AC-03: Trạng thái license tính đúng

- [ ] Ebook có exp 30/06/2026 (8 ngày từ 22/06/2026) → badge "Sắp hết hạn" cam
- [ ] Ebook có exp 31/05/2026 (đã qua) → badge "Hết hạn" đỏ
- [ ] Ebook có exp 31/12/2026 (> 30 ngày) → badge "Còn hạn" xanh
- [ ] Trạng thái nhất quán giữa bảng danh sách và modal chi tiết

### AC-04: Modal Chi tiết mở đúng

- [ ] Click "Chi tiết" → modal-xl mở (780px), hiển thị đúng tên ebook
- [ ] 3 thẻ mini License đúng giá trị (Tổng / Đang dùng / Còn trống)
- [ ] Lịch sử giao dịch hiển thị đúng RFQ, PO, NCC, ngày mua, giá trị HĐ
- [ ] Lịch sử gia hạn xuất hiện nếu `renewHistory.length > 0`, ẩn nếu rỗng
- [ ] Click "Đóng" → modal đóng, không thay đổi dữ liệu

### AC-05: Luồng gia hạn từ bảng

- [ ] Click "Gia hạn" trên dòng bất kỳ → form RFQ mở với loại "Ebook & License"
- [ ] Tên ebook được điền sẵn trong field "Tên Ebook"
- [ ] Số license được điền sẵn đúng `e.lic`
- [ ] Tiêu đề modal có dạng "Gia hạn license — [tên ebook]" (tối đa 32 ký tự)

### AC-06: Luồng gia hạn từ modal Chi tiết

- [ ] Click "Gia hạn license" trong modal Chi tiết → modal đóng → form RFQ mở với dữ liệu như AC-05

### AC-07: Auto-fill nhà cung cấp

- [ ] Ebook có `sup = 'NXB Giáo Dục'` (có trong SUPPLIERS) → chip "NXB Giáo dục · Hệ thống" đã được chọn sẵn
- [ ] Ebook có `sup` không có trong SUPPLIERS → chip trống, cần chọn thủ công

### AC-08: Gợi ý NCC khi mở dropdown

- [ ] Mở search input khi chưa gõ → hiển thị gợi ý gồm Fahasa, NXB Giáo dục, Nhà sách Tri Thức
- [ ] Gõ từ khóa → lọc theo tên hoặc danh mục (không phân biệt hoa/thường)

### AC-09: Thêm NCC ngoài hệ thống

- [ ] Click "+ Thêm NCC ngoài hệ thống" → form inline xuất hiện (nền tím nhạt)
- [ ] Bỏ trống Tên → toast "Nhập tên nhà cung cấp"
- [ ] Bỏ trống Email → toast "Nhập email nhà cung cấp"
- [ ] Điền đủ → chip tím xuất hiện, form inline đóng

### AC-10: Tạo RFQ gia hạn thành công

- [ ] Không chọn NCC → toast "Chọn ít nhất một nhà cung cấp"
- [ ] Điền đủ → toast "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"
- [ ] RFQ mới có ID tự sinh, tiêu đề prefix "[Ebook]", xuất hiện đầu danh sách Báo giá B2B
- [ ] Sau khi lưu, state rfqType, rfqEbookRef, rfqSupList được reset về mặc định

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| NCC của ebook không có trong SUPPLIERS | Cao | Auto-fill chỉ áp dụng khi `SUPPLIERS.find(x => x.name === e.sup)` tìm thấy; nếu không → chip trống, người dùng tự thêm NCC ngoài hệ thống |
| `exp` không parse được (sai định dạng) | Trung bình | `ebookStatus()` trả về `['Không xác định','bs']` thay vì crash — cần validate định dạng `DD/MM/YYYY` khi nhập dữ liệu |
| Tên ebook chứa ký tự đặc biệt phá vỡ onclick | Trung bình | Dùng ID số nguyên (`onclick="openEbookDetail(${e.id})"`) thay vì truyền chuỗi tên — ngăn chặn JS injection |
| `renewHistory` không tồn tại (undefined) | Thấp | Dùng `(e.renewHistory\|\|[])` — fallback an toàn khi trường vắng mặt |
| EBOOKS là dữ liệu tĩnh, không persist qua reload | Thấp | Ebook mới từ luồng PO cần được lưu vào localStorage — hiện chỉ là runtime; cần thêm `LS.save()` trong roadmap |
| KPI "Sắp hết hạn" lệch nếu người dùng khác múi giờ | Thấp | `new Date()` dùng local timezone của trình duyệt — nhất quán với `parsePrDate()` vốn tạo Date theo local time |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Persist EBOOKS** | Lưu danh sách ebook vào `localStorage`; auto-add khi đơn hàng ebook hoàn thành |
| P1 | **Cập nhật renewHistory tự động** | Sau khi RFQ gia hạn → PO → thanh toán xong, tự động thêm entry vào `renewHistory` và cập nhật `exp` |
| P1 | **Banner cảnh báo khi vào tab** | Nếu có ebook "Hết hạn" hoặc "Sắp hết hạn", hiện banner cảnh báo đầu trang |
| P2 | **Bộ lọc và tìm kiếm** | Tìm theo tên ebook, lọc theo danh mục, lọc theo trạng thái license |
| P2 | **Phân phối license** | Gán license cho từng học sinh/giáo viên; theo dõi ai đang dùng license nào |
| P2 | **Thêm NCC ngoài vào SUPPLIERS** | Sau giao dịch thành công với NCC ngoài, đề xuất lưu vào danh sách SUPPLIERS |
| P2 | **Export danh sách** | Xuất CSV/Excel danh sách ebook và tình trạng license |
| P3 | **Dashboard theo phòng ban** | Xem license đang được dùng bởi phòng ban nào |
| P3 | **Tích hợp đọc ebook** | Nhúng viewer đọc nội dung trực tuyến cho license đang hoạt động |
| P3 | **Nhắc nhở qua email** | Tự động gửi email 60/30/7 ngày trước khi license hết hạn |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
