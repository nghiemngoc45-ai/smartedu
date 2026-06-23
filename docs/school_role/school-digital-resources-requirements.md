# Tài liệu Phân tích Yêu cầu
## Phân hệ Ebook & Tài nguyên số — EduMart School

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Ebook & Tài nguyên số cung cấp cho nhân viên nhà trường công cụ quản lý toàn bộ vòng đời tài nguyên học liệu kỹ thuật số: từ theo dõi license đang hoạt động, cảnh báo sắp hết hạn, xem chi tiết lịch sử giao dịch, đến khởi tạo yêu cầu gia hạn trực tiếp qua hệ thống RFQ. Phân hệ này là đầu mối trung tâm để đảm bảo học sinh và giáo viên không bị gián đoạn tiếp cận tài nguyên học tập.

### 1.2 Phạm vi

Phân hệ bao gồm ba nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Tổng quan license** | KPI nhanh: số lượng ebook, license đang dùng, sắp hết hạn, đã hết hạn |
| **Danh sách & Giám sát** | Xem toàn bộ ebook đang sở hữu, trạng thái từng license, cảnh báo màu sắc |
| **Chi tiết & Gia hạn** | Xem đầy đủ thông tin, lịch sử giao dịch, lịch sử gia hạn; khởi tạo RFQ gia hạn |

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Nhân viên mua sắm** | Phụ trách mua sắm, quản lý hợp đồng và license | Toàn bộ tính năng: xem, chi tiết, gia hạn |
| **Kế toán** | Theo dõi chi phí license và hợp đồng | Xem danh sách và chi tiết, không tạo RFQ |
| **Quản lý trường** | Nắm tổng quan tài nguyên số nhà trường | Xem danh sách và KPI |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Bảng KPI tổng quan

#### FR-01.1 Hiển thị KPI

**Mô tả:** Hệ thống tính toán và hiển thị 6 chỉ số tổng hợp phía trên danh sách, cung cấp cái nhìn nhanh về tình trạng tài nguyên số.

**Các chỉ số:**

| Thứ tự | Chỉ số | Nguồn tính | Màu nổi bật |
|--------|--------|-----------|-------------|
| 1 | Tổng Ebook sở hữu | `EBOOKS.length` | Xanh dương `#2563eb` |
| 2 | Tổng license | Tổng `e.lic` của tất cả ebook | Xanh lá `#15803d` |
| 3 | Đang sử dụng | Tổng `e.used` | Tím `#7c3aed` |
| 4 | License còn trống | Tổng license − Tổng đang dùng | Xanh lá `#059669` |
| 5 | Sắp hết hạn | Số ebook hết hạn trong 30 ngày tới | Cam `#c2410c` |
| 6 | Đã hết hạn | Số ebook có `exp < ngày hôm nay` | Đỏ `#dc2626` |

**Quy tắc tính "sắp hết hạn":** `parsePrDate(e.exp) ≤ today + 30 ngày` và chưa hết hạn.

**Layout:** Grid 6 cột đều nhau, mỗi ô có màu nền nhạt riêng, số lớn (26px, đậm) + nhãn nhỏ (12px).

---

### 2.2 FR-02: Danh sách Ebook

#### FR-02.1 Hiển thị danh sách

**Mô tả:** Toàn bộ ebook sở hữu hiển thị dưới dạng bảng cuộn dọc, không phân trang.

**Dữ liệu hiển thị trên mỗi dòng:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Tên Ebook | Tên đầy đủ (đậm) + nhà xuất bản (nhỏ, màu mờ) | 2 dòng thông tin |
| Danh mục | Badge xám với nhãn danh mục (Toán, Khoa học, ...) | |
| Loại license | Text (mặc định: "Số lượng/năm") | |
| Tổng | Tổng số license đã mua | Căn phải |
| Đang dùng | Số license đang được sử dụng | Căn phải, màu cảnh báo theo % |
| Còn trống | Số license chưa cấp phát | Căn phải, xanh lá nếu > 0, đỏ nếu = 0 |
| Ngày kích hoạt | DD/MM/YYYY hoặc "—" nếu chưa có | |
| Ngày hết hạn | DD/MM/YYYY | |
| Trạng thái | Badge màu theo tình trạng hết hạn | Xem FR-02.2 |
| Hành động | [Chi tiết] [Gia hạn] | 2 nút act-sm |

#### FR-02.2 Trạng thái license và màu cảnh báo

**Trạng thái theo ngày hết hạn:**

| Trạng thái | Điều kiện | Badge |
|------------|----------|-------|
| Còn hạn | `exp > today + 30 ngày` | Xanh lá `bg` |
| Sắp hết hạn | `today < exp ≤ today + 30 ngày` | Cam `bo` |
| Hết hạn | `exp < today` | Đỏ `br` |
| Không xác định | Không parse được ngày | Xám `bs` |

**Màu cột "Đang dùng" theo tỷ lệ sử dụng:**

| Tỷ lệ | Màu |
|-------|-----|
| ≥ 90% | Đỏ `#dc2626` — cần bổ sung ngay |
| 70% – 89% | Vàng `#d97706` — cần theo dõi |
| < 70% | Xanh lá `#22c55e` — bình thường |

---

### 2.3 FR-03: Chi tiết Ebook

#### FR-03.1 Mở modal chi tiết

**Mô tả:** Click nút [Chi tiết] mở modal kích thước lớn (`modal-xl`) hiển thị đầy đủ thông tin của một ebook.

**Cấu trúc modal:**

```
[Tên Ebook]
[Nhà xuất bản · Badge danh mục]

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Tổng license │ │ Đang sử dụng │ │  Còn trống   │
│      50      │ │     38       │ │     12       │
└──────────────┘ └──────────────┘ └──────────────┘

Loại license: Số lượng/năm     Trạng thái: [Còn hạn]
Ngày kích hoạt: 01/09/2025     Ngày hết hạn: 31/08/2026

[Lịch sử giao dịch — nếu có]
[Lịch sử gia hạn — nếu có]

[Đóng]  [Gia hạn license]
```

#### FR-03.2 Phần lịch sử giao dịch

**Điều kiện hiển thị:** Chỉ xuất hiện khi ebook có trường `rfq` hoặc `po` (không rỗng).

**Thông tin hiển thị:**

| Trường | Nhãn | Ghi chú |
|--------|------|---------|
| `rfq` | Nguồn RFQ | Mã RFQ tham chiếu |
| `po` | Đơn mua hàng | Mã PO |
| `sup` | Nhà cung cấp | Tên NCC |
| `purchasedAt` | Ngày mua | DD/MM/YYYY |
| `contractVal` | Giá trị HĐ | Định dạng `fmtV()` + "đ" |

**Layout:** Grid 2 cột, nền `var(--surface)`, bo tròn 10px.

#### FR-03.3 Phần lịch sử gia hạn

**Điều kiện hiển thị:** Chỉ xuất hiện khi mảng `renewHistory` có ít nhất một phần tử.

**Bảng lịch sử gia hạn:**

| Cột | Nội dung |
|-----|---------|
| Ngày gia hạn | DD/MM/YYYY |
| Số license | Số lượng + chữ "license" |
| Thời hạn | VD: "1 năm" |
| Chi phí | Định dạng `fmtV()` + "đ" |

---

### 2.4 FR-04: Gia hạn License

#### FR-04.1 Khởi tạo luồng gia hạn

**Mô tả:** Có hai điểm khởi tạo gia hạn — nút [Gia hạn] trên danh sách và nút [Gia hạn license] trong modal chi tiết. Cả hai đều gọi `renewLicense(id)`.

**Luồng khởi tạo (`renewLicense`):**
1. Tìm ebook theo `id` trong mảng `EBOOKS`
2. Đặt `rfqType = 'ebook'`, lưu tham chiếu ebook vào `rfqEbookRef`
3. Khởi tạo danh sách nhà cung cấp: nếu ebook có trường `sup` và NCC đó tồn tại trong `SUPPLIERS` → tự động thêm vào `rfqSupList` dưới dạng chip NCC đã đăng ký (badge "Hệ thống")
4. Mở form RFQ ở chế độ "Gia hạn license"

#### FR-04.2 Form RFQ gia hạn

**Tiêu đề modal:** `Gia hạn license — [Tên ebook]` (cắt bớt sau 32 ký tự nếu quá dài).

**Trường dữ liệu đặc thù cho ebook:**

| Trường | ID | Loại | Bắt buộc | Giá trị mặc định |
|--------|-----|------|----------|-----------------|
| Tên Ebook / Phần mềm | `rfqEbookName` | Text | Có | `rfqEbookRef.title` (nếu gia hạn) |
| Số lượng license | `rfqEbookLic` | Number | Không | `rfqEbookRef.lic` (nếu gia hạn) |
| Thời hạn license | `rfqEbookPeriod` | Select | Không | "1 năm" (mặc định) |

**Tùy chọn thời hạn license:**
- 1 năm *(mặc định)*
- 2 năm
- 3 năm
- Vĩnh viễn

**Trường dữ liệu chung (chia sẻ với RFQ thường):**

| Trường | ID | Loại | Bắt buộc | Ghi chú |
|--------|-----|------|----------|---------|
| Loại yêu cầu | `rfqTypeEl` | Select | Có | Mặc định "Ebook & License" |
| Nhà cung cấp | — | Chip + Search | Có | Tự điền NCC hiện tại nếu có |
| Ngân sách ước tính | `rfqBudget` | Number | Không | Đơn vị đồng |
| Hạn chót nhận báo giá | `rfqDue` | Date | Không | ISO date |
| Mô tả yêu cầu | `rfqNote` | Textarea | Không | Lưu vào `desc` của RFQ |

#### FR-04.3 Chọn nhà cung cấp trong form gia hạn

**Mô tả:** Sử dụng cùng hệ thống chọn NCC với RFQ thường (tham chiếu FR trong tài liệu RFQ). Hai chế độ song song:

**Chế độ 1 — NCC trong hệ thống (Marketplace):**
- Ô tìm kiếm với gợi ý tự động theo `SUP_SUGGEST['ebook']`
- Gợi ý mặc định (khi chưa gõ): NCC thuộc nhóm `ebook`: Fahasa, NXB Giáo dục, Nhà sách Tri Thức
- Tìm theo tên (substring, không phân biệt hoa/thường), tối đa 8 gợi ý
- NCC đã chọn: chip màu xanh dương với badge "Hệ thống"

**Chế độ 2 — NCC ngoài hệ thống:**
- Nút "+ Thêm NCC ngoài hệ thống" (kiểu dashed border, màu tím)
- Form inline với 6 trường: Tên NCC*, Người liên hệ, Email*, SĐT, Website, Ghi chú
- NCC ngoài hệ thống: chip màu tím với badge "Ngoài HT"

#### FR-04.4 Lưu RFQ gia hạn (`saveRFQ` — nhánh ebook)

**Validation:**
- Tên Ebook không được rỗng → toast "Nhập tên Ebook"
- Phải có ít nhất một nhà cung cấp → toast "Chọn ít nhất một nhà cung cấp"

**Dữ liệu RFQ được tạo:**

```javascript
{
  id: 'RFQ-2026-XXX',      // Auto-increment
  title: '[Ebook] {tên ebook}', // Tiền tố [Ebook]
  sups: [...rfqSupList],   // Mảng NCC đã chọn
  resp: 0,                  // Số báo giá nhận được
  budget: number,           // Ngân sách ước tính
  due: 'DD/MM/YYYY',       // Hạn chót
  status: 'open',
  type: 'ebook',
  desc: string,             // Nội dung rfqNote
  quotes: []                // Chưa có báo giá
}
```

**Toast xác nhận:** "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"

**Sau khi lưu:** Reset toàn bộ state RFQ, đóng modal, render lại màn hình hiện tại.

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- KPI tính toán client-side, phản hồi < 50ms
- Danh sách 6–20 ebook không gây giật lag khi render
- Modal chi tiết mở tức thì (không có network call)

### 3.2 NFR-02: Cảnh báo chủ động

- Ebook "Sắp hết hạn" (≤ 30 ngày) phải nổi bật ở cả KPI (số đếm màu cam) lẫn badge trong bảng
- Ebook "Đã hết hạn" phải nổi bật ở cả KPI (số đếm màu đỏ) lẫn badge đỏ trong bảng
- Cột "Đang dùng" đổi màu động theo mức sử dụng — nhân viên nhận biết ngay khi cần bổ sung license

### 3.3 NFR-03: Tính liên thông với RFQ

- Luồng gia hạn phải giữ nguyên NCC hiện tại (auto-fill `rfqSupList`)
- Tiêu đề RFQ tạo ra phải có tiền tố `[Ebook]` để phân biệt trong màn hình Yêu cầu báo giá
- `rfqEbookRef` lưu đủ thông tin để form hiển thị đúng giá trị mặc định (tên, số license)

### 3.4 NFR-04: Nhất quán UI

- Badge trạng thái dùng cùng class (`bg`, `bo`, `br`, `bs`) với toàn bộ hệ thống
- Màu nền KPI card đồng nhất: xanh nhạt / xanh lá nhạt / tím nhạt / cam nhạt / đỏ nhạt
- Modal chi tiết dùng `modal-xl` để hiển thị bảng lịch sử không bị cắt
- Các nút hành động trên bảng dùng class `act-sm` (nút phụ nhỏ)

### 3.5 NFR-05: Toàn vẹn dữ liệu

- Số license "Còn trống" không bao giờ hiển thị số âm (nếu `used > lic` do lỗi dữ liệu, hiển thị 0 và màu đỏ)
- Ngày không parse được (`parsePrDate` trả `null`) → trạng thái "Không xác định" badge xám, không gây lỗi JS

---

## 4. Mô hình dữ liệu

### 4.1 Ebook Object

```javascript
{
  id: number,              // ID duy nhất (1, 2, 3, ...)
  title: string,           // Tên đầy đủ của ebook/tài nguyên
  pub: string,             // Nhà xuất bản
  sup: string,             // Tên nhà cung cấp (khớp với SUPPLIERS[].name)
  cat: string,             // Danh mục: 'Toán' | 'Khoa học' | 'Ngoại ngữ' | 'Lịch sử' | ...
  licType: string,         // Loại license, mặc định 'Số lượng/năm'
  lic: number,             // Tổng số license đã mua
  used: number,            // Số license đang sử dụng
  activatedAt: string,     // 'DD/MM/YYYY' — ngày kích hoạt
  exp: string,             // 'DD/MM/YYYY' — ngày hết hạn
  rfq: string,             // Mã RFQ nguồn, VD: 'RFQ-2025-031'
  po: string,              // Mã đơn mua hàng, VD: 'ORD-2025-0950'
  purchasedAt: string,     // 'DD/MM/YYYY' — ngày mua
  contractVal: number,     // Giá trị hợp đồng (đồng)
  renewHistory: RenewEntry[], // Mảng lịch sử gia hạn (rỗng nếu chưa gia hạn)
}
```

### 4.2 RenewEntry Object

```javascript
{
  date: string,    // 'DD/MM/YYYY' — ngày gia hạn
  lic: number,     // Số lượng license khi gia hạn
  period: string,  // VD: '1 năm', '2 năm'
  cost: number,    // Chi phí gia hạn (đồng)
}
```

### 4.3 Dữ liệu mẫu hiện tại (EBOOKS)

| ID | Tên | NXB | NCC | Tổng | Đang dùng | Hết hạn |
|----|-----|-----|-----|------|-----------|---------|
| 1 | Toán học nâng cao lớp 12 | NXB Giáo dục | NXB Giáo Dục | 50 | 38 | 31/08/2026 |
| 2 | Vật lý đại cương (bộ 3 tập) | NXB ĐH Quốc gia | NXB ĐH Quốc gia | 30 | 22 | 31/08/2026 |
| 3 | Tiếng Anh B1-B2 Cambridge Suite | Cambridge Press | Cambridge Press VN | 100 | 87 | 31/12/2026 |
| 4 | Lịch sử Việt Nam toàn tập | NXB Giáo dục | NXB Giáo Dục | 40 | 12 | 31/08/2026 |
| 5 | Hóa học hữu cơ thực hành | NXB KHKT | NXB KHKT | 25 | 25 | 30/06/2026 |
| 6 | Sinh học phổ thông tập 1 | NXB Giáo dục | NXB Giáo Dục | 20 | 20 | 31/05/2026 |

**Ghi chú về dữ liệu mẫu tại 22/06/2026:**
- Ebook #5 (Hóa học — hết hạn 30/06/2026): Sắp hết hạn (còn 8 ngày)
- Ebook #6 (Sinh học — hết hạn 31/05/2026): Đã hết hạn
- Cả 4 ebook #5 và #6 đã dùng hết 100% license (cần bổ sung)

### 4.4 Gợi ý NCC theo loại (`SUP_SUGGEST`)

```javascript
const SUP_SUGGEST = {
  ebook: ['sup-003', 'sup-004', 'sup-005'],
  // sup-003: Fahasa, sup-004: NXB Giáo dục, sup-005: Nhà sách Tri Thức
}
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng kiểm tra và xử lý ebook sắp hết hạn

```
Nhân viên → Tab "Ebook & Tài nguyên số"
  → KPI hiển thị: "2 Sắp hết hạn" (màu cam)
  → Nhìn bảng: badge cam "Sắp hết hạn" ở dòng ebook tương ứng
  → Click [Chi tiết] → Modal mở
    → Xem ngày hết hạn: 30/06/2026
    → Xem lịch sử giao dịch: NCC là "NXB KHKT", Giá HĐ: 3.75tr
    → Click [Gia hạn license]
  → Form RFQ mở với chế độ "Gia hạn license"
    → Tên Ebook: đã điền sẵn "Hóa học hữu cơ thực hành"
    → Số license: đã điền sẵn "25"
    → NCC: đã chọn sẵn "NXB KHKT" (chip xanh "Hệ thống")
    → Nhân viên điền Ngân sách + Hạn chót → Click [Gửi yêu cầu]
  → Toast: "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"
  → RFQ mới xuất hiện trong màn hình Yêu cầu báo giá với tiêu đề "[Ebook] Hóa học hữu cơ thực hành"
```

### 5.2 Luồng xem lịch sử gia hạn

```
Nhân viên → Tab "Ebook & Tài nguyên số"
  → Nhìn cột "Đang dùng" của "Tiếng Anh B1-B2": 87/100 (màu vàng — 87%)
  → Click [Chi tiết]
  → Modal mở:
    → KPI mini: Tổng 100 / Đang dùng 87 / Còn trống 13
    → Lịch sử giao dịch: RFQ-2025-041, NCC: Cambridge Press VN, Giá: 32tr
    → Lịch sử gia hạn: 1 lần — 01/01/2025, 100 license, 1 năm, 28tr
  → Nhân viên quyết định chưa cần gia hạn → Click [Đóng]
```

### 5.3 Luồng gia hạn với NCC ngoài hệ thống

```
Nhân viên → Dòng ebook cần gia hạn → Click [Gia hạn]
  → Form RFQ mở, NCC hiện tại được tự điền
  → Nhân viên muốn so sánh thêm NCC mới ngoài hệ thống
  → Click "+ Thêm NCC ngoài hệ thống"
  → Form inline mở (nền tím nhạt)
    → Điền: Tên NCC*, Email*, (tuỳ chọn: Người liên hệ, SĐT, Website, Ghi chú)
    → Click [Thêm vào danh sách]
  → Chip NCC mới xuất hiện với badge tím "Ngoài HT"
  → Giờ có 2 chip NCC: 1 xanh (hệ thống) + 1 tím (ngoài HT)
  → Điền Budget + Deadline → [Gửi yêu cầu]
  → RFQ gửi đến 2 NCC để so sánh báo giá
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình chính — Danh sách Ebook

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Ebook & Tài nguyên số                                                   │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│  │      6       │ │    265       │ │    204       │                     │
│  │ Tổng Ebook  │ │ Tổng license │ │ Đang sử dụng│                     │
│  └──────────────┘ └──────────────┘ └──────────────┘                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│  │      61      │ │      1       │ │      1       │                     │
│  │License trống│ │ Sắp hết hạn │ │ Đã hết hạn  │                     │
│  └──────────────┘ └──────────────┘ └──────────────┘                     │
├──────────────┬──────────┬──────────┬────┬────┬────┬───────────┬─────────┤
│ TÊN EBOOK   │ DANH MỤC │ LOẠI LIC │TỔNG│DÙNG│CÒN │ HẾT HẠN  │ TTRANG  │
├──────────────┼──────────┼──────────┼────┼────┼────┼───────────┼─────────┤
│ Toán học... │ [Toán]   │Số lượng/ │ 50 │ 38 │ 12 │31/08/2026 │[Còn hạn]│
│ NXB Giáo dục│          │năm       │    │    │    │           │         │[Chi tiết][Gia hạn]
├──────────────┼──────────┼──────────┼────┼────┼────┼───────────┼─────────┤
│ Tiếng Anh...│[Ngoại ngữ│Số lượng/ │100 │ 87 │ 13 │31/12/2026 │[Còn hạn]│
│ Cambridge...│          │năm       │    │    │    │           │         │[Chi tiết][Gia hạn]
├──────────────┼──────────┼──────────┼────┼────┼────┼───────────┼─────────┤
│ Hóa học...  │[Khoa học]│Số lượng/ │ 25 │■25 │■ 0 │30/06/2026 │[Sắp hạn]│
│ NXB KHKT    │          │năm       │    │    │    │           │         │[Chi tiết][Gia hạn]
├──────────────┼──────────┼──────────┼────┼────┼────┼───────────┼─────────┤
│ Sinh học... │[Khoa học]│Số lượng/ │ 20 │■20 │■ 0 │31/05/2026 │[Hết hạn]│
│ NXB Giáo dục│          │năm       │    │    │    │           │         │[Chi tiết][Gia hạn]
└──────────────┴──────────┴──────────┴────┴────┴────┴───────────┴─────────┘
```

### 6.2 Modal chi tiết Ebook

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Tiếng Anh B1-B2 Cambridge Suite                                        │
│  Cambridge Press · [Ngoại ngữ]                                          │
│                                                                         │
│  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐                 │
│  │ TỔNG LICENSE │ │ ĐANG SỬ DỤNG │ │  CÒN TRỐNG   │                 │
│  │     100      │ │      87      │ │      13      │                 │
│  └───────────────┘ └───────────────┘ └───────────────┘                 │
│                                                                         │
│  Loại license: Số lượng/năm       Trạng thái: [Còn hạn]                │
│  Ngày kích hoạt: 01/01/2026       Ngày hết hạn: 31/12/2026             │
│                                                                         │
│  Lịch sử giao dịch                                                      │
│  ┌─────────────────────────────────────────────────┐                   │
│  │  Nguồn RFQ    RFQ-2025-041                      │                   │
│  │  Đơn mua hàng ORD-2025-1120                     │                   │
│  │  Nhà cung cấp Cambridge Press VN                │                   │
│  │  Ngày mua     28/12/2025                        │                   │
│  │  Giá trị HĐ   32tr đ                            │                   │
│  └─────────────────────────────────────────────────┘                   │
│                                                                         │
│  Lịch sử gia hạn                                                        │
│  ┌─────────────┬──────────────┬──────────┬──────────┐                  │
│  │ NGÀY GH     │ SỐ LICENSE   │ THỜI HẠN │ CHI PHÍ  │                  │
│  ├─────────────┼──────────────┼──────────┼──────────┤                  │
│  │ 01/01/2025  │ 100 license  │ 1 năm    │ 28tr đ   │                  │
│  └─────────────┴──────────────┴──────────┴──────────┘                  │
│                                               [Đóng] [Gia hạn license] │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Form Gia hạn License (RFQ)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Gia hạn license — Hóa học hữu cơ thực hành                            │
│                                                                         │
│  Loại yêu cầu                                                           │
│  [Ebook & License            ▼]                                         │
│                                                                         │
│  Tên Ebook / Phần mềm *                                                 │
│  [Hóa học hữu cơ thực hành                    ]                        │
│                                                                         │
│  Số lượng license               Thời hạn license                        │
│  [25                    ]       [1 năm              ▼]                  │
│                                                                         │
│  Nhà cung cấp nhận báo giá *                                            │
│  [● NXB KHKT  Hệ thống  ×]                                             │
│  [Tìm kiếm nhà cung cấp trong hệ thống...             ]                │
│  [+ Thêm NCC ngoài hệ thống]                                            │
│                                                                         │
│  Ngân sách ước tính (đ)         Hạn chót nhận báo giá                   │
│  [                     ]        [    /    /          ]                  │
│                                                                         │
│  Mô tả yêu cầu                                                          │
│  [                                                    ]                 │
│  [                                                    ]                 │
│                                                                         │
│                                               [Hủy] [Gửi yêu cầu]      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: KPI hiển thị đúng

- [ ] Mở tab "Ebook & Tài nguyên số" → hiển thị đủ 6 KPI card
- [ ] "Tổng Ebook" = số dòng trong EBOOKS array
- [ ] "Tổng license" = tổng `e.lic` của tất cả ebook
- [ ] "Đang sử dụng" = tổng `e.used`
- [ ] "License còn trống" = Tổng license − Đang sử dụng
- [ ] "Sắp hết hạn" chỉ đếm ebook chưa hết hạn nhưng hết hạn trong 30 ngày tới
- [ ] "Đã hết hạn" chỉ đếm ebook có `exp < ngày hôm nay`

### AC-02: Bảng danh sách hiển thị đúng

- [ ] Mỗi dòng hiển thị: tên + NXB, danh mục (badge), loại license, tổng, đang dùng, còn trống, kích hoạt, hết hạn, trạng thái, 2 nút
- [ ] Cột "Đang dùng" màu đỏ khi ≥ 90%, vàng khi ≥ 70%, xanh khi < 70%
- [ ] Cột "Còn trống" màu xanh lá khi > 0, đỏ khi = 0
- [ ] Badge "Sắp hết hạn" màu cam (bo) đúng với ebook ≤ 30 ngày hết hạn
- [ ] Badge "Hết hạn" màu đỏ (br) đúng với ebook đã hết hạn

### AC-03: Modal chi tiết hoạt động đúng

- [ ] Click [Chi tiết] → modal-xl mở đúng ebook
- [ ] 3 KPI mini hiển thị đúng: Tổng / Đang dùng / Còn trống
- [ ] Màu "Đang dùng" trong modal nhất quán với màu trong bảng
- [ ] Phần "Lịch sử giao dịch" chỉ hiển thị khi ebook có `rfq` hoặc `po`
- [ ] Phần "Lịch sử gia hạn" chỉ hiển thị khi `renewHistory.length > 0`
- [ ] Ebook không có lịch sử gia hạn → không có section đó trong modal

### AC-04: Luồng gia hạn hoạt động đúng

- [ ] Click [Gia hạn] hoặc [Gia hạn license] (trong modal) → mở form RFQ chế độ ebook
- [ ] Tiêu đề form: "Gia hạn license — [Tên ebook]" (không phải "Tạo yêu cầu báo giá")
- [ ] Trường "Tên Ebook" đã được điền sẵn tên ebook
- [ ] Trường "Số lượng license" đã được điền sẵn số license hiện tại
- [ ] NCC hiện tại của ebook (nếu có trong SUPPLIERS) tự động xuất hiện dưới dạng chip "Hệ thống"
- [ ] Gửi form thành công → RFQ mới tạo với title `[Ebook] {tên}`
- [ ] Toast hiển thị: "Đã tạo RFQ gia hạn — chờ báo giá từ nhà cung cấp"

### AC-05: Validation form gia hạn

- [ ] Xóa tên ebook rồi Submit → toast "Nhập tên Ebook", không tạo RFQ
- [ ] Xóa tất cả NCC rồi Submit → toast "Chọn ít nhất một nhà cung cấp", không tạo RFQ
- [ ] Điền đủ → tạo RFQ thành công, RFQ xuất hiện trong màn Yêu cầu báo giá

### AC-06: Gợi ý NCC đúng theo loại ebook

- [ ] Mở form gia hạn (type=ebook), click vào ô tìm kiếm NCC mà không gõ gì → gợi ý mặc định hiện 3 NCC: Fahasa, NXB Giáo dục, Nhà sách Tri Thức
- [ ] Gõ "fahasa" → gợi ý lọc chỉ còn Fahasa
- [ ] NCC đã chọn → bị mờ trong dropdown, không thể chọn lại

### AC-07: NCC ngoài hệ thống

- [ ] Click "+ Thêm NCC ngoài hệ thống" → form inline mở
- [ ] Bỏ trống "Tên NCC" hoặc "Email" → toast cảnh báo, không thêm
- [ ] Điền đủ → chip tím "Ngoài HT" xuất hiện
- [ ] Có thể có đồng thời NCC hệ thống và NCC ngoài hệ thống trong cùng một RFQ

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Ebook hết hạn mà không ai nhận thấy | Cao | KPI "Đã hết hạn" màu đỏ nổi bật + badge đỏ trong bảng; xem xét thêm thông báo trong Dashboard |
| NCC ebook không có trong SUPPLIERS → không auto-fill | Trung bình | Kiểm tra `SUPPLIERS.find(x=>x.name===e.sup)`, nếu không tìm thấy chỉ để `rfqSupList=[]` — nhân viên tự chọn |
| Ngày hết hạn sai định dạng → `parsePrDate` trả `null` | Trung bình | `ebookStatus` trả `['Không xác định','bs']` — không crash, không hiển thị cảnh báo sai |
| License dùng nhiều hơn tổng (dữ liệu bẩn) | Thấp | Cột "Còn trống" hiển thị `max(0, lic-used)` + màu đỏ để phát hiện |
| Form gia hạn không giữ trạng thái khi đổi loại yêu cầu | Thấp | Khi đổi loại (`rfqTypeEl` onchange) gọi lại `openRFQ()` → reset `rfqEbookRef=null`; đây là hành vi mong muốn |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Thông báo tự động hết hạn** | Dashboard/notification hiển thị cảnh báo khi có ebook sắp hết hạn trong 30 ngày |
| P1 | **Tìm kiếm & lọc danh sách ebook** | Tìm theo tên, lọc theo danh mục, lọc theo trạng thái (giống màn RFQ) |
| P2 | **Phân bổ license theo lớp/phòng ban** | Theo dõi ai đang dùng license nào |
| P2 | **Link 2 chiều RFQ ↔ Ebook** | Sau khi RFQ gia hạn hoàn tất, tự động cập nhật `exp` và `renewHistory` trong EBOOKS |
| P2 | **Cảnh báo dùng cạn license** | Khi `used/lic ≥ 90%`, hiển thị banner cảnh báo trong chi tiết ebook |
| P3 | **Import license từ file** | Nhập danh sách ebook từ Excel/CSV |
| P3 | **Báo cáo chi phí license** | Tổng chi phí license theo năm học, so sánh năm trước |
| P3 | **Ghi chú và đính kèm hợp đồng** | Upload file hợp đồng PDF vào từng ebook |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
