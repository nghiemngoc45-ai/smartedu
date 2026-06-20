# Tài liệu Phân tích Yêu cầu
## Phân hệ Thành viên & Phòng ban — Cổng Trường học / Tổ chức (EduMart)

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Màn hình Thành viên & Phòng ban (`view = 'members'`) là trung tâm quản lý nguồn nhân lực nội bộ của trường học / tổ chức giáo dục trên nền tảng EduMart B2B. Màn hình cung cấp hai nhóm chức năng được tổ chức theo tab: quản lý danh sách thành viên (nhân sự trong tổ chức được cấp quyền trên cổng) và quản lý cơ cấu phòng ban (đơn vị tổ chức kèm ngân sách). Đây là nền tảng cho phân quyền mua sắm: mỗi yêu cầu mua hàng gắn với một phòng ban, mỗi thành viên được phân vai trò xác định mức độ tham gia vào quy trình mua sắm.

### 1.2 Phạm vi

Màn hình bao gồm hai nhóm chức năng chính, phân chia theo tab:

| Nhóm | Tab | Mô tả |
|------|-----|-------|
| **Quản lý Thành viên** | Thành viên | Xem, tìm kiếm, lọc, thêm, sửa, xóa thành viên |
| **Quản lý Phòng ban** | Phòng ban | Xem, tìm kiếm, thêm, sửa, xóa phòng ban kèm theo dõi ngân sách |

**Ngoài phạm vi:**
- Phân quyền mua sắm chi tiết theo từng thành viên (thuộc module Yêu cầu mua hàng)
- Theo dõi lịch sử hoạt động mua sắm theo phòng ban (thuộc module Báo cáo)
- Import thành viên hàng loạt từ file Excel / CSV (chưa triển khai)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Hiệu trưởng** | Người đại diện pháp lý, toàn quyền trong cổng | Toàn bộ tính năng |
| **Nhân viên** | Nhân viên phòng ban được cấp quyền trên cổng | Toàn bộ tính năng |

Tài liệu này áp dụng cho cả hai actor — demo account mặc định `truonghoc@demo.vn` mang quyền **Nhân viên**.

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Tab Thành viên

#### FR-01.1 Hiển thị danh sách thành viên

**Mô tả:** Hệ thống hiển thị toàn bộ thành viên đã đăng ký trong tổ chức dưới dạng bảng.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Thành viên | Avatar (2 chữ cái đầu cuối tên), Họ tên, Email | Avatar nền `--ink` (#1f4773), chữ trắng |
| Giới tính | Badge màu (Nam / Nữ) | |
| Vai trò | Badge màu theo cấp | Xem bảng vai trò bên dưới |
| Phòng ban | Tên phòng ban | Text thuần |
| Trạng thái | Badge màu (Hoạt động / Không HĐ) | |
| Hành động | Nút "Sửa" và "Xóa" | |

**Màu badge giới tính:**

| Giới tính | Badge class | Màu |
|-----------|------------|-----|
| Nam | `bb` | Xanh dương |
| Nữ | `bp` | Tím |

**Màu badge vai trò:**

| Vai trò | Mã | Badge class | Màu |
|---------|-----|------------|-----|
| Quản trị | `admin` | `bp` | Tím |
| Trưởng phòng | `manager` | `bb` | Xanh dương |
| Người mua | `buyer` | `bo` | Cam |
| Chỉ xem | `viewer` | `bs` | Xám |

**Màu badge trạng thái:**

| Trạng thái | Mã | Badge class | Màu |
|------------|-----|------------|-----|
| Hoạt động | `active` | `bg` | Xanh lá |
| Không hoạt động | `inactive` | `bs` | Xám |

#### FR-01.2 Tìm kiếm thành viên

**Mô tả:** Ô tìm kiếm realtime theo tên thành viên.

**Quy tắc:**
- Tìm kiếm không phân biệt hoa / thường
- Khớp chuỗi con (substring match), không yêu cầu khớp đầy đủ
- Kết quả cập nhật ngay khi người dùng gõ (sự kiện `oninput`)
- Áp dụng đồng thời với bộ lọc giới tính và phòng ban (AND logic)

**Ví dụ:** Gõ "nguyen" → hiển thị tất cả thành viên có "Nguyen" hoặc "nguyen" trong tên.

#### FR-01.3 Lọc theo giới tính

**Mô tả:** Ba nút chip lọc theo giới tính.

**Tùy chọn:**
- Tất cả *(mặc định)*
- Nam
- Nữ

#### FR-01.4 Lọc theo phòng ban

**Mô tả:** Dropdown lọc theo phòng ban.

**Tùy chọn:**
- Tất cả phòng ban *(mặc định)*
- Từng phòng ban trong `DEPTS` (động theo dữ liệu hiện có)

**Lưu ý:** Cả ba bộ lọc (tìm kiếm, giới tính, phòng ban) có thể kết hợp đồng thời theo AND logic.

#### FR-01.5 Thêm thành viên mới

**Luồng:**
1. Người dùng nhấn nút **"+ Thêm thành viên"**
2. Modal "Thêm thành viên" mở ra

**Trường dữ liệu trong modal:**

| Trường | Loại | Bắt buộc | Quy tắc |
|--------|------|----------|---------|
| Họ và tên | Text | Có | Không rỗng |
| Giới tính | Dropdown | Có | Nam / Nữ |
| Phòng ban | Dropdown | Có | Chọn từ danh sách phòng ban hiện có |
| Vai trò | Dropdown | Có | Quản trị / Trưởng phòng / Người mua / Chỉ xem |
| Trạng thái | Dropdown | Có | Hoạt động / Không hoạt động |
| Email | Email | Không | Định dạng email hợp lệ nếu nhập |
| Số điện thoại | Text | Không | |

3. Nhấn **"Thêm thành viên"** → validate → thêm vào danh sách → toast xác nhận
4. Modal đóng, bảng cập nhật ngay

**Validation:**

| Trường hợp | Thông báo lỗi |
|------------|---------------|
| Tên rỗng | "Vui lòng nhập họ và tên" |

#### FR-01.6 Sửa thành viên

**Luồng:**
1. Người dùng nhấn **"Sửa"** trên dòng thành viên cần chỉnh
2. Modal "Sửa thông tin thành viên" mở ra, điền sẵn toàn bộ dữ liệu hiện tại
3. Người dùng chỉnh sửa bất kỳ trường nào
4. Nhấn **"Lưu thay đổi"** → validate → cập nhật danh sách → toast xác nhận

**Validation:** Tương tự FR-01.5 — tên không được rỗng.

#### FR-01.7 Xóa thành viên

**Mô tả:** Xóa vĩnh viễn thành viên khỏi danh sách trong phiên làm việc hiện tại.

**Luồng:**
1. Người dùng nhấn **"Xóa"** trên dòng thành viên
2. Hệ thống xóa ngay lập tức, **không có hộp thoại xác nhận**
3. Toast xác nhận "Đã xóa thành viên '[tên]'"
4. Bảng cập nhật ngay

**Lưu ý:** Thao tác xóa không có bước xác nhận và không thể hoàn tác trong phiên hiện tại.

---

### 2.2 FR-02: Tab Phòng ban

#### FR-02.1 Hiển thị danh sách phòng ban

**Mô tả:** Hệ thống hiển thị toàn bộ phòng ban của tổ chức dưới dạng bảng, kèm thông tin sử dụng ngân sách.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Tên phòng ban | Tên đầy đủ của phòng / ban / khối | Font đậm |
| Trưởng phòng | Họ tên người phụ trách | |
| Thành viên | Số lượng thành viên | Badge xanh dương (`bb`) |
| Ngân sách | Hạn mức ngân sách năm | Định dạng `Xtr đ` |
| Sử dụng NS | Thanh progress bar + tỷ lệ % | Màu theo mức độ |
| Hành động | Nút "Sửa" và "Xóa" | Nút "Xóa" bị vô hiệu nếu có thành viên |

**Màu thanh ngân sách:**

| Mức sử dụng | Màu thanh |
|-------------|----------|
| ≥ 90% | Đỏ `#dc2626` |
| ≥ 75% | Vàng `#d97706` |
| < 75% | Xanh lá `#22c55e` |

#### FR-02.2 Tìm kiếm phòng ban

**Mô tả:** Ô tìm kiếm realtime theo tên phòng ban.

**Quy tắc:**
- Tìm kiếm không phân biệt hoa / thường
- Khớp chuỗi con, kết quả cập nhật ngay khi gõ
- Hiển thị "Không tìm thấy phòng ban" nếu kết quả rỗng

#### FR-02.3 Thêm phòng ban mới

**Luồng:**
1. Người dùng nhấn nút **"+ Thêm phòng ban"**
2. Modal "Thêm phòng ban" mở ra

**Trường dữ liệu trong modal:**

| Trường | Loại | Bắt buộc | Quy tắc |
|--------|------|----------|---------|
| Tên phòng ban | Text | Có | Không rỗng |
| Trưởng phòng | Text | Không | Mặc định `—` nếu để trống |
| Ngân sách năm (đ) | Number | Không | Mặc định 0 nếu để trống |

3. Nhấn **"Thêm phòng ban"** → validate → thêm vào danh sách → toast xác nhận
4. Phòng ban mới có `spent = 0`, `members = 0`

**Validation:**

| Trường hợp | Thông báo lỗi |
|------------|---------------|
| Tên phòng ban rỗng | "Vui lòng nhập tên phòng ban" |

#### FR-02.4 Sửa phòng ban

**Luồng:**
1. Người dùng nhấn **"Sửa"** trên dòng phòng ban cần chỉnh
2. Modal "Sửa phòng ban" mở ra, điền sẵn tên, trưởng phòng và ngân sách hiện tại
3. Người dùng chỉnh sửa
4. Nhấn **"Lưu thay đổi"** → validate → cập nhật danh sách → toast xác nhận

**Lưu ý:** Chỉ cho phép thay đổi tên, trưởng phòng và ngân sách. Giá trị `spent` (đã chi) không thể sửa trực tiếp.

#### FR-02.5 Xóa phòng ban

**Mô tả:** Xóa phòng ban khỏi danh sách.

**Điều kiện áp dụng:** Phòng ban không có thành viên nào (`MEMBERS.some(m => m.dept === d.name) === false`).

**Luồng khi phòng ban trống:**
1. Người dùng nhấn **"Xóa"**
2. Hệ thống xóa ngay lập tức, không có hộp thoại xác nhận
3. Toast xác nhận "Đã xóa phòng ban '[tên]'"

**Luồng khi phòng ban có thành viên:**
- Nút "Xóa" bị vô hiệu hoá (`disabled`, opacity 45%)
- Tooltip hiển thị khi hover: *"Phòng ban có nhân viên, không thể xóa"*
- Toast nếu cố thực thi qua code: "Phòng ban có nhân viên, không thể xóa"

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tìm kiếm và lọc thành viên phải phản hồi trong < 100ms (xử lý client-side trên mảng in-memory)
- Bảng thành viên 6 bản ghi và bảng phòng ban 6 bản ghi render không gây giật lag
- Mở modal (Thêm / Sửa) không có độ trễ nhận thấy

### 3.2 NFR-02: Bảo mật

- **Phân quyền truy cập:** Chỉ `user.role === 'school'` mới được render nội dung; mọi trường hợp khác chuyển hướng về `./` (login chính)
- **Dữ liệu in-memory:** `MEMBERS` và `DEPTS` là biến module — không lưu vào `localStorage`, mất khi refresh trang

### 3.3 NFR-03: Tính toàn vẹn dữ liệu

- Không cho phép xóa phòng ban khi vẫn còn thành viên thuộc phòng đó, tránh dữ liệu thành viên bị mồ côi
- Nút "Xóa" thành viên không có xác nhận — cần nâng cấp ở phiên bản sau (xem Roadmap)

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 960px | Sidebar ẩn, layout chuyển 1 cột |
| ≤ 960px | Toolbar (`flex-wrap:wrap`) cho phép các chip lọc xuống dòng tự nhiên |

### 3.5 NFR-05: Nhất quán UI

- Badge class (`bb`, `bp`, `bo`, `bs`, `bg`, `br`) nhất quán với định nghĩa trong design system của `school.html`
- Avatar thành viên dùng 2 chữ cái đầu cuối tên (ví dụ: "Nguyễn Văn An" → "VA") — đồng nhất với cách tính trong `userInitials()`
- Toast notification dùng chung hàm `toast()` với toàn cổng Trường học

---

## 4. Mô hình dữ liệu

### 4.1 Thành viên (Member)

```javascript
{
  id:     number,  // ID tự tăng, bắt đầu từ max(MEMBERS.map(m => m.id)) + 1
  name:   string,  // Họ và tên đầy đủ (bắt buộc)
  gender: string,  // 'nam' | 'nu'
  role:   string,  // 'admin' | 'manager' | 'buyer' | 'viewer'
  dept:   string,  // Tên phòng ban (khớp với DEPTS[*].name)
  email:  string,  // Địa chỉ email (có thể rỗng)
  phone:  string,  // Số điện thoại (có thể rỗng)
  status: string,  // 'active' | 'inactive'
}
```

### 4.2 Vai trò thành viên (Role Enums)

```javascript
type MemberRole = 'admin' | 'manager' | 'buyer' | 'viewer'

// Nhãn hiển thị
const ROLE_LBL = {
  admin:   'Quản trị',
  manager: 'Trưởng phòng',
  buyer:   'Người mua',
  viewer:  'Chỉ xem',
}

// Badge CSS class
const ROLE_CLS = {
  admin:   'bp',  // Tím
  manager: 'bb',  // Xanh dương
  buyer:   'bo',  // Cam
  viewer:  'bs',  // Xám
}
```

### 4.3 Phòng ban (Department)

```javascript
{
  id:      number,  // ID tự tăng, bắt đầu từ max(DEPTS.map(d => d.id)) + 1
  name:    string,  // Tên phòng ban (bắt buộc, unique trong phạm vi tổ chức)
  head:    string,  // Họ tên trưởng phòng (mặc định '—' nếu để trống)
  budget:  number,  // Hạn mức ngân sách năm (VNĐ), mặc định 0
  spent:   number,  // Số tiền đã chi tiêu (VNĐ) — chỉ đọc từ dữ liệu đơn hàng
  members: number,  // Số lượng thành viên thuộc phòng ban này
}
```

### 4.4 Dữ liệu mẫu

**Thành viên mặc định (MEMBERS):**

| ID | Tên | Giới tính | Vai trò | Phòng ban | Trạng thái |
|----|-----|-----------|---------|-----------|------------|
| 1 | Nguyễn Văn An | Nam | Quản trị | Ban Giám hiệu | Hoạt động |
| 2 | Trần Thị Bích | Nữ | Trưởng phòng | Phòng Đào tạo | Hoạt động |
| 3 | Lê Minh Cường | Nam | Người mua | Phòng Hành chính | Hoạt động |
| 4 | Phạm Hồng Dung | Nữ | Chỉ xem | Phòng Kế toán | Hoạt động |
| 5 | Hoàng Thu Hà | Nữ | Người mua | Phòng Thư viện | Không HĐ |
| 6 | Vũ Quang Hải | Nam | Trưởng phòng | Khối Tự Nhiên | Hoạt động |

**Phòng ban mặc định (DEPTS):**

| ID | Tên | Trưởng phòng | Thành viên | Ngân sách | Đã chi |
|----|-----|-------------|------------|-----------|--------|
| 1 | Ban Giám hiệu | Nguyễn Văn An | 3 | 80tr | 42tr |
| 2 | Phòng Đào tạo | Trần Thị Bích | 8 | 120tr | 98tr |
| 3 | Phòng Hành chính | Lê Minh Cường | 5 | 60tr | 35tr |
| 4 | Phòng Kế toán | Phạm Hồng Dung | 4 | 40tr | 12tr |
| 5 | Phòng Thư viện | Hoàng Thu Hà | 6 | 90tr | 67tr |
| 6 | Khối Tự Nhiên | Vũ Quang Hải | 22 | 180tr | 145tr |

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng thêm thành viên mới

```
Người dùng → Tab "Thành viên & Phòng ban" (sidebar)
  → Tab "Thành viên" được chọn mặc định
  → Click "+ Thêm thành viên"
  → Modal "Thêm thành viên" mở
  → Nhập Họ tên (bắt buộc), chọn Giới tính, Phòng ban, Vai trò, Trạng thái
  → Nhập Email, Số điện thoại (tuỳ chọn)
  → Click "Thêm thành viên"
  → [Validation pass] → Thành viên mới xuất hiện cuối bảng
  → Toast: "Đã thêm thành viên '[tên]'"
```

### 5.2 Luồng tìm và sửa thành viên

```
Người dùng → Tab "Thành viên & Phòng ban"
  → Tab "Thành viên"
  → Nhập tên vào ô tìm kiếm → danh sách lọc realtime
  → Xác định đúng thành viên cần sửa → Click "Sửa"
  → Modal "Sửa thông tin thành viên" mở, điền sẵn dữ liệu
  → Thay đổi Vai trò hoặc Phòng ban hoặc Trạng thái
  → Click "Lưu thay đổi"
  → Toast: "Đã cập nhật thành viên '[tên]'"
  → Bảng cập nhật ngay
```

### 5.3 Luồng xóa thành viên không hoạt động

```
Người dùng → Tab "Thành viên & Phòng ban"
  → Tab "Thành viên"
  → Lọc: Giới tính = Tất cả, Phòng ban = Tất cả
  → Xác định thành viên cần xóa → Click "Xóa"
  → [Xóa ngay, không có confirm] → Thành viên biến khỏi danh sách
  → Toast: "Đã xóa thành viên '[tên]'"
```

### 5.4 Luồng thêm phòng ban mới và phân bổ ngân sách

```
Người dùng → Tab "Thành viên & Phòng ban"
  → Click tab "Phòng ban"
  → Click "+ Thêm phòng ban"
  → Modal mở: Nhập Tên phòng ban (bắt buộc), Trưởng phòng, Ngân sách năm
  → Click "Thêm phòng ban"
  → [Validation pass] → Phòng ban mới xuất hiện trong bảng (spent=0, members=0)
  → Toast: "Đã thêm phòng ban '[tên]'"
```

### 5.5 Luồng cố xóa phòng ban còn thành viên

```
Người dùng → Tab "Phòng ban"
  → Tìm phòng ban có số thành viên > 0
  → Hover vào nút "Xóa" (bị mờ / disabled)
  → Tooltip hiển thị: "Phòng ban có nhân viên, không thể xóa"
  → [Không thực hiện được hành động xóa]
  → Người dùng cần chuyển thành viên sang phòng ban khác trước khi xóa
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Tab Thành viên

```
← Topbar: "Thành viên & Phòng ban"
┌─────────────────────────────────────────────────────────────────────────┐
│  [ Thành viên ]  [ Phòng ban ]                                          │
│  ─────────────                                                          │
│  [🔍 Tìm theo tên...]  [Tất cả] [Nam] [Nữ]                             │
│  [Tất cả phòng ban                    ▼]               [+ Thêm thành viên]│
│                                                                         │
│  THÀNH VIÊN        GIỚI TÍNH  VAI TRÒ        PHÒNG BAN    TRẠNG THÁI  │
│ ─────────────────────────────────────────────────────────────────────── │
│  [VA]  Nguyễn Văn An   [Nam]  [Quản trị]   Ban Giám hiệu [Hoạt động]  │
│        nvan@thptdemo                                        [Sửa][Xóa]  │
│ ─────────────────────────────────────────────────────────────────────── │
│  [TB]  Trần Thị Bích   [Nữ]   [Trưởng ph.] Phòng Đào tạo [Hoạt động] │
│        ttbich@thptdemo                                      [Sửa][Xóa]  │
│ ─────────────────────────────────────────────────────────────────────── │
│  [MC]  Lê Minh Cường   [Nam]  [Người mua]  Phòng HC       [Hoạt động] │
│        lmcuong@thptdemo                                     [Sửa][Xóa]  │
│ ─────────────────────────────────────────────────────────────────────── │
│  [TH]  Hoàng Thu Hà    [Nữ]   [Người mua]  Phòng Thư viện [Không HĐ]  │
│        htha@thptdemo                                        [Sửa][Xóa]  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Tab Phòng ban

```
← Topbar: "Thành viên & Phòng ban"
┌─────────────────────────────────────────────────────────────────────────┐
│  [ Thành viên ]  [ Phòng ban ]                                          │
│                  ────────────                                            │
│  [🔍 Tìm theo tên phòng ban...]                       [+ Thêm phòng ban]│
│                                                                         │
│  TÊN PHÒNG BAN      TRƯỞNG PHÒNG    TV   NGÂN SÁCH  SỬ DỤNG NS        │
│ ─────────────────────────────────────────────────────────────────────── │
│  Ban Giám hiệu      Nguyễn Văn An   [3]  80tr đ    ████░░░░ 52%       │
│                                                               [Sửa][Xóa]│
│ ─────────────────────────────────────────────────────────────────────── │
│  Phòng Đào tạo      Trần Thị Bích   [8]  120tr đ   ████████ 82% 🟡    │
│                                                               [Sửa][Xóa]│
│ ─────────────────────────────────────────────────────────────────────── │
│  Khối Tự Nhiên      Vũ Quang Hải    [22] 180tr đ   █████████ 81% 🟡   │
│                                              [Sửa][Xóa ─ disabled 🚫]  │
└─────────────────────────────────────────────────────────────────────────┘
    Tooltip khi hover Xóa: "Phòng ban có nhân viên, không thể xóa"
```

### 6.3 Modal — Thêm thành viên

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Thêm thành viên                                                        │
│                                                                         │
│  Họ và tên                                                              │
│  [Nhập họ và tên đầy đủ                                              ]  │
│                                                                         │
│  Giới tính                    Phòng ban                                 │
│  [Nam                      ▼] [Ban Giám hiệu                         ▼] │
│                                                                         │
│  Vai trò                      Trạng thái                                │
│  [Quản trị                 ▼] [Hoạt động                            ▼]  │
│                                                                         │
│  Email                                                                  │
│  [email@truong.edu.vn                                                ]  │
│                                                                         │
│  Số điện thoại                                                          │
│  [09xx xxx xxx                                                       ]  │
│                                                                         │
│                                     [Hủy]  [Thêm thành viên]           │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Modal — Thêm phòng ban

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Thêm phòng ban                                                         │
│                                                                         │
│  Tên phòng ban                                                          │
│  [VD: Phòng Công nghệ thông tin                                      ]  │
│                                                                         │
│  Trưởng phòng                                                           │
│  [Họ và tên trưởng phòng                                             ]  │
│                                                                         │
│  Ngân sách năm (đ)                                                      │
│  [0                                                                  ]  │
│                                                                         │
│                                     [Hủy]  [Thêm phòng ban]            │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Hiển thị danh sách thành viên đúng

- [ ] Mở tab "Thành viên & Phòng ban", tab "Thành viên" được active mặc định
- [ ] Bảng hiển thị đúng 6 thành viên từ dữ liệu mẫu
- [ ] Mỗi dòng có avatar (2 chữ cái), tên, email, badge giới tính, badge vai trò, phòng ban, badge trạng thái
- [ ] Badge màu đúng theo từng vai trò và trạng thái

### AC-02: Tìm kiếm thành viên hoạt động

- [ ] Nhập "nguyen" → chỉ hiển thị thành viên có "Nguyen" trong tên
- [ ] Xóa từ khóa → hiển thị lại toàn bộ 6 thành viên
- [ ] Kết quả cập nhật ngay khi gõ, không cần nhấn Enter

### AC-03: Bộ lọc giới tính hoạt động

- [ ] Click "Nam" → chỉ hiển thị thành viên có `gender='nam'`
- [ ] Click "Nữ" → chỉ hiển thị thành viên có `gender='nu'`
- [ ] Click "Tất cả" → hiển thị lại toàn bộ
- [ ] Kết hợp lọc giới tính + từ khóa tìm kiếm → AND logic

### AC-04: Bộ lọc phòng ban hoạt động

- [ ] Chọn "Phòng Đào tạo" → chỉ hiển thị thành viên thuộc phòng đó
- [ ] Kết hợp lọc phòng ban + giới tính + tìm kiếm → AND logic

### AC-05: Thêm thành viên mới

- [ ] Click "+ Thêm thành viên" → modal mở
- [ ] Để trống tên → toast "Vui lòng nhập họ và tên", modal không đóng
- [ ] Điền đủ tên → thành viên mới xuất hiện trong bảng, toast xác nhận
- [ ] Dropdown "Phòng ban" trong modal liệt kê đủ các phòng ban hiện có

### AC-06: Sửa thành viên

- [ ] Click "Sửa" → modal mở, điền sẵn đúng dữ liệu của thành viên đó
- [ ] Thay đổi vai trò và lưu → bảng hiển thị badge vai trò mới ngay lập tức
- [ ] Toast "Đã cập nhật thành viên '[tên]'" xuất hiện

### AC-07: Xóa thành viên

- [ ] Click "Xóa" → thành viên biến khỏi bảng ngay, không có confirm dialog
- [ ] Toast "Đã xóa thành viên '[tên]'" xuất hiện

### AC-08: Hiển thị danh sách phòng ban đúng

- [ ] Click tab "Phòng ban" → bảng hiển thị đúng 6 phòng ban từ dữ liệu mẫu
- [ ] Mỗi dòng có tên, trưởng phòng, số thành viên (badge xanh), ngân sách, thanh progress bar
- [ ] Thanh progress bar màu đúng: Phòng Đào tạo (82%) → vàng `#d97706`; Ban Giám hiệu (52%) → xanh `#22c55e`

### AC-09: Tìm kiếm phòng ban hoạt động

- [ ] Nhập "tự nhiên" → chỉ hiển thị "Khối Tự Nhiên"
- [ ] Xóa từ khóa → hiển thị lại toàn bộ

### AC-10: Thêm phòng ban mới

- [ ] Click "+ Thêm phòng ban" → modal mở
- [ ] Để trống tên → toast "Vui lòng nhập tên phòng ban", modal không đóng
- [ ] Điền tên → phòng ban mới xuất hiện với `spent=0`, `members=0`, ngân sách=0 nếu không nhập

### AC-11: Sửa phòng ban

- [ ] Click "Sửa" → modal mở, điền sẵn đúng tên, trưởng phòng và ngân sách
- [ ] Thay đổi ngân sách và lưu → cột "Ngân sách" cập nhật, thanh progress bar tính lại tỷ lệ %

### AC-12: Bảo vệ phòng ban có thành viên

- [ ] Phòng ban có số thành viên > 0 → nút "Xóa" bị vô hiệu (`disabled`, mờ)
- [ ] Hover vào nút "Xóa" bị mờ → tooltip "Phòng ban có nhân viên, không thể xóa" xuất hiện
- [ ] Phòng ban không có thành viên → nút "Xóa" hoạt động bình thường

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Dữ liệu thành viên và phòng ban mất khi refresh trang | Cao | Lưu `MEMBERS` và `DEPTS` vào `LS.set('members', ...)` / `LS.set('depts', ...)` (localStorage prefix `school_`) thay vì biến module thuần |
| Xóa thành viên không có xác nhận → dễ xóa nhầm | Trung bình | Thêm confirm dialog trước khi xóa; cân nhắc soft delete thay vì hard delete |
| Tên phòng ban không unique → thành viên có thể gán nhầm phòng | Trung bình | Validate tên phòng ban unique khi thêm / sửa; kiểm tra `DEPTS.some(d => d.name === name && d.id !== editId)` |
| Số thành viên trong `DEPTS[*].members` không đồng bộ tự động | Trung bình | Tính động từ `MEMBERS.filter(m => m.dept === d.name).length` thay vì dùng giá trị tĩnh |
| Dropdown "Phòng ban" trong form thêm thành viên không cập nhật nếu thêm phòng mới trong cùng phiên | Thấp | Render dropdown từ `DEPTS` hiện tại mỗi lần mở modal — không cache |
| Chưa có phân quyền theo vai trò thành viên | Thấp | Trong roadmap: `buyer` chỉ tạo được yêu cầu mua hàng; `viewer` chỉ xem; `manager` duyệt cấp 1 |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Lưu persistent** | Đưa `MEMBERS` và `DEPTS` vào localStorage hoặc API để tồn tại qua refresh |
| P1 | **Confirm xóa thành viên** | Thêm hộp thoại xác nhận trước khi xóa; cân nhắc soft delete thay hard delete |
| P1 | **Enforce vai trò mua sắm** | `viewer` không thể tạo yêu cầu mua; `buyer` chỉ tạo được, không duyệt; `manager` duyệt cấp 1 |
| P2 | **Số thành viên tính động** | Tính `members` từ `MEMBERS.filter(m => m.dept === d.name).length` thay vì giá trị tĩnh |
| P2 | **Validate tên phòng ban unique** | Kiểm tra trùng tên khi thêm / sửa phòng ban |
| P2 | **Import thành viên từ Excel** | Tải lên file .xlsx → parse → thêm hàng loạt vào `MEMBERS` |
| P2 | **Chuyển phòng ban hàng loạt** | Chọn nhiều thành viên → đổi phòng ban cùng lúc |
| P3 | **Phân quyền theo phòng ban** | Thành viên chỉ xem được yêu cầu mua của phòng ban mình |
| P3 | **Lịch sử thay đổi thành viên** | Ghi log "Ai đã sửa thông tin thành viên nào, lúc nào" |
| P3 | **Export danh sách** | Xuất CSV / Excel danh sách thành viên hoặc phòng ban đã lọc |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
