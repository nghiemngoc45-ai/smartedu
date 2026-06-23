# Tài liệu Phân tích Yêu cầu
## Phân hệ Ngân sách Tổ chức — EduMart (Role: Trường học)

**Phiên bản:** 1.0  
**Ngày:** 22/06/2026  
**Tác giả:** EduMart Product Team  
**Trạng thái:** Đã triển khai

---

## 1. Tổng quan

### 1.1 Mục đích

Phân hệ Ngân sách Tổ chức cung cấp cho ban lãnh đạo và bộ phận kế toán công cụ theo dõi và kiểm soát ngân sách mua sắm theo từng phòng ban, từng học kỳ và từng năm học. Phân hệ tổng hợp dữ liệu chi tiêu thực tế từ các đơn hàng đã thực hiện, hiển thị tiến độ sử dụng ngân sách dưới dạng KPI và bảng phân tích chi tiết, giúp tổ chức phát hiện sớm các phòng ban có nguy cơ vượt ngân sách và đưa ra quyết định phân bổ kịp thời.

### 1.2 Phạm vi

Phân hệ bao gồm bốn nhóm chức năng chính:

| Nhóm | Mô tả |
|------|-------|
| **Bộ lọc ngữ cảnh** | Chọn năm học và kỳ học để thu hẹp phạm vi dữ liệu hiển thị |
| **KPI tổng quan** | 4 chỉ số tổng hợp: ngân sách được cấp, đã sử dụng, còn lại, % sử dụng |
| **Thanh tiến độ** | Biểu đồ tổng thể mức sử dụng ngân sách toàn tổ chức |
| **Bảng ngân sách theo kỳ** | Danh sách ngân sách chi tiết từng phòng ban, kèm trạng thái cảnh báo |
| **Tạo ngân sách** | Form phân bổ ngân sách cho một phòng ban trong một kỳ học cụ thể |

**Ngoài phạm vi:**
- Cập nhật chi tiêu (`spent`) — được ghi nhận tự động từ các đơn hàng hoàn thành (phân hệ Đơn mua hàng)
- Phê duyệt ngân sách — không có quy trình phê duyệt trong phiên bản 1.0
- Quản lý danh mục phòng ban (phân hệ Thành viên & Phòng ban)
- Cấu hình kỳ học (phân hệ Cấu hình tổ chức)

### 1.3 Người dùng hệ thống (Actors)

| Actor | Mô tả | Quyền truy cập |
|-------|-------|----------------|
| **Admin** | Quản trị viên tổ chức | Xem toàn bộ ngân sách, tạo ngân sách phòng ban |
| **Manager** | Trưởng phòng ban | Xem ngân sách của phòng ban mình *(enforcement trong roadmap)* |
| **Viewer** | Chỉ xem | Xem danh sách, không tạo ngân sách |
| **Buyer** | Người mua | Xem để tham chiếu khi tạo yêu cầu mua hàng |

---

## 2. Yêu cầu chức năng

### 2.1 FR-01: Bộ lọc ngữ cảnh

#### FR-01.1 Chọn năm học

**Mô tả:** Dropdown cho phép chọn năm học cần xem. Danh sách năm học lấy từ `SCHOOL_BUDGETS`.

**Quy tắc:**
- Mặc định hiển thị năm học gần nhất (phần tử đầu tiên trong `SCHOOL_BUDGETS`)
- Thay đổi năm học cập nhật toàn bộ KPI, thanh tiến độ và bảng ngân sách theo kỳ
- Chip lọc kỳ học giữ nguyên trạng thái khi chuyển năm

#### FR-01.2 Chọn kỳ học

**Mô tả:** Ba chip lọc để thu hẹp phạm vi xuống từng kỳ.

**Tùy chọn:**

| Chip | Mã | Hiệu ứng |
|------|-----|---------|
| Cả năm | `all` | KPI và bảng tổng hợp cả HK1 + HK2 (cộng dồn) |
| Học kỳ 1 | `hk1` | Chỉ hiển thị dữ liệu HK1 |
| Học kỳ 2 | `hk2` | Chỉ hiển thị dữ liệu HK2 |

**Mặc định:** Cả năm (`all`).

**Quy tắc tổng hợp khi "Cả năm":** Với mỗi phòng ban, cộng dồn `budget` và `spent` từ cả hai kỳ trước khi tính %.

---

### 2.2 FR-02: KPI tổng quan

**Mô tả:** Bốn thẻ chỉ số tổng hợp toàn tổ chức, hiển thị ngay bên dưới toolbar, cập nhật theo bộ lọc năm học và kỳ học.

**Các thẻ KPI:**

| # | Tiêu đề | Giá trị | Màu số | Thông tin phụ |
|---|---------|---------|--------|---------------|
| 1 | Ngân sách được cấp | Tổng `budget` các phòng ban | Xanh dương `#3b82f6` | Số phòng ban trong phạm vi lọc |
| 2 | Đã sử dụng | Tổng `spent` các phòng ban | Tím `#a855f7` | % so với tổng ngân sách |
| 3 | Còn lại | `totalBudget − totalSpent` | Màu theo ngưỡng | "Chưa sử dụng" |
| 4 | % sử dụng | `round(totalSpent / totalBudget × 100)` | Màu theo ngưỡng | Mini progress bar ngang |

**Màu theo ngưỡng sử dụng:**

| Mức sử dụng | Màu | Ý nghĩa |
|-------------|-----|---------|
| < 75% | Xanh lá `#22c55e` / `#15803d` | Bình thường |
| 75% – 89% | Cam `#d97706` | Cảnh báo |
| ≥ 90% | Đỏ `#dc2626` | Nguy hiểm — sắp hết ngân sách |

**Nhãn ngữ cảnh:** Phía trên 4 thẻ hiển thị dòng nhỏ "Năm học YYYY-YYYY · [Tổng cả năm | Học kỳ 1 | Học kỳ 2]" để người dùng biết rõ phạm vi dữ liệu đang xem.

---

### 2.3 FR-03: Thanh tiến độ sử dụng ngân sách

**Mô tả:** Panel riêng hiển thị tiến độ tổng thể dưới dạng thanh ngang (`progress bar`), bổ sung cho thẻ KPI.

**Thành phần:**

| Phần tử | Mô tả |
|---------|-------|
| Tiêu đề | "Tiến độ sử dụng ngân sách" |
| Số % lớn | Hiển thị phóng to `usedPct%`, màu theo ngưỡng |
| Thanh ngang | Chiều rộng `usedPct%`, màu theo ngưỡng, bo tròn |
| Nhãn dưới | "0đ" — "Xđ đã dùng / Yđ được cấp" (căn giữa, in đậm) — "Yđ" |

**Màu thanh:** Cùng bảng ngưỡng với KPI (xanh / cam / đỏ).

---

### 2.4 FR-04: Bảng ngân sách theo kỳ

#### FR-04.1 Cấu trúc bảng

**Mô tả:** Bảng liệt kê ngân sách từng phòng ban trong một kỳ học.

**Tiêu đề bảng:** "[Học kỳ X] · Năm học YYYY-YYYY"

**Các cột:**

| Cột | Nội dung | Ghi chú |
|-----|---------|---------|
| Phòng ban | Tên phòng ban | Font đậm |
| Ngân sách | Tổng ngân sách được phân bổ | Đơn vị đồng (đ) |
| Đã chi | Tổng chi tiêu thực tế | |
| Còn lại | `budget − spent` | Màu xanh nếu dương, đỏ nếu âm |
| % sử dụng | Mini progress bar + số % | Màu theo ngưỡng |
| Trạng thái | Badge màu theo ngưỡng | Xem bảng dưới |

**Dòng Tổng cộng:** Dòng cuối cùng của mỗi bảng (nền xám, chữ đậm) tổng hợp toàn bộ: tổng ngân sách, tổng chi, tổng còn lại, tổng % sử dụng của kỳ.

#### FR-04.2 Trạng thái phòng ban

| Trạng thái | Ngưỡng | Badge |
|------------|--------|-------|
| Sắp hết ngân sách | % sử dụng ≥ 90% | Đỏ |
| Cảnh báo | 75% ≤ % sử dụng < 90% | Cam |
| Đang triển khai | 0% < % sử dụng < 75% | Xanh dương |
| Chưa sử dụng | % sử dụng = 0% | Xám |

#### FR-04.3 Hiển thị theo bộ lọc kỳ

| Chip đang chọn | Bảng hiển thị |
|----------------|--------------|
| Cả năm | Bảng HK1 + Bảng HK2 (xếp dọc) |
| Học kỳ 1 | Chỉ Bảng HK1 |
| Học kỳ 2 | Chỉ Bảng HK2 |

**Trạng thái rỗng:** Khi một kỳ chưa có ngân sách nào, bảng hiển thị dòng thông báo "Chưa có ngân sách — nhấn **+ Tạo ngân sách**".

---

### 2.5 FR-05: Tạo ngân sách phòng ban

#### FR-05.1 Mở form

Admin click nút **"+ Tạo ngân sách"** trên toolbar → mở modal form.

#### FR-05.2 Trường dữ liệu

| Trường | Loại | Bắt buộc | Mặc định | Quy tắc |
|--------|------|----------|----------|---------|
| Năm học | Select | Có | Năm học đang chọn trên màn hình | Danh sách từ `SCHOOL_BUDGETS` |
| Học kỳ | Select | Có | Kỳ đang chọn (nếu không phải "Cả năm") | HK1 hoặc HK2 |
| Phòng ban | Select | Có | — | Danh sách từ `DEPTS` |
| Ngân sách (đ) | Number | Có | — | > 0 |

#### FR-05.3 Validation

| Trường hợp | Thông báo |
|------------|-----------|
| Ngân sách = 0 hoặc rỗng | Toast "Nhập số tiền ngân sách" |
| Phòng ban đã có ngân sách cho kỳ này | Toast "Phòng ban này đã có ngân sách cho kỳ học này" |

#### FR-05.4 Luồng tạo thành công

1. Validate dữ liệu đầu vào
2. Tạo bản ghi mới: `{id, year, sem, dept, budget, spent: 0}`
3. Thêm vào `DEPT_BUDGETS`
4. Đóng modal
5. Toast "Đã tạo ngân sách cho [Phòng ban]"
6. Màn hình tự cập nhật, bảng ngân sách kỳ tương ứng hiển thị dòng mới

---

## 3. Yêu cầu phi chức năng

### 3.1 NFR-01: Hiệu năng

- Tổng hợp KPI và bảng phải hoàn thành trong < 50ms (tính toán client-side thuần JavaScript)
- Chuyển đổi giữa các chip kỳ học không reload trang, cập nhật tức thì
- Thanh progress bar animate bằng CSS `transition: width .5s` — không block render

### 3.2 NFR-02: Tính chính xác tính toán

- `pct(spent, budget)`: trả về `0` khi `budget = 0` để tránh chia cho 0
- "Còn lại" có thể âm (vượt ngân sách) — hiển thị màu đỏ khi `< 0`
- Khi xem "Cả năm": cộng dồn theo phòng ban trước khi tính %, không tính % từng kỳ rồi cộng

### 3.3 NFR-03: Lưu trữ dữ liệu

- `SCHOOL_BUDGETS`: hằng số, không persist (cấu hình kỳ học quản lý ở phân hệ Tổ chức)
- `DEPT_BUDGETS`: persist qua `localStorage` — seed data nạp tự động khi key chưa tồn tại
- `spent` không được sửa tay trên màn hình này — chỉ cập nhật qua luồng đơn hàng

### 3.4 NFR-04: Giao diện responsive

| Breakpoint | Điều chỉnh |
|------------|-----------|
| ≤ 900px | Grid KPI từ 4 cột xuống 2 cột |
| ≤ 600px | Grid KPI xuống 1 cột; bảng scroll ngang |

### 3.5 NFR-05: Nhất quán màu sắc

- Ngưỡng màu (< 75% / 75-89% / ≥ 90%) áp dụng đồng nhất cho: số % KPI, thẻ "Còn lại", thanh progress bar, cột "% sử dụng" trong bảng
- Badge trạng thái phòng ban dùng hệ màu `.br` / `.bo` / `.bb` / `.bs` nhất quán với toàn ứng dụng

---

## 4. Mô hình dữ liệu

### 4.1 SchoolBudget Object

```javascript
{
  year: string,        // 'YYYY-YYYY' — năm học
  semesters: [
    {
      id: SemEnum,     // 'hk1' | 'hk2'
      label: string,   // 'Học kỳ 1' | 'Học kỳ 2'
      from: string,    // Ngày bắt đầu: 'DD/MM/YYYY'
      to: string,      // Ngày kết thúc: 'DD/MM/YYYY'
    }
  ]
}
```

### 4.2 DeptBudget Object

```javascript
{
  id: number,          // Tự tăng
  year: string,        // 'YYYY-YYYY' — khóa ngoại sang SchoolBudget
  sem: SemEnum,        // 'hk1' | 'hk2'
  dept: string,        // Tên phòng ban — khóa ngoại sang DEPTS[].name
  budget: number,      // Ngân sách được phân bổ (VND)
  spent: number,       // Đã chi tiêu thực tế (VND), mặc định 0
}
```

### 4.3 Enums

```javascript
type SemEnum = 'hk1' | 'hk2'
```

### 4.4 Ràng buộc duy nhất

```
(year, sem, dept) phải là duy nhất trong DEPT_BUDGETS
→ Một phòng ban chỉ có một bản ghi ngân sách cho mỗi kỳ học của một năm học
```

### 4.5 Logic tổng hợp theo ngữ cảnh bộ lọc

```
filterEntries(year, hk):
  if hk === 'all':
    entries = DEPT_BUDGETS.filter(b => b.year === year)
  else:
    entries = DEPT_BUDGETS.filter(b => b.year === year && b.sem === hk)

aggregateByDept(entries):
  deptMap = {}
  for each b in entries:
    deptMap[b.dept].budget += b.budget
    deptMap[b.dept].spent  += b.spent
  return Object.values(deptMap)

totalBudget = sum(depts[].budget)
totalSpent  = sum(depts[].spent)
usedPct     = pct(totalSpent, totalBudget)
```

### 4.6 Hàm hỗ trợ

```javascript
pct(spent, budget):
  if budget === 0 → return 0
  return Math.round(spent / budget * 100)

fmtV(value):
  // Định dạng số tiền với dấu phẩy ngăn cách hàng nghìn
  // VD: 28500000 → '28.500.000'
```

---

## 5. Luồng người dùng (User Flow)

### 5.1 Luồng kiểm tra tổng thể ngân sách năm học

```
Admin → Tab "Ngân sách"
  → Màn hình mở với năm học mới nhất, chip "Cả năm"
  → Xem 4 thẻ KPI: tổng ngân sách, đã dùng, còn lại, %
  → Xem thanh tiến độ tổng thể
  → Xem bảng HK1 và HK2 xếp dọc
  → Nhận diện phòng ban badge "Sắp hết ngân sách" (đỏ)
  → Liên hệ phòng ban liên quan để xem xét điều chỉnh
```

### 5.2 Luồng xem ngân sách một kỳ cụ thể

```
Manager → Tab "Ngân sách"
  → Dropdown: chọn năm học "2026-2027"
  → Click chip "Học kỳ 1"
  → Bảng thu gọn chỉ còn HK1
  → KPI cập nhật chỉ tính số liệu HK1
  → Xem % sử dụng từng phòng ban trong kỳ
```

### 5.3 Luồng phân bổ ngân sách cho phòng ban mới

```
Admin → Tab "Ngân sách"
  → Chọn năm học "2026-2027", chip "Học kỳ 2"
  → Bảng HK2 hiển thị "Chưa có ngân sách — nhấn + Tạo ngân sách"
  → Click "+ Tạo ngân sách"
  → Modal mở: Năm học tự điền "2026-2027", Học kỳ tự chọn "HK2"
  → Chọn Phòng ban: "Phòng Đào tạo"
  → Nhập Ngân sách: 120,000,000
  → Click "Tạo ngân sách"
  → Toast "Đã tạo ngân sách cho Phòng Đào tạo"
  → Bảng HK2 xuất hiện dòng "Phòng Đào tạo" với badge "Chưa sử dụng"
```

### 5.4 Luồng xem năm học cũ để đối chiếu

```
Admin → Tab "Ngân sách"
  → Dropdown: đổi sang năm học "2025-2026"
  → KPI hiển thị tổng kết năm học đã qua
  → Chip "Học kỳ 1" → xem chi tiết HK1 năm cũ
  → Đối chiếu với HK1 năm hiện tại để lập kế hoạch
```

---

## 6. Mockup giao diện (ASCII)

### 6.1 Màn hình chính — Cả năm

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Ngân sách tổ chức          [2026-2027 ▼]  [Cả năm] [Học kỳ 1] [Học kỳ 2]  [+ Tạo ngân sách] │
├─────────────────────────────────────────────────────────────────────────────┤
│  Năm học 2026-2027 · Tổng cả năm                                            │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│  │ Ngân sách cấp    │ │ Đã sử dụng       │ │ Còn lại          │ │ % sử dụng        │ │
│  │ 570.000.000đ     │ │ 399.000.000đ     │ │ 171.000.000đ     │ │ 70%              │ │
│  │ 6 phòng ban      │ │ 70% ngân sách    │ │ Chưa sử dụng     │ │ ▓▓▓▓▓▓▓░░░  70% │ │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│  Tiến độ sử dụng ngân sách                                          70%     │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░                              │
│  0đ        399.000.000đ đã dùng / 570.000.000đ được cấp        570.000.000đ│
├─────────────────────────────────────────────────────────────────────────────┤
│  Học kỳ 1 · Năm học 2026-2027                                               │
│ ┌────────────────────┬──────────────┬──────────┬──────────┬──────────┬──────┐
│ │ PHÒNG BAN          │ NGÂN SÁCH    │ ĐÃ CHI   │ CÒN LẠI │ % SỬ DỤNG│TRẠNG│
│ ├────────────────────┼──────────────┼──────────┼──────────┼──────────┼──────┤
│ │ Ban Giám hiệu      │ 80.000.000đ  │42.000.000│38.000.000│ ▓▓▓░ 53% │ ● ĐT│
│ │ Phòng Đào tạo      │120.000.000đ  │98.000.000│22.000.000│ ▓▓▓▓ 82% │ ● CB│
│ │ Phòng Hành chính   │ 60.000.000đ  │35.000.000│25.000.000│ ▓▓░░ 58% │ ● ĐT│
│ │ Phòng Kế toán      │ 40.000.000đ  │12.000.000│28.000.000│ ▓░░░ 30% │ ● ĐT│
│ │ Phòng Thư viện     │ 90.000.000đ  │67.000.000│23.000.000│ ▓▓▓░ 74% │ ● ĐT│
│ │ Khối Tự Nhiên      │180.000.000đ  │145.000.000│35.000.000│ ▓▓▓▓ 81% │ ● CB│
│ ├────────────────────┼──────────────┼──────────┼──────────┼──────────┼──────┤
│ │ Tổng cộng          │570.000.000đ  │399.000.000│171.000.000│    70%  │      │
│ └────────────────────┴──────────────┴──────────┴──────────┴──────────┴──────┘
│                                                                              │
│  Học kỳ 2 · Năm học 2026-2027                                               │
│  [Chưa có ngân sách — nhấn + Tạo ngân sách]                                │
└─────────────────────────────────────────────────────────────────────────────┘

Chú thích badge: ĐT = Đang triển khai (xanh) · CB = Cảnh báo (cam)
```

### 6.2 Modal Tạo ngân sách phòng ban

```
┌──────────────────────────────────────────────┐
│  Tạo ngân sách phòng ban                     │
│                                              │
│  Năm học              Học kỳ                 │
│  [2026-2027      ▼]  [Học kỳ 2         ▼]   │
│                                              │
│  Phòng ban                                   │
│  [Phòng Đào tạo                        ▼]   │
│                                              │
│  Ngân sách (đ)  *                            │
│  [120000000                              ]   │
│                                              │
│  [Hủy]                     [Tạo ngân sách]  │
└──────────────────────────────────────────────┘
```

### 6.3 Trạng thái cảnh báo — badge màu sắc

```
● Đang triển khai  →  badge xanh dương (p > 0% và < 75%)
● Cảnh báo         →  badge cam        (75% ≤ p < 90%)
● Sắp hết NS       →  badge đỏ         (p ≥ 90%)
○ Chưa sử dụng    →  badge xám        (p = 0%)
```

### 6.4 Chip lọc kỳ học

```
Mặc định (Cả năm):
  [■ Cả năm]  [ Học kỳ 1 ]  [ Học kỳ 2 ]

Đang xem Học kỳ 1:
  [ Cả năm ]  [■ Học kỳ 1]  [ Học kỳ 2 ]
```

---

## 7. Tiêu chí chấp nhận (Acceptance Criteria)

### AC-01: Hiển thị KPI đúng

- [ ] Mở tab "Ngân sách", 4 thẻ KPI hiển thị đúng giá trị tổng hợp theo năm học và kỳ đang chọn
- [ ] Thẻ "Ngân sách được cấp" màu xanh dương, hiển thị số phòng ban đúng
- [ ] Thẻ "% sử dụng" có mini progress bar phản ánh đúng tỷ lệ

### AC-02: Màu sắc ngưỡng đúng

- [ ] % < 75%: số liệu và thanh màu xanh lá
- [ ] 75% ≤ % < 90%: số liệu và thanh màu cam
- [ ] % ≥ 90%: số liệu và thanh màu đỏ
- [ ] Màu áp dụng nhất quán cho cả 4 KPI, thanh tiến độ, và cột % trong bảng

### AC-03: Bộ lọc năm học hoạt động

- [ ] Chọn "2025-2026" → KPI và bảng cập nhật dữ liệu năm 2025-2026
- [ ] Chọn "2026-2027" → KPI và bảng cập nhật dữ liệu năm 2026-2027
- [ ] Dropdown liệt kê đúng các năm học có trong `SCHOOL_BUDGETS`

### AC-04: Chip kỳ học hoạt động

- [ ] Click "Học kỳ 1" → chỉ hiện bảng HK1; KPI tính lại chỉ theo HK1
- [ ] Click "Học kỳ 2" → chỉ hiện bảng HK2; KPI tính lại chỉ theo HK2
- [ ] Click "Cả năm" → hiển thị cả HK1 và HK2; KPI cộng dồn từ cả hai kỳ

### AC-05: Tổng hợp "Cả năm" đúng

- [ ] Một phòng ban có HK1 budget=80M, HK2 budget=65M → "Cả năm" hiển thị budget=145M
- [ ] Một phòng ban có HK1 spent=42M, HK2 spent=60M → "Cả năm" hiển thị spent=102M, còn lại=43M

### AC-06: Trạng thái phòng ban đúng

- [ ] Phòng ban dùng 0% → badge "Chưa sử dụng" màu xám
- [ ] Phòng ban dùng 53% → badge "Đang triển khai" màu xanh dương
- [ ] Phòng ban dùng 82% → badge "Cảnh báo" màu cam
- [ ] Phòng ban dùng 92% → badge "Sắp hết ngân sách" màu đỏ

### AC-07: Dòng Tổng cộng đúng

- [ ] Dòng tổng hiển thị đúng tổng budget, tổng spent, tổng còn lại của kỳ
- [ ] Dòng tổng có nền phân biệt với các dòng dữ liệu

### AC-08: Trạng thái rỗng

- [ ] Kỳ học chưa có ngân sách nào → bảng hiển thị "Chưa có ngân sách — nhấn + Tạo ngân sách"
- [ ] Không bị lỗi chia cho 0 khi không có dữ liệu

### AC-09: Tạo ngân sách thành công

- [ ] Click "+ Tạo ngân sách" → modal mở, năm học và kỳ học tự điền theo bộ lọc hiện tại
- [ ] Nhập ngân sách hợp lệ → toast "Đã tạo ngân sách cho [Phòng ban]", dòng mới xuất hiện trong bảng
- [ ] Không nhập ngân sách → toast "Nhập số tiền ngân sách"
- [ ] Tạo trùng (cùng năm + kỳ + phòng ban) → toast "Phòng ban này đã có ngân sách cho kỳ học này"

### AC-10: Giá trị âm (vượt ngân sách)

- [ ] `spent > budget` → cột "Còn lại" hiển thị số âm màu đỏ

---

## 8. Rủi ro và giải pháp

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|-----------|
| Chia cho 0 khi `budget = 0` | Cao | Hàm `pct()` kiểm tra `budget === 0` → trả về `0` thay vì `NaN` hoặc `Infinity` |
| `spent` vượt `budget` gây hiển thị lỗi | Trung bình | Cột "Còn lại" cho phép âm, hiển thị màu đỏ; progress bar dùng `min(p, 100)%` để không tràn |
| Cộng dồn "Cả năm" cho kết quả sai nếu phòng ban chỉ có một kỳ | Trung bình | Aggregate theo `deptMap` — phòng ban thiếu một kỳ vẫn được tính đúng vì chỉ cộng những bản ghi tồn tại |
| Tạo trùng ngân sách (year + sem + dept) | Trung bình | Kiểm tra `DEPT_BUDGETS.find(...)` trước khi push, toast lỗi nếu đã tồn tại |
| Dữ liệu `spent` bị sửa tay ngoài luồng | Thấp | `spent` không có input trên màn hình này; chỉ cập nhật qua phân hệ đơn hàng |
| Phòng ban bị xóa còn bản ghi ngân sách | Thấp | Trong roadmap: cascade delete hoặc giữ tên phòng ban dưới dạng chuỗi snapshot |

---

## 9. Roadmap — Tính năng tiếp theo

| Ưu tiên | Tính năng | Mô tả |
|---------|-----------|-------|
| P1 | **Cập nhật ngân sách** | Admin chỉnh sửa `budget` đã tạo — điều chỉnh phân bổ giữa kỳ |
| P1 | **Phân quyền xem theo phòng ban** | Manager chỉ thấy dòng phòng ban của mình; KPI lọc tương ứng |
| P1 | **Liên kết với đơn hàng** | `spent` tự cập nhật khi đơn hàng chuyển trạng thái `done` |
| P2 | **Cảnh báo vượt ngưỡng** | Thông báo realtime khi phòng ban đạt 75% hoặc 90% ngân sách |
| P2 | **Biểu đồ cột so sánh** | So sánh ngân sách vs chi tiêu thực tế giữa các phòng ban dạng bar chart |
| P2 | **Export báo cáo** | Xuất PDF / Excel bảng ngân sách theo năm học và kỳ đang lọc |
| P2 | **So sánh năm học** | Đặt hai năm học cạnh nhau để đối chiếu xu hướng chi tiêu |
| P3 | **Lịch sử điều chỉnh ngân sách** | Log mỗi lần thay đổi `budget`: ai sửa, từ bao nhiêu sang bao nhiêu |
| P3 | **Dự báo chi tiêu** | Ước tính chi tiêu cuối kỳ dựa trên tốc độ chi tiêu hiện tại |
| P3 | **Phê duyệt ngân sách** | Quy trình: Manager đề xuất → Admin phê duyệt trước khi `budget` có hiệu lực |

---

*Tài liệu này phản ánh trạng thái triển khai tại phiên bản 1.0. Cập nhật cùng với mỗi sprint phát triển tiếp theo.*
