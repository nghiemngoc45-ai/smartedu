# Tài liệu Phân tích Yêu cầu
## Phân hệ Danh mục Mua sắm — Cổng Trường học / Tổ chức (EduMart)

**Phiên bản:** 2.1  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## Lịch sử phiên bản

| Phiên bản | Ngày | Thay đổi |
|-----------|------|----------|
| 1.0 | 20/06/2026 | Phát hành lần đầu — marketplace cơ bản, toast đơn |
| 2.0 | 20/06/2026 | Thêm Giỏ yêu cầu (FR-05); cột "Bậc giá" → "Đơn giá"; ảnh thumbnail thay icon; nút ±; `cartSubmit()` tạo PR thực tế |
| 2.1 | 20/06/2026 | Thêm tìm kiếm sản phẩm theo tên (FR-01.3); chips lọc danh mục không còn gọi `render()` toàn trang — chỉ update `#mk-tbody`; hai bộ lọc (search + danh mục) kết hợp AND |

---

## 1. Tổng quan

### 1.1 Mục đích

Màn hình Danh mục mua sắm (`view = 'marketplace'`) là cổng B2B dành cho trường học / tổ chức giáo dục để duyệt và chọn sản phẩm cần mua từ EduMart. Điểm khác biệt so với sàn C2C thông thường là hệ thống **bậc giá B2B (tier pricing)**: giá giảm dần theo số lượng đặt mua, phản ánh đúng nhu cầu mua sỉ của tổ chức. Sản phẩm được chọn thêm vào **Giỏ yêu cầu** (in-memory), sau đó người dùng điền thông tin và gửi để tạo **Yêu cầu mua hàng** chính thức lưu vào hệ thống.

### 1.2 Phạm vi

Phân hệ bao gồm bốn nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Danh sách sản phẩm** | Xem toàn bộ sản phẩm B2B có sẵn, lọc theo danh mục |
| **Tìm kiếm sản phẩm** | Ô tìm kiếm theo tên, kết hợp AND với lọc danh mục |
| **Bậc giá B2B** | Tính giá động khi nhập số lượng (hiển thị preview bên dưới input) |
| **Giỏ yêu cầu** | Tích lũy sản phẩm; xem, chỉnh sửa số lượng; xóa từng dòng |
| **Tạo Yêu cầu mua hàng** | Điền thông tin và submit để tạo PR thực tế vào hệ thống |

**Ngoài phạm vi:**
- Thanh toán trực tiếp (người dùng School không có luồng checkout — phải qua quy trình phê duyệt)
- Hiển thị bảng bậc giá inline trên từng dòng sản phẩm (đã chuyển sang preview giá động bên dưới input)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Hiệu trưởng** | Lãnh đạo tổ chức, toàn quyền trong cổng | Xem danh mục, thêm vào giỏ, tạo yêu cầu |
| **Nhân viên** | Nhân viên phòng ban được cấp quyền | Xem danh mục, thêm vào giỏ, tạo yêu cầu |

Tài liệu này áp dụng cho cả hai actor — demo account mặc định `truonghoc@demo.vn` mang quyền **Nhân viên**.

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Danh sách sản phẩm

#### FR-01.1 Hiển thị danh sách

**Mô tả:** Hệ thống hiển thị toàn bộ sản phẩm B2B có sẵn dưới dạng bảng. Mặc định hiển thị tất cả danh mục.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Sản phẩm | Ảnh thumbnail 44×44 bo góc + Tên sản phẩm | Ảnh từ picsum.photos theo seed cố định; nếu lỗi tải ảnh thì ẩn (`onerror="this.style.display='none'"`) |
| Danh mục | Badge xám (`bs`) | SGK / VPP / Thiết bị / Ebook |
| Đơn giá | Giá gốc (`product.price`) định dạng `X.XXXđ` in đậm | Tier pricing không còn hiển thị dạng bảng inline — xem FR-02 |
| Đơn vị | Đơn vị tính (bộ / hộp / lốc / ram / cái / license) | |
| Tồn kho | Badge tồn kho | Xem quy tắc bên dưới |
| Số lượng | Nút −, input nhập số lượng, nút +, nút "Thêm vào giỏ yêu cầu", preview giá | |

**Quy tắc hiển thị tồn kho:**

| Loại sản phẩm | Điều kiện | Hiển thị | Badge |
|---------------|-----------|---------|-------|
| Ebook | Luôn luôn | `Số ∞` | `bg` xanh lá |
| Không phải Ebook | `stock > 0` | `Còn [số lượng]` | `bg` xanh lá |
| Không phải Ebook | `stock = 0` | `Hết hàng` | `br` đỏ |

#### FR-01.2 Lọc theo danh mục

**Mô tả:** Dãy chip button lọc sản phẩm theo danh mục. Chỉ một danh mục được chọn tại một thời điểm.

**Tùy chọn:**

| Chip | Lọc |
|------|-----|
| Tất cả *(mặc định)* | Hiển thị toàn bộ sản phẩm |
| SGK | Chỉ Sách giáo khoa |
| VPP | Chỉ Văn phòng phẩm |
| Thiết bị | Chỉ Thiết bị giáo dục |
| Ebook | Chỉ Sách điện tử / License |

**Quy tắc:**
- Chip đang chọn có class `on` (nền `--ink`, chữ trắng); cập nhật qua `data-c` attribute mà không re-render toàn trang
- Chip không chọn có border và chữ màu thường, hover nổi viền xanh
- Khi đổi chip, bảng sản phẩm cập nhật ngay lập tức (chỉ update `#mk-tbody`, không reload toàn bộ view)
- Lọc danh mục kết hợp AND với tìm kiếm từ khóa (FR-01.3): ví dụ chip "SGK" + search "12" → chỉ hiện SGK lớp 12

---

#### FR-01.3 Tìm kiếm theo tên sản phẩm

**Mô tả:** Ô tìm kiếm theo tên sản phẩm, đặt trên bảng danh sách, cùng hàng với các chip lọc danh mục.

**Vị trí:** Hàng filter — bên trái chips danh mục; input có icon kính lúp.

**Hành vi:**

| Hành vi | Chi tiết |
|---------|---------|
| Trigger | `oninput` — lọc tức thì khi gõ, không cần nhấn Enter |
| Thuật toán | Substring case-insensitive trên `product.name` |
| Kết hợp với chip | AND logic: sản phẩm phải khớp cả tên lẫn danh mục đang chọn |
| Không có kết quả | Hiển thị dòng `"Không tìm thấy sản phẩm phù hợp."` thay cho bảng |
| Giữ focus | Input không mất focus khi lọc (chỉ update `#mk-tbody`, không re-render toàn trang) |
| Khôi phục state | Giá trị search (`mkQ`) và danh mục (`mkCat`) được giữ nguyên nếu view bị re-render do thao tác khác |

**State:**
- `mkQ: string` — từ khóa tìm kiếm hiện tại (mặc định `''`)
- `mkCat: string` — danh mục đang lọc (mặc định `'all'`)
- Hàm `mkFiltered()` kết hợp cả hai điều kiện và trả về mảng sản phẩm
- Hàm `filterMarketplace()` đọc input, cập nhật `mkQ`, gọi `mkFiltered()`, render lại `#mk-tbody` và đồng bộ trạng thái chip

---

### 2.2 FR-02: Bậc giá B2B (Tier Pricing)

#### FR-02.1 Cấu trúc dữ liệu bậc giá

**Mô tả:** Mỗi sản phẩm có tối đa 3 mức giá giảm dần theo số lượng đặt mua, lưu trong mảng `tiers`. **Bảng bậc giá không còn hiển thị inline trên từng dòng sản phẩm**; thay vào đó, tier logic được dùng trong (a) preview giá động bên dưới ô input và (b) tính giá khi thêm/cập nhật giỏ.

**Cấu trúc một bậc giá:**

| Thành phần | Nội dung |
|------------|---------|
| `min` | Số lượng tối thiểu để áp dụng bậc giá |
| `max?` | Số lượng tối đa; `undefined` = không giới hạn trên (bậc cuối) |
| `price` | Giá áp dụng (VNĐ/đơn vị) |

#### FR-02.2 Tính giá động theo số lượng nhập

**Mô tả:** Khi người dùng nhập số lượng vào ô input, hệ thống tính và hiển thị giá áp dụng ngay bên dưới input.

**Quy tắc tính giá (`getTierPrice`):**
- Duyệt danh sách `tiers` của sản phẩm
- Tìm bậc có `qty >= tier.min` AND (`tier.max === undefined` OR `qty <= tier.max`)
- Trả về `tier.price` của bậc khớp; nếu không tìm thấy → trả về `product.price` (giá gốc)

**Hiển thị giá preview (`updateMkPrice`):**
- Nội dung: `"Bạn được mua với giá [giá]đ/[đơn vị]"`
- **Màu xanh lá** (`var(--green)`) nếu giá tính được thấp hơn `tiers[0].price` (bậc giá đầu = giá gốc)
- **Màu xám** (`var(--text-soft)`) nếu giá bằng giá gốc (không được chiết khấu)
- Preview **ẩn đi** khi ô input rỗng hoặc số lượng < 1

**Sự kiện kích hoạt:** `oninput` trên ô nhập số lượng → gọi `updateMkPrice(id, qty)`

---

### 2.3 FR-03: Nhập số lượng

**Mô tả:** Mỗi dòng sản phẩm có một tổ hợp điều khiển số lượng: nút **−**, ô input, nút **+**, và nút "Thêm vào giỏ yêu cầu".

**Thuộc tính input:**

| Thuộc tính | Giá trị | Ghi chú |
|------------|---------|---------|
| Giá trị mặc định | `1` | |
| Giá trị tối thiểu (`min`) | `1` | |
| Giá trị tối đa (`max`) | `stock` (sản phẩm thông thường) | Ngăn đặt hàng vượt tồn kho |
| Giá trị tối đa (`max`) | `9999` (Ebook) | Ebook không giới hạn tồn kho |
| Kiểu | `number` | Chỉ nhận số nguyên dương |

**Nút bước (stepQty):**
- Nút **−** gọi `stepQty(id, -1)`: giảm 1, tối thiểu là 1
- Nút **+** gọi `stepQty(id, +1)`: tăng 1, tối đa là `max` (stock hoặc 9999)
- Sau khi bước, tự động gọi `updateMkPrice` để cập nhật preview giá

---

### 2.4 FR-04: Thêm vào Giỏ yêu cầu

**Mô tả:** Nút "+ Thêm vào giỏ yêu cầu" thêm sản phẩm (kèm số lượng và giá tier tương ứng) vào CART in-memory.

**Luồng `addToCart(id)`:**
1. Lấy số lượng từ `qty_[id]` input: `qty = max(1, parseInt(input.value) || 1)`
2. Tính giá tier: `price = getTierPrice(product, qty)`
3. **Nếu sản phẩm chưa có trong CART:** thêm mới `{id, name, unit, qty, price}` → toast: `"Đã thêm "[tên]" (x[qty]) vào giỏ yêu cầu"`
4. **Nếu sản phẩm đã có trong CART:** cộng dồn qty, tính lại price theo qty mới → toast: `"Đã cập nhật giỏ: "[tên]" — tổng [qty mới] [unit]"`
5. Gọi `updateCartBadge()` để cập nhật badge số lượng trên topbar

**Cart badge (topbar):**
- Icon giỏ hàng trên topbar (cạnh icon thông báo)
- Badge `cartBadge`: nền đỏ cam (`var(--coral)`), hiển thị tổng số lượng (không phải số mặt hàng)
- Ẩn khi giỏ trống; hiển thị `flex` khi có ít nhất 1 sản phẩm

---

### 2.5 FR-05: Giỏ yêu cầu (Request Cart)

**Mô tả:** Modal quản lý giỏ yêu cầu, mở bằng cách click icon giỏ hàng trên topbar (`openCart()`). Người dùng xem lại danh sách, điều chỉnh số lượng, xóa mặt hàng, điền thông tin và tạo yêu cầu mua hàng.

#### FR-05.1 Danh sách sản phẩm trong giỏ

**Bảng sản phẩm:**

| Cột | Nội dung |
|-----|---------|
| Ảnh | Thumbnail 40×40 (picsum theo seed cố định) |
| Sản phẩm | Tên + Mã SP (`SP001`, `SP002`, ...) |
| Đơn giá | Giá tier hiện tại (VNĐ/đơn vị), ví dụ `270.000đ/bộ` |
| Số lượng | Nút −, input, nút + (gọi `stepCartQty` / `cartUpdateQty`) |
| Thành tiền | `price × qty`, cập nhật tức thì khi đổi số lượng |
| Xóa | Nút ✕ gọi `cartDeleteItem(id)` |

**Hành vi khi xóa hết sản phẩm:** bảng hiển thị dòng "Giỏ trống — [tiếp tục mua sắm]" (link đóng modal và chuyển về marketplace).

#### FR-05.2 Form thông tin yêu cầu

| Trường | Bắt buộc | Ghi chú |
|--------|----------|---------|
| Tên yêu cầu | ✓ | Placeholder: `VD: Mua SGK học kỳ 2 năm 2026` |
| Phòng ban | ✓ | Dropdown từ `DEPTS`; khi đổi phòng ban → reset và load lại danh sách nhân viên |
| Người tạo | ✓ | Dropdown thành viên active của phòng ban đã chọn; disabled khi chưa chọn phòng ban |
| Ngày cần hàng | ✗ | Date picker |
| Mô tả yêu cầu | ✗ | Input text ngắn |

#### FR-05.3 Tùy chọn lưu School Kit

- Checkbox "Lưu danh sách sản phẩm thành **School Kit**"
- Khi checked và submit: tạo thêm 1 Kit mới trong `KITS` với tên và mô tả lấy từ form yêu cầu; lưu `KITS` vào localStorage
- Khi unchecked: bỏ qua; không ảnh hưởng đến việc tạo PR

#### FR-05.4 Tóm tắt giỏ (Summary)

Panel hiển thị phía dưới bảng sản phẩm:

| Chỉ số | Mô tả |
|--------|-------|
| Mặt hàng | Số loại sản phẩm khác nhau trong giỏ (`CART.length`) |
| Số lượng | Tổng số lượng tất cả mặt hàng (`Σ qty`) |
| Tổng giá trị dự kiến | `Σ (price × qty)`, cập nhật tức thì khi đổi số lượng bất kỳ |

#### FR-05.5 Submit — Tạo yêu cầu mua hàng (`cartSubmit`)

**Validation trước khi submit:**
1. Tên yêu cầu không được rỗng
2. Phòng ban phải được chọn
3. Người tạo phải được chọn
4. CART không được rỗng

**Xử lý khi submit thành công:**
1. (Nếu `cartSaveKit`) Tạo kit mới trong `KITS`, lưu localStorage
2. Tính `total = Σ (price × qty)`, `totalQty = Σ qty`
3. Sinh ID yêu cầu: `PR-2026-0{PRS.length + 1 + 49}` (ví dụ: `PR-2026-050`)
4. Tạo đối tượng PR:
   ```javascript
   {
     id,
     title: cartTitle,
     dept: cartDept,
     by: cartMember,
     date: new Date().toLocaleDateString('vi-VN'),
     total,
     status: 'pending',
     items: CART.length,
     lvl: total > 50_000_000 ? 2 : 1,   // 1 = duyệt 1 cấp, 2 = duyệt 2 cấp
     price: Math.round(total / totalQty) // giá trung bình/đơn vị
   }
   ```
5. `PRS.unshift(PR)` → lưu `PRS` vào localStorage
6. Xóa toàn bộ CART; reset form (title, dept, member, needDate, note, saveKit)
7. Cập nhật badge → ẩn badge
8. Đóng modal
9. Toast: `"Đã tạo [id] thành công · [total]đ"`
10. Chuyển sang tab "Yêu cầu mua hàng" (`nav('purchase', null)`)

**Luồng `cartSaveDraft`** (nếu có): Chỉ hiển thị toast xác nhận; không thực sự lưu vào hệ thống (mock).

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Lọc danh mục phải phản hồi trong < 100ms (xử lý client-side trên mảng in-memory)
- Tính giá động (`updateMkPrice`) phải cập nhật hiển thị trong < 50ms sau khi người dùng gõ
- Cập nhật `cartUpdateQty` (thành tiền + summary) phải tức thì (synchronous DOM update)
- Render bảng 11 sản phẩm không gây giật lag

### 3.2 NFR-02: Bảo mật

- **Phân quyền truy cập:** Chỉ `user.role === 'school'` mới được render nội dung; mọi trường hợp khác chuyển hướng về `./`
- **Số lượng đặt hàng:** Validate `max` theo `stock` ở tầng input HTML để ngăn đặt vượt tồn kho; cần kiểm tra lại ở tầng backend khi tích hợp API

### 3.3 NFR-03: Trải nghiệm B2B

- Preview giá dưới input hiển thị ngay khi gõ — người dùng biết ngay mức chiết khấu đạt được mà không cần mở popup
- Màu xanh lá trên preview giá giúp nhận biết ngay khi đạt ngưỡng chiết khấu
- Giỏ yêu cầu persistent trong session: người dùng có thể tiếp tục duyệt, lọc theo danh mục và thêm nhiều sản phẩm trước khi submit
- Tổng giá trị trong summary panel giúp ước lượng ngân sách trước khi gửi yêu cầu

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 960px | Sidebar ẩn; bảng có thể scroll ngang (`overflow-x: auto` từ `.tb-panel`) |
| > 960px | Bảng full width |

### 3.5 NFR-05: Nhất quán UI

- Badge danh mục dùng class `bs` (xám) nhất quán với badge danh mục trên toàn hệ thống
- Toast notification dùng chung hàm `toast()` với toàn cổng Trường học
- Style ô nhập số lượng (class `qty-input`) và nút bước (class `qty-step`) nhất quán với cart dialog và các ô input khác trong hệ thống
- Cart modal dùng class `modal-xl` — rộng hơn modal thường để chứa bảng sản phẩm

---

## 4. Mô hình dữ liệu

### 4.1 Sản phẩm (Product)

```javascript
{
  id:    number,         // ID duy nhất của sản phẩm
  name:  string,         // Tên sản phẩm đầy đủ
  cat:   string,         // Danh mục: 'SGK' | 'VPP' | 'Thiết bị' | 'Ebook'
  price: number,         // Giá gốc (VNĐ) = tiers[0].price — dùng khi không tìm được bậc giá
  unit:  string,         // Đơn vị tính: 'bộ' | 'hộp' | 'lốc' | 'ram' | 'cái' | 'license'
  stock: number,         // Số lượng tồn kho; 9999 biểu thị "không giới hạn" (Ebook)
  tiers: PriceTier[],   // Danh sách bậc giá B2B
}
```

### 4.2 Bậc giá (PriceTier)

```javascript
{
  min:    number,           // Số lượng tối thiểu để áp dụng bậc giá này
  max?:   number,           // Số lượng tối đa; undefined = không giới hạn trên
  price:  number,           // Giá áp dụng (VNĐ/đơn vị) khi số lượng trong khoảng [min, max]
}
```

**Quy ước:**
- Các bậc sắp xếp theo `min` tăng dần
- Bậc cuối cùng không có `max` (áp dụng cho mọi số lượng từ `min` trở lên)
- Mỗi sản phẩm có đúng 3 bậc giá trong dữ liệu hiện tại
- `product.price === tiers[0].price` (giá gốc = bậc giá thấp nhất)

### 4.3 Cart Item

```javascript
{
  id:    number,   // ID sản phẩm
  name:  string,   // Tên sản phẩm
  unit:  string,   // Đơn vị tính
  qty:   number,   // Số lượng hiện tại trong giỏ
  price: number,   // Giá tier áp dụng tại qty hiện tại (cập nhật khi qty thay đổi)
}
```

**Lưu ý:** `CART` là mảng in-memory (`let CART = []`); không lưu vào localStorage. Reset khi `cartSubmit()` thành công hoặc reload trang.

### 4.4 Purchase Request (PR)

```javascript
{
  id:     string,  // 'PR-2026-0{n}', ví dụ 'PR-2026-050'
  title:  string,  // Tên yêu cầu
  dept:   string,  // Phòng ban
  by:     string,  // Tên người tạo
  date:   string,  // Ngày tạo định dạng 'vi-VN', ví dụ '20/06/2026'
  total:  number,  // Tổng giá trị (VNĐ)
  status: string,  // 'pending' khi mới tạo
  items:  number,  // Số mặt hàng (CART.length)
  lvl:    number,  // Cấp duyệt: 1 nếu total ≤ 50tr, 2 nếu > 50tr
  price:  number,  // Giá trung bình/đơn vị = round(total / totalQty)
}
```

**Persistence:** `PRS` lưu vào `localStorage` key `'school_prs'` sau mỗi lần tạo PR.

### 4.5 Danh sách sản phẩm mẫu (PRODUCTS)

| ID | Tên sản phẩm | Danh mục | Đơn vị | Tồn kho | Giá gốc |
|----|-------------|----------|--------|---------|---------|
| 1 | Bộ SGK lớp 10 — Kết nối tri thức (14 cuốn) | SGK | bộ | 500 | 285.000đ |
| 2 | Bộ SGK lớp 11 — Chân trời sáng tạo (13 cuốn) | SGK | bộ | 380 | 268.000đ |
| 3 | Bộ SGK lớp 12 — Kết nối tri thức (12 cuốn) | SGK | bộ | 290 | 254.000đ |
| 4 | Bút bi Thiên Long 027 (hộp 20 cây) | VPP | hộp | 2.000 | 48.000đ |
| 5 | Vở Campus 200 trang — lốc 10 quyển | VPP | lốc | 1.500 | 102.000đ |
| 6 | Giấy A4 IK Plus (500 tờ/ram) | VPP | ram | 800 | 85.000đ |
| 7 | Máy chiếu Epson EB-S41 3300 lumen | Thiết bị | cái | 20 | 8.500.000đ |
| 8 | Bảng tương tác thông minh 75" 4K | Thiết bị | cái | 8 | 24.500.000đ |
| 9 | Máy tính Casio fx-580VN X | Thiết bị | cái | 200 | 490.000đ |
| 10 | Toán nâng cao lớp 12 (license/năm) | Ebook | license | ∞ | 180.000đ |
| 11 | Tiếng Anh B1-B2 Cambridge (license/năm) | Ebook | license | ∞ | 320.000đ |

### 4.6 Bảng bậc giá chi tiết

**SGK (theo bộ):**

| Sản phẩm | 1–9 bộ | 10–49 bộ | 50+ bộ |
|----------|--------|----------|--------|
| SGK lớp 10 | 285.000đ | 270.000đ | 255.000đ |
| SGK lớp 11 | 268.000đ | 254.000đ | 240.000đ |
| SGK lớp 12 | 254.000đ | 240.000đ | 228.000đ |

**VPP:**

| Sản phẩm | 1–99 | 100–499 | 500+ |
|----------|------|---------|------|
| Bút bi Thiên Long 027 | 48.000đ/hộp | 45.000đ/hộp | 42.000đ/hộp |
| Vở Campus 200 trang | 102.000đ/lốc | 96.000đ/lốc | 90.000đ/lốc |
| Giấy A4 IK Plus | 85.000đ/ram | 80.000đ/ram | 75.000đ/ram |

**Thiết bị:**

| Sản phẩm | Mức 1 | Mức 2 | Mức 3 |
|----------|-------|-------|-------|
| Máy chiếu Epson | 1–4 cái: 8.500.000đ | 5–9 cái: 8.200.000đ | 10+ cái: 7.800.000đ |
| Bảng tương tác 75" | 1–2 cái: 24.500.000đ | 3–5 cái: 23.500.000đ | 6+ cái: 22.000.000đ |
| Máy tính Casio | 1–49 cái: 490.000đ | 50–199 cái: 470.000đ | 200+ cái: 450.000đ |

**Ebook (theo license/năm):**

| Sản phẩm | 1–29 license | 30–99 license | 100+ license |
|----------|-------------|---------------|-------------|
| Toán nâng cao lớp 12 | 180.000đ | 165.000đ | 150.000đ |
| Tiếng Anh B1-B2 Cambridge | 320.000đ | 295.000đ | 270.000đ |

### 4.7 Hàm tính giá

```javascript
// Trả về giá áp dụng cho sản phẩm p với số lượng qty
function getTierPrice(product, qty) {
  if (!product.tiers || !product.tiers.length) return product.price;
  const tier = product.tiers.find(t =>
    qty >= t.min && (t.max === undefined || qty <= t.max)
  );
  return tier ? tier.price : product.price;
}

// Cập nhật preview giá dưới ô input của sản phẩm id
function updateMkPrice(id, qty) {
  const p = PRODUCTS.find(x => x.id === id);
  const el = document.getElementById('mkprice_' + id);
  if (!p || !el) return;
  if (!qty || qty < 1) { el.textContent = ''; return; }
  const price = getTierPrice(p, qty);
  el.textContent = `Bạn được mua với giá ${price.toLocaleString('vi-VN')}đ/${p.unit}`;
  el.style.color = price < p.tiers[0].price ? 'var(--green)' : 'var(--text-soft)';
}
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng duyệt và thêm SGK vào giỏ yêu cầu

```
Người dùng → Tab "Danh mục mua sắm" (sidebar)
  → Bảng sản phẩm hiển thị tất cả 11 sản phẩm, cột Đơn giá = giá gốc
  → Click chip "SGK" → bảng lọc còn 3 sản phẩm SGK
  → Nhấn nút [+] nhiều lần hoặc gõ trực tiếp số lượng: 50
  → Preview giá hiển thị màu xanh lá: "Bạn được mua với giá 255.000đ/bộ"
  → Click "+ Thêm vào giỏ yêu cầu"
  → Toast: "Đã thêm "Bộ SGK lớp 10..." (x50) vào giỏ yêu cầu"
  → Badge trên topbar hiển thị: 50
```

### 5.2 Luồng tích lũy nhiều sản phẩm và tạo yêu cầu

```
Người dùng → Thêm SGK lớp 10 (x50) → Badge: 50
  → Thêm thêm Vở Campus (x100) → Badge: 150
  → Click icon giỏ hàng trên topbar → Mở modal "Giỏ yêu cầu"
  → Xem bảng: 2 sản phẩm, tổng giá trị dự kiến
  → Điều chỉnh qty Vở Campus → 80 (thành tiền tự cập nhật)
  → Điền Tên yêu cầu: "Mua VPP + SGK học kỳ 2"
  → Chọn Phòng ban → Chọn Người tạo
  → Click "Tạo yêu cầu mua hàng"
  → Toast: "Đã tạo PR-2026-050 thành công · 21.465.000đ"
  → Chuyển sang tab "Yêu cầu mua hàng"
```

### 5.3 Luồng cập nhật giỏ khi thêm sản phẩm đã có

```
Người dùng → Thêm SGK lớp 10 (x20) → Toast: "Đã thêm... (x20) vào giỏ yêu cầu"
  → Quay lại marketplace, nhập qty = 30 cho SGK lớp 10
  → Click "+ Thêm vào giỏ yêu cầu"
  → Toast: "Đã cập nhật giỏ: "Bộ SGK lớp 10..." — tổng 50 bộ"
  → Giá trong giỏ cập nhật theo bậc 50+ (255.000đ/bộ)
```

### 5.4 Luồng đặt license Ebook

```
Người dùng → Click chip "Ebook"
  → Xem tồn kho: badge "Số ∞" (không giới hạn)
  → Nhập số lượng: 100
  → Preview giá: "Bạn được mua với giá 150.000đ/license" (màu xanh lá)
  → Click "+ Thêm vào giỏ yêu cầu"
  → Toast: "Đã thêm "Toán nâng cao lớp 12..." (x100) vào giỏ yêu cầu"
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình Danh mục mua sắm — Tất cả sản phẩm

```
← Topbar: "Danh mục mua sắm"            [🛒 50] [🔔]
┌─────────────────────────────────────────────────────────────────────────┐
│  Danh mục sản phẩm                                                       │
├─────────────────────────────────────────────────────────────────────────┤
│  [🔍 Tìm tên sản phẩm...          ]  [Tất cả] [SGK] [VPP] [Thiết bị] [Ebook] │
├──────────────────────┬──────────┬────────────┬──────┬──────────┬────────────────────────────┤
│ SẢN PHẨM             │ DANH MỤC │ ĐƠN GIÁ   │ ĐV   │ TỒN KHO  │ SỐ LƯỢNG                   │
├──────────────────────┼──────────┼────────────┼──────┼──────────┼────────────────────────────┤
│ [img] Bộ SGK lớp 10  │ [SGK]    │ 285.000đ  │ bộ   │ Còn 500  │ [−][  50  ][+]              │
│       Kết nối tri    │          │           │      │          │ Bạn mua với giá 255.000đ/bộ │
│       thức (14 c.)   │          │           │      │          │ [+ Thêm vào giỏ yêu cầu]   │
├──────────────────────┼──────────┼────────────┼──────┼──────────┼────────────────────────────┤
│ [img] Bút bi TL 027  │ [VPP]    │  48.000đ  │ hộp  │ Còn 2000 │ [−][   1  ][+]              │
│       hộp 20 cây     │          │           │      │          │                             │
│                      │          │           │      │          │ [+ Thêm vào giỏ yêu cầu]   │
└──────────────────────┴──────────┴────────────┴──────┴──────────┴────────────────────────────┘

Khi tìm kiếm "lớp 12" + chip "SGK":
┌─────────────────────────────────────────────────────────────────────────┐
│  [🔍 lớp 12                        ]  [Tất cả] [SGK*] [VPP] [Thiết bị] [Ebook] │
├──────────────────────┬──────────┬────────────┬──────┬──────────┬────────────────────────────┤
│ [img] Bộ SGK lớp 12  │ [SGK]    │ 254.000đ  │ bộ   │ Còn 290  │ [−][  1  ][+]               │
│       Kết nối tri    │          │           │      │          │ [+ Thêm vào giỏ yêu cầu]   │
└──────────────────────┴──────────┴────────────┴──────┴──────────┴────────────────────────────┘
```

### 6.2 Modal Giỏ yêu cầu

```
┌──────────────────────────────────────────────────────────────┐
│  Giỏ yêu cầu (2 sản phẩm)                                ×   │
├──────────────────────────────────────────────────────────────┤
│  Tên yêu cầu *  [Mua SGK học kỳ 2 năm 2026              ]   │
│  Phòng ban *    [— Chọn phòng ban —            ▾]            │
│  Người tạo *    [— Chọn nhân viên —            ▾] (disabled) │
│  Ngày cần hàng  [          ]   Mô tả [               ]      │
│  ☐ Lưu danh sách sản phẩm thành School Kit                   │
├────┬──────────────────┬────────────┬────────┬──────────┬───┤
│img │ Sản phẩm / Mã    │ Đơn giá    │ Số lượng│ Thành tiền│ × │
├────┼──────────────────┼────────────┼────────┼──────────┼───┤
│[p] │ Bộ SGK lớp 10    │255.000đ/bộ │[−][50][+]│12.750.000│ ✕ │
│    │ SP001            │            │        │          │   │
├────┼──────────────────┼────────────┼────────┼──────────┼───┤
│[p] │ Vở Campus 200 tr │ 96.000đ/lốc│[−][80][+]│ 7.680.000│ ✕ │
│    │ SP005            │            │        │          │   │
└────┴──────────────────┴────────────┴────────┴──────────┴───┘
│  Mặt hàng: 2   Số lượng: 130   Tổng giá trị: 20.430.000đ   │
│                    [Tiếp tục mua sắm] [Tạo yêu cầu mua hàng]│
└──────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Danh sách sản phẩm hiển thị đúng

- [ ] Mở tab "Danh mục mua sắm", bảng hiển thị đủ 11 sản phẩm (chip mặc định: Tất cả)
- [ ] Mỗi dòng có ảnh thumbnail 44×44, tên sản phẩm, badge danh mục xám, đơn giá gốc
- [ ] Ebook hiển thị badge "Số ∞" (xanh lá); sản phẩm thường hiển thị "Còn [stock]"
- [ ] Mỗi dòng có nút −, input số lượng, nút +, nút "+ Thêm vào giỏ yêu cầu"

### AC-02: Lọc danh mục hoạt động

- [ ] Click "SGK" → chỉ hiển thị 3 sản phẩm SGK; chip "SGK" có nền đậm (class `on`)
- [ ] Click "VPP" → chỉ hiển thị 3 sản phẩm VPP
- [ ] Click "Thiết bị" → chỉ hiển thị 3 sản phẩm thiết bị
- [ ] Click "Ebook" → chỉ hiển thị 2 sản phẩm ebook; cả hai có tồn kho "Số ∞"
- [ ] Click "Tất cả" → hiển thị lại toàn bộ 11 sản phẩm

### AC-03: Tính giá động theo số lượng

- [ ] Nhập số lượng `50` cho SGK lớp 10 → preview hiển thị "Bạn được mua với giá 255.000đ/bộ" màu xanh lá
- [ ] Nhập số lượng `1` cho SGK lớp 10 → preview hiển thị "Bạn được mua với giá 285.000đ/bộ" màu xám (giá gốc)
- [ ] Xóa trắng ô input → preview ẩn đi
- [ ] Preview cập nhật ngay khi gõ, không cần nhấn Enter

### AC-04: Ngưỡng chiết khấu chính xác

- [ ] SGK lớp 10: nhập 9 → giá 285.000đ (xám); nhập 10 → giá 270.000đ (xanh lá)
- [ ] Máy chiếu Epson: nhập 4 → giá 8.500.000đ (xám); nhập 5 → giá 8.200.000đ (xanh lá)
- [ ] Toán NC lớp 12: nhập 99 → giá 165.000đ; nhập 100 → giá 150.000đ (xanh lá)

### AC-05: Nút step (−/+)

- [ ] Nhấn [+] → số lượng tăng 1; không vượt quá `stock` (hoặc 9999 cho Ebook)
- [ ] Nhấn [−] → số lượng giảm 1; không xuống dưới 1
- [ ] Preview giá cập nhật ngay sau khi nhấn bước

### AC-06: Giới hạn số lượng theo tồn kho

- [ ] Ô input của Ebook có `max="9999"` (không bị giới hạn ở mức thấp)
- [ ] Ô input của Bảng tương tác (stock=8) có `max="8"` — không thể nhập > 8

### AC-07: Thêm vào Giỏ yêu cầu

- [ ] Nhập qty=50 cho SGK lớp 10 → click "+ Thêm vào giỏ yêu cầu" → toast: `"Đã thêm "Bộ SGK lớp 10..." (x50) vào giỏ yêu cầu"`
- [ ] Badge topbar hiển thị `50` (tổng qty, không phải số mặt hàng)
- [ ] Thêm lại cùng sản phẩm qty=20 → toast: `"Đã cập nhật giỏ: "Bộ SGK lớp 10..." — tổng 70 bộ"` + giá tự cập nhật

### AC-08: Giỏ yêu cầu (modal)

- [ ] Click icon giỏ hàng trên topbar → modal "Giỏ yêu cầu" mở (modal-xl)
- [ ] Bảng hiển thị đúng sản phẩm, đơn giá tier, qty, thành tiền
- [ ] Đổi qty trong modal → thành tiền + summary cập nhật tức thì
- [ ] Xóa sản phẩm (✕) → dòng biến mất, summary cập nhật
- [ ] Summary hiển thị đúng: số mặt hàng, tổng qty, tổng giá trị

### AC-09: Tạo yêu cầu mua hàng

- [ ] Submit thiếu Tên yêu cầu → toast cảnh báo, không submit
- [ ] Submit thiếu Phòng ban hoặc Người tạo → toast cảnh báo
- [ ] Submit đúng → PR mới xuất hiện trong tab "Yêu cầu mua hàng" với status "pending"
- [ ] CART trống sau khi submit; badge ẩn
- [ ] Toast: `"Đã tạo PR-2026-0XX thành công · [total]đ"`

### AC-10: Lưu School Kit

- [ ] Check "Lưu thành School Kit" + submit → kit mới xuất hiện trong tab "School Kit" với tên lấy từ form
- [ ] Uncheck → không tạo kit, chỉ tạo PR bình thường

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Trạng thái | Giải pháp |
|--------|--------|-----------|-----------|
| "Thêm vào yêu cầu" chỉ hiển thị toast, không thực sự tạo yêu cầu mua hàng | Cao | ✅ **Đã giải quyết** | Giỏ yêu cầu (CART) + form + `cartSubmit()` → tạo PR thực tế vào `PRS`, lưu localStorage |
| Không có tìm kiếm sản phẩm theo từ khóa trên marketplace | Trung bình | ✅ **Đã giải quyết** | Thêm FR-01.3: ô tìm kiếm `mkQ` kết hợp AND với `mkCat`; chỉ update `#mk-tbody`, không re-render toàn trang |
| Tồn kho là dữ liệu mock tĩnh, không cập nhật khi đặt hàng | Trung bình | Còn tồn tại | Khi có backend: trừ tồn kho sau khi đơn hàng được xác nhận; hiển thị real-time qua API |
| Người dùng có thể nhập số lượng < 1 bằng cách gõ tay | Thấp | Còn tồn tại | `addToCart` đã xử lý `|| 1` fallback; cần validate `min="1"` ở HTML và kiểm tra lại khi submit |
| CART mất khi reload trang (in-memory, không lưu sessionStorage) | Thấp | Còn tồn tại | Thêm lưu CART vào `sessionStorage`; khôi phục khi init |
| Danh sách sản phẩm cố định (hardcode) | Thấp | Còn tồn tại | Tách `PRODUCTS` thành API call; giữ nguyên cấu trúc hàm `marketplace()` để dễ tích hợp |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Trạng thái | Mô tả |
|---------|-----------|-----------|-------|
| P1 | **Tích hợp tạo Yêu cầu mua hàng** | ✅ Hoàn thành | `cartSubmit()` tạo PR thực tế vào `PRS`, lưu localStorage, điều hướng sang tab Purchase |
| P1 | **Tìm kiếm sản phẩm trên marketplace** | ✅ Hoàn thành | Ô tìm kiếm `mkQ` theo tên, kết hợp AND với chip lọc danh mục `mkCat`; update partial `#mk-tbody` — xem FR-01.3 |
| P2 | **Lưu CART qua sessionStorage** | Chưa làm | Khôi phục giỏ sau reload; tránh mất hàng khi tab bị refresh |
| P2 | **Tồn kho real-time** | Chưa làm | Kết nối API, cập nhật badge tồn kho sau mỗi lần đặt hàng thành công |
| P2 | **Lọc nhiều danh mục** | Chưa làm | Cho phép chọn đồng thời nhiều chip danh mục (multi-select) |
| P2 | **Sắp xếp sản phẩm** | Chưa làm | Sắp xếp theo: giá tăng dần / giảm dần, tên A-Z, tồn kho nhiều nhất |
| P3 | **Hiển thị bậc giá inline** | Không ưu tiên | Hiện đã bỏ cột Bậc giá; nếu cần phục hồi — dùng tooltip hoặc expandable row |
| P3 | **Trang chi tiết sản phẩm** | Chưa làm | Xem ảnh thực, mô tả đầy đủ, thông số kỹ thuật trước khi thêm vào yêu cầu |
| P3 | **So sánh sản phẩm** | Chưa làm | Chọn 2–3 sản phẩm cùng danh mục để so sánh giá và thông số cạnh nhau |
| P3 | **Danh sách yêu thích** | Chưa làm | Ghim sản phẩm mua thường xuyên để truy cập nhanh |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 2.1. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
