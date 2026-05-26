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
