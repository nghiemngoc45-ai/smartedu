/* ---------------- Data ---------------- */
const fmt = n => n.toLocaleString('vi-VN') + 'đ';
const AUD = {tieuhoc:'Tiểu học',thcs:'THCS',thpt:'THPT',sinhvien:'Sinh viên',giaovien:'Giáo viên',school:'Trường học'};
const CATLBL = {sach:'Sách',vpp:'Văn phòng phẩm',tbgd:'Thiết bị giáo dục'};

const P = [
  {id:1,name:'Bộ SGK lớp 6 - Kết nối tri thức',by:'NXB Giáo Dục Việt Nam',cat:'sach',aud:['thcs'],nxb:'Giáo Dục',price:187000,old:249000,rate:4.9,sold:1200,c:'#2f6ca5'},
  {id:2,name:'Dế Mèn phiêu lưu ký',by:'Tô Hoài',cat:'sach',aud:['tieuhoc'],nxb:'Kim Đồng',price:45000,old:55000,rate:4.8,sold:5400,c:'#3a7a52'},
  {id:3,name:'Tư duy nhanh và chậm',by:'Daniel Kahneman',cat:'sach',aud:['sinhvien'],nxb:'NXB Trẻ',price:169000,old:199000,rate:4.7,sold:2800,c:'#7a4a8c'},
  {id:4,name:'Mắt biếc',by:'Nguyễn Nhật Ánh',cat:'sach',aud:['thpt'],nxb:'NXB Trẻ',price:88000,old:110000,rate:5.0,sold:8100,c:'#c1572f'},
  {id:5,name:'Atomic Habits - Thay đổi tí hon',by:'James Clear',cat:'sach',aud:['sinhvien','thpt'],nxb:'Thế Giới',price:145000,old:180000,rate:4.9,sold:6700,c:'#1f6e6e'},
  {id:6,name:'Luyện thi THPT QG môn Toán',by:'NXB ĐHQG Hà Nội',cat:'sach',aud:['thpt'],nxb:'ĐHQG',price:95000,old:120000,rate:4.6,sold:3300,c:'#384c9c'},
  {id:7,name:'Combo bút bi Thiên Long 20 cây',by:'Thiên Long',cat:'vpp',aud:['thcs','thpt','sinhvien'],nxb:'Thiên Long',price:48000,old:80000,rate:5.0,sold:9200,c:'#2563a8',icon:'pen'},
  {id:8,name:'Vở Campus 200 trang (lốc 10)',by:'Campus',cat:'vpp',aud:['thcs','thpt'],nxb:'Campus',price:102000,old:120000,rate:4.9,sold:5600,c:'#e08a2e',icon:'note'},
  {id:9,name:'Bộ bút màu Colokit 24 màu',by:'Colokit',cat:'vpp',aud:['tieuhoc'],nxb:'Colokit',price:65000,old:85000,rate:4.8,sold:4100,c:'#c94f7c',icon:'palette'},
  {id:10,name:'Balo chống gù Hami',by:'Hami',cat:'vpp',aud:['tieuhoc','thcs'],nxb:'Hami',price:320000,old:420000,rate:4.7,sold:2200,c:'#3d6e9c',icon:'bag'},
  {id:11,name:'Máy tính Casio fx-580VN X',by:'Casio',cat:'tbgd',aud:['thpt','sinhvien'],nxb:'Casio',price:490000,old:599000,rate:4.8,sold:3400,c:'#2b3a4a',icon:'calc'},
  {id:12,name:'Bộ dụng cụ thí nghiệm Vật lý 12',by:'Thiết bị GD',cat:'tbgd',aud:['thpt'],nxb:'Thiết bị GD',price:360000,old:450000,rate:4.6,sold:980,c:'#1f6e6e',icon:'flask'},
  {id:13,name:'Địa cầu phát sáng 25cm',by:'EduGlobe',cat:'tbgd',aud:['tieuhoc','thcs'],nxb:'EduGlobe',price:210000,old:280000,rate:4.9,sold:1600,c:'#2f6ca5',icon:'globe'},
  {id:14,name:'Bộ dạy học giáo viên - bảng & phấn',by:'EduPro',cat:'tbgd',aud:['giaovien'],nxb:'EduPro',price:175000,old:230000,rate:4.7,sold:1100,c:'#7a4a8c',icon:'board'}
];

const ICONS = {
  pen:'<path d="M5 19l1-4L17 4l3 3L9 18l-4 1Z"/>',
  note:'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="16" cy="9" r="1"/>',
  bag:'<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2"/>',
  flask:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  board:'<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M12 17v4M8 21h8"/>'
};

function cover(p,scale){
  if(p.cat==='sach'){
    return '<div class="book-cover" style="background:linear-gradient(150deg,'+p.c+',rgba(0,0,0,.35))"><div class="bc-t">'+p.name+'</div><div class="bc-a">'+p.by+'</div></div>';
  }
  return '<div class="obj-cover" style="background:linear-gradient(150deg,'+p.c+',rgba(0,0,0,.3))"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[p.icon]||'')+'</svg></div>';
}
function discount(p){return Math.round((1-p.price/p.old)*100);}

/* ---------------- Cart ---------------- */
let cart = {};
function addToCart(id,qty){
  qty=qty||1; cart[id]=(cart[id]||0)+qty;
  updateCartCount(); toast('Đã thêm vào giỏ hàng');
}
function setQty(id,q){ if(q<=0){delete cart[id];}else{cart[id]=q;} updateCartCount(); if(view==='cart')renderCart(); }
function updateCartCount(){
  const n=Object.values(cart).reduce((a,b)=>a+b,0);
  const el=document.getElementById('cartCount');
  el.textContent=n; el.style.display=n>0?'flex':'none';
}
function cartSubtotal(){return Object.entries(cart).reduce((s,[id,q])=>s+P.find(x=>x.id==id).price*q,0);}

let voucherPct=0;
function applyVoucher(){
  const code=document.getElementById('vCode').value.trim().toUpperCase();
  if(code==='EDU10'){voucherPct=10;toast('Áp dụng EDU10 — giảm 10%');}
  else if(code==='GIAOVIEN'){voucherPct=15;toast('Ưu đãi giáo viên — giảm 15%');}
  else {voucherPct=0;toast('Mã không hợp lệ');}
  renderCart();
}

/* ---------------- Toast ---------------- */
let toastT;
function toast(msg){
  const t=document.getElementById('toast');
  t.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7ee0a8" stroke-width="2.5"><path d="m5 13 4 4L19 7"/></svg>'+msg;
  t.classList.add('show'); clearTimeout(toastT);
  toastT=setTimeout(()=>t.classList.remove('show'),1900);
}

/* ---------------- Router ---------------- */
let view='home', arg=null;
function go(v,a){view=v;arg=a||null;window.scrollTo(0,0);render();}
function doSearch(){const q=document.getElementById('searchInput').value.trim();go('listing',{q});}

function render(){
  if(view==='home')renderHome();
  else if(view==='listing')renderListing();
  else if(view==='product')renderProduct();
  else if(view==='cart')renderCart();
  else if(view==='huyenhoc')renderHuyenHoc();
  else if(view==='account')renderAccount();
  else if(view==='checkout')renderCheckout();
  else if(view==='orderdone')renderOrderDone();
}

/* ---------------- Cards ---------------- */
function pcard(p){
  return '<div class="pcard">'+
    '<div class="pcover" style="background:#f3ede3" onclick="go(\'product\','+p.id+')">'+
      (p.old>p.price?'<span class="badge">-'+discount(p)+'%</span>':'')+
      '<button class="fav" onclick="event.stopPropagation();toast(\'Đã lưu vào yêu thích\')"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg></button>'+
      cover(p)+
    '</div>'+
    '<div class="pinfo">'+
      '<div class="nm" onclick="go(\'product\','+p.id+')">'+p.name+'</div>'+
      '<div class="meta"><span class="star"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+p.rate.toFixed(1)+'</span>· đã bán '+(p.sold>=1000?(p.sold/1000).toFixed(1)+'k':p.sold)+'</div>'+
      '<div><span class="price">'+fmt(p.price)+'</span>'+(p.old>p.price?'<span class="price-old">'+fmt(p.old)+'</span>':'')+'</div>'+
      '<button class="add" onclick="addToCart('+p.id+')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>Thêm vào giỏ</button>'+
    '</div></div>';
}

/* ---------------- Home ---------------- */
function triSearch(){
  const t=document.getElementById('tsTitle'),a=document.getElementById('tsAuthor'),k=document.getElementById('tsKw');
  const q=[t&&t.value,a&&a.value,k&&k.value].filter(Boolean).join(' ').trim();
  go('listing',{q:q});
}
/* Photo assets (Unsplash) for the redesigned home page */
const HIMG={1:'1595123550384-b81222e23cf9',2:'1513185041617-8ab03f83d6c5',3:'1456513080510-7bf3a84b82f8',4:'1595123336219-5eedd543bc4a',5:'1506880018603-83d5b814b5a6',7:'1501349800519-48093d60bde0',8:'1513542789411-b6a5d4f31634',9:'1516383607781-913a19294fd1',10:'1630343710506-89f8b9f21d31',11:'1762265591492-1454ae17f31a',12:'1761546571631-a4d61b55cd2f',13:'1761821170104-ccd3e3e21318',14:'1762831063505-68022b6133a9'};
const HTAG={1:'Bán chạy',4:'Yêu thích',7:'HOT',11:'Chính hãng'};
function uimg(slug,w){return 'https://images.unsplash.com/photo-'+slug+'?auto=format&fit=crop&w='+(w||600)+'&q=80';}
function himg(id,w){return uimg(HIMG[id],w);}
const ARR='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';

/* Home-only product card (photo cover) — does not touch the shared pcard() */
function hmCard(p,dark){
  const isBook=p.cat==='sach';
  const overlay=isBook?'linear-gradient(to top,rgba(15,8,4,.68),rgba(15,8,4,.1) 55%,transparent)':'linear-gradient(to top,rgba(15,8,4,.3),transparent 60%)';
  const tag=HTAG[p.id];
  const sold=p.sold>=1000?(p.sold/1000).toFixed(1)+'k':p.sold;
  return '<div class="hm-card'+(dark?' dark':'')+'">'+
    '<div class="hm-cover" onclick="go(\'product\','+p.id+')">'+
      '<img src="'+himg(p.id,500)+'" alt="'+p.name+'" loading="lazy">'+
      '<div class="hm-cov-ov" style="background:'+overlay+'"></div>'+
      (isBook?'<div class="hm-cov-tt"><div class="t">'+p.name+'</div><div class="a">'+p.by+'</div></div>':'')+
      '<span class="hm-disc">-'+discount(p)+'%</span>'+
      (tag?'<span class="hm-tag">'+tag+'</span>':'')+
      '<button class="hm-fav" onclick="event.stopPropagation();toast(\'Đã lưu vào yêu thích\')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg></button>'+
    '</div>'+
    '<div class="hm-info">'+
      '<div class="hm-nm" onclick="go(\'product\','+p.id+')">'+p.name+'</div>'+
      '<div class="hm-meta"><span class="hm-star"><svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 7 7 .5-5.5 4.5 2 7L12 17l-6.5 4 2-7L2 9.5 9 9Z"/></svg>'+p.rate.toFixed(1)+'</span><span class="dot">·</span>Đã bán '+sold+'</div>'+
      '<div class="hm-price"><span class="now">'+fmt(p.price)+'</span><span class="old">'+fmt(p.old)+'</span></div>'+
      '<button class="hm-add" onclick="addToCart('+p.id+')"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>Thêm vào giỏ</button>'+
    '</div></div>';
}
function hmHead(title,kicker,target){
  return '<div class="hm-sechead"><div class="row"><div class="left">'+
    (kicker?'<span class="kick">'+kicker+'</span>':'')+'<h2>'+title+'</h2></div>'+
    (target?'<a class="all" onclick="go(\'listing\',\''+target+'\')">Xem tất cả '+ARR+'</a>':'')+
    '</div><div class="bar"></div></div>';
}
function hmColl(c,tall){
  return '<div class="hm-coll'+(tall?' tall':'')+'" onclick="go(\'listing\',\''+c[5]+'\')">'+
    '<img src="'+uimg(c[3],800)+'" alt="'+c[1]+'" loading="lazy">'+
    '<div class="tint" style="background:'+c[4]+'"></div><div class="grad"></div>'+
    '<span class="kick">'+c[0]+'</span>'+
    '<div class="body"><h3>'+c[1]+'</h3><p>'+c[2]+'</p><span class="link">Xem danh sách '+ARR+'</span></div>'+
  '</div>';
}

function renderHome(){
  const bestSach=P.filter(p=>p.cat==='sach').slice(0,5);
  const vpp=P.filter(p=>p.cat==='vpp');
  const tb=P.filter(p=>p.cat==='tbgd');
  const flashItems=[7,4,1,5,9].map(id=>P.find(x=>x.id===id));

  const COLLS=[
    ['Tuyển chọn biên tập','100 cuốn sách nên đọc trong đời','Hành trình văn học vượt thời gian, từ kinh điển đến hiện đại.','1771647287015-f30dbb239646','rgba(120,30,20,.6)','sach'],
    ['Học đường','Sách kinh điển cho học sinh','Những tác phẩm trong và ngoài chương trình nuôi dưỡng tâm hồn.','1535688391459-479d308104f8','rgba(30,50,80,.5)','thpt'],
    ['Ôn thi','Luyện thi THPT Quốc gia','Tuyển tập đề và sách luyện thi tinh gọn theo từng môn học.','1514369118554-e20d93546b30','rgba(80,55,15,.55)','thpt'],
    ['Người trẻ','Phát triển bản thân cho sinh viên','Tư duy, kỹ năng và những thói quen tốt dành cho người trẻ.','1570945880236-10f34833a271','rgba(30,65,40,.52)','sinhvien'],
    ['Thiếu nhi','Sách thiếu nhi hay nhất','Thế giới diệu kỳ và những bài học đầu đời cho các bạn nhỏ.','1777639629798-e3e75d967d3d','rgba(80,25,55,.5)','tieuhoc'],
    ['Sưu tầm','Sách cũ & sách hiếm','Những ấn bản đặc biệt và bản in đầu từ nhà cung cấp uy tín.','1644211492216-8a5e874023f4','rgba(40,28,18,.55)','sach']
  ];
  const AUDT=[
    ['Tiểu học','#e8f4e8','#2d5a2d','tieuhoc','<path d="M9 3 4 6v12l5 3 6-3 5 3V6l-5-3-6 3Z"/>'],
    ['THCS / THPT','#e8f0f8','#1e3a5a','thcs','<path d="M4 7l8-4 8 4-8 4-8-4Z M4 7v6l8 4 8-4V7"/>'],
    ['Sinh viên','#f0e8f8','#4a1e7a','sinhvien','<path d="M3 9l9-5 9 5-9 5-9-5Z M7 11v5a5 3 0 0 0 10 0v-5"/>'],
    ['Giáo viên','#fdf0e0','#7a4400','giaovien','<rect x="3" y="4" width="18" height="13" rx="1"/><path d="M12 17v4M8 21h8"/>'],
    ['Văn phòng phẩm','#f5eaf0','#6a1a3a','vpp','<path d="M5 19l1-4L17 4l3 3L9 18l-4 1Z"/>'],
    ['Thiết bị GD','#e8f5f5','#1a5a5a','tbgd','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
    ['Ngoại ngữ','#f8f0e8','#5a3a10','sach','<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'],
    ['Trường học · Mua sỉ','#f0f0f5','#2a2a5a','school','<path d="M3 21h18M3 10l9-7 9 7"/><path d="M9 21V14h6v7"/>']
  ];
  const ARTS=[
    ['Mẹo học tập','Ôn thi hiệu quả trong giai đoạn nước rút','08 tháng 6, 2026','Lập kế hoạch, chia nhỏ mục tiêu và giữ sức khỏe — ba chìa khóa cho mùa thi. Những chiến thuật được kiểm chứng bởi chuyên gia giáo dục hàng đầu.','1553729784-e91953dec042','rgba(110,30,20,.45)'],
    ['Hướng dẫn','Chọn máy tính cầm tay cho kỳ thi','05 tháng 6, 2026','So sánh các dòng máy được phép mang vào phòng thi và mẹo dùng nhanh.','1762265591492-1454ae17f31a','rgba(20,40,65,.48)'],
    ['Góc học tập','Sắp xếp bàn học giúp con tập trung hơn','01 tháng 6, 2026','Ánh sáng, bố cục và một chút phong thủy cho không gian học ở nhà.','1761821170104-ccd3e3e21318','rgba(60,45,15,.48)']
  ];
  const fa=ARTS[0];

  document.getElementById('app').innerHTML=
  /* Hero / search band */
  '<section class="hm-hero">'+
    '<div class="hm-hero-l">'+
      '<div class="bg"></div><div class="ring r1"></div><div class="ring r2"></div>'+
      '<div class="content">'+
        '<div class="eyebrow"><span class="ln"></span>Sàn sách &amp; học liệu số 1 Việt Nam</div>'+
        '<h1>Tìm sách, dụng cụ<br><em>học tập &amp; thiết bị</em></h1>'+
        '<p class="lead">Hàng nghìn đầu sách, văn phòng phẩm và thiết bị từ các nhà cung cấp uy tín trên khắp Việt Nam.</p>'+
        '<div class="hm-tri">'+
          '<div class="tf"><label>Tựa sách</label><input id="tsTitle" placeholder="Ví dụ: Mắt biếc"></div>'+
          '<div class="tf"><label>Tác giả</label><input id="tsAuthor" placeholder="Ví dụ: Nguyễn Nhật Ánh"></div>'+
          '<div class="tf"><label>Từ khóa / ISBN</label><input id="tsKw" placeholder="Lớp, môn, mã ISBN…" onkeydown="if(event.key===\'Enter\')triSearch()"></div>'+
          '<button class="go" onclick="triSearch()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>Tìm kiếm</button>'+
        '</div>'+
        '<div class="qk"><span>Phổ biến:</span>'+
          '<button onclick="go(\'listing\',\'thcs\')">SGK lớp 6</button>'+
          '<button onclick="go(\'listing\',\'thpt\')">Luyện thi THPT</button>'+
          '<button onclick="go(\'listing\',\'vpp\')">Văn phòng phẩm</button>'+
          '<button onclick="go(\'huyenhoc\')">Quẻ sách</button>'+
        '</div>'+
        '<div class="stats">'+
          '<div><div class="v">200K+</div><div class="l">đầu sách</div></div>'+
          '<div><div class="v">1.2M+</div><div class="l">lượt mua</div></div>'+
          '<div><div class="v">5.000+</div><div class="l">nhà cung cấp</div></div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="hm-hero-r">'+
      '<img src="'+uimg('1625053376622-e462848c453f',900)+'" alt="Thư viện sách">'+
      '<div class="blend"></div>'+
      '<div class="badge"><div class="k">Mới cập nhật</div><div class="t">Kho sách tháng 6/2026</div><div class="m">Hơn 3.400 tựa mới ›</div></div>'+
    '</div>'+
  '</section>'+

  /* Collections */
  hmHead('Bộ sưu tập tuyển chọn','Biên tập viên gợi ý','sach')+
  '<div class="hm-colls">'+
    '<div class="feat-slot">'+hmColl(COLLS[0],true)+'</div>'+
    hmColl(COLLS[1])+hmColl(COLLS[2])+
    '<div class="coll-row">'+hmColl(COLLS[3])+hmColl(COLLS[4])+hmColl(COLLS[5])+'</div>'+
  '</div>'+

  /* Flash sale */
  '<div class="hm-flash">'+
    '<img class="bg" src="'+uimg('1603058817990-2b9a9abbce86',1080)+'" alt="">'+
    '<div class="ov"></div><div class="glow"></div>'+
    '<div class="inner">'+
      '<div class="fhead">'+
        '<div><div class="kick"><span class="ln"></span>Ưu đãi có giới hạn<span class="ln"></span></div>'+
          '<h2>🔥 Flash Sale từ nhà cung cấp</h2>'+
          '<p>Số lượng có hạn — mua ngay kẻo hết!</p></div>'+
        '<div class="cd">'+
          '<div class="u"><div class="b" id="cdH">02</div><div class="l">giờ</div></div>'+
          '<div class="sep">:</div>'+
          '<div class="u"><div class="b" id="cdM">45</div><div class="l">phút</div></div>'+
          '<div class="sep">:</div>'+
          '<div class="u"><div class="b" id="cdS">10</div><div class="l">giây</div></div>'+
        '</div>'+
      '</div>'+
      '<div class="fline"></div>'+
      '<div class="hm-grid g5">'+flashItems.map(p=>hmCard(p,true)).join('')+'</div>'+
    '</div>'+
  '</div>'+

  /* Audience */
  hmHead('Mua theo đối tượng')+
  '<div class="hm-tiles">'+AUDT.map(t=>'<div class="hm-tile" style="background:'+t[1]+';border-color:'+t[2]+'22" onclick="go(\'listing\',\''+t[3]+'\')"><div class="ic" style="background:'+t[2]+'18;color:'+t[2]+'"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round">'+t[4]+'</svg></div><span style="color:'+t[2]+'">'+t[0]+'</span></div>').join('')+'</div>'+

  /* Bestsellers */
  hmHead('Sách bán chạy','Trending','sach')+
  '<div class="hm-grid g5">'+bestSach.map(p=>hmCard(p)).join('')+'</div>'+

  /* Stationery */
  hmHead('Văn phòng phẩm','Mới cập nhật','vpp')+
  '<div class="hm-grid g4">'+vpp.map(p=>hmCard(p)).join('')+'</div>'+

  /* Equipment */
  hmHead('Thiết bị giáo dục','Được yêu thích','tbgd')+
  '<div class="hm-grid g4">'+tb.map(p=>hmCard(p)).join('')+'</div>'+

  /* Articles */
  '<div class="hm-arts-head"><h2>Khám phá thêm</h2><a onclick="toast(\'Mở trang bài viết\')">Tất cả bài viết '+ARR+'</a></div>'+
  '<div class="hm-arts-bar"></div>'+
  '<div class="hm-arts">'+
    '<div class="hm-art feat" onclick="toast(\'Mở bài viết\')">'+
      '<img src="'+uimg(fa[4],900)+'" alt="'+fa[1]+'" loading="lazy">'+
      '<div class="tint" style="background:'+fa[5]+'"></div><div class="grad"></div>'+
      '<span class="tag">'+fa[0]+'</span>'+
      '<div class="body"><h3>'+fa[1]+'</h3><p>'+fa[3]+'</p><div class="meta"><span class="date">'+fa[2]+'</span><span class="read">Đọc ngay '+ARR+'</span></div></div>'+
    '</div>'+
    '<div class="col2">'+ARTS.slice(1).map(a=>'<div class="hm-art sm" onclick="toast(\'Mở bài viết\')"><img src="'+uimg(a[4],700)+'" alt="'+a[1]+'" loading="lazy"><div class="tint" style="background:'+a[5]+'"></div><div class="grad"></div><span class="tag">'+a[0]+'</span><div class="body"><h3>'+a[1]+'</h3><span class="date">'+a[2]+'</span></div></div>').join('')+'</div>'+
  '</div>';

  // Flash-sale countdown (giờ : phút : giây)
  let cs={h:2,m:45,s:10}; clearInterval(window._cd);
  const pad2=n=>String(n).padStart(2,'0');
  window._cd=setInterval(()=>{
    const H=document.getElementById('cdH'); if(!H){clearInterval(window._cd);return;}
    let h=cs.h,m=cs.m,s=cs.s-1;
    if(s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=0;m=0;s=0;}
    cs={h,m,s};
    H.textContent=pad2(h);
    document.getElementById('cdM').textContent=pad2(m);
    document.getElementById('cdS').textContent=pad2(s);
  },1000);
}

/* ---------------- Listing ---------------- */
let filt={aud:null,price:'all',sort:'sold'};
function renderListing(){
  let title='Tất cả sản phẩm', base=P.slice();
  if(typeof arg==='string'){
    if(AUD[arg]){title=AUD[arg];base=P.filter(p=>p.aud.includes(arg)||arg==='school');filt.aud=null;}
    else if(CATLBL[arg]){title=CATLBL[arg];base=P.filter(p=>p.cat===arg);}
    else if(arg==='sach'){title='Sách';base=P.filter(p=>p.cat==='sach');}
  } else if(arg&&arg.q){title='Kết quả cho "'+arg.q+'"';const q=arg.q.toLowerCase();base=P.filter(p=>p.name.toLowerCase().includes(q)||p.by.toLowerCase().includes(q));}

  let list=base.slice();
  if(filt.aud)list=list.filter(p=>p.aud.includes(filt.aud));
  if(filt.price==='lo')list=list.filter(p=>p.price<100000);
  else if(filt.price==='mid')list=list.filter(p=>p.price>=100000&&p.price<300000);
  else if(filt.price==='hi')list=list.filter(p=>p.price>=300000);
  if(filt.sort==='sold')list.sort((a,b)=>b.sold-a.sold);
  else if(filt.sort==='priceAsc')list.sort((a,b)=>a.price-b.price);
  else if(filt.sort==='priceDesc')list.sort((a,b)=>b.price-a.price);
  else if(filt.sort==='rate')list.sort((a,b)=>b.rate-a.rate);

  const audOpts=Object.entries(AUD).map(([k,v])=>'<label><input type="radio" name="faud" '+(filt.aud===k?'checked':'')+' onchange="filt.aud=\''+k+'\';renderListing()">'+v+'</label>').join('');
  const priceOpts=[['all','Tất cả'],['lo','Dưới 100.000đ'],['mid','100.000 – 300.000đ'],['hi','Trên 300.000đ']].map(([k,v])=>'<label><input type="radio" name="fpr" '+(filt.price===k?'checked':'')+' onchange="filt.price=\''+k+'\';renderListing()">'+v+'</label>').join('');

  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>'+title+'</b></div>'+
  '<div class="listing">'+
    '<aside class="filters">'+
      '<h4>Bộ lọc</h4>'+
      '<div class="fgroup"><label><input type="radio" name="faud" '+(!filt.aud?'checked':'')+' onchange="filt.aud=null;renderListing()">Tất cả đối tượng</label>'+audOpts+'</div>'+
      '<div class="fgroup">'+priceOpts+'</div>'+
      '<div class="fgroup"><label><input type="checkbox" onchange="toast(\'Đã lọc theo đánh giá 4★+\')">Từ 4★ trở lên</label><label><input type="checkbox" onchange="toast(\'Chỉ hiện hàng còn\')">Còn hàng</label></div>'+
    '</aside>'+
    '<div><div class="list-top"><span class="cnt">'+list.length+' sản phẩm</span>'+
      '<select onchange="filt.sort=this.value;renderListing()">'+
        '<option value="sold"'+(filt.sort==='sold'?' selected':'')+'>Bán chạy</option>'+
        '<option value="rate"'+(filt.sort==='rate'?' selected':'')+'>Đánh giá cao</option>'+
        '<option value="priceAsc"'+(filt.sort==='priceAsc'?' selected':'')+'>Giá thấp đến cao</option>'+
        '<option value="priceDesc"'+(filt.sort==='priceDesc'?' selected':'')+'>Giá cao đến thấp</option>'+
      '</select></div>'+
      (list.length?'<div class="grid listing-grid">'+list.map(pcard).join('')+'</div>':'<div class="empty">Không tìm thấy sản phẩm phù hợp.</div>')+
    '</div>'+
  '</div>';
}

/* ---------------- Product detail ---------------- */
let pdpQty=1,pdpVar=0;
function renderProduct(){
  const p=P.find(x=>x.id==arg); pdpQty=1;pdpVar=0;
  const related=P.filter(x=>x.cat===p.cat&&x.id!==p.id).slice(0,5);
  const variants=p.cat==='sach'?['Bìa mềm','Bìa cứng']:['Loại tiêu chuẩn','Combo tiết kiệm'];
  const reviews=[['N','Ngọc Anh',5,'Sách đẹp, giao nhanh, đóng gói cẩn thận. Rất hài lòng!'],['T','Thầy Tuấn',5,'Mua cho lớp, chất lượng tốt, giá hợp lý cho giáo viên.'],['H','Hương',4,'Nội dung ổn, ship hơi lâu một chút.']];

  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <a onclick="go(\'listing\',\''+p.cat+'\')">'+CATLBL[p.cat]+'</a> › <b>'+p.name+'</b></div>'+
  '<div class="pdp">'+
    '<div class="pdp-gallery" style="background:#f3ede3">'+cover(p)+'</div>'+
    '<div class="pdp-info">'+
      '<h1>'+p.name+'</h1>'+
      '<div class="by">'+(p.cat==='sach'?'Tác giả: ':'Thương hiệu: ')+p.by+' · NXB/Hãng: '+p.nxb+'</div>'+
      '<div class="pdp-rate"><span class="star">★ '+p.rate.toFixed(1)+'</span><span>'+p.sold.toLocaleString('vi-VN')+' đã bán</span><span>Còn hàng</span></div>'+
      '<div class="price-box"><div class="big">'+fmt(p.price)+'</div>'+(p.old>p.price?'<div class="save">Tiết kiệm '+fmt(p.old-p.price)+' (-'+discount(p)+'%) so với '+fmt(p.old)+'</div>':'')+'</div>'+
      '<div style="font-size:13.5px;font-weight:500">Phân loại</div>'+
      '<div class="variants" id="pdpVars">'+variants.map((v,i)=>'<button class="'+(i===0?'on':'')+'" onclick="pickVar('+i+')">'+v+'</button>').join('')+'</div>'+
      '<div style="font-size:13.5px;font-weight:500;margin-bottom:6px">Số lượng</div>'+
      '<div class="qty"><button onclick="pdpStep(-1)">−</button><span id="pdpQ">1</span><button onclick="pdpStep(1)">+</button></div>'+
      '<div class="pdp-cta"><button class="cart-btn" onclick="addToCart('+p.id+',pdpQty)">Thêm vào giỏ</button><button class="buy-btn" onclick="addToCart('+p.id+',pdpQty);go(\'cart\')">Mua ngay</button></div>'+
      '<div class="perks">'+
        '<span>🚚 Giao nhanh toàn quốc</span><span>↩ Đổi trả trong 7 ngày</span><span>✔ Sách chính hãng</span><span>💳 MoMo · ZaloPay · VNPay · COD</span>'+
      '</div>'+
    '</div>'+
  '</div>'+

  '<div class="tabs">'+
    '<div class="tab-heads"><button class="on" onclick="pdpTab(0,this)">Mô tả</button><button onclick="pdpTab(1,this)">Đánh giá ('+reviews.length+')</button><button onclick="pdpTab(2,this)">Hỏi đáp</button></div>'+
    '<div class="tab-body" id="tabBody"></div>'+
  '</div>'+

  '<div class="section-head"><h2>Sản phẩm liên quan</h2></div>'+
  '<div class="grid">'+related.map(pcard).join('')+'</div>';

  window._pdpReviews=reviews; window._pdpP=p; pdpTab(0,null);
}
function pickVar(i){pdpVar=i;document.querySelectorAll('#pdpVars button').forEach((b,j)=>b.classList.toggle('on',j===i));}
function pdpStep(d){pdpQty=Math.max(1,pdpQty+d);document.getElementById('pdpQ').textContent=pdpQty;}
function pdpTab(i,btn){
  if(btn){document.querySelectorAll('.tab-heads button').forEach(b=>b.classList.remove('on'));btn.classList.add('on');}
  const p=window._pdpP,el=document.getElementById('tabBody');
  if(i===0)el.innerHTML='<p>'+p.name+' là sản phẩm '+(p.cat==='sach'?'thuộc danh mục sách, phù hợp với học sinh/sinh viên ở trình độ tương ứng. Nội dung được biên soạn kỹ lưỡng, in ấn rõ nét.':'thuộc nhóm '+CATLBL[p.cat].toLowerCase()+', bền đẹp và phù hợp cho việc học tập.')+' Hãng/NXB: '+p.nxb+'. Sản phẩm chính hãng, có đầy đủ hóa đơn VAT khi yêu cầu.</p>';
  else if(i===1)el.innerHTML=window._pdpReviews.map(r=>'<div class="review"><div class="rh"><div class="av">'+r[0]+'</div><div><div class="rn">'+r[1]+'</div><div class="rs">'+'★'.repeat(r[2])+'☆'.repeat(5-r[2])+'</div></div></div><p style="margin:0;font-size:14px">'+r[3]+'</p></div>').join('');
  else el.innerHTML='<p style="color:var(--text-soft)">Chưa có câu hỏi nào. <a style="color:var(--ink);font-weight:500" onclick="toast(\'Đã mở ô đặt câu hỏi\')">Đặt câu hỏi cho người bán ›</a></p>';
}

/* ---------------- Cart ---------------- */
function renderCart(){
  const ids=Object.keys(cart);
  if(!ids.length){
    document.getElementById('app').innerHTML='<div class="empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.5 13h11l2-9H6"/></svg><div style="font-size:17px;margin-bottom:6px">Giỏ hàng của bạn đang trống</div><a class="hero-cta" style="display:inline-flex" onclick="go(\'home\')">Tiếp tục mua sắm</a></div>';
    return;
  }
  const items=ids.map(id=>{const p=P.find(x=>x.id==id),q=cart[id];return '<div class="cart-item"><div class="cover-sm">'+cover(p)+'</div><div class="ci-info"><div class="nm">'+p.name+'</div><div class="pr">'+fmt(p.price)+'</div></div><div class="qty"><button onclick="setQty('+id+','+(q-1)+')">−</button><span>'+q+'</span><button onclick="setQty('+id+','+(q+1)+')">+</button></div><button class="ci-remove" onclick="setQty('+id+',0)"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg></button></div>';}).join('');
  const sub=cartSubtotal(), ship=sub>300000?0:25000, disc=Math.round(sub*voucherPct/100), total=sub-disc+ship;

  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'home\')">Trang chủ</a> › <b>Giỏ hàng</b></div>'+
  '<div class="cart">'+
    '<div>'+items+'</div>'+
    '<div class="summary"><h3>Tóm tắt đơn hàng</h3>'+
      '<div class="voucher"><input id="vCode" placeholder="Mã giảm giá (EDU10, GIAOVIEN)"><button onclick="applyVoucher()">Áp dụng</button></div>'+
      '<div class="sum-row"><span>Tạm tính</span><span>'+fmt(sub)+'</span></div>'+
      (disc>0?'<div class="sum-row"><span>Giảm giá ('+voucherPct+'%)</span><span style="color:#1a7a4a">-'+fmt(disc)+'</span></div>':'')+
      '<div class="sum-row"><span>Vận chuyển</span><span>'+(ship===0?'Miễn phí':fmt(ship))+'</span></div>'+
      (ship>0?'<div style="font-size:11.5px;color:var(--text-soft)">Mua thêm '+fmt(300000-sub)+' để được miễn phí ship</div>':'')+
      '<div class="sum-row total"><span>Tổng cộng</span><b>'+fmt(total)+'</b></div>'+
      '<button class="checkout" onclick="go(\'checkout\')">Tiến hành thanh toán</button>'+
      '<div class="pay-icons"><span>MoMo</span><span>ZaloPay</span><span>VNPay</span><span>COD</span><span>ATM/Visa</span><span>Trả góp</span></div>'+
    '</div>'+
  '</div>';
}

/* ---------------- Huyền học ---------------- */
const READINGS={
  1:['Người Tiên Phong','khao khát dẫn đầu và tự lập. Bạn học tốt nhất khi được chủ động khám phá thay vì học vẹt, và rất hợp những cuốn sách khơi dậy tư duy độc lập.'],
  2:['Người Đồng Hành','nhạy cảm, tinh tế và giỏi lắng nghe. Bạn tiếp thu sâu khi học cùng bạn bè, và hợp với sách nuôi dưỡng cảm xúc lẫn kỹ năng kết nối.'],
  3:['Người Kể Chuyện','sáng tạo, giàu cảm hứng và yêu cái đẹp của ngôn từ. Sách văn học và sách khơi gợi trí tưởng tượng sẽ làm bạn tỏa sáng.'],
  4:['Người Kiến Tạo','kỷ luật, thực tế và kiên trì. Bạn học chắc qua phương pháp rõ ràng, và hợp với sách rèn nề nếp, tư duy hệ thống.'],
  5:['Người Phiêu Lưu','tò mò, linh hoạt và mê trải nghiệm mới. Bạn dễ chán lối học cứng nhắc, nên hợp những cuốn sách mở rộng tầm nhìn.'],
  6:['Người Gìn Giữ','ấm áp, trách nhiệm và quan tâm tới mọi người. Bạn hợp với sách về sống đẹp, chữa lành và phát triển bản thân.'],
  7:['Người Tìm Kiếm','sâu sắc, thích chiêm nghiệm và đặt câu hỏi lớn. Sách tư duy, triết lý và khoa học sẽ nuôi dưỡng trí tuệ của bạn.'],
  8:['Người Dẫn Dắt','tham vọng, quyết đoán và có khiếu tổ chức. Bạn hợp với sách về tư duy thành công, lãnh đạo và quản lý thời gian.'],
  9:['Người Truyền Cảm Hứng','rộng lượng, lý tưởng và giàu lòng trắc ẩn. Bạn hợp với sách mở rộng trái tim lẫn tầm nhìn về thế giới.']
};
const CHANTS=['Mỗi trang sách hôm nay là một bước tiến của ngày mai.','Kiên trì đọc, bền bỉ học — thành công sẽ tìm đến bạn.','Tri thức là ánh sáng, và bạn đang thắp nó mỗi ngày.','Học bằng đam mê, đọc bằng cả trái tim.'];

function lifePath(d){let s=d.replace(/-/g,'').split('').map(Number).reduce((a,b)=>a+b,0);while(s>9&&s!==11&&s!==22&&s!==33){s=String(s).split('').reduce((a,b)=>a+Number(b),0);}return s;}
function quePickBooks(num){const s=P.filter(p=>p.cat==='sach');const st=num%s.length;return [s[st%s.length],s[(st+1)%s.length],s[(st+2)%s.length]];}
function showQue(name,num,tt,luan,chant,ai){
  const books=quePickBooks(num);
  const el=document.getElementById('mResult');
  el.innerHTML=
    '<div class="mseal"><div class="num">'+num+'</div><div><div class="tt">'+name+' — '+tt+(ai?'<span class="ai-badge">✦ Gợi ý bằng AI</span>':'')+'</div><div class="ss">Số chủ đạo · '+num+'</div></div></div>'+
    '<div class="mluan">'+luan+'</div>'+
    '<div class="mbooks">'+books.map(p=>'<div class="mbook">'+cover(p)+'<div class="mb-t">'+p.name+'</div><div class="mb-w">'+p.by+' — '+fmt(p.price)+'</div><button class="add" style="background:var(--coral)" onclick="addToCart('+p.id+')">Thêm vào giỏ</button></div>').join('')+'</div>'+
    '<div class="mchant">“'+chant+'”</div>';
  el.classList.add('show');
}
function renderHuyenHoc(){
  document.getElementById('app').innerHTML=
  '<div class="mystic-page">'+
    '<p class="eyebrow">EduMart · Huyền học</p>'+
    '<h1>Quẻ sách <em>thần số</em></h1>'+
    '<p class="lead">Nhập ngày sinh để lộ ra con số chủ đạo — trợ lý AI luận đôi nét tính cách và chọn cho bạn ba cuốn sách hợp duyên.</p>'+
    '<div class="mform">'+
      '<div class="fld"><label>Họ và tên</label><input id="mName" placeholder="Nguyễn Văn An"></div>'+
      '<div class="fld"><label>Ngày sinh</label><input id="mDob" type="date"></div>'+
      '<div class="fld"><label>Đọc để…</label><select id="mGoal"><option>phát triển bản thân</option><option>ôn thi, học tốt hơn</option><option>cảm hứng và sáng tạo</option><option>thư giãn, giải trí</option></select></div>'+
      '<button onclick="gieoQue()">Gieo quẻ chọn sách</button>'+
    '</div>'+
    '<div class="mresult" id="mResult"></div>'+
    '<p class="mnote">Tính năng mang tính giải trí và gợi ý đọc sách, không phải lời khuyên về sức khỏe, tài chính hay quyết định quan trọng.</p>'+
  '</div>';
}
async function gieoQue(){
  const name=document.getElementById('mName').value.trim(),dob=document.getElementById('mDob').value,goal=document.getElementById('mGoal').value;
  if(!name||!dob){toast('Bạn nhập giúp họ tên và ngày sinh nhé');return;}
  const num=lifePath(dob); const base=num>9?({11:2,22:4,33:6})[num]:num;
  const el=document.getElementById('mResult'); el.classList.add('show');
  el.innerHTML='<div style="padding:18px 0;color:#9aa0c2"><span class="spinner-m"></span>Thầy đồ số đang luận quẻ…</div>';
  try{
    const prompt='Bạn là "Thầy đồ số" của sàn sách EduMart, kết hợp thần số học với việc đọc sách, giọng ấm áp và truyền cảm hứng.\n'+
      'Người dùng tên "'+name+'", số chủ đạo thần số học là '+num+', muốn đọc sách để "'+goal+'".\n'+
      'Trả về DUY NHẤT một JSON hợp lệ (không markdown, không giải thích, không kèm dấu ```), dạng:\n'+
      '{"tieu_de":"một biệt danh ngắn theo số chủ đạo, ví dụ \'Người Kiến Tạo\'","loi_luan":"2-3 câu luận tính cách và thiên hướng học tập theo số chủ đạo '+num+', có nhắc tên người dùng","cau_chu":"một câu động lực học tập ngắn gọn, tích cực"}\nChỉ trả JSON.';
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:600,messages:[{role:'user',content:prompt}]})});
    const data=await res.json();
    const text=(data.content||[]).map(b=>b.type==='text'?b.text:'').join('');
    const r=JSON.parse(text.replace(/```json|```/g,'').trim());
    showQue(name,num,r.tieu_de,r.loi_luan,r.cau_chu,true);
  }catch(e){
    const rd=READINGS[base];
    showQue(name,num,rd[0],name+' mang số chủ đạo '+num+' — '+rd[1]+' Với mong muốn "'+goal+'", đây là ba cuốn sách hợp duyên với bạn lúc này.',CHANTS[num%CHANTS.length],false);
  }
}

/* ---------------- Account / Auth ---------------- */
const ROLELBL={student:'Học sinh / Sinh viên',teacher:'Giáo viên',parent:'Phụ huynh'};
let user=null, orders=[], acctTab='orders', authMode=1;

function renderLogin(){
  document.getElementById('app').innerHTML=
  '<div class="auth-wrap"><div class="auth-tabs"><button class="on" id="tabLogin" onclick="authTab(1)">Đăng nhập</button><button id="tabReg" onclick="authTab(0)">Đăng ký</button></div><div class="form-card" id="authBody"></div></div>';
  authTab(1);
}
function authTab(login){
  authMode=login;
  document.getElementById('tabLogin').classList.toggle('on',!!login);
  document.getElementById('tabReg').classList.toggle('on',!login);
  document.getElementById('authBody').innerHTML=
    (login?'':'<div class="form-field"><label>Họ và tên</label><input id="lgName" placeholder="Nguyễn Văn An"></div>')+
    '<div class="form-field"><label>Số điện thoại hoặc email</label><input placeholder="09xx xxx xxx"></div>'+
    '<div class="form-field"><label>Mật khẩu</label><input type="password" placeholder="••••••••"></div>'+
    '<div class="form-field"><label>Bạn là</label><select id="lgRole"><option value="student">Học sinh / Sinh viên</option><option value="teacher">Giáo viên</option><option value="parent">Phụ huynh</option></select></div>'+
    '<button class="btn-primary" style="width:100%" onclick="doLogin()">'+(login?'Đăng nhập':'Tạo tài khoản')+'</button>'+
    '<div style="text-align:center;font-size:12px;color:var(--text-soft);margin:14px 0 8px">hoặc tiếp tục với</div>'+
    '<div class="social-btns"><button onclick="doLogin()">Zalo</button><button onclick="doLogin()">Google</button><button onclick="doLogin()">Facebook</button></div>';
}
function doLogin(){
  const nameEl=document.getElementById('lgName'),roleEl=document.getElementById('lgRole');
  const name=nameEl?nameEl.value.trim():'';
  user={name:name||'Bạn đọc EduMart',role:roleEl?roleEl.value:'student',points:120,phone:'09xx xxx xxx'};
  toast('Đăng nhập thành công'); acctTab='orders'; go('account');
}
function logout(){user=null;toast('Đã đăng xuất');go('home');}
function goOrders(){acctTab='orders';go('account');}

function orderCard(o){
  return '<div class="order-card"><div class="oh"><span>Mã đơn <b>#'+o.id+'</b> · '+o.date+'</span><span class="ostatus">'+o.status+'</span></div>'+
    o.items.map(it=>{const p=P.find(x=>x.id==it.id);return '<div class="oi"><div class="cover-sm">'+cover(p)+'</div><div style="flex:1">'+p.name+' × '+it.qty+'</div><div style="font-weight:600">'+fmt(p.price*it.qty)+'</div></div>';}).join('')+
    '<div style="text-align:right;margin-top:8px;font-weight:700;color:var(--coral)">Tổng: '+fmt(o.total)+'</div></div>';
}
function acctContent(){
  if(acctTab==='orders'){
    return '<div class="panel"><h3>Đơn hàng của tôi</h3>'+(orders.length?orders.map(orderCard).join(''):'<p style="color:var(--text-soft)">Bạn chưa có đơn hàng nào. <a style="color:var(--ink);font-weight:500" onclick="go(\'home\')">Mua sắm ngay ›</a></p>')+'</div>';
  }
  if(acctTab==='profile'){
    return '<div class="panel"><h3>Hồ sơ của tôi</h3>'+
      '<div class="form-field"><label>Họ và tên</label><input value="'+user.name+'"></div>'+
      '<div class="form-row"><div class="form-field"><label>Số điện thoại</label><input value="'+user.phone+'"></div><div class="form-field"><label>Email</label><input placeholder="ban@email.com"></div></div>'+
      '<div class="form-field"><label>Vai trò</label><select><option '+(user.role==='student'?'selected':'')+'>Học sinh / Sinh viên</option><option '+(user.role==='teacher'?'selected':'')+'>Giáo viên</option><option '+(user.role==='parent'?'selected':'')+'>Phụ huynh</option></select></div>'+
      '<button class="btn-primary" onclick="toast(\'Đã lưu thay đổi\')">Lưu thay đổi</button></div>';
  }
  if(acctTab==='address'){
    return '<div class="panel"><h3>Sổ địa chỉ</h3><div class="order-card"><div style="font-weight:600;font-size:14px">'+user.name+' · '+user.phone+' <span style="font-size:11px;background:#f6ece4;color:var(--ink);padding:2px 8px;border-radius:20px;margin-left:6px">Mặc định</span></div><div style="font-size:13.5px;color:var(--text-soft);margin-top:4px">123 Đường Láng, P. Láng Thượng, Q. Đống Đa, Hà Nội</div></div><button class="btn-ghost" onclick="toast(\'Đã mở form thêm địa chỉ\')">+ Thêm địa chỉ mới</button></div>';
  }
  if(acctTab==='points'){
    return '<div class="panel"><h3>Điểm thưởng</h3><div class="stat-row"><div class="stat-box"><div class="v">'+user.points+'</div><div class="l">Điểm tích lũy</div></div><div class="stat-box"><div class="v">Vàng</div><div class="l">Hạng thành viên</div></div><div class="stat-box"><div class="v">'+(user.role==='teacher'?'15%':'5%')+'</div><div class="l">Ưu đãi của bạn</div></div></div><p style="font-size:13px;color:var(--text-soft);margin-top:14px">Mỗi 1.000đ chi tiêu tích 1 điểm. Đổi điểm lấy voucher giảm giá ở mục khuyến mãi.</p></div>';
  }
  if(acctTab==='teacher'){
    if(user.role==='teacher')return '<div class="panel"><h3>Xác thực giáo viên</h3><p style="color:#1a7a4a;font-weight:500">✔ Tài khoản của bạn đã được xác thực là giáo viên — đang hưởng ưu đãi đến 15%.</p></div>';
    return '<div class="panel"><h3>Xác thực giáo viên</h3><p style="color:var(--text-soft);font-size:14px">Xác thực nghề giáo viên để nhận ưu đãi riêng đến 15% và quyền mua sỉ cho lớp. Tải lên thẻ giáo viên hoặc quyết định công tác.</p><button class="btn-primary" style="margin-top:12px" onclick="toast(\'Đã mở cửa sổ tải giấy tờ\')">Tải giấy tờ xác thực</button></div>';
  }
}
function renderAccount(){
  if(!user){renderLogin();return;}
  const nav=[['orders','Đơn hàng của tôi'],['profile','Hồ sơ'],['address','Sổ địa chỉ'],['points','Điểm thưởng'],['teacher','Xác thực giáo viên']];
  document.getElementById('app').innerHTML=
  '<div class="acct"><aside class="acct-side"><div class="acct-user"><div class="av">'+user.name.charAt(0).toUpperCase()+'</div><div><div class="nm">'+user.name+'</div><div class="rl">'+ROLELBL[user.role]+'</div></div></div>'+
    '<div class="acct-nav">'+nav.map(n=>'<button class="'+(acctTab===n[0]?'on':'')+'" onclick="acctTab=\''+n[0]+'\';renderAccount()">'+n[1]+'</button>').join('')+'<button class="danger" onclick="logout()">Đăng xuất</button></div></aside>'+
    '<div>'+acctContent()+'</div></div>';
}

/* ---------------- Checkout ---------------- */
let coShip='std', coPay='momo';
function renderCheckout(){
  const ids=Object.keys(cart); if(!ids.length){go('cart');return;}
  const sub=cartSubtotal();
  const baseShip=sub>300000?0:25000;
  const ship=baseShip+(coShip==='fast'?20000:0);
  const disc=Math.round(sub*voucherPct/100);
  const total=sub-disc+ship;
  const shipOpts=[['std','Giao tiêu chuẩn (2–4 ngày)',baseShip===0?'Miễn phí':fmt(baseShip)],['fast','Giao nhanh (1–2 ngày)',fmt(baseShip+20000)]];
  const pays=[['momo','Ví MoMo',''],['zalopay','ZaloPay',''],['vnpay','VNPay',''],['cod','Thanh toán khi nhận hàng (COD)','Phổ biến'],['atm','Thẻ ATM / Visa / Mastercard','']];
  document.getElementById('app').innerHTML=
  '<div class="breadcrumb"><a onclick="go(\'cart\')">Giỏ hàng</a> › <b>Thanh toán</b></div>'+
  '<h1 class="page-title">Thanh toán</h1>'+
  '<div class="checkout-grid"><div>'+
    '<div class="step-card"><h3><span class="n">1</span>Địa chỉ nhận hàng</h3>'+
      '<div class="form-row"><div class="form-field"><label>Họ tên</label><input value="'+(user?user.name:'')+'"></div><div class="form-field"><label>Số điện thoại</label><input value="'+(user?user.phone:'')+'" placeholder="09xx xxx xxx"></div></div>'+
      '<div class="form-field"><label>Địa chỉ</label><input placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"></div></div>'+
    '<div class="step-card"><h3><span class="n">2</span>Phương thức vận chuyển</h3>'+
      shipOpts.map(o=>'<label class="pay-opt '+(coShip===o[0]?'on':'')+'"><input type="radio" name="ship" '+(coShip===o[0]?'checked':'')+' onchange="coShip=\''+o[0]+'\';renderCheckout()">'+o[1]+'<span class="tag">'+o[2]+'</span></label>').join('')+'</div>'+
    '<div class="step-card"><h3><span class="n">3</span>Phương thức thanh toán</h3>'+
      pays.map(o=>'<label class="pay-opt '+(coPay===o[0]?'on':'')+'"><input type="radio" name="pay" '+(coPay===o[0]?'checked':'')+' onchange="coPay=\''+o[0]+'\';renderCheckout()">'+o[1]+(o[2]?'<span class="tag">'+o[2]+'</span>':'')+'</label>').join('')+
      '<p style="font-size:12px;color:var(--text-soft);margin:10px 0 0">Bạn sẽ được chuyển tới cổng thanh toán an toàn để hoàn tất. EduMart không lưu thông tin thẻ của bạn.</p></div>'+
  '</div>'+
  '<div class="summary"><h3>Đơn hàng</h3>'+
    ids.map(id=>{const p=P.find(x=>x.id==id);return '<div class="sum-row"><span>'+p.name+' ×'+cart[id]+'</span><span>'+fmt(p.price*cart[id])+'</span></div>';}).join('')+
    '<div class="sum-row"><span>Tạm tính</span><span>'+fmt(sub)+'</span></div>'+
    (disc>0?'<div class="sum-row"><span>Giảm giá ('+voucherPct+'%)</span><span style="color:#1a7a4a">-'+fmt(disc)+'</span></div>':'')+
    '<div class="sum-row"><span>Vận chuyển</span><span>'+(ship===0?'Miễn phí':fmt(ship))+'</span></div>'+
    '<div class="sum-row total"><span>Tổng cộng</span><b>'+fmt(total)+'</b></div>'+
    '<button class="checkout" onclick="placeOrder('+total+')">Đặt hàng</button></div></div>';
}
function placeOrder(total){
  const id=String(Math.floor(Math.random()*90000)+10000);
  const items=Object.entries(cart).map(([k,q])=>({id:Number(k),qty:q}));
  const d=new Date(), date=d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
  orders.unshift({id,items,total,date,status:'Đang xử lý'});
  cart={};voucherPct=0;updateCartCount();
  window._lastOrder={id,total};
  go('orderdone');
}
function renderOrderDone(){
  const o=window._lastOrder||{id:'00000',total:0};
  document.getElementById('app').innerHTML=
  '<div class="done"><div class="check"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m5 13 4 4L19 7"/></svg></div>'+
    '<h1>Đặt hàng thành công!</h1><p>Cảm ơn bạn đã mua sắm tại EduMart.</p>'+
    '<p>Mã đơn hàng của bạn</p><div class="ocode">#'+o.id+'</div>'+
    '<p style="margin-top:10px">Tổng thanh toán: <b style="color:var(--coral)">'+fmt(o.total)+'</b></p>'+
    '<div class="acts"><button class="btn-ghost" onclick="goOrders()">Xem đơn hàng</button><button class="btn-primary" onclick="go(\'home\')">Tiếp tục mua sắm</button></div></div>';
}

/* ---------------- init ---------------- */
render();
