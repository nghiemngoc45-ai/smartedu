# Tài liệu Phân tích Yêu cầu
## Phân hệ School Kit — EduMart (Role: Trường học)

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ School Kit cung cấp cho người dùng vai trò Trường học công cụ quản lý bộ sản phẩm chuẩn theo cấp học, chương trình giảng dạy hoặc nhóm đối tượng. Mỗi School Kit là một danh sách sản phẩm có sẵn với số lượng gợi ý, giúp rút ngắn quy trình tạo yêu cầu mua hàng lặp lại theo học kỳ hoặc năm học.

### 1.2 Phạm vi

Phân hệ bao gồm bốn nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Danh sách School Kit** | Xem toàn bộ bộ sản phẩm đã lưu dưới dạng card |
| **Chi tiết & Chỉnh sửa Kit** | Xem danh sách sản phẩm, sửa thông tin, xóa kit |
| **Tạo yêu cầu từ Kit** | Nạp sản phẩm từ kit vào Giỏ yêu cầu và tạo Yêu cầu mua hàng |
| **Lưu Kit từ Giỏ yêu cầu** | Lưu danh sách sản phẩm trong giỏ thành School Kit mới |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Người mua (Buyer)** | Nhân viên phụ trách mua sắm | Toàn bộ tính năng |
| **Quản lý (Manager)** | Trưởng phòng, phê duyệt yêu cầu | Xem, tạo yêu cầu, lưu kit |
| **Viewer** | Chỉ xem | Xem danh sách và chi tiết kit |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách School Kit

#### FR-01.1 Hiển thị danh sách

**Mô tả:** Hệ thống hiển thị toàn bộ School Kit đã lưu dưới dạng lưới card (grid), tự co giãn theo chiều ngang màn hình.

**Dữ liệu hiển thị trên mỗi card:**

| Trường | Nội dung | Ghi chú |
|--------|---------|---------|
| Tên Kit | Tên đầy đủ của bộ sản phẩm | Font đậm, nổi bật |
| Cấp học / Nhóm | Badge màu xanh | VD: Lớp 10, THCS, Giáo viên |
| Badge trạng thái | "Có danh sách SP" | Chỉ hiển thị khi kit có mảng `products` |
| Mô tả | Văn bản mô tả ngắn | Hiển thị nếu có, bỏ qua nếu rỗng |
| Số sản phẩm | Số mặt hàng trong kit | VD: 4 sản phẩm |
| Số học sinh dự kiến | Quy mô mua hàng dự kiến | Ẩn nếu = 0 |
| Giá tham chiếu | Tổng giá trị kit | Ẩn nếu = 0 (kit chưa định giá) |
| Hành động | [Xem chi tiết] [+ Tạo yêu cầu mua hàng] | |

**Layout:** Grid tự động `repeat(auto-fill, minmax(300px, 1fr))`, khoảng cách 14px.

**Nguồn dữ liệu:** Mảng `KITS[]` trong bộ nhớ, đồng bộ với `localStorage` qua `LS.set('kits', KITS)`.

---

### 2.2 FR-02: Chi tiết & Chỉnh sửa School Kit

#### FR-02.1 Mở dialog chi tiết

**Mô tả:** Nhấn "Xem chi tiết" mở dialog hiển thị đầy đủ thông tin kit và cho phép chỉnh sửa.

**Thông tin hiển thị và chỉnh sửa:**

| Trường | Loại input | Bắt buộc |
|--------|-----------|----------|
| Tên Kit | Text | Có |
| Cấp học / Nhóm | Text | Không |
| Số học sinh dự kiến | Number | Không |
| Mô tả | Textarea | Không |

**Danh sách sản phẩm (read-only):**
- Hiển thị trong vùng cuộn `max-height: 160px`
- Mỗi dòng: Tên sản phẩm + Số lượng + Đơn vị
- Nếu kit chưa có danh sách sản phẩm: hiện thông báo "Kit này chưa có danh sách sản phẩm chi tiết."

**Footer dialog:**

| Vị trí | Nút | Hành động |
|--------|-----|-----------|
| Trái | Xóa Kit | Xóa kit khỏi hệ thống |
| Phải | Đóng | Đóng dialog, không lưu |
| Phải | Lưu thay đổi | Xác thực và lưu chỉnh sửa |

#### FR-02.2 Lưu chỉnh sửa

**Luồng:**
1. Người dùng chỉnh sửa thông tin trong dialog
2. Nhấn "Lưu thay đổi"
3. Hệ thống validate tên kit không được rỗng
4. Nếu hợp lệ: cập nhật object trong `KITS[]`, ghi `localStorage`, đóng dialog, hiện toast xác nhận, re-render danh sách

**Validation:**

| Trường hợp | Thông báo |
|------------|-----------|
| Tên Kit rỗng | Toast: "Tên Kit không được để trống" |

#### FR-02.3 Xóa School Kit

**Luồng:**
1. Nhấn "Xóa Kit" trong dialog chi tiết
2. Hệ thống xóa ngay (không confirm) khỏi `KITS[]`
3. Ghi `localStorage`, đóng dialog, hiện toast xác nhận, re-render danh sách

**Lưu ý:** Xóa kit không ảnh hưởng đến các Yêu cầu mua hàng đã tạo từ kit đó.

---

### 2.3 FR-03: Tạo yêu cầu mua hàng từ School Kit

#### FR-03.1 Nạp kit vào Giỏ yêu cầu

**Mô tả:** Nhấn "+ Tạo yêu cầu mua hàng" trên card kit sẽ nạp danh sách sản phẩm của kit vào Giỏ yêu cầu và mở dialog giỏ.

**Luồng:**
1. Người dùng nhấn "+ Tạo yêu cầu mua hàng"
2. Hệ thống kiểm tra kit có `products[]` hay không:
   - **Có sản phẩm:** Duyệt từng sản phẩm trong `products[]`, tra cứu giá từ `PRODUCTS[]` theo id, cộng dồn vào `CART` (nếu sản phẩm đã có trong giỏ thì tăng số lượng, tính lại giá theo bậc)
   - **Không có sản phẩm:** Bỏ qua bước nạp sản phẩm
3. Pre-fill `cartTitle` = tên kit, `cartNote` = mô tả kit
4. Cập nhật badge giỏ hàng trên topbar
5. Hiện toast xác nhận (nếu có sản phẩm được nạp)
6. Mở dialog Giỏ yêu cầu

**Quy tắc cộng dồn:**
- Nếu sản phẩm đã tồn tại trong CART: `qty += kit.product.qty`, tính lại giá theo tier mới
- Nếu sản phẩm chưa có: thêm mới với giá theo tier tương ứng qty

#### FR-03.2 Tiếp tục trong Giỏ yêu cầu

Sau khi nạp, người dùng hoàn tất yêu cầu trong dialog Giỏ yêu cầu theo luồng chuẩn (xem tài liệu `school-shoppingList-requirements.md`).

---

### 2.4 FR-04: Lưu School Kit từ Giỏ yêu cầu

#### FR-04.1 Tùy chọn lưu kit

**Mô tả:** Trong dialog Giỏ yêu cầu, người dùng có thể tích chọn "Lưu danh sách sản phẩm thành School Kit" để tạo đồng thời cả Yêu cầu mua hàng và School Kit mới khi submit.

**Giao diện:** Checkbox trong vùng nền `var(--surface)`, kèm dòng giải thích: *"Tên kit và mô tả sẽ lấy theo tên & mô tả yêu cầu phía trên."*

**Dữ liệu Kit được tạo tự động:**

| Trường Kit | Lấy từ |
|-----------|--------|
| `name` | `cartTitle` (tên yêu cầu) |
| `desc` | `cartNote` (mô tả yêu cầu) |
| `products[]` | Danh sách sản phẩm trong CART (chỉ lưu `id`, `name`, `unit`, `qty` — không lưu giá) |
| `items` | Số mặt hàng trong CART |
| `price` | `0` (Kit không lưu giá, giá tính lại khi tạo yêu cầu thực tế) |
| `grade` | `''` (rỗng, người dùng có thể cập nhật sau qua "Xem chi tiết") |
| `students` | `0` |

#### FR-04.2 Luồng lưu đồng thời

1. Người dùng tích "Lưu thành School Kit" và nhấn "Tạo yêu cầu mua hàng"
2. Hệ thống validate các trường bắt buộc của Giỏ yêu cầu (tên, phòng ban, người tạo)
3. Tạo Kit mới và đẩy vào `KITS[]`, ghi `localStorage`, hiện toast "Đã lưu School Kit"
4. Tạo Yêu cầu mua hàng mới và đẩy vào `PRS[]`, ghi `localStorage`
5. Reset toàn bộ state Giỏ yêu cầu (CART, cartTitle, cartNote, cartDept, cartMember...)
6. Đóng dialog, hiện toast tạo PR thành công, điều hướng về màn Yêu cầu mua hàng

**Bất biến:** Kit là **snapshot** — giá và trạng thái tồn kho không được lưu vào kit; mỗi lần tạo yêu cầu từ kit sẽ tra cứu giá thực tế tại thời điểm đó.

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Render danh sách kit (tối đa ~50 kit) không gây giật lag
- Dialog chi tiết mở tức thì (< 100ms) vì dữ liệu đã có trong bộ nhớ
- Thao tác lưu/xóa cập nhật UI ngay sau khi ghi localStorage

### 3.2 NFR-02: Toàn vẹn dữ liệu

- Kit lưu sản phẩm theo `id` — nếu sản phẩm bị xóa khỏi danh mục, kit vẫn giữ nguyên tên và số lượng đã lưu
- Xóa kit là **xóa vĩnh viễn** (không có soft delete) — tuy nhiên không ảnh hưởng đến PR đã tạo
- Mỗi lần nạp kit vào giỏ: **cộng dồn** vào giỏ hiện tại, không xóa sản phẩm đang có

### 3.3 NFR-03: Nhất quán UI

- Badge "Có danh sách SP" dùng màu `bg` (xanh lá) nhất quán với các badge trạng thái khác
- Dialog chi tiết dùng cùng hệ thống modal (`openModal` / `closeModal`) với toàn ứng dụng
- Toast notification dùng cùng component `toast()` với phần còn lại

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 600px | Grid card chuyển sang 1 cột |
| ≤ 860px | Grid card chuyển sang 2 cột |
| > 860px | Grid tự co giãn `auto-fill`, tối thiểu 300px/card |

---

## 4. Mô hình dữ liệu

### 4.1 Kit Object

```javascript
{
  id: number,              // Timestamp hoặc số thứ tự
  name: string,            // Tên kit (bắt buộc, duy nhất trong danh sách)
  grade: string,           // Cấp học hoặc nhóm đối tượng (VD: 'Lớp 10', 'THCS')
  desc?: string,           // Mô tả ngắn (tùy chọn)
  items: number,           // Số mặt hàng (= products.length nếu có products)
  price: number,           // Giá tham chiếu (0 = chưa định giá)
  students: number,        // Số học sinh dự kiến (0 = không áp dụng)
  products?: KitProduct[], // Danh sách sản phẩm chi tiết (có thể không có)
}
```

### 4.2 KitProduct Object

```javascript
{
  id: number,    // ID tham chiếu đến PRODUCTS[]
  name: string,  // Tên sản phẩm (snapshot tại thời điểm lưu)
  unit: string,  // Đơn vị tính (VD: 'bộ', 'hộp', 'lốc')
  qty: number,   // Số lượng mặc định gợi ý
  // Không lưu: price, stock, status — tra cứu động khi tạo yêu cầu
}
```

### 4.3 Trạng thái Kit

Kit không có trường `status`. Trạng thái được suy luận:

```
hasProducts(kit):
  kit.products && kit.products.length > 0
  → true: hiển thị badge "Có danh sách SP", cho phép nạp đầy đủ vào giỏ
  → false: vẫn cho phép tạo yêu cầu, chỉ pre-fill tên và mô tả vào giỏ
```

### 4.4 Luồng dữ liệu

```
KITS[] (bộ nhớ)
  ↕ LS.set/get('kits', KITS)
localStorage['kits']

Khi nạp kit vào giỏ:
  kit.products[] → tra cứu PRODUCTS[id] → lấy giá tier → đẩy vào CART[]

Khi lưu kit từ giỏ:
  CART[] → lấy {id, name, unit, qty} → tạo KitProduct[] → đẩy vào KITS[]
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng tạo yêu cầu từ kit có sẵn

```
Người dùng → Tab "School Kit"
  → Xem danh sách card
  → Tìm kit phù hợp (VD: "School Kit Lớp 10 — Kết nối tri thức")
  → Click "+ Tạo yêu cầu mua hàng"
  → Hệ thống nạp 4 sản phẩm vào Giỏ yêu cầu
  → Toast: "Đã tải 4 sản phẩm từ 'School Kit Lớp 10...' vào giỏ"
  → Dialog Giỏ yêu cầu mở, tên yêu cầu được điền sẵn
  → Người dùng chọn Phòng ban, Người tạo
  → Điều chỉnh số lượng nếu cần
  → Click "Tạo yêu cầu mua hàng"
  → PR mới xuất hiện ở màn Yêu cầu mua hàng
```

### 5.2 Luồng xem và chỉnh sửa kit

```
Người dùng → Tab "School Kit"
  → Click "Xem chi tiết" trên card kit
  → Dialog mở: xem tên, cấp học, mô tả, danh sách sản phẩm
  → Chỉnh sửa tên hoặc số học sinh dự kiến
  → Click "Lưu thay đổi"
  → Toast: "Đã lưu thay đổi"
  → Card trên danh sách cập nhật ngay
```

### 5.3 Luồng lưu kit từ Giỏ yêu cầu

```
Người dùng → Tab "Danh mục mua sắm"
  → Thêm nhiều sản phẩm vào Giỏ yêu cầu
  → Mở Giỏ yêu cầu (icon giỏ trên topbar)
  → Nhập "Tên yêu cầu": "Mua VPP học kỳ II 2026"
  → Tích chọn "Lưu danh sách sản phẩm thành School Kit"
  → Chọn Phòng ban + Người tạo
  → Click "Tạo yêu cầu mua hàng"
  → Toast 1: "Đã lưu School Kit 'Mua VPP học kỳ II 2026'"
  → Toast 2: "Đã tạo PR-2026-XXX thành công"
  → Kit mới xuất hiện ở Tab "School Kit"
```

### 5.4 Luồng xóa kit

```
Người dùng → Tab "School Kit"
  → Click "Xem chi tiết" trên kit cần xóa
  → Click "Xóa Kit" (nút đỏ bên trái footer)
  → Hệ thống xóa ngay, đóng dialog
  → Toast: "Đã xóa School Kit"
  → Danh sách card cập nhật, kit biến mất
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Danh sách School Kit

```
┌─────────────────────────────────────────────────────────────────────────┐
│  School Kit — Bộ sản phẩm theo cấp học                                  │
├─────────────────────────┬─────────────────────────┬─────────────────────┤
│ School Kit Lớp 10       │ School Kit Lớp 11       │ School Kit VPP HKI  │
│ [Lớp 10][Có danh sách] │ [Lớp 11][Có danh sách] │ [Tất cả cấp]        │
│                         │                         │ [Có danh sách SP]   │
│ Bộ SP chuẩn lớp 10...  │ Bộ SP lớp 11...         │                     │
│ 4 sản phẩm · 45 hs     │ 4 sản phẩm · 42 hs      │ 3 sản phẩm · 450 hs │
│                         │                         │                     │
│ [Xem chi tiết]          │ [Xem chi tiết]          │ [Xem chi tiết]      │
│ [+ Tạo YC mua hàng]    │ [+ Tạo YC mua hàng]    │ [+ Tạo YC mua hàng] │
├─────────────────────────┴─────────────────────────┴─────────────────────┤
│ School Kit THCS (Lớp 6-9)       │ School Kit Lớp 12                     │
│ [THCS][Có danh sách SP]          │ [Lớp 12][Có danh sách SP]             │
│ 3 sản phẩm · 180 hs              │ 4 sản phẩm · 38 hs                    │
│ [Xem chi tiết] [+ Tạo YC]        │ [Xem chi tiết] [+ Tạo YC]            │
└──────────────────────────────────┴───────────────────────────────────────┘
```

### 6.2 Dialog Chi tiết School Kit

```
┌─────────────────────────────────────────────────────────────┐
│  Chi tiết School Kit                                        │
├─────────────────────────────────────────────────────────────┤
│  Tên Kit                                                    │
│  [School Kit Lớp 10 — Kết nối tri thức              ]      │
│                                                             │
│  Cấp học / Nhóm            Số học sinh dự kiến             │
│  [Lớp 10              ]    [45                   ]         │
│                                                             │
│  Mô tả                                                      │
│  [Bộ sản phẩm chuẩn cho học sinh lớp 10...        ]       │
│  [                                                 ]       │
│                                                             │
│  Danh sách sản phẩm (4)                                     │
│  ┌───────────────────────────────────────────────┐         │
│  │ Bộ SGK lớp 10 — Kết nối tri thức (14 cuốn)  45 bộ │   │
│  ├───────────────────────────────────────────────┤         │
│  │ Vở Campus 200 trang — lốc 10 quyển          15 lốc│   │
│  ├───────────────────────────────────────────────┤         │
│  │ Bút bi Thiên Long 027 (hộp 20 cây)           10 hộp│   │
│  ├───────────────────────────────────────────────┤         │
│  │ Máy tính Casio fx-580VN X                    45 cái│   │
│  └───────────────────────────────────────────────┘         │
│                                                             │
│  [Xóa Kit]                      [Đóng] [Lưu thay đổi]     │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Checkbox lưu Kit trong Giỏ yêu cầu

```
┌─────────────────────────────────────────────────────────────┐
│  ☑  Lưu danh sách sản phẩm thành School Kit                │
│     Tên kit và mô tả sẽ lấy theo tên & mô tả yêu cầu      │
│     phía trên.                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách hiển thị đúng

- [ ] Mở tab "School Kit", hiển thị toàn bộ kit dưới dạng grid card
- [ ] Card có badge "Có danh sách SP" khi kit có trường `products[]`
- [ ] Card ẩn giá khi `price = 0`, ẩn số học sinh khi `students = 0`
- [ ] Card hiển thị mô tả nếu có trường `desc`

### AC-02: Xem và chỉnh sửa chi tiết

- [ ] Nhấn "Xem chi tiết" → dialog mở với đúng thông tin của kit đó
- [ ] Dialog hiển thị danh sách sản phẩm trong vùng cuộn khi có `products[]`
- [ ] Dialog hiển thị thông báo "chưa có danh sách SP" khi không có `products[]`
- [ ] Sửa tên và nhấn "Lưu thay đổi" → toast xác nhận, card cập nhật tên mới
- [ ] Xóa tên rồi "Lưu thay đổi" → toast lỗi, không lưu

### AC-03: Xóa kit

- [ ] Nhấn "Xóa Kit" → dialog đóng ngay, toast xác nhận, kit biến khỏi danh sách
- [ ] Kit đã xóa không xuất hiện lại sau khi tải lại trang (đã xóa khỏi localStorage)

### AC-04: Tạo yêu cầu từ kit có sản phẩm

- [ ] Nhấn "+ Tạo yêu cầu mua hàng" trên kit có `products[]` → sản phẩm được nạp đúng vào CART
- [ ] Badge số lượng trên icon giỏ hàng cập nhật đúng
- [ ] Dialog Giỏ yêu cầu mở với `cartTitle` = tên kit
- [ ] Nếu giỏ đã có sản phẩm trùng: số lượng được cộng dồn, không tạo dòng trùng

### AC-05: Tạo yêu cầu từ kit không có sản phẩm

- [ ] Nhấn "+ Tạo yêu cầu mua hàng" trên kit không có `products[]` → dialog Giỏ yêu cầu mở
- [ ] `cartTitle` được điền sẵn = tên kit
- [ ] Giỏ hàng không thay đổi (không nạp sản phẩm nào)

### AC-06: Lưu kit từ Giỏ yêu cầu

- [ ] Tích checkbox "Lưu thành School Kit" → không hiện thêm field nào (tên/mô tả lấy tự động)
- [ ] Submit thành công → kit mới xuất hiện trong tab School Kit với đúng tên và danh sách SP
- [ ] Kit mới có `products[]` chứa đúng các sản phẩm trong giỏ lúc submit
- [ ] Kit mới **không** lưu giá sản phẩm trong `products[]`

### AC-07: Tính nhất quán sau submit

- [ ] Sau khi tạo yêu cầu + lưu kit: CART được xóa sạch, cartTitle reset về rỗng
- [ ] Badge giỏ hàng trên topbar về 0
- [ ] Trang chuyển về màn Yêu cầu mua hàng, PR mới xuất hiện đầu danh sách

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Sản phẩm trong kit bị xóa khỏi danh mục | Trung bình | Kit lưu `name` dạng snapshot; khi nạp vào giỏ, nếu không tìm thấy `id` trong PRODUCTS thì giá = 0, vẫn hiển thị tên |
| Trùng lặp tên kit | Thấp | Không enforce unique ở tầng dữ liệu; người dùng tự quản lý tên |
| Nạp kit nhiều lần vào cùng một giỏ | Thấp | Logic cộng dồn qty, không tạo bản sao — hành vi có chủ đích |
| Kit lưu giá cũ không còn đúng | Cao | Thiết kế: kit **không bao giờ lưu giá**; giá tra cứu động từ PRODUCTS tại thời điểm tạo yêu cầu |
| localStorage đầy (quá nhiều kit) | Thấp | Thêm giới hạn tối đa hoặc cảnh báo trong roadmap |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Chỉnh sửa sản phẩm trong Kit** | Cho phép thêm/bớt/sửa số lượng sản phẩm trực tiếp trong dialog chi tiết |
| P1 | **Tìm kiếm & lọc Kit** | Lọc theo cấp học, có/không có danh sách SP, tìm theo tên |
| P2 | **Nhân bản Kit** | Tạo bản sao từ kit hiện có để chỉnh sửa nhỏ thay vì tạo từ đầu |
| P2 | **Chia sẻ Kit** | Xuất kit dưới dạng link hoặc file để chia sẻ giữa các trường |
| P2 | **Lịch sử sử dụng Kit** | Xem danh sách các PR đã tạo từ kit này |
| P3 | **Kit theo năm học** | Gắn nhãn năm học để phân loại và lọc kit theo thời gian |
| P3 | **So sánh Kit** | Chọn 2 kit để so sánh sản phẩm và giá trị song song |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
