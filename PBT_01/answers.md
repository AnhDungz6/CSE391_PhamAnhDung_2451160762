**PHẦN A**

Câu A1:(Dựa vào file 01_introduction_html_universe.md)

Ý 1:

Khi gõ https://shopee.vn vào trình duyệt và nhấn enter thì sự kiện xảy ra tiếp là:

1. DNS lookup (Phân giải tên miền)
2. Thiết lập kết nối TCP
3. TLS handshake
4. Gửi HTTP Request
5. Server xử lý và trả HTTP Response
6. Trình duyệt parse và render
7. Tải tài nguyên phụ

Ý 2:

Tab Network dùng để theo dõi toàn bộ HTTP/HTTPS requests giữa trình duyệt và server. Nó hiển thị:

- Danh sách request (HTML, CSS, JS, ảnh, API...)
- Status Code (200, 404, 500...)
- Method (GET, POST...)
- Time / Waterfall (thời gian tải từng request)
- Size (dung lượng file)
- Headers / Response / Preview (chi tiết request & response)
- Tổng thời gian load trang (ở thanh dưới)

Đã chụp màn hình trong Folder screenshots.

---

Câu A2:(Dựa vào file 04_visible_part_html.md)

Trang này bị đánh giá SEO thấp chủ yếu vì HTML không có semantic (ý nghĩa cấu trúc) -> Google khó hiểu nội dung, ảnh hưởng đến indexing và ranking.

**Các lỗi semantic:**

- 1: Dùng `<div>` thay vì thẻ semantic -> Google không hiểu đâu là header, navigation, nội dung chính
- 2: Menu không dùng `<nav>` + `<ul><li>` -> Không thể hiện đây là navigation
- 3: Tiêu đề sản phẩm không dùng heading (`<h1>` - `<h6>`) -> Google không biết đây là nội dung quan trọng
- 4: Ảnh không có `alt` -> Mất SEO hình ảnh + accessibility
- 5: Không có cấu trúc nội dung rõ ràng (`<section>`, `<article>`)
- 6: Footer không dùng `<footer>` -> Không rõ phần chân trang

**Fix lại:**

```html
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
      <img src="iphone.jpg" alt="iPhone 16 Pro" />
    </article>
  </section>
</main>

<footer>
  <p>© 2026 ShopTLU</p>
</footer>
```

---

Câu A3:

Kết quả hiển thị dạng (text-art):

```text
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

```

Giải thích:

`<div>` là block element → luôn chiếm 1 dòng riêng → mỗi “Hộp” nằm một dòng.

`<span>` và `<strong>` là inline element → không xuống dòng → nằm cùng hàng.

Vì vậy:

- Text A + Text B nằm chung 1 dòng.
- Text C + Text D cũng chung 1 dòng.

Trình duyệt render từ trên xuống nên ra đúng bố cục như trên.

---

Câu A4:(Dựa vào file 05_table_hyperlinks.md)

Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`

- `<thead>`: Chứa phần tiêu đề bảng (các cột), thường có `<th>`, hiển thị ở trên cùng.
- `<tbody>`: Chứa dữ liệu chính của bảng, có nhiều hàng `<table>`, là phần quan trọng nhất.
- `<tfoot>`: Chứa phần tổng kết (tổng tiền, ghi chú...), hiển thị ở dưới cùng (trong code có thể đặt trước nhưng vẫn render dưới).

Không nên dùng `</td>` làm layout vì:

1. Sai semantic (ý nghĩa HTML): Table dùng cho dữ liệu dạng bảng, không phải bố cục. Dùng sai → Google khó hiểu → SEO kém.

2. Khó bảo trì và mở rộng: Code lồng nhiều `<table>`, `<tr>` → rất rối. Sửa layout mất công.

3. Không responsive tốt: Table khó co giãn theo màn hình (mobile). Trong khi Flexbox / Grid linh hoạt hơn nhiều.

4. Hiệu năng kém hơn: Trình duyệt phải render toàn bộ bảng rồi mới hiển thị.

**PHẦN B**

Câu B3:

Lỗi 1: Dòng 1 — `<!DOCTYPE>` sai cú pháp — Sửa thành `<!DOCTYPE html>`

Lỗi 2: Dòng 4 — Thẻ `<title>` chưa đóng — Thêm `</title>`

Lỗi 3: Dòng 5 — `charset="utf8"` sai chuẩn — Sửa thành `charset="UTF-8"`

Lỗi 4: Dòng 9 — Thẻ `<h1>` chưa đóng đúng — Sửa `</h1>`

Lỗi 5: Dòng 13 — Thẻ `<a>` đầu tiên không đóng — Thêm `</a>`

Lỗi 6: Dòng 18 — Thẻ `<img>` thiếu dấu ngoặc kép và thiếu `alt` — Sửa `src="iphone.jpg"` và thêm `alt="iPhone 16 Pro"`

Lỗi 7: Dòng 20 — Thẻ `<b>` đóng sai vị trí — Đặt `</b>` trước `</p>`

Lỗi 8: Dòng 25 — Dùng `<td>` cho tiêu đề bảng (sai semantic) — Đổi thành `<th>`

Lỗi 9: Dòng 33 — Dùng 2 thẻ `<main>` (sai semantic) — Đổi thẻ thứ 2 thành `<aside>`

Lỗi 10: Dòng 38 — Thẻ `<p>` trong `<footer>` chưa đóng — Thêm `</p>`

Lỗi 11: Dòng 2 — Thẻ `<html>` thiếu thuộc tính — Sửa thành `<html lang="vi">`

Lỗi 12: Bảng thiếu cấu trúc semantic — Thêm `<thead>` và `<tbody>`

Lỗi 13: Dùng `<h3>` không hợp lý (sai cấp heading) — Đổi thành `<h2>`

Câu B4:

1.

3 Thẻ semantic HTML5(Khoanh màu đỏ):

`<header>` Dòng: `<header class="shopee-top-shopee-top-sticky">` – dùng để chứa thanh điều hướng phía trên.

`<section>` Dòng: `<section class="G9LJcQ" tabindex="-1">` – một khu vực nội dung.

`<section>` Dòng: `<section id="HomePageCarouselBannerSection" aria-label="Banner">` – khu vực banner carousel.

2 Thẻ không dùng đúng semantic(Khoanh màu trắng):

`<div>` Là con trực tiếp của `<ul>` – điều này vi phạm chuẩn HTML vì `<ul>` chỉ được chứa `<li>` làm phần tử con trực tiếp. Trong file: `<ul class="kr8eST">` … rồi ngay sau đó là `<div style="display: contents">` và `<div class="y117jm">`.

`<li>` Không nằm trong `<ul>` hoặc `<ol>` – thay vào đó nó nằm trực tiếp trong `<div>`. Trong file: `<div class="startdust-carousel_item-list">` chứa các `<li class="startdust-carousel_item">`. Không có `<ul>` bao ngoài.

2. Không tìm thấy thẻ `<table>` nào trong cả 3 web mà đề cho

3.

- Form tìm kiếm trên trang không có thuộc tính action và method, do đó không submit theo cách truyền thống mà sử dụng JavaScript để xử lý.

- Input types được dùng:

  `<input ... type="text">` -> ô nhập tìm kiếm

  `<button type="button">` -> nút bấm (không phải submit)

**PHẦN C**

Câu C1:

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <!-- Khai báo bộ ký tự -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Responsive -->
    <title>Chi tiết sản phẩm</title>
    <!-- Tiêu đề trang -->
  </head>

  <body>
    <!-- HEADER -->
    <header>
      <!-- header chứa phần đầu trang -->
      <nav>
        <!-- nav dùng cho menu điều hướng -->
        <ul>
          <!-- ul vì menu không cần thứ tự -->
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Danh mục</a></li>
          <li><a href="#">Giỏ hàng</a></li>
        </ul>
      </nav>
    </header>

    <!-- MAIN CONTENT -->
    <main>
      <!-- main chứa nội dung chính -->

      <!-- BREADCRUMB -->
      <nav aria-label="breadcrumb">
        <!-- nav vì đây là điều hướng -->
        <ol>
          <!-- ol vì breadcrumb có thứ tự -->
          <li><a href="#">Trang chủ</a></li>
          <li><a href="#">Điện thoại</a></li>
          <li>iPhone 16</li>
        </ol>
      </nav>

      <!-- PRODUCT DETAIL -->
      <section>
        <!-- section nhóm nội dung sản phẩm -->

        <!-- PRODUCT IMAGES -->
        <section>
          <!-- section cho khu vực ảnh -->
          <h2>Ảnh sản phẩm</h2>
          <!-- heading cho section -->
          <figure>
            <!-- figure chứa ảnh -->
            <img src="#" alt="Ảnh 1" />
            <!-- ảnh sản phẩm -->
          </figure>
          <figure>
            <img src="#" alt="Ảnh 2" />
          </figure>
          <figure>
            <img src="#" alt="Ảnh 3" />
          </figure>
          <figure>
            <img src="#" alt="Ảnh 4" />
          </figure>
          <figure>
            <img src="#" alt="Ảnh 5" />
          </figure>
        </section>

        <!-- PRODUCT INFO -->
        <section>
          <!-- section cho thông tin sản phẩm -->
          <h1>Tên sản phẩm</h1>
          <!-- h1 vì đây là tiêu đề chính -->
          <p>Giá</p>
          <!-- p cho text -->
          <p>Đánh giá sao</p>
          <!-- p cho rating -->
          <p>Mô tả sản phẩm</p>
          <!-- p cho mô tả -->
        </section>

        <!-- SPECIFICATIONS -->
        <section>
          <!-- section cho thông số -->
          <h2>Thông số kỹ thuật</h2>
          <table>
            <!-- table vì dữ liệu dạng bảng -->
            <thead>
              <!-- thead cho tiêu đề -->
              <tr>
                <th>Thông số</th>
                <th>Giá trị</th>
              </tr>
            </thead>
            <tbody>
              <!-- tbody cho dữ liệu -->
              <tr>
                <td>...</td>
                <td>...</td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- REVIEWS -->
        <section>
          <!-- section cho đánh giá -->
          <h2>Đánh giá</h2>
          <article>
            <!-- mỗi review là 1 nội dung độc lập -->
            <p>Người dùng A</p>
            <p>Bình luận...</p>
          </article>
        </section>
      </section>

      <!-- SIDEBAR -->
      <aside>
        <!-- aside cho nội dung phụ -->
        <h2>Sản phẩm tương tự</h2>
        <ul>
          <!-- danh sách sản phẩm -->
          <li><a href="#">Sản phẩm 1</a></li>
          <li><a href="#">Sản phẩm 2</a></li>
        </ul>
      </aside>
    </main>

    <!-- FOOTER -->
    <footer>
      <!-- footer cho chân trang -->
      <p>Thông tin bản quyền</p>
    </footer>
  </body>
</html>
```

Câu C2:
