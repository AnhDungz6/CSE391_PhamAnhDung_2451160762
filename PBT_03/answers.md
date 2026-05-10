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

## PHẦN C

Câu C1:

-Tính chiều rộng thực tế

Mặc định CSS dùng:

```css
box-sizing: content-box;
```

`width` chỉ tính phần content, chưa tính padding và border.

- Sidebar

```css
width: 300px;
padding: 20px;
border: 1px solid;
```

Chiều rộng thực tế:

```text
300 + 20*2 + 1*2
= 342px
```

- Content

```css
width: 660px;
padding: 30px;
border: 1px solid;
```

Chiều rộng thực tế:

```text
660 + 30*2 + 1*2
= 722px
```

- Tổng chiều rộng

```text
342 + 722 = 1064px
```

Trong khi `.container` chỉ rộng:

```text
960px
```

-> Layout bị vỡ vì tổng chiều rộng vượt quá container.

---

- Layout bị vỡ vì

Trong `content-box`:

```css
width
```

không bao gồm:

- padding
- border

Do đó kích thước thực tế lớn hơn giá trị width khai báo.

Float không đủ chỗ để đặt `.content` cạnh `.sidebar`, nên trình duyệt đẩy `.content` xuống dòng mới.

---

- Cách sửa 1 — dùng border-box

debug_layout.css

```css
* {
  box-sizing: border-box;
}

.container {
  width: 960px;
  margin: 20px auto;
  border: 2px solid black;
  overflow: hidden;
}

.sidebar {
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
  background: #dbeafe;
}

.content {
  width: 660px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
  background: #fef3c7;
}
```

- Cách sửa 2 — không dùng border-box

Giữ `content-box` nhưng giảm width.

debug_layout.css

```css
.container {
  width: 960px;
  margin: 20px auto;
  border: 2px solid black;
  overflow: hidden;
}

.sidebar {
  width: 258px;
  padding: 20px;
  border: 1px solid #ccc;
  float: left;
  background: #dbeafe;
}

.content {
  width: 598px;
  padding: 30px;
  border: 1px solid #ccc;
  float: left;
  background: #fef3c7;
}
```

Câu C2:

- Sản phẩm A (h2)
  font-size: 20px

Giải thích: Có hai selector tác động là .container (14px) và .card .title (20px). Theo quy tắc Specificity, selector .card .title (độ ưu tiên: 0,0,2,0) cao hơn so với .container (độ ưu tiên: 0,0,1,0).

- color: green

Giải thích: Mặc dù ID selector #featured .title có độ ưu tiên cao (0,1,1,0) và muốn đặt màu đỏ, nhưng quy tắc .highlight { color: green !important; } sử dụng cờ !important. Trong CSS, !important sẽ ghi đè lên mọi mức độ ưu tiên thông thường.

- Mô tả sản phẩm (p trong card featured)
  color: blue

Giải thích: Phần tử này khớp với selector .card p. Bên trong selector này có thuộc tính color: inherit;. Thuộc tính này bắt buộc thẻ p phải lấy màu từ cha trực tiếp của nó là .card. Vì .card được định nghĩa color: blue, thẻ p nhận màu xanh.

- Sản phẩm B (h2)
  font-size: 20px

Giải thích: Tương tự Sản phẩm A, selector .card .title thắng thế nhờ độ ưu tiên.

color: blue

Giải thích: Thẻ h2 này không có class .highlight hay ID #featured. Do đó, nó không có quy tắc màu cụ thể nào nhắm tới. Theo cơ chế Inheritance (Kế thừa), h2 tự động kế thừa màu từ thẻ cha gần nhất có định nghĩa màu là .card (màu xanh).

- Mô tả sản phẩm B (p.highlight)
  color: green

Giải thích: Thẻ p này có class .highlight. Quy tắc .highlight { color: green !important; } có mức ưu tiên cao nhất, ép phần tử phải hiển thị màu xanh lá cây.
