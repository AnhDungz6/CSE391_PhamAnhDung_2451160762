**PHẦN A**

Câu A1:

1. type="email" → Ô nhập text, có thể hiển thị bàn phím email trên mobile → Tự kiểm tra định dạng có @ và domain → Dùng cho đăng ký tài khoản / đăng nhập

2. type="password" → Ô nhập text bị ẩn ký tự (\*\*\* hoặc ●) → Không có validation riêng (chỉ kết hợp required, minlength) → Dùng cho nhập mật khẩu tài khoản

3. type="number" → Ô nhập số có nút tăng/giảm (spinner) → Chỉ cho nhập số, hỗ trợ min, max, step → Dùng chọn số lượng sản phẩm

4. type="tel" → Ô nhập số điện thoại, mobile hiện bàn phím số → Không validate chặt (chỉ kiểm tra pattern nếu có) → Dùng nhập số điện thoại giao hàng

5. type="url" → Ô nhập text → Tự kiểm tra đúng format URL (http://, https://) → Dùng nhập link website (ví dụ shop seller)

6. type="search" → Ô nhập text có nút clear (x) trên một số trình duyệt → Không validation đặc biệt → Dùng cho ô tìm kiếm sản phẩm

7. type="date" → Hiển thị date picker (chọn ngày) → Chỉ cho chọn ngày hợp lệ → Dùng chọn ngày giao hàng / ngày sinh

8. type="radio" → Nút chọn tròn (chọn 1 trong nhiều) → Đảm bảo chỉ chọn 1 option trong group → Dùng chọn phương thức thanh toán

9. type="checkbox" → Ô vuông tick được nhiều lựa chọn → Không validation riêng (có thể dùng required) → Dùng chọn nhiều tùy chọn (ví dụ: đồng ý điều khoản, chọn filter sản phẩm)

10. type="file" → Nút upload file từ máy → Có thể giới hạn loại file (accept) → Dùng upload ảnh đánh giá sản phẩm / ảnh xác minh

Câu A2:(Dựa vào file 07_forms_interactive.md)

TH1:
`<input type="text" required value="">`
User để trống

Dự đoán: Không cho submit. Trình duyệt hiển thị thông báo lỗi yêu cầu điền vào trường này

Giải thích: Thuộc tính required bắt buộc người dùng phải nhập giá trị. Giá trị rỗng không thỏa mãn.

TH2:
`<input type="email" value="abc">`
User gõ "abc"

Dự đoán: Không cho submit. Trình duyệt báo lỗi định dạng email không hợp lệ

Giải thích: type="email" yêu cầu giá trị phải đúng cú pháp email (có @ và tên miền). "abc" thiếu @.

TH3:
`<input type="number" min="1" max="10" value="15">`
User gõ 15

Dự đoán: Không cho submit. Trình duyệt báo lỗi giá trị nằm ngoài khoảng cho phép

Giải thích: min="1" và max="10" ràng buộc giá trị phải từ 1 đến 10. 15 vượt quá max.

TH4:
`<input type="text" pattern="[0-9]{10}" value="abc123">`
User gõ "abc123"

Dự đoán: Không cho submit. Trình duyệt báo lỗi không khớp pattern

Giải thích: Pattern [0-9]{10} yêu cầu đúng 10 chữ số. "abc123" chứa chữ cái và không đủ độ dài.

TH5:
`<input type="password" minlength="8" value="123">`
User gõ "123"

Dự đoán: Không cho submit. Trình duyệt báo lỗi độ dài tối thiểu

Giải thích: minlength="8" yêu cầu tối thiểu 8 ký tự. "123" chỉ có 3 ký tự.

Câu A3:(Dựa vào file 07_forms_interactive.md)

- `<label for="email">` quan trọng cho người dùng screen reader vì:
  `<label>` kết hợp với thuộc tính for (liên kết đến id của input) giúp screen reader đọc to nội dung nhãn khi người dùng focus vào ô nhập. Nếu không có label, người dùng khiếm thị sẽ chỉ nghe thấy "ô nhập văn bản" mà không biết cần nhập gì (email, tên, số điện thoại…).

- Dùng `<fieldset>` để nhóm các thành phần liên quan trong form, và `<legend>` để cung cấp tiêu đề cho nhóm đó. Đặc biệt hữu ích cho:

  Nhóm radio button (cùng một chủ đề, chỉ chọn một)

  Nhóm checkbox (cùng một chủ đề, có thể chọn nhiều)

  Các trường thông tin phân cấp (ví dụ: địa chỉ, thông tin thanh toán)

  Ví dụ cụ thể – Chọn phương thức thanh toán:

```html
<fieldset>
  <legend>Phương thức thanh toán</legend>
  <label><input type="radio" name="payment" value="card" /> Thẻ tín dụng</label>
  <label><input type="radio" name="payment" value="paypal" /> PayPal</label>
  <label
    ><input type="radio" name="payment" value="cod" /> Thanh toán khi nhận
    hàng</label
  >
</fieldset>
```

- aria-label dùng khi:
  Phần tử không có nội dung văn bản hiển thị để mô tả chức năng, nhưng vẫn cần nhãn cho screen reader.

  Ví dụ: nút chỉ có icon, không có chữ: `<button aria-label="Đóng">✖</button>`

  Phần tử không hỗ trợ `<label>` (một số thành phần tùy chỉnh hoặc div/span đóng vai trò tương tác).

  KHÔNG nên dùng aria-label khi đã có `<label>` vì:
  1. `<label>` đã cung cấp tên truy cập (accessible name) một cách tự nhiên và được hỗ trợ đầy đủ bởi tất cả trình duyệt + screen reader.

  2. aria-label sẽ ghi đè nội dung của `<label>`, dẫn đến việc screen reader đọc hai nội dung khác nhau hoặc bỏ qua `<label>` – gây nhầm lẫn cho người dùng.

  3. Không cần thiết, làm code phức tạp và dễ sai. Nếu đã có `<label>` hữu ích cho người nhìn thấy, không cần aria-label. Chỉ dùng khi không có nhãn hiển thị nào khác.

Câu A4:

- loading="lazy" là một thuộc tính HTML giúp trì hoãn việc tải ảnh cho đến khi ảnh đó sắp xuất hiện trong khung nhìn (viewport) của người dùng. Cụ thể, trình duyệt chỉ tải ảnh khi người dùng cuộn đến gần vị trí của ảnh.

- Cải thiện:

Tăng tốc tải trang ban đầu – giảm số lượng request và dung lượng tải ngay lúc đầu.

Tiết kiệm băng thông – không tải ảnh mà người dùng không bao giờ cuộn đến.

Cải thiện Core Web Vitals (LCP, CLS) nếu áp dụng đúng cho ảnh ngoài màn hình.

- Không dùng khi:

Ảnh nằm ngay trong khu vực đầu tiên của trang (above the fold) – cần tải ngay để tránh trải nghiệm "hiệu ứng nhảy" (layout shift) hoặc làm chậm LCP.

Ảnh rất quan trọng cần hiển thị tức thì – ví dụ ảnh chính của sản phẩm trong trang chi tiết sản phẩm.

Trong các bố cục in ấn (printing) – vì browser có thể không tải ảnh lazy trước khi in.

Khi sử dụng JavaScript để thay đổi src động – đôi khi gây xung đột.

- Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì:

Các trình duyệt khác nhau hỗ trợ các định dạng video (codec + container) khác nhau. Cung cấp nhiều <source> giúp trình duyệt chọn định dạng đầu tiên mà nó hỗ trợ, đảm bảo video luôn phát được trên mọi trình duyệt mà không cần chuyển đổi thủ công.

- 3 format video web phổ biến:
  1. MP4 (container) với codec H.264 / AAC – hỗ trợ rộng rãi nhất, hầu hết mọi trình duyệt.

  2. WebM (VP9 hoặc VP8) – tối ưu cho web, dung lượng nhỏ, chất lượng tốt, được Chrome, Firefox, Edge, Opera hỗ trợ.

  3. Ogg (Theora + Vorbis) – định dạng mở, hỗ trợ bởi Firefox, Chrome cũ, nhưng ít phổ biến hơn hiện nay.

- alt (alternative text) cung cấp mô tả văn bản thay thế cho ảnh. Nó được sử dụng trong các trường hợp:

  Người dùng khiếm thị dùng screen reader sẽ đọc nội dung alt.

  Ảnh không tải được (do lỗi đường truyền, URL sai) thì văn bản alt hiển thị thay thế.

  Tối ưu SEO – công cụ tìm kiếm dùng alt để hiểu nội dung ảnh.
  1. Ảnh sản phẩm iPhone 16: `<img src="iphone16-blue.jpg" alt="iPhone 16 màu xanh dương với ba camera sau và màn hình Dynamic Island">`

  2. Ảnh trang trí (decorative): `<img src="background-pattern.png" alt="">`

  3. Ảnh biểu đồ doanh thu Q1/2026: `<img src="revenue-q1-2026.png" alt="Biểu đồ cột doanh thu quý 1 năm 2026 đạt 25 tỷ USD, tăng 15% so với quý 4 năm 2025">`

Câu A5:

- Dùng cách 1 khi: Hình ảnh không cần chú thích riêng hoặc chú thích đã được cung cấp bởi văn bản xung quanh, và ảnh chỉ mang tính bổ trợ trực quan.

Ví dụ thực tế:

Ảnh đại diện người dùng trong danh sách bình luận:

```html
<div class="comment">
  <img src="avatar-user123.jpg" alt="Avatar của Nguyễn Văn A" />
  <span class="username">Nguyễn Văn A</span>
  <p>Nội dung bình luận...</p>
</div>
```

Ảnh sản phẩm nhỏ trong giỏ hàng:

```html
<div class="cart-item">
  <img src="iphone16-thumb.jpg" alt="iPhone 16 Pro Max" />
  <span>iPhone 16 Pro Max – 25.990.000đ</span>
</div>
```

- Dùng cách 2 khi: Hình ảnh là một nội dung độc lập, có chú thích gắn liền (ví dụ: caption mô tả, nguồn ảnh, bảng chú giải), và việc tách ảnh khỏi caption sẽ làm mất ý nghĩa.

Ví dụ thực tế:

Biểu đồ doanh thu kèm chú thích nguồn số liệu:

```html
<figure>
  <img
    src="revenue-chart-q1-2026.png"
    alt="Biểu đồ cột doanh thu Q1/2026 tăng 15% so với Q4/2025"
  />
  <figcaption>Nguồn: Báo cáo tài chính Q1/2026 – Đơn vị: tỷ USD</figcaption>
</figure>
```

Ảnh minh họa bài báo về kiến trúc, có caption mô tả công trình:

```html
<figure>
  <img
    src="eiffel-tower-sunset.jpg"
    alt="Tháp Eiffel lúc hoàng hôn, ánh đèn vàng rực"
  />
  <figcaption>
    Tháp Eiffel về đêm – một trong những biểu tượng của Paris, Pháp.
  </figcaption>
</figure>
```

**PHẦN C**

Câu C1:

Lỗi 1: Dòng 2 — Input "Tên" không có `<label>` liên kết, thiếu id và name, vi phạm accessibility và validation.
Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`

Lỗi 2: Dòng 4 — Input email chỉ dùng placeholder, không có `<label>`, không có name, không thể gửi dữ liệu.
Sửa: `<label for="email">Email:</label> <input type="email" id="email" name="email" required>`

Lỗi 3: Dòng 6 — Input mật khẩu thiếu `<label>`, thiếu name, không có ràng buộc cần thiết.
Sửa: `<label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" required>`

Lỗi 4: Dòng 7 — Input nhập lại mật khẩu thiếu `<label>`, thiếu name, không có kiểm tra trùng khớp cơ bản.
Sửa: `<label for="confirm_password">`Nhập lại mật khẩu:`</label> <input type="password" id="confirm_password" name="confirm_password" required>`

Lỗi 5: Dòng 9 — Input "Phone" không có `<label>` liên kết, dùng type="text" thay vì tel, có giá trị mặc định không nên có.
Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" placeholder="Số điện thoại" required>`

Lỗi 6: Dòng 11-14 — Thẻ `<select>` thiếu `<label>`, thiếu name, các `<option>` không có giá trị value.
Sửa: `<label for="city">`Thành phố:`</label> <select id="city" name="city" required><option value="">`Chọn thành phố`</option><option value="HN">`Hà Nội`</option><option value="HCM">`TP.HCM`</option></select>`

Lỗi 7: Dòng 16-18 — `<label>` chứa chữ "Tôi đồng ý điều khoản" nhưng không có input checkbox đi kèm, không thể thu thập xác nhận.
Sửa: `<input type="checkbox" id="terms" name="terms" required> <label for="terms">`Tôi đồng ý điều khoản</label>

Lỗi 8: Dòng 1 — Thẻ `<form>` thiếu method và action, không xác định cách gửi dữ liệu, vi phạm best practices.
Sửa: `<form method="POST" action="/submit">`

Câu C2:

1. Pattern regex cho CMND/CCCD và Số tài khoản
   CMND/CCCD (12 chữ số):
   `^\d{12}$`

Giải thích: ^ bắt đầu chuỗi, \d{12} đúng 12 ký số, $ kết thúc chuỗi.

Số tài khoản (10–15 chữ số):
`^\d{10,15}$`

Giải thích: \d{10,15} từ 10 đến 15 ký số.

Ví dụ áp dụng trong HTML:

```html
<input type="text" pattern="\d{12}" title="CMND/CCCD gồm 12 chữ số" required>

<input type="text" pattern="\d{10,15}" title="Số tài khoản từ 10 đến 15 chữ số" required>
```
2. HTML5 validation chưa đủ an toàn cho ứng dụng ngân hàng.

Vì:
HTML5 validation chạy hoàn toàn trên trình duyệt (frontend), người dùng có thể dễ dàng tắt JavaScript, chỉnh sửa DOM, hoặc gửi request giả mạo qua công cụ như Postman, Burp Suite. Ứng dụng ngân hàng yêu cầu tính toàn vẹn dữ liệu, chống tấn công và bảo mật nghiêm ngặt, do đó bắt buộc phải có validation ở backend.

3. Ba loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)

Kiểm tra sự trùng khớp giữa hai trường – ví dụ: nhập lại mật khẩu khớp với mật khẩu gốc, xác nhận số tài khoản trùng với số tài khoản đã nhập trước đó.

Kiểm tra tính hợp lệ theo logic nghiệp vụ phức tạp – ví dụ: ngày sinh phải đủ 18 tuổi, mã PIN không được trùng với 3 PIN cũ nhất, số CMND phải đúng với mã tỉnh thành.

Gọi API kiểm tra thời gian thực – ví dụ: email đã tồn tại trong hệ thống hay chưa, số tài khoản có thuộc đúng chi nhánh ngân hàng không.

4. Hai rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend

Tấn công bằng dữ liệu độc hại (Injection, XSS, buffer overflow) – Kẻ tấn công gửi trực tiếp request tới API với dữ liệu không hợp lệ (chuỗi quá dài, mã độc SQL, script) mà không qua frontend, dẫn đến lỗ hổng nghiêm trọng.

Phá vỡ ràng buộc nghiệp vụ, ghi nhận dữ liệu sai – Ví dụ: tạo tài khoản với số CMND 5 chữ số, số tài khoản chứa chữ cái, PIN không phải 6 số – gây sai lệch cơ sở dữ liệu, ảnh hưởng đến đối soát, báo cáo và an toàn giao dịch.
