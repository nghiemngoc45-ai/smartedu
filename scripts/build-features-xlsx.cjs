/* Sinh file Excel danh sách tính năng EduMart.
   Yêu cầu: npm install exceljs  (rồi: node scripts/build-features-xlsx.cjs) */
const ExcelJS = require('exceljs');

const ROWS = [
  ['group','A','Nhóm tính năng cho người mua (khách, học sinh, sinh viên, giáo viên, phụ huynh)'],
  ['sub','1','Tài khoản & xác thực'],
  ['feat','Đăng ký / đăng nhập theo vai trò','Học sinh/Sinh viên, Giáo viên, Phụ huynh, Trường học; nút Zalo/Google/Facebook (mô phỏng)'],
  ['feat','Lưu phiên đăng nhập','Tự ghi nhớ đăng nhập trên thiết bị (localStorage)'],
  ['feat','Quản lý hồ sơ cá nhân','Cập nhật họ tên, số điện thoại, email, vai trò'],
  ['feat','Sổ địa chỉ','Lưu địa chỉ nhận hàng, đặt mặc định'],
  ['feat','Xác thực nghề giáo viên','Tải giấy tờ để mở ưu đãi đến 15% (mô phỏng)'],
  ['feat','Điểm thưởng & hạng thành viên','Tích điểm theo chi tiêu, hiển thị hạng & mức ưu đãi'],
  ['feat','OTP qua SMS/Zalo · 2FA · SSO','Xác thực nâng cao (dự kiến)'],
  ['sub','2','Tìm kiếm & khám phá'],
  ['feat','Thanh tìm kiếm','Tìm theo tựa sách, tác giả, từ khóa hoặc ISBN'],
  ['feat','Tìm trong danh mục','Lọc nhanh theo tên/tác giả/NXB ngay trong chuyên mục'],
  ['feat','Bộ lọc đa tiêu chí','Đối tượng, NXB/thương hiệu (kèm số lượng), định dạng (PDF/EPUB), khoảng giá, đánh giá 4.8★+, đang giảm giá'],
  ['feat','Chip lọc đang áp dụng','Hiển thị & xóa từng bộ lọc, đặt lại toàn bộ; tự reset khi đổi chuyên mục'],
  ['feat','Sắp xếp kết quả','Bán chạy, đánh giá cao, giá tăng / giảm'],
  ['feat','Danh mục đa dạng','Sách, SGK, tham khảo, Ebook, Sách nói, VPP, Thiết bị, theo đối tượng'],
  ['feat','Tìm bằng hình ảnh / giọng nói','Quét ISBN/bìa sách, tìm bằng giọng nói (dự kiến)'],
  ['sub','3','Trang chi tiết sản phẩm'],
  ['feat','Ảnh bìa & thông tin giá','Bìa, giá / giá gốc / % giảm, đánh giá, lượt bán'],
  ['feat','Mô tả & thông số','NXB/hãng, tác giả; ebook: định dạng/số trang/dung lượng; sách nói: thời lượng/người đọc'],
  ['feat','Biến thể sản phẩm','Bìa mềm/cứng, loại tiêu chuẩn/combo (sách giấy)'],
  ['feat','Đánh giá từ người mua','Gửi sao + nội dung + ảnh thực tế, lưu lại'],
  ['feat','Hỏi đáp sản phẩm (Q&A)','Đặt câu hỏi cho người bán, lưu lại'],
  ['feat','Sản phẩm liên quan & đã xem gần đây','Gợi ý cùng danh mục, lịch sử sản phẩm đã xem'],
  ['sub','4','Tính năng đặc thù giáo dục'],
  ['feat','Mua theo đối tượng','Tiểu học, THCS/THPT, Sinh viên, Giáo viên…'],
  ['feat','Mua theo danh sách lớp','Bộ đồ dùng chuẩn theo lớp, thêm cả bộ vào giỏ'],
  ['feat','Mua trọn bộ sách giáo khoa','Theo lớp & bộ sách (Kết nối tri thức, Chân trời, Cánh diều)'],
  ['sub','5','Giỏ hàng & thanh toán'],
  ['feat','Giỏ hàng','Nhiều sản phẩm, tăng/giảm/xóa, lưu giỏ'],
  ['feat','Mã giảm giá / voucher','EDU10, GIAOVIEN, freeship…'],
  ['feat','Phí vận chuyển','Miễn phí đơn > 300k; đơn hàng số (ebook/sách nói) miễn ship'],
  ['feat','Thanh toán đa kênh','MoMo, ZaloPay, VNPay, COD, ATM/Visa (mô phỏng)'],
  ['feat','Thanh toán nhanh không cần tài khoản','Guest checkout'],
  ['feat','Hóa đơn điện tử VAT','Xuất hóa đơn cho cá nhân/tổ chức (dự kiến)'],
  ['sub','6','Đơn hàng & sau bán'],
  ['feat','Theo dõi đơn hàng','Timeline 5 trạng thái, mô phỏng cập nhật từng chặng'],
  ['feat','Lịch sử đơn & mua lại','Danh sách đơn theo tài khoản, thêm lại đơn cũ vào giỏ'],
  ['feat','Yêu cầu đổi / trả','Gửi yêu cầu sau khi nhận hàng (mô phỏng)'],
  ['feat','Tích điểm sau mua','Tự cộng điểm thưởng theo giá trị đơn'],
  ['sub','7','Khuyến mãi & khách thân thiết'],
  ['feat','Flash sale','Khung giờ vàng với đồng hồ đếm ngược'],
  ['feat','Vòng quay may mắn','Quay 1 lần/ngày nhận điểm/voucher'],
  ['feat','Nhiệm vụ & điểm danh','Chuỗi ngày liên tiếp, cộng điểm'],
  ['feat','Giới thiệu bạn (referral)','Mã cá nhân, ưu đãi hai chiều'],
  ['feat','Trung tâm ưu đãi & voucher','Lưu mã giảm giá, áp dụng khi thanh toán'],
  ['sub','8','Cá nhân hóa, yêu thích & hỗ trợ'],
  ['feat','Danh sách yêu thích (wishlist)','Lưu/bỏ sản phẩm, badge đếm, trang riêng'],
  ['feat','Thông báo','Đơn hàng, thuê sách, vòng quay…; đánh dấu đã đọc'],
  ['feat','Quẻ sách thần số (AI)','Gợi ý sách theo thần số học bằng trợ lý AI (có bản dự phòng ngoại tuyến)'],
  ['sub','9','Ebook (sách số)'],
  ['feat','Danh mục & đọc thử','Sản phẩm số gắn nhãn E-BOOK, đọc thử miễn phí chương 1'],
  ['feat','Trình đọc','Đọc theo chương, chỉnh cỡ chữ, nền sáng/sepia/tối, lưu tiến độ, paywall'],
  ['feat','Ghi chú & đánh dấu trang','Bookmark chương + ghi chú theo từng cuốn'],
  ['feat','Mua đứt / thuê có thời hạn','Sở hữu vĩnh viễn hoặc thuê 7/30 ngày (đếm ngược, hết hạn tự thu hồi)'],
  ['sub','10','Audiobook (sách nói)'],
  ['feat','Danh mục & nghe thử','Gắn nhãn AUDIO, nghe thử giới hạn 2 phút'],
  ['feat','Trình phát','Play/pause, tua ±15s, kéo tiến trình, tốc độ 1–2x, lưu vị trí nghe'],
  ['feat','Mua đứt / thuê','Sở hữu hoặc thuê 7/30 ngày'],
  ['sub','11','Tủ sách của tôi'],
  ['feat','Tủ sách','Ebook/sách nói đã sở hữu & đang thuê (badge, đếm ngược hạn)'],
  ['feat','Đọc tiếp / nghe tiếp','Tiếp tục đúng chương/vị trí đang dở'],

  ['group','B','Nhóm B2B — Trường học & tổ chức'],
  ['feat','Tài khoản tổ chức','Vai trò Trường học / Tổ chức'],
  ['feat','Yêu cầu báo giá (RFQ)','Thông tin tổ chức + danh sách sản phẩm + ghi chú, lưu & theo dõi trong tài khoản'],
  ['feat','Bậc chiết khấu theo số lượng','≥50 (-5%), ≥200 (-10%), ≥500 (-15%)'],
  ['feat','Mua theo danh sách lớp','Thêm trọn bộ đồ dùng theo lớp vào giỏ'],
  ['feat','Công nợ · hóa đơn VAT · duyệt nhiều cấp','Quản lý mua sắm tổ chức (dự kiến)'],

  ['group','C','Nhóm người bán / nhà cung cấp (cổng riêng seller.html)'],
  ['sub','1','Tài khoản gian hàng'],
  ['feat','Đăng nhập gian hàng','Đăng nhập bằng số điện thoại gian hàng'],
  ['feat','Đăng ký mở gian hàng','Tên shop, người phụ trách, SĐT, email, GPKD, địa chỉ → chờ EduMart duyệt'],
  ['feat','Hồ sơ & xác thực gian hàng','Cập nhật thông tin, trạng thái xác thực doanh nghiệp'],
  ['sub','2','Vận hành bán hàng'],
  ['feat','Tổng quan gian hàng','Doanh thu, đơn, lượt xem, cảnh báo tồn kho, biểu đồ 7 ngày, bán chạy'],
  ['feat','Quản lý sản phẩm','Thêm/sửa/xóa; sản phẩm mới ở trạng thái chờ duyệt'],
  ['feat','Quản lý đơn hàng','Lọc trạng thái, cập nhật trạng thái, in vận đơn'],
  ['feat','Khuyến mãi gian hàng','Tạo / bật-tắt mã giảm giá riêng'],
  ['feat','Đánh giá & hỏi đáp','Xem và trả lời khách hàng'],
  ['sub','3','Tài chính'],
  ['feat','Số dư & đối soát','Số dư khả dụng, đang đối soát, đã rút lũy kế, lịch sử giao dịch'],
  ['feat','Yêu cầu rút tiền','Tạo lệnh rút về ngân hàng (mô phỏng)'],

  ['group','D','Nhóm quản trị viên — toàn sàn (cổng riêng admin.html)'],
  ['feat','Bảng điều khiển tổng quan','KPI doanh thu/đơn/người dùng/tồn kho, biểu đồ, đơn gần đây, bán chạy'],
  ['feat','Quản lý sản phẩm','Thêm/sửa/xóa sản phẩm toàn sàn'],
  ['feat','Quản lý đơn hàng','Lọc theo trạng thái, cập nhật trạng thái'],
  ['feat','Quản lý người dùng','Danh sách vai trò, điểm, số đơn'],
  ['feat','Duyệt gian hàng người bán','Duyệt / từ chối đăng ký gian hàng mới'],
  ['feat','Kiểm duyệt sản phẩm','Duyệt / từ chối sản phẩm người bán đăng trước khi lên sàn'],
  ['feat','Quản lý khuyến mãi cấp sàn','Tạo / bật-tắt mã giảm giá toàn sàn'],
  ['feat','Cài đặt hệ thống','Phí sàn, vận chuyển, cổng thanh toán, hóa đơn VAT, phân quyền (cấu hình)'],

  ['group','E','Nền tảng kỹ thuật & triển khai'],
  ['feat','Lưu dữ liệu cục bộ','localStorage cho toàn bộ thao tác (theo từng thiết bị)'],
  ['feat','Kho dữ liệu chung','edumart_mk_* dùng chung giữa cổng Người bán và Admin (gian hàng, sản phẩm chờ duyệt)'],
  ['feat','Giao diện responsive','Tương thích máy tính & điện thoại'],
  ['feat','Triển khai tự động','Vite + GitHub Pages, tự build & cập nhật mỗi lần push'],
  ['feat','Backend · CSDL · đồng bộ đa thiết bị · app di động','Hạ tầng máy chủ cho dữ liệu thật & đa người dùng (dự kiến)'],
];

const wb = new ExcelJS.Workbook();
wb.creator = 'EduMart'; wb.created = new Date(0);
const ws = wb.addWorksheet('Tính năng', {views:[{state:'frozen', ySplit:3}]});
ws.columns = [{width:10},{width:40},{width:75}];

const C = {
  title:'FF3F9B54', header:'FFD7ECDC', group:'FFBFE0C8', sub:'FFEEF7F0',
  headerText:'FF1F5A30', groupText:'FF13502A', subText:'FF21503A', border:'FFD8E8DC'
};
const thin = {style:'thin', color:{argb:C.border}};
const allBorders = {top:thin,left:thin,bottom:thin,right:thin};
const fill = argb => ({type:'pattern', pattern:'solid', fgColor:{argb}});

// Title
ws.mergeCells('A1:C1');
const t = ws.getCell('A1');
t.value = 'DANH SÁCH TÍNH NĂNG HỆ THỐNG EDUMART — SÀN SÁCH, EBOOK, SÁCH NÓI & THIẾT BỊ GIÁO DỤC';
t.fill = fill(C.title);
t.font = {bold:true, size:14, color:{argb:'FFFFFFFF'}};
t.alignment = {horizontal:'center', vertical:'middle', wrapText:true};
ws.getRow(1).height = 34;

// Spacer/legend
ws.mergeCells('A2:C2');
const lg = ws.getCell('A2');
lg.value = 'Chú thích: (không nhãn) = đã có  ·  (mô phỏng) = demo chưa nối hệ thống thật  ·  (dự kiến) = chưa triển khai';
lg.font = {italic:true, size:10, color:{argb:'FF5A6A60'}};
lg.alignment = {horizontal:'center', vertical:'middle'};
ws.getRow(2).height = 20;

// Header
const h = ws.addRow(['Mã nhóm','Chức năng','Mô tả']);
h.eachCell(c=>{c.fill=fill(C.header);c.font={bold:true,color:{argb:C.headerText}};c.alignment={vertical:'middle'};c.border=allBorders;});
h.height = 22;

// Body
for (const r of ROWS) {
  if (r[0]==='group') {
    const row = ws.addRow([r[1], r[2], '']);
    ws.mergeCells(`B${row.number}:C${row.number}`);
    row.eachCell({includeEmpty:true}, c=>{c.fill=fill(C.group);c.font={bold:true,color:{argb:C.groupText}};c.border=allBorders;c.alignment={vertical:'middle',wrapText:true};});
    row.getCell(1).alignment={horizontal:'center',vertical:'middle'};
    row.height = 24;
  } else if (r[0]==='sub') {
    const row = ws.addRow([r[1], r[2], '']);
    ws.mergeCells(`B${row.number}:C${row.number}`);
    row.eachCell({includeEmpty:true}, c=>{c.fill=fill(C.sub);c.font={bold:true,color:{argb:C.subText}};c.border=allBorders;c.alignment={vertical:'middle'};});
    row.getCell(1).alignment={horizontal:'center',vertical:'middle'};
    row.height = 20;
  } else {
    const row = ws.addRow(['', r[1], r[2]]);
    row.eachCell({includeEmpty:true}, c=>{c.border=allBorders;c.alignment={vertical:'top',wrapText:true};});
    row.getCell(2).font={bold:false};
    row.getCell(3).font={color:{argb:'FF33403a'}};
  }
}

const out = process.argv[2] || 'EduMart-Danh-sach-tinh-nang.xlsx';
wb.xlsx.writeFile(out).then(()=>console.log('Đã tạo', out));
