## PHẦN A

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

## PHẦN B

Câu B1:

Các loại selector đã sử dụng trong CSS

1. Element Selector

```css
body
table
footer
```

2. Class Selector

```css
.active
```

3. ID Selector

```css
#about
#skills
#contact
```

4. Descendant Selector

```css
header nav ul
table th
table td
```

5. Pseudo-class Selector

```css
nav a:hover
tbody tr:nth-child(even)
tbody tr:hover
```

Câu B2:

Hộp 1 (content-box)

Chiều rộng thực tế = 350px

Cách tính:

- content = 300px
- padding trái + phải = 40px
- border trái + phải = 10px

=> 300 + 40 + 10 = 350px

Hộp 2 (border-box)

Chiều rộng thực tế = 300px

Vì:

- width đã bao gồm:
  - content
  - padding
  - border

Nên kích thước tổng vẫn giữ nguyên là 300px.

Giải thích sự khác biệt

- `content-box`:
  Width chỉ tính phần content.
  Padding và border sẽ cộng thêm vào kích thước thật của phần tử.

- `border-box`:
  Width bao gồm luôn content + padding + border.
  Kích thước thực tế của phần tử không bị tăng thêm.

Câu B3:

Liệt kê 10 rules + specificity score

| STT | CSS Rule                   | Specificity |
| --- | -------------------------- | ----------- |
| 1   | p                          | 0,0,1       |
| 2   | .text                      | 0,1,0       |
| 3   | .highlight                 | 0,1,0       |
| 4   | p.text                     | 0,1,1       |
| 5   | p.highlight                | 0,1,1       |
| 6   | .text.highlight            | 0,2,0       |
| 7   | p.text.highlight           | 0,2,1       |
| 8   | #demo                      | 1,0,0       |
| 9   | #demo.text                 | 1,1,0       |
| 10  | body p#demo.text.highlight | 1,2,1       |

---

Element cuối cùng hiển thị màu gold.

Vì rule:

body p#demo.text.highlight

có specificity cao nhất:

1,2,1

Rule này mạnh hơn tất cả các rules còn lại nên được trình duyệt ưu tiên áp dụng.

Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

- Trường hợp specificity khác nhau

Kết quả KHÔNG đổi.

Ví dụ:

p

không thể ghi đè:

#demo

dù p được viết sau trong file CSS.

Vì selector chứa id có specificity mạnh hơn selector thường.

---

- Trường hợp specificity bằng nhau

Kết quả có thể đổi.

Ví dụ:

.text {
color: blue;
}

.highlight {
color: green;
}

Hai rule đều có specificity:

0,1,0

Rule viết sau sẽ thắng.

Nếu .highlight viết sau .text thì màu sẽ là xanh lá.
Nếu .text viết sau .highlight thì màu sẽ là xanh dương.
