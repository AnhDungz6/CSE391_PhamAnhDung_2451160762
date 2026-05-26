## PHẦN A

Câu A1:

Đoạn 1

```js
console.log(x);
var x = 5;


Dự đoán output:

undefined

Giải thích:

var có cơ chế hoisting. Khai báo var x được đưa lên đầu phạm vi, nhưng giá trị 5 chưa được gán ngay.

JavaScript hiểu gần giống như:

var x;
console.log(x);
x = 5;

Vì vậy kết quả in ra là undefined.

Đoạn 2
console.log(y);
let y = 10;

Dự đoán output:

ReferenceError: Cannot access 'y' before initialization

Giải thích:

let cũng có hoisting nhưng khác var. Biến y nằm trong vùng Temporal Dead Zone từ đầu block cho đến dòng khai báo.

Vì truy cập y trước khi khai báo nên chương trình báo lỗi ReferenceError.

Đoạn 3
const z = 15;
z = 20;
console.log(z);

Dự đoán output:

TypeError: Assignment to constant variable.

Giải thích:

const dùng để khai báo hằng số, không cho phép gán lại giá trị mới sau khi đã khởi tạo.

Dòng:

z = 20;

sẽ gây lỗi TypeError, nên dòng console.log(z) không được chạy.

Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

Dự đoán output:

[1, 2, 3, 4]

Giải thích:

const không cho phép gán lại biến sang một mảng mới, nhưng vẫn cho phép thay đổi nội dung bên trong mảng.

Ví dụ sai:

arr = [5, 6];

Ví dụ đúng:

arr.push(4);

Vì vậy mảng sau khi thêm phần tử sẽ là [1, 2, 3, 4].

Đoạn 5
let a = 1;
{
let a = 2;
console.log("Trong block:", a);
}
console.log("Ngoài block:", a);

Dự đoán output:

Trong block: 2
Ngoài block: 1

Giải thích:

let có phạm vi block scope, tức là chỉ có tác dụng trong cặp dấu {}.

Biến a bên trong block là một biến khác với biến a bên ngoài block.

Vì vậy:

Trong block in ra 2
Ngoài block in ra 1
Kết quả khi chạy code

Khi chạy toàn bộ file, chương trình in ra:

undefined

Sau đó dừng ở đoạn 2 và báo lỗi:

ReferenceError: Cannot access 'y' before initialization

Lý do là khi gặp lỗi ở đoạn 2, chương trình sẽ dừng lại nên các đoạn phía sau không được chạy.

Các kết quả bất ngờ

1. var in ra undefined thay vì báo lỗi

Do var bị hoisting. Biến đã tồn tại nhưng chưa được gán giá trị.

2. let báo lỗi khi dùng trước khai báo

Do let có Temporal Dead Zone, không được truy cập trước dòng khai báo.

3. const vẫn sửa được mảng

const chỉ cố định địa chỉ tham chiếu của biến, không khóa nội dung bên trong mảng.

```

```

```

Câu A2:

## Dự đoán kết quả

```js
console.log(typeof null);        // object
console.log(typeof undefined);   // undefined
console.log(typeof NaN);         // number
console.log("5" + 3);            // "53"
console.log("5" - 3);            // 2
console.log("5" * "3");          // 15
console.log(true + true);        // 2
console.log([] + []);            // ""
console.log([] + {});            // "[object Object]"
console.log({} + []);            // "[object Object]"
Giải thích ngắn gọn
typeof null trả về "object" do lỗi lịch sử của JavaScript.
NaN vẫn có kiểu number.
"5" + 3 → nối chuỗi nên ra "53".
"5" - 3 → ép "5" thành số nên ra 2.
"5" * "3" → ép cả hai thành số nên ra 15.
true được ép thành 1.
[] ép thành chuỗi rỗng "".
{} ép thành "[object Object]".
Vì sao "5" + 3 khác "5" - 3
+ vừa cộng số vừa nối chuỗi → "5" + 3 = "53"
- chỉ dùng cho số → "5" - 3 = 2
```

Câu A3:

Dưới đây là kết quả chính xác kèm theo giải thích ngắn gọn tại sao nó lại ra như vậy:

```js
console.log(5 == "5"); // true  -> Kiểu string "5" được ép thành kiểu number 5.
console.log(5 === "5"); // false -> Khác kiểu dữ liệu (number vs string).
console.log(null == undefined); // true  -> Đây là trường hợp đặc biệt trong quy tắc của JS.
console.log(null === undefined); // false -> Khác kiểu dữ liệu (object vs undefined).
console.log(NaN == NaN); // false -> Lại một cú lừa! NaN (Not a Number) không bằng bất cứ thứ gì, kể cả chính nó.
console.log(0 == false); // true  -> Kiểu boolean false được ép thành số 0.
console.log(0 === false); // false -> Khác kiểu dữ liệu (number vs boolean).
console.log("" == false); // true  -> Chuỗi rỗng "" và false đều được ép về số 0.
```

💡 Lưu ý về NaN: Để kiểm tra một giá trị có phải là NaN hay không, bạn không được dùng == hay ===, mà phải dùng hàm isNaN() hoặc Number.isNaN().

- Quy tắc: Từ giờ trở đi nên dùng == hay ===? Tại sao?
  Từ giờ trở đi, NÊN LUÔN LUÔN DÙNG === (và !==).

Hầu hết các tài liệu chuẩn (như MDN) và các bộ quy tắc viết code khắt khe của các công ty lớn (Google, Airbnb style guide) đều bắt buộc điều này.

Tại sao lại như vậy?
Tránh các lỗi ngầm nguy hiểm (Side-effects): Như bạn thấy ở phần ví dụ, việc "" == false hay 0 == false ra true rất dễ khiến logic của bạn bị chạy sai ngoài ý muốn nếu bạn chỉ muốn kiểm tra xem một biến có thực sự là false hay không.

Code rõ ràng, tường minh: Khi đọc vào ===, bạn và đồng đội biết chắc chắn rằng biến đó phải khớp cả về "chất" (kiểu) lẫn "lượng" (giá trị).

Hiệu năng tốt hơn (Tối ưu nhỏ): Vì === không phải mất thêm bước "ép kiểu" trung gian như == nên về lý thuyết, nó sẽ chạy nhanh hơn một chút (dù trong thực tế sự khác biệt này rất nhỏ).

Câu A4:

Theo tài liệu chuẩn MDN, các giá trị Falsy gồm có:

1. false (Chính nó)

2. 0 (Số không)

3. -0 (Số không âm)

4. 0n (Kiểu BigInt số không)

5. "" hoặc '' hoặc ````` (Chuỗi rỗng, không chứa bất kỳ ký tự nào)

6. null (Giá trị rỗng/vô giá trị)

7. undefined (Biến chưa được định nghĩa)

8.NaN (Not a Number - Không phải là số)

Kết quả

```js
if ("0") console.log("A"); // IN RA "A" -> "0" là một chuỗi có ký tự (không phải chuỗi rỗng), nên nó là Truthy.
if ("") console.log("B"); // KHÔNG IN -> Chuỗi rỗng là Falsy.
if ([]) console.log("C"); // IN RA "C" -> Mảng rỗng là một Object, và MỌI Object/Array trong JS đều là Truthy!
if ({}) console.log("D"); // IN RA "D" -> Object rỗng cũng là Truthy (giống mảng rỗng).
if (null) console.log("E"); // KHÔNG IN -> null là Falsy.
if (0) console.log("F"); // KHÔNG IN -> Số 0 là Falsy.
if (-1) console.log("G"); // IN RA "G" -> Chỉ có số 0 mới là Falsy, các số âm hay dương khác 0 đều là Truthy.
if (" ") console.log("H"); // IN RA "H" -> Chuỗi này chứa 1 dấu cách (space), không phải chuỗi rỗng hoàn toàn, nên là Truthy.
```

Câu A5:

Cách 1: Nối chuỗi cơ bản

```js
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

Cách 2: Tạo đường dẫn URL (API Endpoint)

```js
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

Cách 3: Tạo đoạn mã HTML nhiều dòng (Multi-line String)

```html
var html = `
<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>
`;
```

## PHẦN C

Câu C1

## Code đã sửa

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  if (phanTramGiam < 0 || phanTramGiam > 100) {
    return "Phần trăm giảm không hợp lệ";
  }

  // Lỗi 1 đã sửa: ép kiểu giaBan sang số
  var giamGia = (Number(giaBan) * phanTramGiam) / 100;
  let giaSauGiam = Number(giaBan) - giamGia;

  // Lỗi 2 đã sửa: == thay vì =
  if (giaSauGiam == 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

// Lỗi 3 đã sửa: truyền số thay vì chuỗi
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

// Lỗi 4 đã sửa: 110 -> 10 (hoặc xử lý kết quả trả về là chuỗi lỗi)
const gia2 = tinhGiaGiamGia(50000, 10);
console.log("Giá: " + gia2);

// Lỗi 5 đã sửa: var -> let để capture đúng giá trị i
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

---

## Danh sách lỗi

### Lỗi 1 — Truyền chuỗi thay vì số (dòng `tinhGiaGiamGia("100000", 20)`)

**Vấn đề:** `giaBan` được truyền vào là `"100000"` (string).  
Khi tính `giaBan * phanTramGiam / 100`, JavaScript tự ép kiểu nên phép nhân vẫn ra đúng, nhưng phép trừ `giaBan - giamGia` sẽ ra kết quả không mong muốn vì `giaBan` vẫn là chuỗi trong một số trường hợp, gây bug khó phát hiện.

**Sửa:** Truyền số `100000` (bỏ dấu nháy), hoặc dùng `Number(giaBan)` bên trong hàm.

---

### Lỗi 2 — Dùng `=` (gán) thay vì `==` (so sánh) (dòng `if (giaSauGiam = 0)`)

**Vấn đề:** `if (giaSauGiam = 0)` gán giá trị `0` vào `giaSauGiam`, luôn trả về `false` → khối `if` không bao giờ chạy, đồng thời **làm hỏng giá trị `giaSauGiam`** trước khi `return`.

**Sửa:** Đổi thành `if (giaSauGiam == 0)` hoặc `=== 0`.

---

### Lỗi 3 — `phanTramGiam = 110` vượt quá 100 (dòng `tinhGiaGiamGia(50000, 110)`)

**Vấn đề:** Hàm kiểm tra `phanTramGiam > 100` và trả về chuỗi lỗi, nhưng đoạn test vẫn truyền `110`. Kết quả `gia2` là một chuỗi `"Phần trăm giảm không hợp lệ"` — nếu sau này dùng `gia2` để tính toán sẽ ra `NaN`.

**Sửa:** Truyền giá trị hợp lệ, ví dụ `tinhGiaGiamGia(50000, 10)`.

---

### Lỗi 4 (ẩn) — Dùng `var i` trong `for` + `setTimeout`

**Vấn đề:**

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i); // luôn in "Item 5"
  }, 1000);
}
```

`var` có **function scope** (không phải block scope), nên tất cả 5 callback của `setTimeout` đều dùng chung **một biến `i` duy nhất**. Khi các callback chạy sau 1 giây, vòng lặp đã kết thúc và `i = 5` rồi → tất cả đều in `"Item 5"`.

**Sửa:** Đổi `var i` thành `let i`. `let` có **block scope**, mỗi lần lặp tạo ra một `i` riêng biệt → in đúng `Item 0`, `Item 1`, ..., `Item 4`.

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

---

### Lỗi 5 — Thiếu dấu chấm phẩy (style / strict mode)

**Vấn đề:** Nhiều dòng thiếu `;` ở cuối. Tuy JavaScript có ASI (Automatic Semicolon Insertion) xử lý được, nhưng trong một số trường hợp (dòng bắt đầu bằng `(`, `[`, `/`) sẽ gây lỗi thực sự.

**Sửa:** Thêm `;` nhất quán cuối mỗi câu lệnh.

---

### Lỗi 6 — Không kiểm tra kiểu đầu vào `giaBan`

**Vấn đề:** Hàm không validate `giaBan`. Nếu truyền vào `null`, `undefined`, hoặc chuỗi không phải số → kết quả là `NaN` mà không có thông báo lỗi.

**Sửa:** Thêm kiểm tra đầu hàm:

```javascript
if (typeof giaBan !== "number" || isNaN(giaBan) || giaBan < 0) {
  return "Giá bán không hợp lệ";
}
```

---

## Tóm tắt

| #   | Vị trí                           | Lỗi                                     | Mức độ                |
| --- | -------------------------------- | --------------------------------------- | --------------------- |
| 1   | Tham số `giaBan`                 | Truyền string `"100000"` thay vì number | Trung bình            |
| 2   | `if (giaSauGiam = 0)`            | Gán `=` thay vì so sánh `==`            | **Nghiêm trọng**      |
| 3   | `tinhGiaGiamGia(50000, 110)`     | `phanTramGiam` vượt giới hạn            | Trung bình            |
| 4   | `for (var i ...)` + `setTimeout` | `var` không có block scope → in sai     | **Ẩn / Nghiêm trọng** |
| 5   | Toàn file                        | Thiếu dấu `;`                           | Nhẹ                   |
| 6   | Đầu hàm                          | Không validate `giaBan`                 | Trung bình            |

Câu C2:

```javascript
// ===== DỮ LIỆU ĐẦU VÀO =====
const monAn = [
  { ten: "Phở bò", gia: 65000, soLuong: 2 },
  { ten: "Trà đá", gia: 5000, soLuong: 3 },
  { ten: "Bún chả", gia: 55000, soLuong: 1 },
];

const isWednesday = new Date().getDay() === 3; // true nếu hôm nay là thứ 4 (Wed)
const coTip = true; // false nếu không tính tip

// ===== TÍNH TOÁN =====
function tinhHoaDon(monAn, isWednesday, coTip) {
  const tongCong = monAn.reduce((sum, m) => sum + m.gia * m.soLuong, 0);

  let phanTramGiam = 0;
  if (tongCong > 1000000) phanTramGiam = 15;
  else if (tongCong > 500000) phanTramGiam = 10;
  if (isWednesday) phanTramGiam += 5;

  const soTienGiam = (tongCong * phanTramGiam) / 100;
  const sauGiam = tongCong - soTienGiam;
  const vat = sauGiam * 0.08;
  const tip = coTip ? tongCong * 0.05 : 0;
  const thanhToan = sauGiam + vat + tip;

  return { tongCong, phanTramGiam, soTienGiam, vat, tip, thanhToan };
}

// ===== IN HÓA ĐƠN =====
function formatTien(so) {
  return so.toLocaleString("vi-VN") + "đ";
}

function pad(str, width) {
  return str + " ".repeat(Math.max(0, width - str.length));
}

function inHoaDon(monAn, isWednesday, coTip) {
  const { tongCong, phanTramGiam, soTienGiam, vat, tip, thanhToan } =
    tinhHoaDon(monAn, isWednesday, coTip);

  const W = 44; // chiều rộng bên trong
  const line = "║" + " ".repeat(W) + "║";
  const top = "╔" + "═".repeat(W) + "╗";
  const sep = "╠" + "═".repeat(W) + "╣";
  const bot = "╚" + "═".repeat(W) + "╝";

  function row(left, right) {
    const gap = W - left.length - right.length;
    return "║ " + left + " ".repeat(Math.max(1, gap - 1)) + right + " ║";
  }

  console.log(top);
  console.log("║" + pad("        HÓA ĐƠN NHÀ HÀNG", W) + "║");
  console.log(sep);

  monAn.forEach((m, i) => {
    const tong = m.gia * m.soLuong;
    const giaK = m.gia / 1000 + "k";
    const tongK = tong / 1000 + "k";
    const left = `${i + 1}. ${pad(m.ten, 12)} x${m.soLuong}  @${giaK}`;
    console.log(row(left, "= " + tongK));
  });

  console.log(sep);
  console.log(row("Tổng cộng:", formatTien(tongCong)));
  console.log(
    row(`Giảm giá (${phanTramGiam}%):`, "-" + formatTien(soTienGiam)),
  );
  console.log(row("VAT (8%):", "+" + formatTien(vat)));
  if (coTip) console.log(row("Tip (5%):", "+" + formatTien(tip)));
  console.log(sep);
  console.log(row("THANH TOÁN:", formatTien(thanhToan)));
  console.log(bot);

  if (isWednesday) console.log("\n✓ Thứ 4 — áp dụng giảm thêm 5%");
}

inHoaDon(monAn, isWednesday, coTip);
```
