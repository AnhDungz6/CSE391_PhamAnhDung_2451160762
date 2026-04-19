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
Hộp 1
Text A Text B
Hộp 2
Text C Text D
Hộp 3

text

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
