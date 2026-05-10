**PHẦN A**
Câu 1(Dựa vào file 08_introduction_css.md):

1.Inline CSS — viết trực tiếp trong thẻ HTML
Ví dụ

```html
<h1 style="color: red; font-size: 32px;">Hello World</h1>
```

- Ưu điểm

  Nhanh

  Dễ test/debug nhanh

  Không cần tạo file CSS riêng

- Nhược điểm
  Code rất rối khi dự án lớn

  Khó tái sử dụng

  Khó bảo trì

  Vi phạm nguyên tắc tách HTML và CSS.
  Không chuyên nghiệp cho production

- Khi nào nên dùng

  Debug nhanh

  Test thử style

  JavaScript thay đổi style tạm thời

2. Internal CSS — viết trong thẻ `<style>`
   Ví dụ

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        color: blue;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Hello CSS</h1>
  </body>
</html>
```

- Ưu điểm

  Gọn hơn inline

  Dễ quản lý hơn khi file nhỏ

  Không cần file CSS riêng

- Nhược điểm

  CSS và HTML vẫn bị trộn chung

  File HTML sẽ rất dài khi dự án lớn

  Không tái sử dụng được cho nhiều trang

- Khi nào nên dùng

  Prototype nhanh

  Bài tập nhỏ

  Demo/test UI đơn giản

3. External CSS — file CSS riêng (chuẩn production)

Ví dụ:

```html
<head>
  <link rel="stylesheet" href="styles.css" />
</head>
```

styles.css

```html
h1 { color: green; font-size: 40px; }
```

- Ưu điểm

  Code sạch

  Dễ bảo trì

  Tái sử dụng nhiều trang

  Teamwork tốt

  Chuẩn dự án thực tế

  Browser có thể cache file CSS -> load nhanh hơn

- Nhược điểm

  Phải quản lý thêm file CSS

  Ban đầu hơi phức tạp hơn inline/internal

- Khi nào nên dùng

  Website thật

  Portfolio

  Landing page

  Todo app

  Mọi project nghiêm túc

Câu 2:

1. h1 → "ShopTLU"

2. .price → "25.990.000đ", "45.990.000đ"

3. #app header → "ShopTLU Home Products About"

4. nav a:first-child → "Home"

5. .product.featured h2 → "MacBook Pro"

6. article > p → "25.990.000đ", "Mô tả sản phẩm...", "45.990.000đ", "Mô tả sản phẩm..."

7. a[href="/"] → "Home"

8. .top-bar.dark h1 → "ShopTLU"

Câu 3(Dựa vào file 11_box_model.md):

- Trường hợp 1: content-box

width = 400px
padding = 20px × 2 = 40px
border = 5px × 2 = 10px

-> Chiều rộng hiển thị = 400 + 40 + 10 = 450px

margin = 10px × 2 = 20px

-> Không gian chiếm trên trang = 450 + 20 = 470px

- Trường hợp 2: border-box

width = 400px (đã gồm padding + border)

padding = 40px
border = 10px

-> Chiều rộng hiển thị = 400px

-> Kích thước content thực tế
= 400 - 40 - 10
= 350px

margin = 20px

-> Không gian chiếm trên trang
= 400 + 20
= 420px

- Trường hợp 3: Margin collapse

.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }

-> Khoảng cách giữa box-a và box-b = 40px

-> Vì margin dọc bị collapse,
CSS KHÔNG cộng 25 + 40,
mà lấy margin lớn hơn.

- Nâng cao

.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }

-> Khoảng cách = 40 + (-10)
= 30px

Câu 4:

Rule A: p
-> Specificity = (0,0,1)

Rule B: .price
-> Specificity = (0,1,0)

Rule C: #main-price
-> Specificity = (1,0,0)

Rule D: p.price
-> Specificity = (0,1,1)

-> Element sẽ có màu: red

Vì:
#main-price có specificity cao nhất:
(1,0,0) > (0,1,1) > (0,1,0) > (0,0,1)

Nếu thêm:
style="color: orange;"

-> Element có màu: orange

Vì inline CSS mạnh hơn CSS thường.

Nếu Rule A:
p { color: black !important; }

-> Element có màu: black

Vì !important ưu tiên cao hơn
cả id selector và specificity bình thường.
