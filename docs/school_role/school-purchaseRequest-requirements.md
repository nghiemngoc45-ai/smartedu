# Tài liệu Phân tích Yêu cầu
## Phân hệ Yêu cầu Mua hàng — EduMart (Role: Trường học)

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Yêu cầu Mua hàng là trung tâm quản lý toàn bộ vòng đời của một yêu cầu mua sắm trong tổ chức giáo dục — từ lúc được tạo (từ giỏ yêu cầu hoặc nhập tay), qua các bước phê duyệt, cho đến khi hoàn thành. Phân hệ cho phép nhân viên tra cứu lịch sử, theo dõi trạng thái và kiểm soát chi tiêu theo phòng ban mà không cần giao tiếp ngoài hệ thống.

### 1.2 Phạm vi

Phân hệ bao gồm ba nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Danh sách yêu cầu** | Xem, tìm kiếm, lọc toàn bộ yêu cầu mua hàng của tổ chức |
| **Chi tiết yêu cầu** | Xem thông tin tổng hợp, metadata và danh sách sản phẩm đính kèm |
| **Tạo yêu cầu** | Tạo thủ công qua form hoặc tự động từ Giỏ yêu cầu (cross-flow) |

**Ngoài phạm vi:**
- Quy trình phê duyệt (xem tài liệu `school-approvals-requirements.md` — phân hệ độc lập)
- Theo dõi đơn hàng và giao hàng (phân hệ Đơn hàng)
- Thanh toán và xuất hóa đơn (phân hệ Hóa đơn & Thanh toán)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Hiệu trưởng** | Lãnh đạo tổ chức, toàn quyền | Xem, tạo, theo dõi toàn bộ yêu cầu |
| **Người mua (Buyer)** | Nhân viên phụ trách mua sắm | Xem danh sách, tạo yêu cầu, xem chi tiết |
| **Quản lý (Manager)** | Trưởng phòng ban | Xem danh sách, tạo yêu cầu của phòng mình |
| **Kế toán (Viewer)** | Xem để đối soát ngân sách | Chỉ xem, không tạo |

Demo account mặc định `truonghoc@demo.vn` hoạt động với quyền **Buyer**.

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách yêu cầu mua hàng

#### FR-01.1 Hiển thị danh sách

**Mô tả:** Hệ thống hiển thị toàn bộ yêu cầu mua hàng dưới dạng bảng, mới nhất ở trên cùng (`PRS.unshift` khi tạo mới).

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Mã YC | Định danh duy nhất dạng `PR-2026-0{n}` | Font đậm, không xuống dòng |
| Nội dung | Tiêu đề yêu cầu (dòng 1, đậm) + Phòng ban (dòng 2, mờ) | |
| Người tạo | Họ tên người gửi yêu cầu | `—` nếu không có |
| Ngày tạo | `DD/MM/YYYY` | |
| Đơn giá | Giá trung bình/đơn vị (số) + đọc số bằng chữ | `price` hoặc `round(total / items)` |
| Tổng tiền | Tổng giá trị yêu cầu (số) + đọc số bằng chữ | |
| Trạng thái | Badge màu theo trạng thái | Xem bảng badge bên dưới |
| Hành động | Nút "Xem chi tiết" → mở dialog | |

**Badge trạng thái:**

| Trạng thái | Nhãn | Màu badge | Mã |
|------------|------|-----------|-----|
| `pending` | Chờ duyệt | Cam | `bo` |
| `approved` | Đã duyệt | Xanh lá | `bg` |
| `rejected` | Từ chối | Đỏ | `br` |
| `done` | Hoàn thành | Xám | `bs` |

**Trạng thái rỗng:** Khi không có kết quả (chưa có PR, hoặc lọc không khớp), bảng hiển thị dòng thông báo "Chưa có yêu cầu mua hàng" / "Không tìm thấy kết quả phù hợp" căn giữa.

---

#### FR-01.2 Tìm kiếm

**Mô tả:** Ô tìm kiếm theo tiêu đề yêu cầu hoặc tên người tạo.

**Quy tắc:**
- Tìm kiếm không phân biệt hoa/thường
- Khớp chuỗi con (substring match) trên cả `title` và `by`
- Cập nhật ngay khi gõ (`oninput` → gọi `render()`)
- State `prSearch` lưu từ khóa hiện tại

**Ví dụ:** Gõ "bích" → hiển thị tất cả PR có "bích" trong tiêu đề hoặc người tạo.

---

#### FR-01.3 Lọc theo trạng thái

**Mô tả:** Dropdown lọc yêu cầu theo trạng thái xử lý.

**Tùy chọn:**

| Giá trị | Nhãn |
|---------|------|
| `all` *(mặc định)* | Tất cả trạng thái |
| `pending` | Chờ duyệt |
| `approved` | Đã duyệt |
| `rejected` | Từ chối |
| `done` | Hoàn thành |

**Quy tắc:** Thay đổi dropdown gọi `render()` ngay lập tức; trạng thái lưu trong `prFilter`.

---

#### FR-01.4 Lọc theo khoảng ngày

**Mô tả:** Hai date picker "Từ ngày" và "Đến ngày" lọc yêu cầu theo ngày tạo (`p.date`).

**Quy tắc:**
- Có thể dùng một hoặc cả hai mốc thời gian
- "Từ ngày" loại bỏ PR có ngày tạo trước mốc đó
- "Đến ngày" loại bỏ PR có ngày tạo sau mốc đó
- Ngày tạo PR định dạng `DD/MM/YYYY` được parse bằng `parsePrDate()`; ngày từ date picker định dạng `YYYY-MM-DD` parse bằng `parseInputDate()`
- State: `prDateFrom`, `prDateTo`

---

#### FR-01.5 Xóa bộ lọc & đếm kết quả

**Xóa bộ lọc:**
- Nút "✕ Xóa lọc" chỉ xuất hiện khi có ít nhất một bộ lọc đang kích hoạt (`prSearch || prFilter !== 'all' || prDateFrom || prDateTo`)
- Nhấn nút: reset `prSearch = ''`, `prFilter = 'all'`, `prDateFrom = ''`, `prDateTo = ''`, gọi `render()`

**Đếm kết quả:**
- Khi có bộ lọc đang kích hoạt, hiển thị dòng "Tìm thấy **X** kết quả" bên dưới khu vực lọc
- Không hiển thị dòng này khi không có bộ lọc nào

---

### 2.2 FR-02: Xem chi tiết yêu cầu

#### FR-02.1 Thông tin tổng hợp

**Mô tả:** Nhấn "Xem chi tiết" mở dialog (modal-xl) hiển thị đầy đủ thông tin của yêu cầu.

**Cấu trúc dialog:**

| Vùng | Nội dung |
|------|---------|
| Header | Mã YC (font lớn) + Tiêu đề yêu cầu |
| Panel thống kê (3 ô) | Đơn giá, Tổng tiền, Trạng thái (badge) |
| Metadata | Phòng ban, Người tạo, Ngày tạo |
| Danh sách sản phẩm | Bảng sản phẩm cuộn (nếu có) |
| Footer | Nút "Đóng" |

**Panel thống kê:**

| Ô | Hiển thị |
|---|---------|
| Đơn giá | `p.price` hoặc `round(p.total / p.items)`; kèm đọc số bằng chữ |
| Tổng tiền | `p.total`; kèm đọc số bằng chữ |
| Trạng thái | Badge màu theo `PR_STATUS` |

#### FR-02.2 Danh sách sản phẩm đính kèm

**Mô tả:** Bảng sản phẩm cuộn (`max-height: 240px`) bên dưới metadata, hiển thị khi PR có trường `products[]`.

**Cột bảng sản phẩm:**

| Cột | Nội dung |
|-----|---------|
| Ảnh | Thumbnail 36×36 (từ `getProductImg(id)`) |
| Sản phẩm | Tên sản phẩm, font đậm |
| Đơn giá | Giá tại thời điểm tạo yêu cầu; `—` nếu không lưu |
| Số lượng | Số lượng + đơn vị tính |
| Thành tiền | `price × qty`; `—` nếu không có giá |

**Khi không có dữ liệu sản phẩm:** Hiển thị dòng "Không có dữ liệu chi tiết sản phẩm" căn giữa trong bảng.

**Lưu ý:** PR tạo từ form thủ công (`openPR`) không có `products[]`. PR tạo từ Giỏ yêu cầu (`cartSubmit`) có `products[]` đầy đủ.

---

### 2.3 FR-03: Tạo yêu cầu từ Giỏ yêu cầu

**Mô tả:** Luồng tạo PR chính — người dùng tích lũy sản phẩm vào Giỏ yêu cầu từ màn Danh mục mua sắm, điền thông tin và submit. PR được tạo tự động với đầy đủ `products[]`, giá tier thực tế và tổng tiền chính xác.

**Luồng tóm tắt:**
1. Người dùng thêm sản phẩm từ màn "Danh mục mua sắm" vào Giỏ yêu cầu
2. Mở Giỏ yêu cầu (icon giỏ hàng trên topbar), điền Tên yêu cầu, Phòng ban, Người tạo
3. Nhấn "Tạo yêu cầu mua hàng" → gọi `cartSubmit()`
4. PR mới xuất hiện đầu danh sách với trạng thái "Chờ duyệt"

**Tham chiếu chi tiết:** Xem tài liệu `school-shoppingList-requirements.md` — FR-05.5.

**Dữ liệu PR được tạo tự động:**

| Trường | Giá trị |
|--------|---------|
| `id` | `PR-2026-0{PRS.length + 50}` |
| `title` | `cartTitle` (tên yêu cầu nhập trong giỏ) |
| `dept` | `cartDept` (phòng ban đã chọn) |
| `by` | `cartMember` (người tạo đã chọn) |
| `date` | Ngày hiện tại `toLocaleDateString('vi-VN')` |
| `total` | `Σ (price × qty)` toàn bộ CART |
| `status` | `'pending'` |
| `items` | `CART.length` |
| `lvl` | `2` nếu total > 50.000.000đ, ngược lại `1` |
| `price` | `round(total / totalQty)` — giá trung bình/đơn vị |
| `products[]` | Snapshot từng sản phẩm trong CART: `{id, name, unit, qty, price}` |

---

### 2.4 FR-04: Tạo yêu cầu thủ công

#### FR-04.1 Form tạo yêu cầu

**Mô tả:** Form nhập liệu để tạo yêu cầu mua hàng không đi qua Giỏ yêu cầu — dùng khi người dùng muốn gửi yêu cầu nhanh với thông tin ước tính, không cần chọn sản phẩm từng mặt hàng.

**Trường dữ liệu:**

| Trường | Loại | Bắt buộc | Ghi chú |
|--------|------|----------|---------|
| Tiêu đề yêu cầu | Text | Có | Placeholder: "VD: Mua bộ SGK lớp 10 năm học 2026-2027" |
| Phòng ban | Dropdown | Không | Danh sách từ `DEPTS`; không có giá trị mặc định bắt buộc |
| Ưu tiên | Dropdown | Không | Bình thường / Gấp / Khẩn cấp |
| Giá trị ước tính (đ) | Number | Không | Dùng để xác định cấp duyệt (`lvl`) |
| Số lượng mục | Number | Không | Placeholder: 1 |
| Mô tả / ghi chú | Textarea | Không | Mô tả chi tiết yêu cầu mua hàng |

#### FR-04.2 Validation

| Trường hợp | Thông báo |
|------------|-----------|
| Tiêu đề rỗng | Toast: "Nhập tiêu đề yêu cầu" |

#### FR-04.3 Luồng tạo thành công

1. Validate tiêu đề không rỗng
2. Sinh ID: `PR-2026-0{PRS.length + 50}`
3. Tạo đối tượng PR với `status: 'pending'`, `by: 'Nguyễn Văn An'` (tên người dùng hiện tại), `lvl` theo tổng tiền
4. `PRS.unshift(PR)` → lưu vào `localStorage` key `'prs'`
5. Đóng modal; hiện toast: `"Đã gửi [id]"`; gọi `render()`
6. PR mới xuất hiện đầu bảng với trạng thái "Chờ duyệt"

**Lưu ý:** PR tạo theo cách này **không có** trường `products[]` — dialog chi tiết sẽ hiển thị "Không có dữ liệu chi tiết sản phẩm".

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm và lọc phản hồi trong < 100ms (xử lý client-side trên `PRS[]` in-memory)
- `render()` toàn bộ màn hình (khi đổi filter) không gây giật với danh sách < 200 PR
- Dialog chi tiết mở tức thì (< 100ms) — dữ liệu đã có trong bộ nhớ

### 3.2 NFR-02: Toàn vẹn dữ liệu

- PR sau khi tạo **không thể sửa hay xóa** từ giao diện người dùng thông thường
- Trạng thái PR chỉ thay đổi qua màn "Phê duyệt" (approvals); màn này chỉ hiển thị, không cho phép can thiệp trạng thái
- `lvl` (cấp duyệt) được tính tự động và không thay đổi sau khi tạo
- `products[]` là **snapshot** tại thời điểm tạo yêu cầu — giá, tên, số lượng không phản ánh thay đổi sau đó

### 3.3 NFR-03: Nhất quán UI

- Badge trạng thái dùng đúng class màu (`bo`/`bg`/`br`/`bs`) nhất quán với màn Phê duyệt và Dashboard
- Định dạng tiền tệ dùng `toLocaleString('vi-VN')` + `readMoney()` (đọc bằng chữ) nhất quán trên toàn hệ thống
- Dialog chi tiết dùng class `modal-xl` — rộng hơn modal thường để chứa bảng sản phẩm

### 3.4 NFR-04: Persistence

- `PRS[]` lưu vào `localStorage` key `'prs'` sau mỗi thao tác tạo hoặc thay đổi trạng thái
- Khôi phục từ `localStorage` khi tải trang; fallback về dữ liệu mẫu nếu `localStorage` trống
- CART (giỏ yêu cầu) là in-memory, reset sau mỗi lần submit thành công hoặc reload trang

### 3.5 NFR-05: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 960px | Sidebar ẩn; bảng danh sách scroll ngang (`overflow-x: auto` từ `.tb-panel`) |
| ≤ 600px | Khu vực lọc các phần tử xếp thành nhiều dòng (`flex-wrap: wrap`) |

---

## 4. Mô hình dữ liệu

### 4.1 Purchase Request (PR)

```javascript
{
  id:       string,     // 'PR-2026-0{n}', ví dụ 'PR-2026-048'
  title:    string,     // Tiêu đề / nội dung yêu cầu
  dept:     string,     // Phòng ban phụ trách
  by:       string,     // Họ tên người tạo yêu cầu
  date:     string,     // Ngày tạo định dạng 'DD/MM/YYYY'
  total:    number,     // Tổng giá trị yêu cầu (VNĐ)
  status:   StatusEnum, // Trạng thái xử lý
  items:    number,     // Số loại mặt hàng
  lvl:      number,     // Cấp phê duyệt: 1 | 2 | 3
  price?:   number,     // Giá trung bình/đơn vị = round(total / totalQty)
  products?: PRProduct[], // Danh sách sản phẩm chi tiết (chỉ có khi tạo từ giỏ hàng)
}
```

### 4.2 PRProduct (sản phẩm trong PR)

```javascript
{
  id:    number,   // ID tham chiếu đến PRODUCTS[]
  name:  string,   // Tên sản phẩm (snapshot tại thời điểm tạo)
  unit:  string,   // Đơn vị tính
  qty:   number,   // Số lượng
  price: number,   // Đơn giá tier áp dụng tại thời điểm tạo (VNĐ)
}
```

### 4.3 Enums

```javascript
type StatusEnum = 'pending' | 'approved' | 'rejected' | 'done'
// pending  → Chờ duyệt   (badge cam  'bo')
// approved → Đã duyệt    (badge xanh 'bg')
// rejected → Từ chối     (badge đỏ   'br')
// done     → Hoàn thành  (badge xám  'bs')
```

### 4.4 Cấp phê duyệt (lvl)

| Cấp | Điều kiện | Ý nghĩa |
|-----|-----------|---------|
| 1 | `total ≤ 50.000.000đ` | Duyệt 1 cấp (trưởng phòng) |
| 2 | `total > 50.000.000đ` | Duyệt 2 cấp (trưởng phòng + BGH) |
| 3 | Gán thủ công trong dữ liệu mẫu | Duyệt 3 cấp (dự án lớn) |

**Lưu ý:** `cartSubmit()` chỉ tạo `lvl: 1` hoặc `lvl: 2`. Cấp 3 hiện chỉ xuất hiện trong dữ liệu mẫu và chưa có logic tự động.

### 4.5 Dữ liệu mẫu (PRS)

| Mã YC | Tiêu đề | Phòng ban | Người tạo | Tổng tiền | Trạng thái | Cấp |
|-------|---------|-----------|-----------|-----------|------------|-----|
| PR-2026-048 | Mua bộ SGK lớp 10 năm học 2026-2027 | Phòng Đào tạo | Trần Thị Bích | 142.000.000đ | Chờ duyệt | 2 |
| PR-2026-047 | Văn phòng phẩm quý 3/2026 | Phòng Hành chính | Lê Minh Cường | 28.500.000đ | Đã duyệt | 1 |
| PR-2026-046 | Thiết bị phòng máy tính mới | Phòng Đào tạo | Trần Thị Bích | 385.000.000đ | Chờ duyệt | 3 |
| PR-2026-045 | Sách tham khảo thư viện 2026 | Phòng Thư viện | Hoàng Thu Hà | 75.000.000đ | Từ chối | 2 |
| PR-2026-044 | Dụng cụ thể dục thể thao | Phòng Đào tạo | Trần Thị Bích | 18.200.000đ | Hoàn thành | 1 |

### 4.6 Hàm tiện ích liên quan

```javascript
// Parse ngày từ PR (định dạng 'DD/MM/YYYY')
function parsePrDate(s) {
  const [d, m, y] = (s || '').split('/');
  return d ? new Date(+y, +m - 1, +d) : null;
}

// Parse ngày từ date input (định dạng 'YYYY-MM-DD')
function parseInputDate(s) {
  const [y, m, d] = (s || '').split('-');
  return y ? new Date(+y, +m - 1, +d) : null;
}

// Định dạng số ngắn gọn: 385000000 → '385tr'
const fmtV = n =>
  n >= 1e9 ? (n/1e9).toFixed(1).replace(/\.0$/, '') + 'tỷ'
  : n >= 1e6 ? (n/1e6).toFixed(0) + 'tr'
  : n >= 1e3 ? (n/1e3).toFixed(0) + 'k'
  : n;

// Đọc số tiền bằng chữ (dùng bên dưới số trong bảng và dialog)
function readMoney(n) { /* … */ }
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng tra cứu yêu cầu của phòng ban

```
Người dùng → Tab "Yêu cầu mua hàng" (sidebar)
  → Bảng hiển thị toàn bộ PR (mới nhất trên cùng)
  → Gõ tên phòng ban vào ô tìm kiếm: "Đào tạo"
  → Bảng lọc còn các PR của Phòng Đào tạo
  → Chọn dropdown "Chờ duyệt"
  → Còn 2 PR đang chờ duyệt của Phòng Đào tạo
  → Nhấn "Xem chi tiết" PR-2026-048
  → Dialog: tổng tiền 142tr, cấp 2, trạng thái "Chờ duyệt"
  → Nhấn "Đóng"
```

### 5.2 Luồng tạo yêu cầu từ Giỏ yêu cầu (luồng chính)

```
Người dùng → Tab "Danh mục mua sắm"
  → Chọn SGK lớp 10 (x50), Vở Campus (x100), Bút bi (x200)
  → Click icon giỏ hàng trên topbar
  → Điền Tên yêu cầu: "Mua VPP + SGK học kỳ 1 năm 2026"
  → Chọn Phòng ban: "Phòng Đào tạo" → Chọn người tạo: "Trần Thị Bích"
  → Click "Tạo yêu cầu mua hàng"
  → Toast: "Đã tạo PR-2026-050 thành công · 31.325.000đ"
  → Chuyển sang Tab "Yêu cầu mua hàng"
  → PR-2026-050 xuất hiện đầu bảng với trạng thái "Chờ duyệt"
  → Click "Xem chi tiết" → dialog hiển thị đúng 3 sản phẩm, tổng tiền, cấp 1
```

### 5.3 Luồng tạo yêu cầu thủ công

```
Người dùng → Tab "Yêu cầu mua hàng"
  → Nhấn nút tạo yêu cầu (nếu có trong toolbar)
  → Form mở: nhập Tiêu đề, Phòng ban, Ưu tiên, Giá trị ước tính, Số mục, Mô tả
  → Nhấn "Gửi yêu cầu"
  → Toast: "Đã gửi PR-2026-051"
  → PR mới xuất hiện đầu bảng, trạng thái "Chờ duyệt"
  → Chi tiết PR: panel sản phẩm hiển thị "Không có dữ liệu chi tiết sản phẩm"
```

### 5.4 Luồng lọc theo khoảng ngày

```
Người dùng → Tab "Yêu cầu mua hàng"
  → Từ ngày: 01/06/2026 → Đến ngày: 15/06/2026
  → Bảng lọc còn các PR trong khoảng đó
  → Hiển thị "Tìm thấy 4 kết quả"
  → Nhấn "✕ Xóa lọc" → hiển thị lại toàn bộ
```

### 5.5 Luồng theo dõi sau khi PR được duyệt

```
Quản lý → Tab "Phê duyệt"
  → Tab "Chờ duyệt (2)"
  → Nhấn "Duyệt" trên PR-2026-048
  → Toast: "Đã duyệt PR-2026-048"
  → Người tạo → Tab "Yêu cầu mua hàng"
  → PR-2026-048 hiển thị badge "Đã duyệt" (xanh lá)
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình Yêu cầu mua hàng

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Tìm theo nội dung, người tạo...    ]  [Tất cả trạng thái ▼]          │
│  Từ ngày [          ]  Đến ngày [          ]           [✕ Xóa lọc]     │
│  Tìm thấy 3 kết quả                                                     │
├──────────┬─────────────────────┬──────────┬───────────┬────────┬────────┬────────────┬──────────────┤
│ MÃ YC    │ NỘI DUNG            │ NGƯỜI TẠO│ NGÀY TẠO │ ĐƠN GIÁ│ TỔNG TIỀN │ TRẠNG THÁI│              │
├──────────┼─────────────────────┼──────────┼───────────┼────────┼────────┬────────────┼──────────────┤
│PR-2026-048│ Mua bộ SGK lớp 10  │ Trần T.Bích│15/06/2026│47.333.333đ│142.000.000đ│[Chờ duyệt]│ [Xem chi tiết]│
│          │ Phòng Đào tạo       │          │           │Bốn mươi bảy triệu│Một trăm bốn mươi hai│       │               │
├──────────┼─────────────────────┼──────────┼───────────┼────────┼────────┬────────────┼──────────────┤
│PR-2026-047│ VPP quý 3/2026     │ Lê M.Cường │12/06/2026│2.375.000đ │28.500.000đ│[Đã duyệt] │ [Xem chi tiết]│
│          │ Phòng Hành chính    │          │           │          │          │           │               │
└──────────┴─────────────────────┴──────────┴───────────┴──────────┴──────────┴───────────┴───────────────┘
```

### 6.2 Dialog Chi tiết yêu cầu

```
┌──────────────────────────────────────────────────────────────────────┐
│  PR-2026-048                                                          │
│  Mua bộ SGK lớp 10 năm học 2026-2027                                 │
├──────────────────────┬──────────────────────┬───────────────────────┤
│  Đơn giá             │  Tổng tiền            │  Trạng thái           │
│  47.333.333đ         │  142.000.000đ         │  [Chờ duyệt]          │
│  Bốn mươi bảy triệu  │  Một trăm bốn mươi hai│                       │
├──────────────────────┴──────────────────────┴───────────────────────┤
│  📂 Phòng Đào tạo   👤 Trần Thị Bích   📅 15/06/2026               │
├──────────────────────────────────────────────────────────────────────┤
│  Danh sách sản phẩm (3 mặt hàng)                                     │
│  ┌────┬──────────────────────────────┬────────────┬────────┬────────┐ │
│  │    │ SẢN PHẨM                     │ ĐƠN GIÁ   │ SL     │THÀNH TIỀN│ │
│  ├────┼──────────────────────────────┼────────────┼────────┼────────┤ │
│  │[p] │ Bộ SGK lớp 10 — KNTT (14c.) │ 255.000đ  │ 50 bộ  │12.750.000│ │
│  ├────┼──────────────────────────────┼────────────┼────────┼────────┤ │
│  │[p] │ Vở Campus 200 trang          │  96.000đ  │100 lốc │ 9.600.000│ │
│  ├────┼──────────────────────────────┼────────────┼────────┼────────┤ │
│  │[p] │ Bút bi Thiên Long 027        │  42.000đ  │200 hộp │ 8.400.000│ │
│  └────┴──────────────────────────────┴────────────┴────────┴────────┘ │
│                                                              [Đóng]   │
└──────────────────────────────────────────────────────────────────────┘
```

### 6.3 Form tạo yêu cầu thủ công

```
┌─────────────────────────────────────────────────────────────┐
│  Tạo yêu cầu mua hàng                                        │
│                                                              │
│  Tiêu đề yêu cầu                                            │
│  [VD: Mua bộ SGK lớp 10 năm học 2026-2027            ]     │
│                                                              │
│  Phòng ban                    Ưu tiên                       │
│  [Phòng Đào tạo          ▼]  [Bình thường            ▼]    │
│                                                              │
│  Giá trị ước tính (đ)         Số lượng mục                  │
│  [142000000               ]  [3                      ]      │
│                                                              │
│  Mô tả / ghi chú                                            │
│  [Gồm SGK, vở và bút cho học sinh lớp 10...          ]     │
│  [                                                    ]     │
│                                                              │
│                              [Hủy]  [Gửi yêu cầu]          │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách hiển thị đúng

- [ ] Mở tab "Yêu cầu mua hàng", bảng hiển thị đủ 5 PR mẫu
- [ ] Mỗi dòng có: Mã YC, Tiêu đề + Phòng ban, Người tạo, Ngày tạo, Đơn giá (+ chữ), Tổng tiền (+ chữ), badge trạng thái
- [ ] PR mới nhất xuất hiện ở đầu bảng

### AC-02: Tìm kiếm hoạt động

- [ ] Gõ "bích" → chỉ hiển thị các PR do Trần Thị Bích tạo
- [ ] Gõ "vpp" → chỉ hiển thị PR có "vpp" trong tiêu đề
- [ ] Xóa từ khóa → hiển thị lại toàn bộ
- [ ] Kết quả cập nhật ngay khi gõ, không cần Enter

### AC-03: Lọc trạng thái hoạt động

- [ ] Chọn "Chờ duyệt" → chỉ hiển thị PR-2026-048 và PR-2026-046
- [ ] Chọn "Đã duyệt" → chỉ hiển thị PR-2026-047
- [ ] Chọn "Từ chối" → chỉ hiển thị PR-2026-045
- [ ] Chọn "Hoàn thành" → chỉ hiển thị PR-2026-044
- [ ] Chọn "Tất cả trạng thái" → hiển thị lại toàn bộ

### AC-04: Lọc khoảng ngày hoạt động

- [ ] Đặt "Từ ngày" 13/06/2026 → chỉ hiện PR tạo từ ngày 13/06 trở đi (PR-2026-048, PR-2026-047)
- [ ] Đặt "Đến ngày" 10/06/2026 → chỉ hiện PR tạo trước hoặc ngày 10/06 (PR-2026-044, PR-2026-045, PR-2026-046)
- [ ] Kết hợp cả hai mốc → AND logic

### AC-05: Xóa bộ lọc & đếm kết quả

- [ ] Khi không có bộ lọc → nút "✕ Xóa lọc" không hiển thị, không có dòng đếm kết quả
- [ ] Khi có bộ lọc → hiển thị nút "✕ Xóa lọc" và dòng "Tìm thấy X kết quả"
- [ ] Nhấn "✕ Xóa lọc" → tất cả bộ lọc reset, hiển thị lại toàn bộ PR

### AC-06: Xem chi tiết yêu cầu

- [ ] Nhấn "Xem chi tiết" → dialog modal-xl mở với đúng thông tin của PR đó
- [ ] Panel thống kê hiển thị Đơn giá, Tổng tiền (kèm đọc chữ), badge trạng thái
- [ ] Metadata hiển thị Phòng ban, Người tạo, Ngày tạo
- [ ] PR tạo từ giỏ hàng: bảng sản phẩm hiển thị đúng mặt hàng với đơn giá và thành tiền
- [ ] PR tạo thủ công: bảng sản phẩm hiển thị "Không có dữ liệu chi tiết sản phẩm"
- [ ] Nhấn "Đóng" → dialog đóng, về danh sách

### AC-07: Tạo yêu cầu từ Giỏ yêu cầu

- [ ] Sau khi `cartSubmit()` thành công → PR mới xuất hiện đầu bảng, status = "Chờ duyệt"
- [ ] Chi tiết PR có đầy đủ `products[]` với giá tier đúng tại thời điểm tạo
- [ ] `lvl = 1` nếu tổng < 50 triệu; `lvl = 2` nếu ≥ 50 triệu

### AC-08: Tạo yêu cầu thủ công

- [ ] Bỏ trống tiêu đề → toast "Nhập tiêu đề yêu cầu", không submit
- [ ] Điền đủ → PR mới xuất hiện đầu bảng với trạng thái "Chờ duyệt"
- [ ] Toast hiển thị đúng mã PR: "Đã gửi PR-2026-0{n}"

### AC-09: Persistence qua reload

- [ ] Tạo PR mới → reload trang → PR vẫn còn trong danh sách (đã lưu localStorage)
- [ ] Lọc trạng thái, gõ từ khóa → reload → bộ lọc reset về mặc định (state in-memory)

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Mã PR trùng khi tạo nhanh liên tiếp | Trung bình | ID dựa trên `PRS.length + 50` — nếu thêm/xóa không đồng bộ sẽ sinh ID trùng; giải pháp dài hạn: dùng timestamp hoặc UUID |
| `products[]` không có khi tạo thủ công | Thấp | Dialog chi tiết đã xử lý fallback "Không có dữ liệu chi tiết sản phẩm"; hành vi có chủ ý |
| Cấp duyệt `lvl: 3` không có logic tự động | Thấp | Hiện chỉ có trong dữ liệu mẫu; cần bổ sung ngưỡng giá trị nếu áp dụng thực tế |
| Tên người tạo hardcode khi tạo thủ công | Trung bình | `savePR()` hardcode `by: 'Nguyễn Văn An'`; cần lấy từ `currentUser` khi tích hợp auth thực |
| `PRS[]` mất khi clear localStorage | Thấp | Dữ liệu mẫu dùng làm fallback; cảnh báo người dùng khi xóa dữ liệu trình duyệt |
| Không có phân trang khi danh sách PR lớn | Trung bình | Bảng hiện render toàn bộ; cần thêm phân trang khi > 50–100 PR |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Phân trang danh sách** | Hiển thị 10–20 PR/trang; nút điều hướng; tổng số PR và số trang |
| P1 | **Lấy tên người tạo từ phiên đăng nhập** | Thay thế hardcode `'Nguyễn Văn An'` bằng `currentUser.name` |
| P1 | **ID PR dựa trên timestamp/UUID** | Tránh trùng ID khi nhiều người tạo đồng thời |
| P2 | **Chỉnh sửa PR ở trạng thái Chờ duyệt** | Người tạo có thể sửa tiêu đề, phòng ban, mô tả trước khi phê duyệt |
| P2 | **Hủy yêu cầu** | Người tạo hủy PR đang "Chờ duyệt"; chuyển sang trạng thái `cancelled` |
| P2 | **Xuất PDF / Excel** | In hoặc tải xuống danh sách PR đã lọc để lưu trữ và gửi kế toán |
| P2 | **Thông báo thay đổi trạng thái** | Push notification hoặc email khi PR được duyệt/từ chối |
| P3 | **Lịch sử thay đổi trạng thái** | Log ai đã duyệt/từ chối, lúc nào, kèm ghi chú lý do |
| P3 | **Nhân bản yêu cầu** | Tạo PR mới từ PR cũ (cùng danh sách sản phẩm, chỉnh sửa trước khi gửi) |
| P3 | **Liên kết PR → Đơn hàng** | Drill-down từ PR sang đơn hàng tương ứng (hiện phải vào tab Đơn hàng riêng) |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
