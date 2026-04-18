Câu A1:
Ý 1:
Khi gõ https://shopee.vn vào trình duyệt và nhấn enter thì sự kiện xảy ra tiếp là:

1. DNS lookup(Phân giải tên miền)
2. Thiết lập kết nối TCP
3. TLS handshake
4. Gửi HTTP Request
5. Sever xử lý và trả HTTP Response
6. Trình duyệt parse và render
7. Tải tài nguyên phụ

Ý 2:
Tab Network dùng để theo dõi toàn bộ HTTP/HTTPS requests giữa trình duyệt và server. Nó hiển thị:

- Danh sách request (HTML, CSS, JS, ảnh, API…)
- Status Code (200, 404, 500…)
- Method (GET, POST…)
- Time / Waterfall (thời gian tải từng request)
- Size (dung lượng file)
- Headers / Response / Preview (chi tiết request & response)
- Tổng thời gian load trang (ở thanh dưới)

Đã chụp màn hình trong Folder screenshots

Câu A2
Trang này bị đánh giá SEO thấp chủ yếu vì HTML không có semantic (ý nghĩa cấu trúc) -> Google khó hiểu
nội dung, ảnh hưởng đến indexing và ranking

Các lỗi semantic:
-1: Dùng <div> thay vì thẻ semantic -> Google không hiểu đâu là header, navigation, nội dung chính
-2: Menu không dùng <nav> + <ul><li> -> Không thể hiện đây là navigation
-3: Tiêu đề sản phẩm không dùng heading (<h1> - <h6>) -> Google không biết đây là nội dung quan trọng
-4: Ảnh không có alt -> Mất SEO hình ảnh + accessibility -> Mất SEO hình ảnh + accessibility
-5: Không có cấu trúc nội dung rõ ràng (<section>, <article>)
-6: Footer không dùng <footer> -> Không rõ phần chân trang

Fix lại:

<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <section class="products">
        <article class="product">
            <h1>iPhone 16 Pro</h1>
            <p class="price">25.990.000đ</p>
            <img src="iphone.jpg" alt="iPhone 16 Pro">
        </article>
    </section>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
Câu A3:
Kết quả hiển thị dạng (text-art)
---------------------------------------------
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3
---------------------------------------------
Giải thích:
<div> là block element → luôn chiếm 1 dòng riêng -> mỗi “Hộp” nằm một dòng
<span> và <strong> là inline element → không xuống dòng -> nằm cùng hàng
Vì vậy:
Text A + Text B nằm chung 1 dòng
Text C + Text D cũng chung 1 dòng
->Trình duyệt render từ trên xuống nên ra đúng bố cục như trên

Câu A4:

Sự khác nhau giữa <thead>, <tbody>, <tfoot>

<thead>
- Chứa phần tiêu đề bảng (các cột)
- Thường có <th>
- Hiển thị ở trên cùng
<tbody>
- Chứa dữ liệu chính của bảng
- Có nhiều hàng <tr>
- Là phần quan trọng nhất
<tfoot>
- Chứa phần tổng kết (tổng tiền, ghi chú…)
- Hiển thị ở dưới cùng (trong code có thể đặt trước nhưng vẫn render dưới)

Không nên dùng <table> làm layout vì:

1.  Sai semantic (ý nghĩa HTML)
    Table dùng cho dữ liệu dạng bảng, không phải bố cục
    Dùng sai → Google khó hiểu -> SEO kém
2.  Khó bảo trì và mở rộng
    Code lồng nhiều <tr>, <td> -> rất rối
    Sửa layout rất mất công
3.  Không responsive tốt
    Table khó co giãn theo màn hình (mobile)
    Trong khi Flexbox / Grid linh hoạt hơn nhiều
4.  Hiệu năng kém hơn
    Trình duyệt phải render toàn bộ bảng rồi mới hiển thị
