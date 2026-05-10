## PHẦN A

Câu A1(Dựa vào file 12_css_positioning.md):

1. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

`width=device-width`: Đặt chiều rộng của trang web bằng với chiều rộng màn hình của thiết bị (ví dụ: iPhone 13 là 390px thay vì giả lập 980px của desktop).

`initial-scale=1.0`: Thiết lập mức độ phóng chữ (zoom) ban đầu là 1:1 khi trang vừa tải xong. Điều này ngăn trình duyệt tự động "zoom out" để hiển thị toàn bộ trang web desktop trên màn hình nhỏ.

2. Nếu không có dòng này, iPhone (và hầu hết smartphone) sẽ:

Coi trang web là Desktop: Nó giả định trang web có chiều rộng khoảng 980px (kích thước chuẩn desktop cũ).

Thu nhỏ toàn bộ (Scale down): Để nhét vừa 980px đó vào màn hình điện thoại (chỉ khoảng 375px-430px), trình duyệt sẽ thu nhỏ mọi thứ lại.

Hậu quả: Chữ sẽ nhỏ xíu như kiến, các nút bấm quá bé để chạm bằng ngón tay, và người dùng buộc phải dùng hai ngón tay để phóng to (pinch-to-zoom) mới đọc được nội dung.

3.

1.

- Mobile-First (Ưu tiên di động)
  Đây là phương pháp viết code CSS cho màn hình điện thoại trước (làm mặc định), sau đó mới sử dụng Media Queries để bổ sung các quy tắc cho màn hình lớn hơn.

Thứ tự viết code: Bắt đầu từ màn hình nhỏ nhất, sau đó mở rộng dần.

Media Query sử dụng: Dùng thuộc tính min-width (nghĩa là: "từ kích thước này trở lên").

Tư duy thiết kế: Nhà phát triển tập trung vào những nội dung cốt lõi nhất, tinh gọn nhất vì không gian màn hình di động rất hạn chế. Khi lên màn hình lớn, họ mới thêm vào các thành phần trang trí hoặc chia thêm cột.

Ví dụ: Mặc định phần tử chiếm 100% chiều rộng. Khi màn hình đạt từ 768px trở lên, nó sẽ co lại còn 50%.

- Desktop-First (Ưu tiên máy tính)
  Đây là cách làm truyền thống, viết code cho giao diện máy tính trước, sau đó mới dùng Media Queries để chỉnh sửa hoặc ẩn bớt các thành phần khi xem trên điện thoại.

Thứ tự viết code: Bắt đầu từ màn hình lớn nhất, sau đó thu hẹp dần.

Media Query sử dụng: Dùng thuộc tính max-width (nghĩa là: "từ kích thước này trở xuống").

Tư duy thiết kế: Thiết kế một bản đầy đủ, giàu hình ảnh và tính năng trên desktop, sau đó cố gắng "nhồi nhét" hoặc cắt bỏ bớt để nó vừa với màn hình nhỏ.

Cách 1: Mobile-First

```css
/* Mặc định cho Mobile */
.container {
  width: 100%;
  padding: 10px;
}

/* Cho Tablet/Desktop trở lên */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}
```

Cách 2: Desktop-FirstCSS

```css
.container {
  width: 750px;
  padding: 20px;
}

/* Cho màn hình nhỏ hơn 768px */
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
```

- Mobile-First được khuyên dùng vì:

  Hiệu suất (Performance): Thiết bị di động thường có cấu hình yếu hơn và mạng chậm hơn. Mobile-First giúp trình duyệt di động tải ít CSS hơn (vì nó đọc code mặc định trước), giúp trang web hiển thị nhanh hơn.

  Tư duy nội dung: Ép nhà phát triển tập trung vào những nội dung quan trọng nhất trước khi "vung tay" thêm thắt các hiệu ứng nặng nề của desktop.

  Hỗ trợ tốt cho SEO: Google hiện nay ưu tiên lập chỉ mục cho bản di động (Mobile-First Indexing). Một trang web tối ưu mobile tốt sẽ có thứ hạng cao hơn.

Câu A2:

```text

+----------+----------------+-----------------------+---------------------+-------------------+
| Tên Mã   | Kích thước     | Thiết bị đại diện     | Layout Sản phẩm     | Gợi ý Cột (Grid)  |
+----------+----------------+-----------------------+---------------------+-------------------+
|   xs     | < 576px        | Smartphone (Dọc)      | [ Card 1 ]          | 1 Cột             |
|          |                |                       | [ Card 2 ]          |                   |
+----------+----------------+-----------------------+---------------------+-------------------+
|   sm     | >= 576px       | Smartphone (Ngang)    | [ C1 ] [ C2 ]       | 2 Cột             |
|          |                |                       | [ C3 ] [ C4 ]       |                   |
+----------+----------------+-----------------------+---------------------+-------------------+
|   md     | >= 768px       | Máy tính bảng (iPad)  | [ C1 ] [ C2 ] [ C3 ]| 3 Cột             |
|          |                |                       | [ C4 ] [ C5 ] [ C6 ]|                   |
+----------+----------------+-----------------------+---------------------+-------------------+
|   lg     | >= 992px       | Laptop / Desktop nhỏ  | [C1] [C2] [C3] [C4] | 4 Cột             |
+----------+----------------+-----------------------+---------------------+-------------------+
|   xl     | >= 1200px      | Desktop lớn           | [C1][C2][C3][C4][C5]| 5 Cột             |
+----------+----------------+-----------------------+---------------------+-------------------+
|   xxl    | >= 1400px      | Màn hình siêu rộng    | [C1][C2][C3][C4][C5]| 6 Cột             |
|          |                |                       | [C6]                |                   |
+----------+----------------+-----------------------+---------------------+-------------------+

```

Câu A3:

```text
+-----------------------+------------------+
| Chiều rộng màn hình   | .container width |
+-----------------------+------------------+
| 375px (iPhone SE)     | 100%             |
+-----------------------+------------------+
| 600px                 | 540px            |
+-----------------------+------------------+
| 800px                 | 720px            |
+-----------------------+------------------+
| 1000px                | 960px            |
+-----------------------+------------------+
| 1400px                | 1140px           |
+-----------------------+------------------+
```

Câu A4:

1. Variables — Biến trong SCSS

   Variables giúp lưu giá trị để tái sử dụng nhiều lần.

   Khai báo bằng dấu `$`.

   Ví dụ

   ```scss
   $primary-color: #805ad5;
   $radius: 8px;

   .button {
     background-color: $primary-color;
     border-radius: $radius;
   }

   .header {
     background-color: $primary-color;
   }
   ```

   Ý nghĩa
   - Chỉ cần đổi giá trị biến 1 lần
   - Tất cả nơi dùng biến sẽ tự cập nhật
   - Dễ maintain code hơn CSS thuần

   ***

2. Nesting — CSS lồng nhau

   SCSS cho phép viết CSS theo cấu trúc HTML.

   Ví dụ

   ```scss
   .navbar {
     background: #1a202c;

     ul {
       display: flex;

       li {
         margin-right: 20px;

         a {
           color: white;

           &:hover {
             color: yellow;
           }
         }
       }
     }
   }
   ```

   Compile thành CSS

   ```css
   .navbar {
     background: #1a202c;
   }

   .navbar ul {
     display: flex;
   }

   .navbar ul li {
     margin-right: 20px;
   }

   .navbar ul li a {
     color: white;
   }

   .navbar ul li a:hover {
     color: yellow;
   }
   ```

   Ý nghĩa
   - Code gọn hơn
   - Dễ nhìn cấu trúc component
   - Dễ maintain

   Không nên nesting quá sâu.

   ***

3. Mixins — Hàm CSS dùng lại

   Mixins giúp tái sử dụng nhiều đoạn CSS.

   Dùng:

   ```scss
   @mixin;
   ```

   để tạo và:

   ```scss
   @include;
   ```

   để sử dụng.

   Ví dụ

   ```scss
   @mixin flex-center {
     display: flex;
     justify-content: center;
     align-items: center;
   }

   .hero {
     @include flex-center;
     height: 100vh;
   }
   ```

   ### Compile thành CSS

   ```css
   .hero {
     display: flex;
     justify-content: center;
     align-items: center;
     height: 100vh;
   }
   ```

   Ý nghĩa
   - Tránh lặp code
   - Viết responsive nhanh hơn
   - Dùng như hàm trong lập trình

   ***

4. @extend / Inheritance

   `@extend` cho phép class kế thừa style từ class khác.

   Ví dụ

   ```scss
   .button {
     padding: 10px 20px;
     border-radius: 8px;
     color: white;
   }

   .button-primary {
     @extend .button;
     background: blue;
   }

   .button-danger {
     @extend .button;
     background: red;
   }
   ```

   Compile thành CSS

   ```css
   .button,
   .button-primary,
   .button-danger {
     padding: 10px 20px;
     border-radius: 8px;
     color: white;
   }

   .button-primary {
     background: blue;
   }

   .button-danger {
     background: red;
   }
   ```

   Ý nghĩa
   - Tái sử dụng style
   - Giảm lặp code
   - Dễ mở rộng component

   ***

5. Tại sao trình duyệt không đọc được file .scss?

   Trình duyệt (Chrome, Edge, Firefox...) chỉ hiểu cú pháp CSS chuẩn.:

   SCSS có thêm cú pháp đặc biệt như:
   - `$variables`
   - `@mixin`
   - nesting
   - `@extend`

   Các cú pháp này không thuộc chuẩn CSS nên browser không hiểu được.

   ***

6. Cần bước gì để chuyển SCSS → CSS?

   Cần Compile SCSS thành CSS bằng:
   - Sass Compiler
   - Live Sass Compiler (VS Code)
   - Webpack
   - Vite

   Quy trình

   ```text
   SCSS → Sass Compiler → CSS
   ```

   Sau khi compile:

   ```scss
   $primary: blue;

   .button {
     background: $primary;
   }
   ```

   sẽ thành:

   ```css
   .button {
     background: blue;
   }
   ```

   Browser chỉ đọc file `.css` sau khi compile.
