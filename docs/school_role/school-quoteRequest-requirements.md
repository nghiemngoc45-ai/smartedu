# Tài liệu Phân tích Yêu cầu
## Phân hệ Yêu cầu Báo giá (RFQ) — EduMart (Role: Trường học)

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Yêu cầu Báo giá (RFQ — Request for Quotation) là trung tâm của quy trình mua sắm B2B trong tổ chức giáo dục. Thay vì liên hệ nhà cung cấp rời rạc qua email hoặc điện thoại, nhân viên mua sắm tạo một yêu cầu có cấu trúc — chỉ định loại hàng hóa/dịch vụ, ngân sách ước tính, hạn chót nhận báo giá và danh sách nhà cung cấp mời tham gia. Khi báo giá phản hồi về, hệ thống tổng hợp và so sánh tập trung để người ra quyết định chọn được phương án tốt nhất. Phân hệ cũng là bước khởi đầu của luồng gia hạn license Ebook từ phân hệ Ebook & Tài nguyên số.

### 1.2 Phạm vi

Phân hệ bao gồm bốn nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Danh sách RFQ** | Xem, tìm kiếm, lọc, sắp xếp toàn bộ yêu cầu báo giá |
| **Tạo RFQ** | Nhập thông tin yêu cầu, chọn nhà cung cấp, gửi đi |
| **Chi tiết RFQ** | Xem tổng quan, danh sách NCC và so sánh báo giá qua 3 tab |
| **Nhập & Sửa báo giá** | Nhập thủ công đơn giá từ các NCC đã phản hồi và chỉnh sửa lại |

**Ngoài phạm vi:**
- Phê duyệt đa cấp (một cấp, roadmap)
- Gửi RFQ tự động qua email tới NCC (roadmap)
- Chuyển đổi RFQ thành Đơn mua hàng trực tiếp trong màn này (thực hiện ở phân hệ Đơn hàng)
- Đàm phán giá trực tiếp với NCC trong hệ thống (roadmap)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Admin** | Quản trị viên tổ chức | Xem, tạo, xem chi tiết, nhập/sửa báo giá |
| **Manager** | Trưởng phòng ban | Xem, tạo, xem chi tiết, nhập/sửa báo giá |
| **Buyer** | Nhân viên mua sắm | Xem, tạo, xem chi tiết, nhập/sửa báo giá |
| **Viewer** | Chỉ xem | Xem danh sách và chi tiết, không tạo hoặc nhập báo giá |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách yêu cầu báo giá

#### FR-01.1 Hiển thị bảng

**Mô tả:** Bảng liệt kê toàn bộ RFQ đang quản lý.

**Các cột:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Mã RFQ | `RFQ-YYYY-NNN` (font đậm) | Mã định danh duy nhất |
| Nội dung | Tên yêu cầu | `[Ebook]` prefix nếu từ luồng gia hạn |
| Số NCC | Số nhà cung cấp đã mời | Nếu `sups` là mảng → lấy `.length` |
| Phản hồi | Số NCC đã gửi báo giá | Font đậm |
| Ngân sách | Ngân sách ước tính (VND) | Format có dấu phẩy + đ |
| Hạn chót | `DD/MM/YYYY` | Ngày cuối nhận báo giá |
| Trạng thái | Badge tự động | Đang mở (xanh) / Đã đóng (xám) |
| Hành động | Nút "Chi tiết" | Mở trang Chi tiết RFQ |

**Trạng thái RFQ:**

| Giá trị | Nhãn | Badge |
|---------|------|-------|
| `open` | Đang mở | Xanh lá `bg` |
| `closed` | Đã đóng | Xám `bs` |

**Sắp xếp mặc định:** giảm dần theo mã RFQ (`localeCompare`, mới nhất lên trên).

#### FR-01.2 Tìm kiếm

**Mô tả:** Ô tìm kiếm realtime tìm đồng thời theo mã RFQ và nội dung.

**Quy tắc:**
- Không phân biệt hoa/thường
- Khớp chuỗi con (substring match)
- Cập nhật ngay khi gõ (`oninput`)
- Kết hợp AND với bộ lọc trạng thái đang kích hoạt

#### FR-01.3 Lọc theo trạng thái

**Mô tả:** Dropdown lọc theo trạng thái RFQ.

| Giá trị | Nhãn | Dot màu |
|---------|------|---------|
| `all` | Trạng thái *(mặc định)* | — |
| `open` | Đang mở | Xanh `#15803d` |
| `closed` | Đã đóng | Xám `#6b7280` |

**UX:** Khi dropdown mở, click ngoài vùng dropdown (overlay toàn màn hình) → đóng dropdown.

#### FR-01.4 Sắp xếp

| Chế độ | Nhãn | Logic |
|--------|------|-------|
| `newest` | Mới nhất *(mặc định)* | Giảm dần theo `id` (`localeCompare`) |
| `az` | A–Z | Tăng dần theo `title` (`localeCompare('vi')`) |

Sắp xếp được áp dụng sau khi lọc.

#### FR-01.5 Xóa bộ lọc

Nút "✕ Xóa lọc" chỉ hiển thị khi có ít nhất một bộ lọc đang kích hoạt (tìm kiếm hoặc lọc trạng thái). Nhấn → reset `rfqSearch` về rỗng và `rfqStatusFilter` về `'all'`. Chế độ sắp xếp không bị reset.

Kèm nhãn đếm kết quả: **N kết quả** (chỉ hiển thị khi đang lọc).

**Empty state:**
- Không có bộ lọc: "Chưa có yêu cầu báo giá"
- Có bộ lọc không ra kết quả: "Không tìm thấy kết quả phù hợp"

---

### 2.2 FR-02: Tạo yêu cầu báo giá

#### FR-02.1 Mở form tạo mới

**Trigger:** Nút "+ Tạo yêu cầu báo giá" ở góc phải toolbar. Khi mở:
- `rfqType` reset về `'general'`
- `rfqEbookRef` reset về `null`
- `rfqSupList` reset về `[]`
- Form hiện tiêu đề "Tạo yêu cầu báo giá (RFQ)"

**Trigger thứ hai (từ phân hệ Ebook):** Khi người dùng nhấn "Gia hạn" từ màn Ebook, form mở với dữ liệu điền sẵn (xem FR-05).

#### FR-02.2 Loại yêu cầu

Dropdown chọn loại, ảnh hưởng đến trường nội dung và gợi ý nhà cung cấp:

| Giá trị | Nhãn hiển thị |
|---------|--------------|
| `general` | Văn phòng phẩm |
| `ebook` | Ebook & License |
| `software` | Phần mềm |
| `device` | Thiết bị giáo dục |
| `service` | Dịch vụ |

Khi người dùng đổi loại → `rfqEbookRef` bị reset, form tự render lại (`openRFQ()`).

#### FR-02.3 Trường nội dung theo loại

**Loại `ebook`:**

| Trường | Bắt buộc | Mô tả |
|--------|----------|-------|
| Tên Ebook / Phần mềm | Có | Tên ebook, có thể điền sẵn từ `rfqEbookRef.title` |
| Số lượng license | Không | Số nguyên ≥ 1, có thể điền sẵn từ `rfqEbookRef.lic` |
| Thời hạn license | Không | Dropdown: 1 năm / 2 năm / 3 năm / Vĩnh viễn |

**Tất cả loại khác:**

| Trường | Bắt buộc | Mô tả |
|--------|----------|-------|
| Tiêu đề | Có | Mô tả ngắn nội dung yêu cầu |

#### FR-02.4 Chọn nhà cung cấp

Xem FR-03 (Phần chi tiết về luồng chọn NCC).

#### FR-02.5 Thông tin bổ sung

| Trường | Bắt buộc | Mô tả |
|--------|----------|-------|
| Ngân sách ước tính (đ) | Không | Số nguyên, mặc định 0 |
| Hạn chót nhận báo giá | Không | Date picker, lưu `DD/MM/YYYY`; nếu để trống → "—" |
| Mô tả yêu cầu | Không | Textarea, mô tả chi tiết sản phẩm/dịch vụ |

#### FR-02.6 Validation khi gửi

| Trường hợp | Hành vi |
|------------|---------|
| Tên Ebook/Tiêu đề rỗng | Toast "Nhập tên Ebook" hoặc "Nhập tiêu đề", dừng lưu |
| Chưa chọn NCC nào | Toast "Chọn ít nhất một nhà cung cấp", dừng lưu |

#### FR-02.7 Lưu thành công

1. Sinh mã RFQ: `RFQ-2026-NNN` — lấy `max(id_numbers) + 1`, padStart 3 chữ số
2. Tiêu đề tự thêm prefix `[Ebook]` nếu `rfqType === 'ebook'`
3. Thêm vào đầu mảng `RFQS` (`unshift`) với `status: 'open'`, `resp: 0`, `quotes: []`
4. Reset toàn bộ state: `rfqType`, `rfqEbookRef`, `rfqSupList`, `rfqSupSearch`, v.v.
5. Đóng modal
6. Toast:
   - Loại ebook: "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"
   - Loại khác: "Đã gửi yêu cầu báo giá"
7. Re-render danh sách — RFQ mới xuất hiện đầu tiên

---

### 2.3 FR-03: Chọn nhà cung cấp

#### FR-03.1 Hiển thị NCC đã chọn (chip)

- NCC trong hệ thống: chip xanh — nền `rgba(22,53,84,.07)`, viền `var(--line)`, dot accent xanh
- NCC ngoài hệ thống: chip tím — nền `rgba(124,58,237,.07)`, viền `rgba(124,58,237,.25)`, dot tím `#7c3aed`
- Mỗi chip có nút "✕" để xóa khỏi danh sách
- Khi chưa chọn NCC nào: hiển thị dòng mờ "Chưa chọn nhà cung cấp nào"

#### FR-03.2 Tìm kiếm NCC trong hệ thống

- Ô input lọc mảng `SUPPLIERS` theo tên hoặc danh mục (case-insensitive)
- Kết quả dropdown tối đa 8 mục, cuộn nếu dài hơn
- Khi chưa gõ: hiển thị gợi ý "GỢI Ý PHÙ HỢP" từ `SUP_SUGGEST[rfqType]`; nếu không có gợi ý → hiển thị 8 NCC đầu tiên trong SUPPLIERS
- Nếu không tìm thấy: "Không tìm thấy nhà cung cấp"
- NCC đã chọn: opacity 0.5, "✓ Đã chọn", không click được
- Click NCC chưa chọn → thêm vào `rfqSupList`, input xóa trắng, dropdown đóng

**Gợi ý theo loại (`SUP_SUGGEST`):**

| Loại | NCC gợi ý |
|------|-----------|
| general | Thiên Long, Hồng Hà, VPP Bút Chì Xanh, VPP Minh Long |
| ebook | Fahasa, NXB Giáo dục, Nhà sách Tri Thức |
| software | Fahasa, Thiết bị EduTech VN |
| device | Thiết bị GD Việt Nam, Thiết bị EduTech VN |
| service | Thiết bị GD Việt Nam |

#### FR-03.3 Thêm NCC ngoài hệ thống

Nút "+ Thêm NCC ngoài hệ thống" (viền nét đứt tím) mở form inline:

| Trường | Bắt buộc |
|--------|----------|
| Tên nhà cung cấp | Có |
| Người liên hệ | Không |
| Email | Có |
| Số điện thoại | Không |
| Website | Không |
| Ghi chú | Không |

**Validation:** Tên rỗng → toast "Nhập tên nhà cung cấp"; Email rỗng → toast "Nhập email nhà cung cấp".

**Lưu thành công:** Thêm chip tím vào danh sách, đóng form, toast "Đã thêm NCC ngoài hệ thống".

**Hủy:** Đóng form, xóa trắng các input trong form.

---

### 2.4 FR-04: Chi tiết yêu cầu báo giá

#### FR-04.1 Điều hướng

- Từ danh sách: click nút "Chi tiết" trên bất kỳ dòng nào
- URL state: chuyển sang view `rfq-detail`, `rfqDetailId` lưu mã RFQ
- Breadcrumb: nút "← Yêu cầu báo giá" quay lại danh sách

**Thanh header:**
- Bên trái: nút quay lại | đường kẻ | Mã RFQ (font đậm) | Tên RFQ (text-soft, ellipsis)
- Bên phải: badge trạng thái

#### FR-04.2 Tab Tổng quan

**4 thẻ thông tin mini (grid 4 cột):**

| Thẻ | Nội dung |
|-----|---------|
| Loại yêu cầu | Nhãn loại tiếng Việt (VD: "Thiết bị giáo dục") |
| Ngân sách ước tính | Giá trị VND |
| Hạn chót nhận báo giá | DD/MM/YYYY hoặc "—" |
| Phản hồi nhận được | "X / N NCC" |

**Panel mô tả:** Tiêu đề "Mô tả yêu cầu" + nội dung `r.desc`, hiện "Không có mô tả" nếu rỗng.

#### FR-04.3 Tab Nhà cung cấp (N)

**Trường hợp `sups` là mảng (RFQ tạo mới):**

Bảng hiển thị từng NCC:

| Cột | Nội dung |
|-----|---------|
| Nhà cung cấp | Tên NCC (font đậm) |
| Loại | Badge "Hệ thống" (xanh) / "Ngoài hệ thống" (tím) |
| Người liên hệ | `s.contact` hoặc "—" |
| Email / Ngành hàng | `s.email` (NCC ngoài) hoặc `s.cat` (NCC hệ thống) hoặc "—" |
| Trạng thái | Badge xám "Chờ phản hồi" |

**Trường hợp `sups` là số (RFQ seed data cũ):**

"Đã gửi tới **N** nhà cung cấp" (không có bảng chi tiết).

#### FR-04.4 Tab So sánh báo giá (N)

Số `N` trong tab label = `r.resp` (số NCC đã phản hồi).

**Nhánh A — Đã có báo giá, không đang chỉnh sửa (`hasQuotes && !rfqQuoteFormOpen`):**
- Bảng sắp xếp tăng dần theo đơn giá
- Cột: Nhà cung cấp | Loại | Đơn giá | (Badge "Rẻ nhất")
- NCC có đơn giá thấp nhất: đơn giá màu xanh `#15803d` + badge "Rẻ nhất" xanh
- Nút "Sửa báo giá" bên dưới bảng

**Nhánh B — Đang chỉnh sửa báo giá đã có (`hasQuotes && rfqQuoteFormOpen`):**
- Hướng dẫn: "Chỉnh sửa đơn giá (đ) cho từng nhà cung cấp. Các ô bỏ trống sẽ bị xóa khỏi danh sách so sánh."
- Danh sách card NCC: mỗi card 1 hàng flex = [Tên] [Badge] [Input giá — điền sẵn giá hiện tại]
- Footer: nút "Hủy" → quay lại Nhánh A | nút "Lưu thay đổi" → gọi `rfqSaveQuotes`

**Nhánh C — Chưa có báo giá, có NCC, chưa mở form (`hasSups && !rfqQuoteFormOpen`):**
- Thông báo: "Chưa nhận được báo giá nào. Bạn có thể nhập thủ công báo giá từ các nhà cung cấp đã gửi RFQ."
- Nút "Nhập báo giá thủ công"

**Nhánh D — Đang nhập báo giá mới (`hasSups && rfqQuoteFormOpen`):**
- Hướng dẫn: "Nhập đơn giá (đ) cho từng nhà cung cấp đã phản hồi. Các ô bỏ trống sẽ không được lưu."
- Danh sách card NCC: mỗi card 1 hàng flex = [Tên] [Badge] [Input giá — trống]
- Footer: nút "Hủy" → quay lại Nhánh C | nút "Lưu báo giá" → gọi `rfqSaveQuotes`

**Nhánh E — Không có NCC và không có báo giá:**
- "Chưa nhận được báo giá nào"

---

### 2.5 FR-05: Nhập và lưu báo giá (`rfqSaveQuotes`)

**Mô tả:** Áp dụng cho cả nhập mới (Nhánh D) và chỉnh sửa (Nhánh B).

**Logic:**
1. Duyệt qua từng `r.sups[i]`, đọc `rfqQ_price_${i}`
2. Chỉ lưu các NCC có giá > 0 (bỏ qua input trống hoặc 0)
3. Validate: nếu không có NCC nào giá > 0 → toast "Nhập đơn giá cho ít nhất một nhà cung cấp"
4. Ghi đè `r.quotes` với mảng `{sup, type, price}` mới
5. Cập nhật `r.resp = quotes.length`
6. `rfqQuoteFormOpen = false`
7. Toast "Đã lưu N báo giá"
8. Re-render

---

### 2.6 FR-06: Luồng gia hạn từ Ebook & Tài nguyên số

**Mô tả:** Khi người dùng nhấn "Gia hạn" từ màn Ebook, form RFQ mở với dữ liệu điền sẵn.

**Dữ liệu điền sẵn:**

| Trường | Giá trị |
|--------|---------|
| Tiêu đề modal | "Gia hạn license — [tên ebook, tối đa 32 ký tự…]" |
| Loại yêu cầu | "Ebook & License" (cố định) |
| Tên Ebook | `rfqEbookRef.title` |
| Số lượng license | `rfqEbookRef.lic` |
| Nhà cung cấp | Chip NCC của ebook nếu tìm thấy trong `SUPPLIERS` |

**NCC auto-fill:** Hệ thống tìm `SUPPLIERS.find(x => x.name === e.sup)`:
- Tìm thấy → thêm chip xanh vào `rfqSupList`
- Không tìm thấy → `rfqSupList` rỗng, người dùng tự thêm

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm, lọc, sắp xếp phản hồi trong < 50ms (client-side, không network)
- Dropdown NCC phản hồi ngay khi gõ (`oninput`), không debounce vì tập dữ liệu nhỏ
- Re-render sau `saveRFQ` / `rfqSaveQuotes` không có độ trễ nhận thấy

### 3.2 NFR-02: Nhất quán giao diện

- Toolbar layout nhất quán: tiêu đề trái + filter + sort + Xóa lọc + counter + nút tạo phải
- Chip NCC: phân biệt màu xanh (hệ thống) / tím (ngoài hệ thống) — nhất quán với màn Ebook & Tài nguyên số
- Badge trạng thái: `bg` (xanh lá) cho Đang mở, `bs` (xám) cho Đã đóng — nhất quán với toàn hệ thống
- Card nhập báo giá: layout 1 hàng flex (tên + badge + input) — nhất quán giữa nhập mới và sửa

### 3.3 NFR-03: Bảo mật

- **XSS Prevention:** Tên RFQ, tên NCC phải qua `escHtml()` trước khi render vào DOM
- Mã RFQ trong `onclick` handler dùng chuỗi an toàn (`viewRFQDetail('${r.id}')`) — tên RFQ không truyền trực tiếp

### 3.4 NFR-04: Lưu trữ

- `RFQS`: dữ liệu runtime; trong MVP chưa persist — cần thêm `localStorage` trong roadmap
- RFQ mới thêm vào đầu mảng (`unshift`) để xuất hiện đầu khi sort "Mới nhất"
- Mã RFQ tự sinh từ `max(id_numbers) + 1` — không trùng trong phiên làm việc

### 3.5 NFR-05: Trạng thái UI

- `rfqQuoteFormOpen` dùng chung cho cả nhập mới và sửa báo giá (true/false toggle)
- Khi đổi tab sang "So sánh báo giá" từ tab khác: `rfqQuoteFormOpen` giữ nguyên trạng thái
- Khi mở Chi tiết RFQ mới: `rfqQuoteFormOpen` reset về `false`

---

## 4. Mô hình dữ liệu

### 4.1 RFQ Object

```javascript
{
  id: string,           // 'RFQ-YYYY-NNN'
  title: string,        // Tên RFQ; '[Ebook] ...' nếu từ luồng gia hạn
  type: string,         // 'general' | 'ebook' | 'software' | 'device' | 'service'
  sups: number | RfqSup[], // Số NCC (seed cũ) hoặc mảng object NCC (RFQ mới)
  resp: number,         // Số NCC đã phản hồi (= quotes.length sau khi nhập)
  budget: number,       // Ngân sách ước tính (VND)
  due: string,          // 'DD/MM/YYYY' hoặc '—'
  status: string,       // 'open' | 'closed'
  desc: string,         // Mô tả yêu cầu (có thể rỗng)
  quotes: Quote[],      // Mảng báo giá đã nhập (rỗng khi tạo mới)
}
```

### 4.2 RfqSup Object

```javascript
// NCC trong hệ thống
{
  type: 'registered',
  id: string,     // 'sup-NNN'
  name: string,
  cat: string,    // Danh mục: 'Văn phòng phẩm' | 'Sách & Giáo dục' | ...
}

// NCC ngoài hệ thống
{
  type: 'external',
  name: string,
  contact: string,
  email: string,
  phone: string,
  website: string,
  note: string,
}
```

### 4.3 Quote Object

```javascript
{
  sup: string,   // Tên NCC
  type: string,  // 'registered' | 'external'
  price: number, // Đơn giá (VND), > 0
}
```

### 4.4 State Variables (UI — runtime)

```javascript
// Trạng thái danh sách
let rfqSearch = ''           // Từ khóa tìm kiếm
let rfqStatusFilter = 'all'  // 'all' | 'open' | 'closed'
let rfqStatusOpen = false    // Dropdown trạng thái đang mở
let rfqSort = 'newest'       // 'newest' | 'az'

// Trạng thái form tạo RFQ
let rfqType = 'general'      // Loại yêu cầu hiện tại
let rfqEbookRef = null       // Ebook object nếu đến từ luồng gia hạn
let rfqSupList = []          // Danh sách NCC đã chọn (RfqSup[])
let rfqSupSearch = ''        // Từ khóa tìm NCC
let rfqSupDropOpen = false   // Dropdown tìm NCC đang mở
let rfqExtOpen = false       // Form NCC ngoài đang mở

// Trạng thái chi tiết
let rfqDetailId = null       // Mã RFQ đang xem
let rfqDetailTab = 'overview'// 'overview' | 'suppliers' | 'quotes'
let rfqQuoteFormOpen = false // Form nhập/sửa báo giá đang mở
```

### 4.5 Seed Data

| Mã | Nội dung | NCC | Budget | Hạn | Trạng thái | Phản hồi |
|----|---------|-----|--------|-----|-----------|---------|
| RFQ-2026-012 | Máy chiếu phòng học đa năng | 3 | 180tr | 25/06/2026 | Đang mở | 2 |
| RFQ-2026-011 | Bàn ghế học sinh cấp THPT (180 bộ) | 5 | 350tr | 30/06/2026 | Đang mở | 3 |
| RFQ-2026-010 | Phần mềm quản lý thư viện điện tử | 2 | 45tr | 15/06/2026 | Đã đóng | 2 |

### 4.6 Mã RFQ tự sinh

```
newNum = max(parseInt(id.split('-')[2]) for each RFQ) + 1
id = `RFQ-2026-${String(newNum).padStart(3, '0')}`
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng tạo RFQ thông thường

```
Buyer → Tab "Yêu cầu báo giá"
  → Click "+ Tạo yêu cầu báo giá"
  → Modal mở: Loại = Văn phòng phẩm (mặc định)
  → Nhập Tiêu đề: "Mực in và giấy A4 quý III"
  → Tìm NCC: gõ "Thiên Long" → click → chip xanh xuất hiện
  → Thêm NCC ngoài: "+ Thêm NCC ngoài hệ thống" → nhập tên + email → "Thêm vào danh sách" → chip tím
  → Nhập Ngân sách: 15.000.000
  → Nhập Hạn chót: 30/06/2026
  → Click "Gửi yêu cầu"
  → [Validation pass] → Toast "Đã gửi yêu cầu báo giá"
  → RFQ-2026-013 xuất hiện đầu danh sách, status "Đang mở"
```

### 5.2 Luồng nhập báo giá sau khi nhận phản hồi

```
Admin → Danh sách → Click "Chi tiết" (RFQ-2026-012)
  → Trang Chi tiết mở, tab mặc định "Tổng quan"
  → Thấy "Phản hồi: 2 / 3 NCC"
  → Click tab "So sánh báo giá (2)"
  → Nhánh C: "Chưa nhận được báo giá nào..."
  → Click "Nhập báo giá thủ công"
  → Nhánh D: 3 card NCC, mỗi card có 1 ô nhập giá
  → Nhập: Thiên Long: 12.000.000 | Hồng Hà: 11.500.000 | (NCC thứ 3 để trống)
  → Click "Lưu báo giá"
  → Toast "Đã lưu 2 báo giá"
  → Tab label đổi thành "So sánh báo giá (2)"
  → Nhánh A: bảng 2 dòng, Hồng Hà 11.500.000đ + badge "Rẻ nhất"
```

### 5.3 Luồng sửa báo giá

```
Manager → Chi tiết RFQ-2026-012 → Tab "So sánh báo giá (2)"
  → Nhánh A: Bảng | Hồng Hà 11.500.000đ ● Rẻ nhất | Thiên Long 12.000.000đ
  → Nhận được báo giá mới từ Thiên Long: 11.200.000đ
  → Click "Sửa báo giá"
  → Nhánh B: 2 card — Hồng Hà: [11500000] | Thiên Long: [12000000]
  → Sửa Thiên Long thành 11.200.000
  → Click "Lưu thay đổi"
  → Nhánh A cập nhật: Thiên Long 11.200.000đ ● Rẻ nhất | Hồng Hà 11.500.000đ
```

### 5.4 Luồng gia hạn Ebook (cross-module)

```
Buyer → Tab "Ebook & Tài nguyên số"
  → Tìm ebook "Hóa học hữu cơ thực hành" → Badge "Sắp hết hạn"
  → Click "Gia hạn"
  → Form RFQ mở với:
      Tiêu đề: "Gia hạn license — Hóa học hữu cơ thực hành"
      Loại: Ebook & License
      Tên Ebook: "Hóa học hữu cơ thực hành" (pre-fill)
      Số license: 25 (pre-fill)
      NCC: "NXB KHKT · Hệ thống" chip đã chọn (nếu có trong SUPPLIERS)
  → Nhập Ngân sách + Hạn chót
  → Gửi yêu cầu
  → RFQ "[Ebook] Hóa học hữu cơ thực hành" xuất hiện trong danh sách
```

### 5.5 Luồng tìm kiếm và lọc kết hợp

```
Manager → Ô tìm kiếm → gõ "phần mềm"
  → 1 kết quả: RFQ-2026-010
  → Click dropdown Trạng thái → chọn "Đang mở"
  → 0 kết quả: "Không tìm thấy kết quả phù hợp"
  → Click "✕ Xóa lọc" → hiển thị lại toàn bộ
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình danh sách

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  Yêu cầu báo giá   [Tìm mã, nội dung...] [Trạng thái▼]  [Mới nhất][A–Z]        │
│                                                  [+ Tạo yêu cầu báo giá]         │
├────────────────┬────────────────────────────┬─────┬────┬─────────┬──────────┬────┤
│ MÃ RFQ         │ NỘI DUNG                   │ NCC │ PH │ NGÂN SS │ HẠN CHÓT │ TT │
├────────────────┼────────────────────────────┼─────┼────┼─────────┼──────────┼────┤
│ RFQ-2026-012   │ Máy chiếu phòng học đa năng│  3  │  2 │  180tr  │ 25/06/26 │●Mở │ [Chi tiết]│
│ RFQ-2026-011   │ Bàn ghế học sinh THPT...   │  5  │  3 │  350tr  │ 30/06/26 │●Mở │ [Chi tiết]│
│ RFQ-2026-010   │ Phần mềm quản lý thư viện  │  2  │  2 │   45tr  │ 15/06/26 │○Đóng│ [Chi tiết]│
└────────────────┴────────────────────────────┴─────┴────┴─────────┴──────────┴────┘
PH = Phản hồi  ·  TT = Trạng thái
```

### 6.2 Form tạo RFQ (loại Ebook)

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
│  Số lượng license      Thời hạn license             │
│  [25                ]  [1 năm              ▼]       │
│                                                     │
│  Nhà cung cấp nhận báo giá *                        │
│  ┌─────────────────────────────────────┐            │
│  │ NXB KHKT ● Hệ thống  [✕]           │            │
│  └─────────────────────────────────────┘            │
│  [Tìm kiếm nhà cung cấp trong hệ thống...]         │
│   + Thêm NCC ngoài hệ thống                         │
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

### 6.3 Chi tiết RFQ — Tab Tổng quan

```
┌──────────────────────────────────────────────────────────────────┐
│ [← Yêu cầu báo giá] │ RFQ-2026-012  Máy chiếu phòng học đa năng │ ● Đang mở │
├──────────────────────────────────────────────────────────────────┤
│ [Tổng quan]   [Nhà cung cấp (3)]   [So sánh báo giá (2)]        │
├──────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│  │ Loại yêu cầu │ │ Ngân sách    │ │ Hạn chót     │ │ Phản hồi     │ │
│  │ Thiết bị GD  │ │ 180.000.000đ │ │ 25/06/2026   │ │ 2 / 3 NCC   │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ │
│                                                                  │
│  Mô tả yêu cầu                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ Máy chiếu Full HD, độ sáng ≥3000 lumen, kết nối HDMI/WiFi │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

### 6.4 Tab So sánh báo giá — Nhánh A (có báo giá)

```
┌──────────────────────────────────────────────────────────────────┐
│ [Tổng quan]   [Nhà cung cấp (3)]   [So sánh báo giá (2)]        │
├──────────────────────────────────────────────────────────────────┤
│  ┌───────────────┬────────────┬──────────────────┬──────────┐   │
│  │ NHÀ CUNG CẤP  │ LOẠI       │ ĐƠN GIÁ          │          │   │
│  ├───────────────┼────────────┼──────────────────┼──────────┤   │
│  │ Hồng Hà       │ ● Hệ thống │ 11.500.000đ      │ ● Rẻ nhất│   │
│  │ Thiên Long    │ ● Hệ thống │ 12.000.000đ      │          │   │
│  └───────────────┴────────────┴──────────────────┴──────────┘   │
│  [Sửa báo giá]                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 6.5 Tab So sánh báo giá — Nhánh B/D (form nhập/sửa)

```
┌──────────────────────────────────────────────────────────────────┐
│  Chỉnh sửa đơn giá (đ) cho từng nhà cung cấp...                 │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Hồng Hà              ● Hệ thống   [11500000              ]│  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Thiên Long           ● Hệ thống   [12000000              ]│  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ NCC Ngoài HT XYZ     ● Ngoài HT   [Đơn giá (đ)          ]│  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Hủy]  [Lưu thay đổi]                                          │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách hiển thị đúng

- [ ] Mở tab "Yêu cầu báo giá", bảng hiển thị đủ 8 cột
- [ ] RFQ mới nhất nằm trên cùng (sort mặc định "Mới nhất")
- [ ] Badge "Đang mở" màu xanh / "Đã đóng" màu xám

### AC-02: Tìm kiếm và lọc

- [ ] Gõ "2026-012" → chỉ hiện RFQ-2026-012
- [ ] Gõ "phần mềm" → hiện RFQ-2026-010 (khớp trong nội dung)
- [ ] Chọn "Đã đóng" → chỉ hiện RFQ-2026-010
- [ ] Kết hợp tìm kiếm + lọc → AND logic
- [ ] Nút "✕ Xóa lọc" xuất hiện khi có filter, nhấn → reset cả hai; sắp xếp không bị reset
- [ ] Nhãn đếm "N kết quả" hiển thị khi đang lọc

### AC-03: Sắp xếp

- [ ] Chip "A–Z" → danh sách sắp theo tên tiếng Việt A→Z (xử lý ký tự dấu)
- [ ] Chuyển lại "Mới nhất" → sắp theo mã giảm dần
- [ ] Sắp xếp áp dụng sau khi lọc, không reset bộ lọc

### AC-04: Tạo RFQ thông thường

- [ ] Click "+ Tạo yêu cầu báo giá" → modal mở, mặc định loại "Văn phòng phẩm"
- [ ] Để trống Tiêu đề → toast "Nhập tiêu đề", không lưu
- [ ] Không chọn NCC → toast "Chọn ít nhất một nhà cung cấp"
- [ ] Điền đủ → toast "Đã gửi yêu cầu báo giá"
- [ ] RFQ mới xuất hiện đầu danh sách với status "Đang mở"

### AC-05: Tạo RFQ loại Ebook

- [ ] Chọn loại "Ebook & License" → hiện trường "Tên Ebook", "Số lượng license", "Thời hạn"
- [ ] Để trống Tên Ebook → toast "Nhập tên Ebook"
- [ ] Tiêu đề RFQ trong danh sách có prefix "[Ebook]"

### AC-06: Chọn NCC

- [ ] Gõ "Giáo dục" → dropdown hiện NCC có "Giáo dục" trong tên hoặc danh mục
- [ ] Click NCC → chip xanh xuất hiện, input xóa trắng
- [ ] NCC đã chọn: opacity 0.5, "✓ Đã chọn", không click được nữa
- [ ] Click "✕" trên chip → xóa NCC khỏi danh sách
- [ ] Mở dropdown khi chưa gõ → hiển thị gợi ý theo loại

### AC-07: Thêm NCC ngoài hệ thống

- [ ] Click "+ Thêm NCC ngoài hệ thống" → form inline xuất hiện
- [ ] Bỏ trống Tên → toast "Nhập tên nhà cung cấp"
- [ ] Bỏ trống Email → toast "Nhập email nhà cung cấp"
- [ ] Điền đủ → chip tím xuất hiện, form đóng, toast "Đã thêm NCC ngoài hệ thống"

### AC-08: Chi tiết RFQ — Tab Tổng quan

- [ ] Click "Chi tiết" → trang chi tiết mở, tab mặc định "Tổng quan"
- [ ] 4 thẻ mini hiển thị đúng: Loại / Ngân sách / Hạn chót / Phản hồi
- [ ] Panel mô tả hiện "Không có mô tả" nếu `desc` rỗng
- [ ] Click "← Yêu cầu báo giá" → quay lại danh sách

### AC-09: Tab Nhà cung cấp

- [ ] NCC hệ thống: badge "Hệ thống" xanh, email/ngành hiện `cat`
- [ ] NCC ngoài hệ thống: badge "Ngoài hệ thống" tím, email hiện `email`
- [ ] RFQ seed data (sups là số): "Đã gửi tới N nhà cung cấp"

### AC-10: Tab So sánh báo giá — Nhập mới

- [ ] Chưa có báo giá → Nhánh C: nút "Nhập báo giá thủ công"
- [ ] Click → Nhánh D: mỗi NCC 1 card, 1 hàng flex (tên + badge + input)
- [ ] Input trống hoặc 0 → không lưu dòng đó
- [ ] Tất cả input 0/rỗng → toast "Nhập đơn giá cho ít nhất một nhà cung cấp"
- [ ] Lưu thành công → Nhánh A, bảng sort theo giá tăng dần, NCC rẻ nhất badge xanh

### AC-11: Tab So sánh báo giá — Sửa

- [ ] Nhánh A có nút "Sửa báo giá"
- [ ] Click → Nhánh B: mỗi card điền sẵn giá hiện tại
- [ ] Sửa giá → click "Lưu thay đổi" → bảng cập nhật, badge "Rẻ nhất" đổi nếu cần
- [ ] Click "Hủy" → quay lại Nhánh A, không thay đổi dữ liệu

### AC-12: Luồng gia hạn Ebook

- [ ] Từ màn Ebook → click "Gia hạn" → form RFQ mở với dữ liệu điền sẵn
- [ ] Tiêu đề modal chứa tên ebook (tối đa 32 ký tự)
- [ ] Loại cố định "Ebook & License"
- [ ] NCC auto-fill nếu `e.sup` khớp với một entry trong SUPPLIERS

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Mã RFQ tự sinh trùng nếu xóa RFQ cũ | Thấp | `max(id_numbers) + 1` — tăng đơn điệu, không bao giờ tái sử dụng ID đã tồn tại |
| `r.sups` là số thay vì mảng (seed data cũ) | Trung bình | Kiểm tra `Array.isArray(r.sups)` trước khi render bảng NCC và form nhập giá — fallback an toàn |
| `rfqQuoteFormOpen` không reset khi chuyển RFQ | Thấp | `viewRFQDetail()` luôn set `rfqQuoteFormOpen=false` trước khi navigate |
| RFQS chưa persist — mất khi reload | Cao | Cần thêm `localStorage` persist trong roadmap P1 |
| Dropdown NCC đóng chậm do setTimeout 200ms | Thấp | `onblur` dùng `setTimeout(..., 200)` để tránh click dropdown bị chặn — trade-off cần thiết |
| Gợi ý NCC không đúng nếu `rfqType` thay đổi giữa chừng | Thấp | `openRFQ()` gọi lại toàn bộ khi đổi loại; `rfqEbookRef` reset để tránh dữ liệu cũ |
| Tên RFQ chứa ký tự đặc biệt trong `onclick` | Trung bình | Dùng `r.id` (mã an toàn) thay vì tên trong `viewRFQDetail('${r.id}')` |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Persist RFQS** | Lưu danh sách RFQ vào `localStorage`; tải lại khi reload |
| P1 | **Đóng/Mở RFQ thủ công** | Nút chuyển trạng thái `open ↔ closed` trong trang chi tiết |
| P1 | **Chuyển đổi RFQ → Đơn mua hàng** | Nút "Chọn NCC này" trên dòng RFQ rẻ nhất để tạo PO liên kết |
| P2 | **Gửi email tự động cho NCC** | Khi tạo RFQ, tự gửi email thông báo cho NCC đã chọn |
| P2 | **Phê duyệt RFQ đa cấp** | Yêu cầu trên ngưỡng ngân sách cần Manager/Admin duyệt trước khi gửi |
| P2 | **Lọc theo loại yêu cầu** | Dropdown thêm bộ lọc theo `type` (ebook/device/...) |
| P2 | **Xem lịch sử RFQ của ebook** | Trong modal Chi tiết Ebook, link trực tiếp đến RFQ liên quan |
| P3 | **Đàm phán giá** | Chat hoặc counter-offer với NCC trong hệ thống |
| P3 | **So sánh đa tiêu chí** | Thêm cột chất lượng, thời gian giao hàng bên cạnh giá để so sánh tổng thể |
| P3 | **Export báo cáo so sánh** | Xuất bảng so sánh báo giá ra PDF/Excel |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
