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

## Phần B

Câu B1:
