# Tài liệu Phân tích Yêu cầu
## Phân hệ Tổ chức — Cổng Trường học / Tổ chức (EduMart)

**Phiên bản:** 1.0  
**Ngày:** 20/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Màn hình Tổ chức (`view = 'organization'`) là trung tâm quản lý hồ sơ pháp lý và vận hành của trường học / tổ chức giáo dục trên nền tảng EduMart B2B. Màn hình cung cấp bốn nhóm chức năng: cập nhật thông tin cơ bản của tổ chức, quản lý người đại diện pháp lý, duy trì danh sách địa chỉ giao hàng, và theo dõi trạng thái hồ sơ — chứng từ được yêu cầu bởi EduMart để kích hoạt hạn mức tín dụng và ký hợp đồng khung.

### 1.2 Phạm vi

Màn hình bao gồm bốn nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Thông tin tổ chức** | Xem và chỉnh sửa các trường thông tin cơ bản của tổ chức |
| **Người đại diện pháp lý** | Xem và chỉnh sửa thông tin người đại diện ký hợp đồng |
| **Địa chỉ giao hàng** | Thêm, sửa, xem danh sách địa chỉ nhận hàng của tổ chức |
| **Hồ sơ & Chứng từ** | Tải lên, xem, cập nhật các giấy tờ pháp lý bắt buộc |

**Ngoài phạm vi:**
- Xác minh hồ sơ (do đội vận hành EduMart thực hiện, không phải người dùng trường học)
- Xóa địa chỉ giao hàng (chưa triển khai — chỉ có Sửa)
- Xóa chứng từ đã tải lên

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền trên màn hình |
|-------|-------|---------------------|
| **Hiệu trưởng** | Người đại diện pháp lý, toàn quyền trong cổng | Xem & chỉnh sửa toàn bộ |
| **Nhân viên** | Nhân viên phòng ban được cấp quyền | Xem & chỉnh sửa toàn bộ |

Tài liệu này áp dụng cho cả hai actor — demo account mặc định `truonghoc@demo.vn` mang quyền **Nhân viên**.

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Thông tin tổ chức

#### FR-01.1 Hiển thị thông tin

**Mô tả:** Panel trái trên hiển thị và cho phép chỉnh sửa các trường thông tin cơ bản của tổ chức dưới dạng form inline (không cần nhấn "Sửa" để mở).

**Các trường dữ liệu:**

| Trường | Nội dung | Loại input |
|--------|---------|------------|
| Tên tổ chức | Tên đầy đủ của trường / tổ chức | Text |
| Mã số thuế | Mã số thuế doanh nghiệp / tổ chức | Text |
| Email liên hệ | Địa chỉ email chính thức của tổ chức | Text |
| Số điện thoại | Số điện thoại liên hệ | Text |
| Địa chỉ | Địa chỉ trụ sở chính | Text |

#### FR-01.2 Lưu thông tin tổ chức

**Luồng:**
1. Người dùng chỉnh sửa trực tiếp bất kỳ trường nào
2. Nhấn nút **"Lưu thay đổi"** ở góc trên phải panel
3. Hệ thống hiển thị toast xác nhận "Đã lưu thông tin tổ chức"

**Lưu ý:** Trong phiên bản hiện tại (mock), thao tác lưu chỉ hiển thị toast — chưa ghi vào backend. Sự kiện `onchange` trên từng input cũng kích hoạt toast theo tên trường tương ứng.

---

### 2.2 FR-02: Người đại diện pháp lý

#### FR-02.1 Hiển thị thông tin người đại diện

**Mô tả:** Panel trái dưới hiển thị và cho phép chỉnh sửa thông tin người đại diện pháp lý — người được ủy quyền ký hợp đồng với EduMart.

**Các trường dữ liệu:**

| Trường | Nội dung | Loại input |
|--------|---------|------------|
| Họ và tên | Họ tên đầy đủ của người đại diện | Text |
| Chức vụ | Chức danh tại tổ chức (VD: Hiệu trưởng) | Text |
| Email | Địa chỉ email cá nhân của người đại diện | Text |
| Số điện thoại | Số điện thoại liên hệ cá nhân | Text |
| CMND / CCCD | Số chứng minh nhân dân hoặc căn cước công dân | Text |

#### FR-02.2 Lưu thông tin người đại diện

**Luồng:**
1. Người dùng chỉnh sửa trực tiếp bất kỳ trường nào
2. Nhấn nút **"Lưu thay đổi"** ở góc trên phải panel
3. Hệ thống hiển thị toast xác nhận "Đã lưu thông tin người đại diện"

---

### 2.3 FR-03: Địa chỉ giao hàng

#### FR-03.1 Danh sách địa chỉ

**Mô tả:** Panel phải trên hiển thị danh sách tất cả địa chỉ giao hàng đã đăng ký của tổ chức. Mỗi địa chỉ chiếm một dòng trong panel.

**Dữ liệu hiển thị trên mỗi dòng:**

| Thành phần | Nội dung |
|------------|---------|
| Địa chỉ | Chuỗi địa chỉ đầy đủ, font đậm |
| Nhãn | Badge màu phân loại địa chỉ (Địa chỉ chính / Cơ sở 2...) |
| Nút "Sửa" | Mở modal chỉnh sửa địa chỉ tương ứng |

**Màu badge nhãn địa chỉ:**

| Nhãn | Badge class | Màu |
|------|------------|-----|
| Địa chỉ chính | `bg` | Xanh lá |
| Cơ sở 2 trở đi | `bs` | Xám |

#### FR-03.2 Thêm địa chỉ giao hàng

**Luồng:**
1. Người dùng nhấn nút **"+ Thêm"** ở góc trên phải panel
2. Modal "Thêm địa chỉ giao hàng" mở ra
3. Người dùng nhập Địa chỉ và Nhãn (cả hai bắt buộc)
4. Nhấn **"Lưu"** → địa chỉ mới xuất hiện trong danh sách với badge `bs` (xám)
5. Toast xác nhận "Đã thêm địa chỉ giao hàng"

**Validation:**

| Trường hợp | Thông báo lỗi |
|------------|---------------|
| Địa chỉ rỗng | "Vui lòng nhập địa chỉ" |
| Nhãn rỗng | "Vui lòng nhập nhãn" |

**Bảo vệ dữ liệu chưa lưu:** Nếu người dùng đã nhập dữ liệu và nhấn overlay để đóng, hệ thống hiển thị hộp thoại xác nhận "Dữ liệu chưa được lưu" với hai lựa chọn: **"Ở lại"** và **"Đóng mà không lưu"**.

#### FR-03.3 Sửa địa chỉ giao hàng

**Luồng:**
1. Người dùng nhấn **"Sửa"** trên dòng địa chỉ cần chỉnh
2. Modal "Sửa địa chỉ giao hàng" mở ra, điền sẵn dữ liệu hiện tại
3. Người dùng sửa Địa chỉ và / hoặc Nhãn
4. Nhấn **"Lưu"** → cập nhật danh sách
5. Toast xác nhận "Đã cập nhật địa chỉ giao hàng"

---

### 2.4 FR-04: Hồ sơ & Chứng từ

#### FR-04.1 Danh sách chứng từ

**Mô tả:** Panel phải dưới hiển thị danh sách các loại hồ sơ — chứng từ pháp lý mà EduMart yêu cầu tổ chức cung cấp để xác minh và kích hoạt tài khoản B2B đầy đủ.

**Dữ liệu hiển thị trên mỗi dòng:**

| Thành phần | Nội dung |
|------------|---------|
| Tên tài liệu | Tên loại chứng từ |
| Trạng thái | Badge màu phản ánh tình trạng xác minh |
| Nút "Xem" | Chỉ hiện khi đã có file (status ≠ `Chưa tải lên`) |
| Nút hành động | **"Tải lên"** (nếu chưa có file) hoặc **"Cập nhật"** (nếu đã có file) |

**Trạng thái chứng từ:**

| Trạng thái | Badge class | Màu | Ý nghĩa |
|------------|------------|-----|---------|
| Đã xác minh | `bg` | Xanh lá | EduMart đã kiểm tra và chấp thuận |
| Đang xử lý | `bo` | Cam | Đã tải lên, chờ đội vận hành xác minh |
| Chưa tải lên | `bs` | Xám | Người dùng chưa cung cấp file |

**Danh sách chứng từ mặc định:**

| STT | Tên chứng từ |
|-----|-------------|
| 1 | Quyết định thành lập |
| 2 | Mã số thuế GTGT |
| 3 | Giấy phép hoạt động |
| 4 | Hợp đồng khung EduMart |

#### FR-04.2 Tải lên chứng từ mới

**Điều kiện áp dụng:** Chứng từ đang ở trạng thái `Chưa tải lên` (badge `bs`).

**Luồng:**
1. Người dùng nhấn **"Tải lên"** trên dòng chứng từ cần nộp
2. Modal "Tải lên Hồ sơ & Chứng từ" mở ra

**Trường dữ liệu trong modal:**

| Trường | Loại | Bắt buộc | Quy tắc |
|--------|------|----------|---------|
| Loại chứng từ | Dropdown | Có | Chọn từ danh sách cố định |
| Tên tài liệu | Text | Có | Không rỗng |
| File đính kèm | File picker | Có | Định dạng: .pdf, .doc, .docx, .jpg, .png |
| Ghi chú | Textarea | Không | Tuỳ chọn |

3. Sau khi điền đầy đủ và nhấn **"Lưu"** → trạng thái chứng từ chuyển sang `Đang xử lý` (badge `bo`)
4. Toast xác nhận "Đã tải lên '[tên tài liệu]'"

**Validation:**

| Trường hợp | Thông báo lỗi |
|------------|---------------|
| Tên tài liệu rỗng | "Vui lòng nhập tên tài liệu" |
| Chưa chọn file | "Vui lòng chọn file đính kèm" |

#### FR-04.3 Cập nhật chứng từ đã có

**Điều kiện áp dụng:** Chứng từ đã có file (status ≠ `Chưa tải lên`).

**Luồng:**
1. Người dùng nhấn **"Cập nhật"** trên dòng chứng từ cần thay thế
2. Modal "Cập nhật: [tên chứng từ]" mở ra, điền sẵn tên hiện tại
3. Người dùng nhập tên tài liệu (có thể sửa) và chọn file mới (bắt buộc)
4. Nhấn **"Lưu"** → trạng thái chuyển về `Đang xử lý` (badge `bo`)
5. Toast xác nhận "Đã cập nhật '[tên tài liệu]'"

#### FR-04.4 Xem chi tiết chứng từ

**Điều kiện áp dụng:** Chứng từ đã có file tải lên (nút "Xem" hiển thị).

**Thông tin hiển thị trong modal chi tiết:**

| Thành phần | Nội dung |
|------------|---------|
| Tên file | Tên file thực tế đã tải lên |
| Kích thước | Dung lượng file (MB) |
| Trạng thái | Badge màu |
| Ngày tải lên | DD/MM/YYYY |
| Ngày xác minh | DD/MM/YYYY hoặc "Chưa xác minh" |
| Nút "Tải về" | Chỉ hiển thị khi đã có file |

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Màn hình Tổ chức render hoàn toàn trong < 200ms — không có truy vấn async, toàn bộ dữ liệu là biến in-memory
- Mở modal (Thêm / Sửa / Xem) không gây giật lag — modal dựng bằng innerHTML đồng bộ

### 3.2 NFR-02: Bảo mật

- **Phân quyền truy cập:** Chỉ `user.role === 'school'` mới được render nội dung; mọi trường hợp khác chuyển hướng về `./` (login chính)
- **Dữ liệu nhạy cảm:** Trường CMND / CCCD của người đại diện hiển thị dạng plaintext trên form — trong môi trường production cần che bớt hoặc mã hoá

### 3.3 NFR-03: Nhất quán UI

- Modal dùng chung component `.modal-bg / .modal` với toàn bộ ứng dụng
- Badge class (`bg`, `bo`, `bs`, `br`) nhất quán với định nghĩa trong design system của `school.html`
- Toast notification dùng chung hàm `toast()` với toàn cổng Trường học

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 960px | Grid 2 cột chuyển sang 1 cột; sidebar ẩn |
| > 960px | Grid 2 cột (`1fr 1fr`), cột trái: Thông tin tổ chức + Người đại diện; cột phải: Địa chỉ + Hồ sơ |

### 3.5 NFR-05: Bảo vệ dữ liệu chưa lưu (Dirty-check)

- Khi người dùng đã nhập dữ liệu vào modal và click overlay để đóng, hệ thống hiển thị hộp thoại xác nhận thay vì đóng ngay
- Áp dụng cho modal Thêm địa chỉ, Sửa địa chỉ, Tải lên chứng từ, Cập nhật chứng từ

---

## 4. Mô hình dữ liệu

### 4.1 Thông tin tổ chức (ORG)

```javascript
{
  name:      string,  // Tên tổ chức — có thể ghi đè từ currentUser.orgName
  type:      string,  // Loại hình: 'Trường học'
  status:    string,  // Trạng thái tài khoản B2B: 'active'
  points:    number,  // Điểm tích lũy EduMart
  contracts: number,  // Số hợp đồng hiện hành
  year:      string,  // Năm học hiện tại: 'YYYY-YYYY'
  tax:       string,  // Mã số thuế
  addr:      string,  // Địa chỉ trụ sở chính
  email:     string,  // Email liên hệ chính thức
  phone:     string,  // Số điện thoại
}
```

**Lưu ý:** `ORG.name` bị ghi đè bởi `currentUser.orgName` (nếu có) hoặc `currentUser.name` tại thời điểm `init()`.

### 4.2 Người đại diện pháp lý (REP)

```javascript
{
  name:  string,  // Họ và tên đầy đủ
  title: string,  // Chức vụ (VD: 'Hiệu trưởng')
  email: string,  // Email cá nhân
  phone: string,  // Số điện thoại cá nhân
  cccd:  string,  // Số CMND / CCCD
}
```

### 4.3 Địa chỉ giao hàng (Address)

```javascript
{
  addr:  string,  // Chuỗi địa chỉ đầy đủ
  label: string,  // Nhãn phân loại (VD: 'Địa chỉ chính', 'Cơ sở 2')
  cls:   string,  // Badge class CSS: 'bg' | 'bs'
}
```

**Lưu ý lưu trữ:** `ORG_ADDRESSES` là biến module in-memory. Dữ liệu không tồn tại qua refresh trang do chưa được đưa vào `localStorage`.

### 4.4 Chứng từ pháp lý (Document)

```javascript
{
  name:   string,  // Tên loại chứng từ
  status: string,  // 'Đã xác minh' | 'Đang xử lý' | 'Chưa tải lên'
  cls:    string,  // Badge class CSS: 'bg' | 'bo' | 'bs'
}
```

**Lưu ý lưu trữ:** `ORG_DOCS` là biến module in-memory. Tương tự `ORG_ADDRESSES`, chưa lưu vào `localStorage`.

### 4.5 Metadata file chứng từ (DocumentMeta — dữ liệu mock tĩnh)

```javascript
{
  file:     string | null,   // Tên file thực tế, null nếu chưa có
  size:     string | null,   // Dung lượng, VD: '1.2 MB'
  uploaded: string | null,   // Ngày tải lên 'DD/MM/YYYY'
  verified: string | null,   // Ngày xác minh 'DD/MM/YYYY', null nếu chưa
}
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng cập nhật thông tin tổ chức

```
Người dùng → Tab "Tổ chức" (sidebar)
  → Màn hình tổ chức hiển thị, form điền sẵn dữ liệu hiện tại
  → Người dùng sửa một hoặc nhiều trường
  → Click "Lưu thay đổi" (panel Thông tin tổ chức)
  → Toast: "Đã lưu thông tin tổ chức"
```

### 5.2 Luồng thêm địa chỉ giao hàng mới

```
Người dùng → Tab "Tổ chức"
  → Panel "Địa chỉ giao hàng" → Click "+ Thêm"
  → Modal "Thêm địa chỉ giao hàng" mở
  → Nhập Địa chỉ + Nhãn
  → Click "Lưu"
  → [Validation pass] → Địa chỉ mới xuất hiện trong danh sách (badge xám)
  → Toast: "Đã thêm địa chỉ giao hàng"
```

### 5.3 Luồng tải lên chứng từ còn thiếu

```
Người dùng → Tab "Tổ chức"
  → Panel "Hồ sơ & Chứng từ"
  → Tìm dòng có badge "Chưa tải lên" → Click "Tải lên"
  → Modal "Tải lên Hồ sơ & Chứng từ" mở
  → Chọn loại chứng từ, nhập tên, đính kèm file
  → Click "Lưu"
  → [Validation pass] → Badge chuyển sang "Đang xử lý" (cam)
  → Toast: "Đã tải lên '[tên]'"
```

### 5.4 Luồng xem chi tiết chứng từ đã xác minh

```
Người dùng → Tab "Tổ chức"
  → Panel "Hồ sơ & Chứng từ"
  → Tìm dòng có badge "Đã xác minh" → Click "Xem"
  → Modal chi tiết hiển thị: tên file, dung lượng, ngày tải lên, ngày xác minh
  → Nhấn "Tải về" để tải file về máy (demo: toast)
  → Click "Đóng" để thoát
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình Tổ chức (layout 2 cột)

```
← Topbar: "Tổ chức"
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌──────────────────────────────────┐  ┌───────────────────────────────┐│
│  │ Thông tin tổ chức   [Lưu thay đổi]│ │ Địa chỉ giao hàng      [+Thêm]││
│  │──────────────────────────────────│  │───────────────────────────────││
│  │ Tên tổ chức                      │  │ 123 Nguyễn Trãi, Q.1, TP.HCM  ││
│  │ [Trường THPT Demo              ] │  │ [Địa chỉ chính]        [Sửa]  ││
│  │ Mã số thuế                       │  │───────────────────────────────││
│  │ [0100200300                    ] │  │ 45 Lê Văn Việt, Q.9, TP.HCM   ││
│  │ Email liên hệ                    │  │ [Cơ sở 2]              [Sửa]  ││
│  │ [contact@thptdemo.edu.vn       ] │  └───────────────────────────────┘│
│  │ Số điện thoại                    │                                   │
│  │ [028 3812 3456                 ] │  ┌───────────────────────────────┐│
│  │ Địa chỉ                          │  │ Hồ sơ & Chứng từ  [+ Tải lên]││
│  │ [123 Nguyễn Trãi, Q.1, TP.HCM ] │  │───────────────────────────────││
│  └──────────────────────────────────┘  │ Quyết định thành lập          ││
│                                        │ [Đã xác minh]  [Xem][Cập nhật]││
│  ┌──────────────────────────────────┐  │───────────────────────────────││
│  │ Người đại diện pháp lý           │  │ Mã số thuế GTGT               ││
│  │                     [Lưu thay đổi]│ │ [Đã xác minh]  [Xem][Cập nhật]││
│  │──────────────────────────────────│  │───────────────────────────────││
│  │ Họ và tên                        │  │ Giấy phép hoạt động           ││
│  │ [Nguyễn Văn Hiệu               ] │  │ [Đang xử lý]   [Xem][Cập nhật]││
│  │ Chức vụ                          │  │───────────────────────────────││
│  │ [Hiệu trưởng                   ] │  │ Hợp đồng khung EduMart        ││
│  │ Email                            │  │ [Chưa tải lên]      [Tải lên] ││
│  │ [hieupho@thptdemo.edu.vn       ] │  └───────────────────────────────┘│
│  │ Số điện thoại                    │                                   │
│  │ [0901234567                    ] │                                   │
│  │ CMND / CCCD                      │                                   │
│  │ [079200001234                  ] │                                   │
│  └──────────────────────────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Modal — Thêm địa chỉ giao hàng

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Thêm địa chỉ giao hàng                                                 │
│                                                                         │
│  Địa chỉ *                                                              │
│  [VD: 123 Nguyễn Trãi, Q.1, TP.HCM                                  ] │
│                                                                         │
│  Nhãn *                                                                 │
│  [VD: Địa chỉ chính, Cơ sở 2...                                      ] │
│                                                                         │
│                                            [Đóng]  [Lưu]               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Modal — Tải lên Hồ sơ & Chứng từ

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Tải lên Hồ sơ & Chứng từ                                              │
│                                                                         │
│  Loại chứng từ *                                                        │
│  [Quyết định thành lập                                               ▼] │
│                                                                         │
│  Tên tài liệu *                                                         │
│  [Nhập tên tài liệu                                                  ]  │
│                                                                         │
│  File đính kèm *                          (.pdf, .doc, .docx, .jpg, .png)│
│  [Chọn file...]                                                         │
│                                                                         │
│  Ghi chú                                                                │
│  [Ghi chú thêm (tuỳ chọn)                                           ]  │
│                                                                         │
│                                            [Đóng]  [Lưu]               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Modal — Xem chi tiết chứng từ

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Chi tiết: Quyết định thành lập                                         │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │ [📄]  quyet-dinh-thanh-lap.pdf                                  │    │
│  │       1.2 MB · PDF                                              │    │
│  ├─────────────────────────────────────────────────────────────────┤    │
│  │  TRẠNG THÁI          NGÀY TẢI LÊN                              │    │
│  │  [Đã xác minh]       15/01/2026                                │    │
│  │                                                                 │    │
│  │  NGÀY XÁC MINH       KÍCH THƯỚC                               │    │
│  │  20/01/2026          1.2 MB                                    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                         │
│                                  [Đóng]  [↓ Tải về]                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Hiển thị đúng dữ liệu tổ chức

- [ ] Vào tab "Tổ chức", 5 trường thông tin tổ chức hiển thị đúng giá trị từ object `ORG`
- [ ] 5 trường người đại diện pháp lý hiển thị đúng giá trị từ object `REP`
- [ ] Tên tổ chức ưu tiên lấy từ `currentUser.orgName` nếu có

### AC-02: Lưu thông tin tổ chức

- [ ] Thay đổi bất kỳ trường nào rồi click "Lưu thay đổi" → toast "Đã lưu thông tin tổ chức"
- [ ] Thay đổi bất kỳ trường nào rồi click "Lưu thay đổi" (panel Người đại diện) → toast "Đã lưu thông tin người đại diện"

### AC-03: Danh sách địa chỉ giao hàng

- [ ] Mở tab "Tổ chức" → hiển thị đúng số lượng địa chỉ trong `ORG_ADDRESSES`
- [ ] Mỗi dòng có địa chỉ, badge nhãn đúng màu, nút "Sửa"
- [ ] Badge "Địa chỉ chính" có class `bg` (xanh lá); badge cơ sở khác có class `bs` (xám)

### AC-04: Thêm địa chỉ giao hàng

- [ ] Click "+ Thêm" → modal mở
- [ ] Để trống Địa chỉ → toast "Vui lòng nhập địa chỉ", không đóng modal
- [ ] Để trống Nhãn → toast "Vui lòng nhập nhãn", không đóng modal
- [ ] Nhập đủ → địa chỉ mới xuất hiện trong danh sách, toast xác nhận

### AC-05: Bảo vệ modal khi có dữ liệu chưa lưu

- [ ] Mở modal Thêm địa chỉ → nhập dữ liệu → click overlay → hộp thoại "Dữ liệu chưa được lưu" xuất hiện
- [ ] Click "Ở lại" → modal vẫn mở, dữ liệu không mất
- [ ] Click "Đóng mà không lưu" → modal đóng, dữ liệu bị hủy

### AC-06: Sửa địa chỉ giao hàng

- [ ] Click "Sửa" trên địa chỉ → modal mở, điền sẵn dữ liệu hiện tại
- [ ] Sửa và lưu → danh sách cập nhật đúng, toast xác nhận

### AC-07: Danh sách chứng từ

- [ ] Panel "Hồ sơ & Chứng từ" hiển thị đúng 4 chứng từ mặc định
- [ ] Mỗi dòng có tên, badge trạng thái đúng màu
- [ ] Dòng "Chưa tải lên" chỉ có nút "Tải lên", không có nút "Xem"
- [ ] Dòng đã có file có cả nút "Xem" và "Cập nhật"

### AC-08: Tải lên chứng từ

- [ ] Click "Tải lên" → modal mở với dropdown loại chứng từ đầy đủ
- [ ] Để trống tên → toast "Vui lòng nhập tên tài liệu"
- [ ] Không chọn file → toast "Vui lòng chọn file đính kèm"
- [ ] Điền đủ → badge chứng từ chuyển từ `bs` sang `bo` (Đang xử lý), toast xác nhận

### AC-09: Xem chi tiết chứng từ

- [ ] Click "Xem" → modal chi tiết hiển thị: tên file, kích thước, trạng thái, ngày tải lên, ngày xác minh
- [ ] Chứng từ đã có file → modal có nút "Tải về"
- [ ] Click "Tải về" → toast xác nhận (demo)

### AC-10: Responsive

- [ ] Tại 959px: 2 cột thu về 1 cột — các panel xếp dọc theo thứ tự: Thông tin tổ chức → Người đại diện → Địa chỉ → Hồ sơ

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Dữ liệu địa chỉ và chứng từ mất khi refresh trang | Cao | Lưu `ORG_ADDRESSES` và `ORG_DOCS` vào `LS.set()` (localStorage prefix `school_`) thay vì biến module thuần |
| CMND / CCCD người đại diện hiển thị plaintext | Cao | Production: mask bớt số (VD: `079 *** 1234`), chỉ hiển thị đầy đủ khi xác thực bằng mật khẩu |
| Thay đổi trường form không có dirty-check ở mức màn hình | Trung bình | Hiện tại chỉ dirty-check trong modal; màn hình chính không cảnh báo khi điều hướng đi mà chưa nhấn "Lưu" |
| Tải lên file không có giới hạn dung lượng | Trung bình | Thêm kiểm tra `file.size < 10MB` trước khi gọi API upload |
| Metadata file chứng từ là dữ liệu mock tĩnh | Thấp | Đánh dấu "Demo data"; khi có backend, thay bằng API trả về metadata thực |
| Xóa địa chỉ chưa được hỗ trợ | Thấp | Thêm nút "Xóa" kèm xác nhận; không cho xóa nếu đang là địa chỉ giao hàng của đơn hàng pending |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Lưu persistent** | Đưa `ORG_ADDRESSES` và `ORG_DOCS` vào localStorage hoặc API để tồn tại qua refresh |
| P1 | **Dirty-check màn hình chính** | Cảnh báo khi người dùng điều hướng khỏi màn hình sau khi sửa form mà chưa nhấn "Lưu" |
| P1 | **Xóa địa chỉ giao hàng** | Thêm nút "Xóa" với xác nhận; kiểm tra không xóa địa chỉ đang dùng trong đơn pending |
| P2 | **Upload file thực** | Tích hợp API upload file (S3 / GCS), lưu URL và metadata sau khi tải lên |
| P2 | **Mask CCCD** | Che bớt số CCCD, yêu cầu xác thực trước khi xem đầy đủ |
| P2 | **Lịch sử thay đổi** | Ghi log "Ai đã sửa trường nào vào lúc nào" — phục vụ kiểm toán nội bộ |
| P3 | **Phê duyệt nội bộ** | Thay đổi thông tin tổ chức hoặc người đại diện cần Hiệu trưởng xác nhận trước khi lưu |
| P3 | **Thông báo trạng thái chứng từ** | EduMart xác minh xong → push notification / email về tài khoản tổ chức |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
