## Phần A

Câu 1(Dựa vào file tuan_2_css_core/12_css_positioning.md):

Bảng So Sánh Các Giá Trị CSS Position

| Position | Chiếm chỗ trong flow? | Tham chiếu vị trí (Mốc tọa độ)       | Cuộn theo trang?   | Use case thực tế                               |
| :------- | :-------------------- | :----------------------------------- | :----------------- | :--------------------------------------------- |
| static   | Có                    | Không sử dụng tọa độ                 | Có                 | Vị trí mặc định của mọi phần tử.               |
| relative | Có                    | Vị trí gốc ban đầu của chính nó      | Có                 | Dịch chuyển nhẹ; Làm mốc cho thẻ con absolute. |
| absolute | Không                 | Cha gần nhất có position khác static | Có (cuộn theo cha) | Badge giỏ hàng, Dropdown menu, Tooltip.        |
| fixed    | Không                 | Viewport (Khung hình trình duyệt)    | Không (Đứng yên)   | Nút Chat Support, Back-to-top, Modal.          |
| sticky   | Có                    | Viewport (Khi đạt ngưỡng tọa độ)     | Cố định khi cuộn   | Header luôn hiện trên cùng, Sidebar dính.      |

---

Câu 2:

- Trường hợp 1: Flex Equal Width

Quy tắc flex: 1 khiến tất cả các phần tử con tự động co giãn để chiếm trọn không gian bằng nhau trên một hàng.

Bố cục: 1 hàng, 4 cột bằng nhau.

```text
+----------+----------+----------+----------+
| Item 1 | Item 2 | Item 3 | Item 4 |
+----------+----------+----------+----------+
```

- Trường hợp 2: Flex Wrap Grid
  Với width: 45% và margin: 2.5% (tổng cộng 50% mỗi item), flex-wrap: wrap sẽ đẩy các phần tử xuống hàng khi hết chỗ.

Bố cục: 3 hàng, 2 cột.

```text
+----------+ +----------+
| Item 1 | | Item 2 |
+----------+ +----------+
+----------+ +----------+
| Item 3 | | Item 4 |
+----------+ +----------+
+----------+ +----------+
| Item 5 | | Item 6 |
+----------+ +----------+
```

- Trường hợp 3: Flex Alignment (Space Between)

justify-content: space-between đẩy item đầu về bên trái, item cuối về bên phải, item giữa nằm trung tâm. align-items: center căn giữa theo chiều dọc.

Bố cục: 1 hàng, 3 item giãn cách tối đa.

```text
|-------------------------------------------|
| +--------+ +--------+ +--------+|
| | Item 1 | | Item 2 | | Item 3 ||
| +--------+ +--------+ +--------+|
|-------------------------------------------|
```

- Trường hợp 4: Holy Grail Grid

Cột biên có chiều rộng cố định (200px), cột giữa linh hoạt (1fr) sẽ chiếm toàn bộ phần còn lại.

Bố cục: 1 hàng, 3 cột (Cố định - Linh hoạt - Cố định).

```text
+-------+ +-----------------------+ +-------+
| 200px | | Flexible (1fr) | | 200px |
| Item 1| | Item 2 | | Item 3|
+-------+ +-----------------------+ +-------+
```

- Trường hợp 5: Grid Repeat (Implicit Rows)

repeat(3, 1fr) tạo ra 3 cột đều nhau. Khi có 7 item, Grid tự động tạo thêm hàng mới.

Bố cục: 3 hàng. Hai hàng đầu đầy đủ, hàng cuối chỉ có 1 item ở cột đầu tiên.

```text
+--------+ +--------+ +--------+
| Item 1 | | Item 2 | | Item 3 |
+--------+ +--------+ +--------+
+--------+ +--------+ +--------+
| Item 4 | | Item 5 | | Item 6 |
+--------+ +--------+ +--------+
+--------+
| Item 7 |
+--------+
```

## Phần C:

Câu C1:

1. Navigation bar ngang (logo + menu + buttons)
   Lựa chọn: Flexbox

Giải thích: Flexbox sinh ra để xử lý layout 1 chiều (hàng ngang hoặc cột dọc). Nó cực kỳ mạnh trong việc phân bổ khoảng trống giữa các nhóm phần tử (dùng justify-content: space-between) và căn chỉnh các mục có kích thước khác nhau (logo to, menu nhỏ) trên cùng một trục mà không cần tính toán tọa độ phức tạp.

2. Lưới ảnh Instagram (3 cột đều nhau)
   Lựa chọn: Grid

Giải thích: Đây là bố cục 2 chiều điển hình. Grid cho phép bạn thiết lập khung sườn cố định 3 cột (grid-template-columns: repeat(3, 1fr)). Khi số lượng ảnh tăng lên, Grid sẽ tự động quản lý các hàng và khoảng cách (gap) một cách hoàn hảo mà không cần lo lắng về việc căn lề trái/phải cho từng tấm ảnh.

3. Layout blog: Main content + Sidebar
   Lựa chọn: Grid

Giải thích: Mặc dù Flexbox cũng làm được, nhưng Grid là lựa chọn chuyên nghiệp hơn cho Layout tổng thể (Page Structure). Với Grid, bạn có thể định nghĩa chính xác chiều rộng sidebar (ví dụ: 300px) và phần còn lại là content (1fr). Ngoài ra, Grid giúp bạn dễ dàng thay đổi thứ tự sidebar (đẩy lên trên hoặc xuống dưới content) khi làm giao diện Mobile.

4. Footer với 4 cột thông tin
   Lựa chọn: Flexbox (hoặc Grid nếu muốn các cột bằng chèn chẹn)

Ưu tiên: Flexbox được dùng phổ biến hơn ở đây vì các cột thông tin trong footer thường có độ dài nội dung khác nhau. Flexbox cho phép các cột co giãn linh hoạt theo nội dung bên trong. Tuy nhiên, nếu bạn muốn 4 cột luôn thẳng hàng tắp lự ngay cả khi nội dung bên trong ngắn, Grid sẽ là lựa chọn nhanh gọn hơn.

5. Card sản phẩm (ảnh, text, nút dính đáy)
   Lựa chọn: Kết hợp cả hai

Giải thích:

Sử dụng Grid để sắp xếp các Card trên trang web (ví dụ: hàng 4 card).

Sử dụng Flexbox (flex-direction: column) bên trong mỗi Card. Flexbox giúp bạn xử lý việc đẩy nút "Mua" xuống đáy card bằng mẹo margin-top: auto vô cùng hiệu quả, ngay cả khi tiêu đề sản phẩm dài 1 dòng hay 3 dòng.

Câu C2:

Lỗi 1: Cards không đều chiều cao
Nguyên nhân:
Mặc dù các .card có chiều cao bằng nhau (nhờ cơ chế align-items: stretch mặc định của Flex container), nhưng các thành phần bên trong .card lại không được thiết lập để co giãn. Khi tiêu đề (h3) của card này dài hơn card kia, nút "Mua" sẽ bị đẩy xuống theo độ dài của chữ, dẫn đến việc các nút không thẳng hàng ngang với nhau.

Code sửa:
Thiết lập chính mỗi .card cũng là một Flex container theo chiều dọc (column) và sử dụng margin-top: auto cho nút bấm.

```css
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
}
.card .btn {
  margin-top: auto;
  padding: 10px;
}
```

Lỗi 2: Items không căn giữa trong Hero
Nguyên nhân:
Thuộc tính display: flex mới chỉ định nghĩa rằng .hero là một flex container. Theo mặc định, nó sẽ xếp các phần tử con từ trái sang phải (justify-content: flex-start) và từ trên xuống dưới (align-items: stretch). text-align: center chỉ có tác dụng căn lề chữ bên trong phần tử, không có tác dụng căn chỉnh chính bản thân khối .hero-content vào giữa container.

Code sửa:
Bổ sung hai thuộc tính căn chỉnh trục chính và trục phụ cho container.

```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

Lỗi 3: Sidebar bị co lại khi content quá dài
Nguyên nhân:
Trong Flexbox, các phần tử con có thuộc tính mặc định là flex-shrink: 1. Khi phần .content có quá nhiều dữ liệu hoặc hình ảnh lớn, Flexbox sẽ cố gắng "bóp" các phần tử khác lại để ưu tiên không gian cho nội dung, khiến .sidebar bị mất chiều rộng 250px đã thiết lập.

Code sửa:
Sử dụng flex-shrink: 0 để ngăn Sidebar bị co lại, hoặc dùng flex-basis.

```css
.sidebar {
  flex: 0 0 250px;
}
```

Sửa full

```css
lỗi 1:
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
}
.card .btn {
  margin-top: auto;
  padding: 10px;
}

lỗi 2:
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  text-align: center;
}

lỗi 3:
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.content {
  flex: 1;
}
```
