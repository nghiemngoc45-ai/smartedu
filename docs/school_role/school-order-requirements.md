# Tài liệu Phân tích Yêu cầu
## Phân hệ Quản lý Đơn hàng — EduMart (Role: Trường học)

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Quản lý Đơn hàng cho phép tổ chức giáo dục theo dõi toàn bộ vòng đời của các đơn hàng phát sinh từ yêu cầu mua hàng đã được phê duyệt — từ lúc đặt hàng với nhà cung cấp, trong quá trình vận chuyển, đến khi nhận hàng và hoàn thành. Phân hệ cung cấp tra cứu linh hoạt theo mã đơn, nhà cung cấp, trạng thái và khoảng thời gian giao hàng, giúp bộ phận mua sắm kiểm soát tiến độ mà không cần liên lạc ngoài hệ thống.

### 1.2 Phạm vi

Phân hệ bao gồm hai nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Danh sách đơn hàng** | Xem, tìm kiếm, lọc toàn bộ đơn hàng của tổ chức |
| **Chi tiết đơn hàng** | Xem thông tin tổng hợp của một đơn hàng cụ thể |

**Ngoài phạm vi:**
- Tạo đơn hàng thủ công (đơn hàng được sinh tự động từ yêu cầu mua hàng đã duyệt — xem tài liệu `school-purchaseRequest-requirements.md`)
- Thanh toán và xuất hóa đơn (phân hệ Hóa đơn & Thanh toán)
- Quản lý nhà cung cấp (phân hệ Hợp đồng)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Admin** | Quản trị viên tổ chức | Xem toàn bộ đơn hàng, xem chi tiết |
| **Manager** | Trưởng phòng ban | Xem đơn hàng liên quan đến phòng ban, xem chi tiết |
| **Buyer** | Người mua — nhân viên mua sắm | Xem đơn hàng do mình tạo yêu cầu, xem chi tiết |
| **Viewer** | Chỉ xem | Xem danh sách, không thực hiện hành động |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách đơn hàng

#### FR-01.1 Hiển thị danh sách

**Mô tả:** Hệ thống hiển thị toàn bộ đơn hàng của tổ chức dưới dạng bảng.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Mã đơn | Định dạng `ORD-YYYY-XXXX` | Font đậm, in tắt |
| Mã YC | Mã yêu cầu mua hàng liên kết `PR-YYYY-XXX` | Màu nhạt, phụ trợ |
| Nhà cung cấp | Tên nhà cung cấp | |
| Ngày đặt | DD/MM/YYYY | Ngày đặt hàng với NCC |
| Ngày giao | DD/MM/YYYY | Ngày giao hàng dự kiến |
| SL mục | Số lượng dòng hàng trong đơn | Số nguyên |
| Tổng tiền | Giá trị đơn hàng (đ) | Font đậm, định dạng số có dấu phẩy |
| Trạng thái | Badge màu theo trạng thái | Xem bảng màu bên dưới |
| Hành động | Nút "Chi tiết" → xem chi tiết đơn | |

**Màu sắc trạng thái:**

| Trạng thái | Mã | Màu badge |
|------------|-----|-----------|
| Đang xử lý | `proc` | Cam `#c2410c` |
| Đang giao | `ship` | Xanh dương `#2563eb` |
| Hoàn thành | `done` | Xanh lá `#15803d` |
| Đã hủy | `cancel` | Đỏ `#b91c1c` |

**Trạng thái rỗng:** Khi chưa có đơn hàng nào, bảng hiển thị dòng thông báo "Chưa có đơn hàng" căn giữa.

#### FR-01.2 Tìm kiếm theo mã

**Mô tả:** Ô tìm kiếm theo mã đơn hàng hoặc mã yêu cầu mua hàng.

**Quy tắc:**
- Tìm kiếm không phân biệt hoa/thường
- Khớp chuỗi con (substring match) trên cả hai trường `id` và `pr`
- Kết quả cập nhật ngay khi người dùng gõ (sự kiện `oninput`)
- Placeholder: "Tìm mã đơn, mã yêu cầu..."

**Ví dụ:** Gõ "0821" → hiển thị đơn `ORD-2026-0821` hoặc bất kỳ đơn nào có mã yêu cầu chứa "0821".

#### FR-01.3 Lọc theo nhà cung cấp

**Mô tả:** Dropdown lọc theo tên nhà cung cấp, danh sách được tạo động từ dữ liệu đơn hàng hiện có.

**Tùy chọn:**
- Tất cả nhà cung cấp *(mặc định)*
- [Tên các nhà cung cấp xuất hiện trong danh sách đơn]

**Quy tắc:** Danh sách nhà cung cấp là tập hợp duy nhất (unique set) từ trường `sup` trong tất cả đơn hàng — tự động cập nhật khi có đơn mới.

#### FR-01.4 Lọc theo trạng thái

**Mô tả:** Dropdown lọc theo trạng thái đơn hàng.

**Tùy chọn:**
- Tất cả trạng thái *(mặc định)*
- Đang xử lý
- Đang giao
- Hoàn thành
- Đã hủy

**Hiển thị:** Mỗi tùy chọn trong dropdown có chấm tròn màu tương ứng với badge trạng thái.

#### FR-01.5 Lọc theo ngày giao

**Mô tả:** Bộ lọc khoảng thời gian giao hàng dự kiến, sử dụng calendar picker.

**Tùy chọn:**
- Chọn ngày bắt đầu (Từ ngày)
- Chọn ngày kết thúc (Đến ngày)
- Có thể chọn chỉ một đầu (từ ngày hoặc đến ngày)

**Nhãn nút động:**

| Tình huống | Nhãn hiển thị |
|------------|--------------|
| Chưa lọc | "Ngày giao" |
| Chỉ có ngày bắt đầu | "Từ DD/MM …" |
| Có cả hai đầu | "DD/MM – DD/MM" |

**Xóa lọc ngày:** Nút "Xóa lọc ngày" nằm trong calendar, chỉ kích hoạt khi đang áp dụng bộ lọc ngày.

#### FR-01.6 Xóa bộ lọc

**Mô tả:** Nút "✕ Xóa lọc" xuất hiện khi có ít nhất một bộ lọc đang hoạt động.

Nút reset toàn bộ: từ khóa tìm kiếm, nhà cung cấp, trạng thái, khoảng ngày giao về mặc định.

**Bộ đếm kết quả:** Khi đang lọc, hiển thị thêm "**N** kết quả" bên cạnh nút xóa lọc.

#### FR-01.7 Đóng dropdown khi click ngoài

Khi một dropdown (trạng thái, nhà cung cấp) hoặc calendar đang mở, click ra ngoài vùng dropdown sẽ đóng nó lại. Thực hiện qua overlay transparent toàn màn hình đặt dưới dropdown.

---

### 2.2 FR-02: Chi tiết đơn hàng

#### FR-02.1 Xem chi tiết

**Mô tả:** Khi click "Chi tiết" trên một dòng, hệ thống hiển thị thông tin tổng hợp của đơn hàng đó.

**Thông tin hiển thị:**

| Trường | Mô tả |
|--------|-------|
| Mã đơn hàng | `ORD-YYYY-XXXX` |
| Mã yêu cầu mua hàng | Liên kết sang phân hệ Yêu cầu mua hàng |
| Nhà cung cấp | Tên nhà cung cấp |
| Ngày đặt hàng | DD/MM/YYYY |
| Ngày giao dự kiến | DD/MM/YYYY |
| Số lượng mục hàng | Tổng số dòng trong đơn |
| Tổng giá trị | Định dạng số tiền (VND) |
| Trạng thái | Badge màu kèm nhãn |

**Trạng thái hiện tại:** Trong phiên bản 1.0, chi tiết hiển thị dưới dạng toast thông báo ID đơn. Giao diện chi tiết đầy đủ nằm trong roadmap.

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm và lọc phải phản hồi trong < 100ms (xử lý client-side)
- Render danh sách đơn hàng không gây giật lag
- Dropdown nhà cung cấp sinh động từ dữ liệu thực, không hardcode

### 3.2 NFR-02: Bảo mật

- **XSS Prevention:** Tất cả dữ liệu đơn hàng hiển thị trên giao diện phải qua hàm `escHtml()` hoặc tương đương để chống Cross-Site Scripting, đặc biệt tên nhà cung cấp có thể chứa ký tự đặc biệt
- **Phân quyền:** Buyer chỉ được xem đơn hàng sinh ra từ yêu cầu của mình *(enforcement trong roadmap)*

### 3.3 NFR-03: Lưu trữ dữ liệu

- Dữ liệu đơn hàng được persist tại `localStorage` key `school_orders`
- Dữ liệu khởi tạo (seed data) được nạp tự động nếu key chưa tồn tại

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 768px | Toolbar bộ lọc xuống thành 2 dòng; bảng có thể scroll ngang |
| ≤ 480px | Bộ lọc xếp dọc; ẩn bớt cột phụ (Mã YC, SL mục) |

### 3.5 NFR-05: Nhất quán UI

- Màu badge trạng thái nhất quán với badge trong dashboard ("Đơn hàng gần đây") và phân hệ Hóa đơn
- Dropdown dùng cùng style với các dropdown khác trong hệ thống (border, border-radius, box-shadow)
- Nút "Chi tiết" dùng class `.act-sm` — nhất quán với các bảng danh sách khác

---

## 4. Mô hình dữ liệu

### 4.1 Order Object

```javascript
{
  id: string,      // 'ORD-YYYY-XXXX' — mã đơn hàng duy nhất
  pr: string,      // 'PR-YYYY-XXX'   — mã yêu cầu mua hàng liên kết
  sup: string,     // Tên nhà cung cấp
  date: string,    // Ngày đặt hàng: 'DD/MM/YYYY'
  dlv: string,     // Ngày giao dự kiến: 'DD/MM/YYYY'
  total: number,   // Tổng giá trị đơn hàng (VND)
  status: StatusEnum, // Trạng thái đơn hàng
  items: number,   // Số lượng dòng hàng trong đơn
}
```

### 4.2 Enums

```javascript
type StatusEnum = 'proc' | 'ship' | 'done' | 'cancel'
```

### 4.3 Bảng trạng thái — nhãn và màu

```javascript
const ORD_ST = {
  proc:   ['Đang xử lý', 'bo'],   // badge cam
  ship:   ['Đang giao',  'bb'],   // badge xanh dương
  done:   ['Hoàn thành', 'bg'],   // badge xanh lá
  cancel: ['Đã hủy',     'br'],   // badge đỏ
}
```

### 4.4 Trạng thái bộ lọc (UI state)

```javascript
let ordSearch    = ''     // từ khóa tìm kiếm
let ordFilter    = 'all'  // trạng thái đang lọc
let ordSupFilter = 'all'  // nhà cung cấp đang lọc
let ordDlvFrom   = ''     // ngày giao từ (YYYY-MM-DD, định dạng input[type=date])
let ordDlvTo     = ''     // ngày giao đến (YYYY-MM-DD)
let ordCalOpen   = false  // calendar dropdown đang mở
let ordStatusOpen= false  // status dropdown đang mở
let ordSupOpen   = false  // supplier dropdown đang mở
```

### 4.5 Logic lọc kết hợp

```
filterOrders(ORDERS):
  if ordSearch:
    giữ lại đơn có id hoặc pr chứa ordSearch (case-insensitive)
  if ordFilter !== 'all':
    giữ lại đơn có status === ordFilter
  if ordSupFilter !== 'all':
    giữ lại đơn có sup === ordSupFilter
  if ordDlvFrom hoặc ordDlvTo:
    parse dlv → Date, so sánh với khoảng [ordDlvFrom, ordDlvTo]
→ Tất cả điều kiện áp dụng đồng thời (AND logic)
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng theo dõi tiến độ giao hàng

```
Buyer/Manager → Tab "Đơn hàng"
  → Danh sách tất cả đơn hàng
  → Lọc trạng thái = "Đang giao"
  → Xem danh sách đơn đang trên đường vận chuyển
  → Click "Chi tiết" vào đơn cần kiểm tra
  → Xem ngày giao dự kiến và nhà cung cấp
  → Liên hệ NCC nếu cần thiết (ngoài hệ thống)
```

### 5.2 Luồng tra cứu đơn hàng theo nhà cung cấp

```
Admin → Tab "Đơn hàng"
  → Dropdown "Nhà cung cấp" → chọn "NXB Giáo Dục"
  → Danh sách thu hẹp chỉ còn đơn của NCC đó
  → Có thể kết hợp thêm lọc trạng thái = "Hoàn thành"
  → Xem lịch sử các đơn đã hoàn thành với NCC này
```

### 5.3 Luồng kiểm tra đơn hàng trong khoảng thời gian

```
Manager → Tab "Đơn hàng"
  → Click "Ngày giao" → calendar mở
  → Chọn ngày bắt đầu: 01/06/2026
  → Chọn ngày kết thúc: 30/06/2026
  → Nút hiển thị "06/06 – 30/06", danh sách lọc tự động
  → Xem tất cả đơn giao trong tháng 6/2026
  → Click "Xóa lọc ngày" để reset
```

### 5.4 Luồng tra cứu đơn theo mã yêu cầu

```
Buyer → Tab "Đơn hàng"
  → Gõ "PR-2026-047" vào ô tìm kiếm
  → Đơn hàng ORD-2026-0821 (liên kết với PR-2026-047) hiển thị
  → Click "Chi tiết" để xem thông tin đơn
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Danh sách đơn hàng — không có bộ lọc

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Quản lý đơn hàng                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Tìm mã đơn, mã yêu cầu...]  [Nhà cung cấp ▼]  [Tất cả trạng thái ▼]  [📅 Ngày giao] │
├──────────────┬──────────────┬──────────────────┬────────────┬────────────┬─────┬────────────────┬────────────┬──┤
│ MÃ ĐƠN       │ MÃ YC        │ NHÀ CUNG CẤP     │ NGÀY ĐẶT  │ NGÀY GIAO │ SL  │ TỔNG TIỀN      │ TRẠNG THÁI │  │
├──────────────┼──────────────┼──────────────────┼────────────┼────────────┼─────┼────────────────┼────────────┼──┤
│ ORD-2026-0821│ PR-2026-047  │ Nhà sách Tri Thức│ 14/06/2026 │ 20/06/2026 │ 12  │ 28.500.000đ    │ ● Đang giao│ [Chi tiết]
├──────────────┼──────────────┼──────────────────┼────────────┼────────────┼─────┼────────────────┼────────────┼──┤
│ ORD-2026-0819│ PR-2026-044  │ Thiết bị GD VN   │ 08/06/2026 │ 15/06/2026 │  8  │ 18.200.000đ    │ ● Hoàn thành│ [Chi tiết]
├──────────────┼──────────────┼──────────────────┼────────────┼────────────┼─────┼────────────────┼────────────┼──┤
│ ORD-2026-0815│ PR-2026-042  │ VPP Bút Chì Xanh │ 01/06/2026 │ 10/06/2026 │  6  │ 12.450.000đ    │ ● Hoàn thành│ [Chi tiết]
├──────────────┼──────────────┼──────────────────┼────────────┼────────────┼─────┼────────────────┼────────────┼──┤
│ ORD-2026-0810│ PR-2026-040  │ NXB Giáo Dục     │ 25/05/2026 │ 05/06/2026 │ 35  │ 68.000.000đ    │ ● Hoàn thành│ [Chi tiết]
└──────────────┴──────────────┴──────────────────┴────────────┴────────────┴─────┴────────────────┴────────────┴──┘
```

### 6.2 Trạng thái có bộ lọc đang hoạt động

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Quản lý đơn hàng                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Tìm mã đơn, mã yêu cầu...]  [NXB Giáo Dục ▼]  [● Hoàn thành ▼]  [📅 06/06–30/06]  [✕ Xóa lọc]  1 kết quả │
├──────────────┬──────────────┬──────────────────┬────────────┬────────────┬─────┬────────────────┬────────────┬──┤
│ MÃ ĐƠN       │ MÃ YC        │ NHÀ CUNG CẤP     │ NGÀY ĐẶT  │ NGÀY GIAO │ SL  │ TỔNG TIỀN      │ TRẠNG THÁI │  │
├──────────────┼──────────────┼──────────────────┼────────────┼────────────┼─────┼────────────────┼────────────┼──┤
│ ORD-2026-0810│ PR-2026-040  │ NXB Giáo Dục     │ 25/05/2026 │ 05/06/2026 │ 35  │ 68.000.000đ    │ ● Hoàn thành│ [Chi tiết]
└──────────────┴──────────────┴──────────────────┴────────────┴────────────┴─────┴────────────────┴────────────┴──┘
```

### 6.3 Dropdown trạng thái

```
┌───────────────────────────────┐
│  ● Tất cả trạng thái    ▼     │
└───────────────────────────────┘
       ↓ (khi mở)
  ┌────────────────────────────────┐
  │  ○  Tất cả trạng thái   ✓    │
  │  ●  Đang xử lý               │
  │  ●  Đang giao                 │
  │  ●  Hoàn thành                │
  │  ●  Đã hủy                    │
  └────────────────────────────────┘
```

### 6.4 Calendar picker ngày giao

```
  ┌──────────────────────────────────────────┐
  │   Từ ngày              Đến ngày          │
  │   [2026-06-01    ]     [2026-06-30    ]  │
  │                                          │
  │                     [Xóa lọc ngày] [Đóng]│
  └──────────────────────────────────────────┘
```

### 6.5 Trạng thái rỗng (không có kết quả)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                  Không tìm thấy kết quả phù hợp                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách hiển thị đúng

- [ ] Mở tab "Đơn hàng", bảng hiển thị đầy đủ các cột: Mã đơn, Mã YC, Nhà cung cấp, Ngày đặt, Ngày giao, SL mục, Tổng tiền, Trạng thái
- [ ] Mỗi đơn hàng có nút "Chi tiết"
- [ ] Badge trạng thái hiển thị đúng màu theo từng trạng thái

### AC-02: Tìm kiếm hoạt động

- [ ] Gõ "0821" → chỉ hiển thị đơn có ID hoặc mã YC chứa "0821"
- [ ] Gõ "PR-2026" → hiển thị tất cả đơn liên kết với yêu cầu năm 2026
- [ ] Xóa từ khóa → hiển thị lại toàn bộ danh sách
- [ ] Kết quả cập nhật ngay khi gõ, không cần nhấn Enter

### AC-03: Lọc trạng thái hoạt động

- [ ] Chọn "Đang giao" → chỉ hiển thị đơn có `status='ship'`
- [ ] Chọn "Hoàn thành" → chỉ hiển thị đơn có `status='done'`
- [ ] Chọn "Tất cả trạng thái" → hiển thị lại toàn bộ

### AC-04: Lọc nhà cung cấp hoạt động

- [ ] Dropdown nhà cung cấp liệt kê đúng tên các NCC xuất hiện trong dữ liệu
- [ ] Chọn một NCC → chỉ hiển thị đơn của NCC đó
- [ ] Không có NCC nào trùng lặp trong dropdown

### AC-05: Lọc ngày giao hoạt động

- [ ] Chọn khoảng ngày → chỉ hiển thị đơn có `dlv` trong khoảng
- [ ] Chọn chỉ ngày bắt đầu → hiển thị đơn có `dlv` ≥ ngày bắt đầu
- [ ] Nhãn nút cập nhật đúng theo ngày đã chọn
- [ ] Nút "Xóa lọc ngày" reset về không lọc

### AC-06: Kết hợp bộ lọc (AND logic)

- [ ] Lọc NCC + trạng thái cùng lúc → chỉ hiển thị đơn thỏa cả hai điều kiện
- [ ] Lọc tìm kiếm + ngày giao cùng lúc → kết quả là giao của hai tập
- [ ] Kết hợp cả 4 bộ lọc → hiển thị "N kết quả" đúng số lượng

### AC-07: Xóa bộ lọc

- [ ] Khi không có bộ lọc → nút "✕ Xóa lọc" và bộ đếm không hiển thị
- [ ] Khi có ít nhất một bộ lọc → nút "✕ Xóa lọc" xuất hiện
- [ ] Click "✕ Xóa lọc" → reset toàn bộ 4 bộ lọc về mặc định, danh sách đầy đủ trở lại

### AC-08: Đóng dropdown khi click ngoài

- [ ] Mở dropdown trạng thái → click ra ngoài → dropdown đóng lại
- [ ] Mở calendar → click ra ngoài → calendar đóng lại
- [ ] Chỉ một dropdown/calendar mở tại một thời điểm

### AC-09: Nút Chi tiết

- [ ] Click "Chi tiết" trên một dòng → hiển thị phản hồi xác nhận hành động (toast hoặc màn hình chi tiết)

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| XSS qua tên nhà cung cấp trong dropdown | Cao | Áp dụng `escHtml()` hoặc encode ký tự đặc biệt trước khi render; xử lý dấu nháy đơn trong `onclick` handler |
| Dữ liệu bộ lọc ngày không đồng nhất định dạng | Trung bình | Chuẩn hóa parse: `dlv` lưu dạng `DD/MM/YYYY`, input lọc dạng `YYYY-MM-DD`; hàm `parsePrDate()` xử lý chuyển đổi |
| Dropdown nhà cung cấp trùng lặp | Trung bình | Luôn dùng `[...new Set(...)]` khi sinh danh sách; không hardcode |
| Nhiều dropdown mở cùng lúc gây lẫn lộn UI | Thấp | Khi mở một dropdown, đóng tất cả dropdown khác — enforce qua state `ordCalOpen`, `ordStatusOpen`, `ordSupOpen` |
| Dữ liệu localStorage bị mất khi xóa cache | Thấp | Seed data mặc định nạp tự động qua `LS.get('school_orders', [...])` khi key không tồn tại |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Màn hình chi tiết đơn hàng** | Trang chi tiết đầy đủ: danh sách mặt hàng, lịch sử trạng thái, thông tin giao hàng, liên kết sang hóa đơn |
| P1 | **Cập nhật trạng thái** | Admin/Buyer có thể cập nhật trạng thái đơn (proc → ship → done) hoặc hủy đơn kèm lý do |
| P1 | **Phân quyền xem đơn** | Buyer chỉ xem đơn của mình; Manager xem đơn thuộc phòng ban; Admin xem tất cả |
| P2 | **Nhận hàng & xác nhận** | Buyer xác nhận đã nhận hàng → đơn chuyển sang `done`, ghi `receivedAt` |
| P2 | **Lịch sử trạng thái** | Timeline log thay đổi trạng thái: ai thay đổi, lúc nào, từ trạng thái nào sang trạng thái nào |
| P2 | **Export danh sách** | Xuất CSV / Excel danh sách đơn hàng theo bộ lọc đang chọn |
| P2 | **Liên kết hai chiều** | Từ đơn hàng click sang yêu cầu mua hàng gốc; từ hóa đơn click sang đơn hàng tương ứng |
| P3 | **Thông báo** | Cảnh báo khi đơn sắp đến hạn giao nhưng chưa về `done`; thông báo khi đơn bị hủy |
| P3 | **Dashboard đơn hàng** | KPI: tổng đơn, giá trị đơn đang giao, tỷ lệ hoàn thành đúng hạn |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
