## PHẦN A

Câu 1:

## 3 cách viết hàm `tinhThueBaoHiem`

```javascript
// ===== 1. Function Declaration =====
function tinhThueBaoHiem_Declaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
}

// ===== 2. Function Expression =====
const tinhThueBaoHiem_Expression = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
};

// ===== 3. Arrow Function =====
const tinhThueBaoHiem_Arrow = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
};

// ===== Test =====
console.log(tinhThueBaoHiem_Declaration(15000000));
// { thue: 1500000, thuc_nhan: 13500000 }

console.log(tinhThueBaoHiem_Expression(9000000));
// { thue: 0, thuc_nhan: 9000000 }

console.log(tinhThueBaoHiem_Arrow(11000000));
// { thue: 0, thuc_nhan: 11000000 }
```

---

## Hoisting — Khác nhau như thế nào?

### 1. Function Declaration → được hoisting TOÀN BỘ

Cả tên lẫn nội dung hàm được kéo lên đầu scope.  
→ Gọi trước khi khai báo vẫn chạy được.

```javascript
// Gọi TRƯỚC khi khai báo → OK
console.log(tinhThueBaoHiem_Declaration(15000000));
// { thue: 1500000, thuc_nhan: 13500000 } ✅

function tinhThueBaoHiem_Declaration(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
}
```

---

### 2. Function Expression → chỉ hoisting TÊN BIẾN, không hoisting giá trị

`const` được kéo lên nhưng chưa có giá trị (ở trạng thái **Temporal Dead Zone**).  
→ Gọi trước khi khai báo → lỗi.

```javascript
// Gọi TRƯỚC khi khai báo → LỖI
console.log(tinhThueBaoHiem_Expression(15000000));
// ❌ ReferenceError: Cannot access 'tinhThueBaoHiem_Expression' before initialization

const tinhThueBaoHiem_Expression = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};
```

---

### 3. Arrow Function → giống Function Expression, KHÔNG được hoisting

Cũng dùng `const` nên cùng hành vi: gọi trước → lỗi.

```javascript
// Gọi TRƯỚC khi khai báo → LỖI
console.log(tinhThueBaoHiem_Arrow(15000000));
// ❌ ReferenceError: Cannot access 'tinhThueBaoHiem_Arrow' before initialization

const tinhThueBaoHiem_Arrow = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return { thue, thuc_nhan: luong - thue };
};
```

---

Câu A2:

---

## Đoạn 1: Closure Counter

```js
function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}
const c = counter();
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount()); // 2
```

### Giải thích

- Khi `counter()` được gọi, một biến `count = 0` được tạo trong **local scope** của hàm.
- Hàm trả về một object gồm 3 arrow function. Cả 3 đều **"đóng lại" (close over)** biến `count` — tức là chúng giữ tham chiếu đến cùng một `count` trong bộ nhớ, dù `counter()` đã chạy xong.
- Đây chính là **closure**: hàm con ghi nhớ môi trường nơi nó được tạo ra.

| Lệnh gọi        | Thao tác                  | Giá trị `count` sau | Output |
| --------------- | ------------------------- | ------------------- | ------ |
| `c.increment()` | `++count` (pre-increment) | 1                   | **1**  |
| `c.increment()` | `++count`                 | 2                   | **2**  |
| `c.increment()` | `++count`                 | 3                   | **3**  |
| `c.decrement()` | `--count` (pre-decrement) | 2                   | **2**  |
| `c.getCount()`  | return `count`            | 2                   | **2**  |

> **Lưu ý:** `++count` là pre-increment → tăng **rồi mới** trả về. Nếu là `count++` (post-increment) thì sẽ trả về giá trị trước khi tăng.

---

## Đoạn 2: `var` vs `let` trong vòng lặp `setTimeout`

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200);
}
```

### Output sau 200ms:

```
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

_(3 dòng `var` xuất hiện ở ~100ms, 3 dòng `let` xuất hiện ở ~200ms)_

---

### Tại sao `var` in ra `3` cả 3 lần?

`var` có **function scope** (hoặc global scope nếu không nằm trong hàm). Điều này có nghĩa là **chỉ có MỘT biến `i` duy nhất** tồn tại cho toàn bộ vòng lặp.

```
Vòng lặp chạy xong → i = 3
   ↓ (100ms trôi qua)
3 callback được gọi → tất cả đọc cùng 1 biến i → đều thấy i = 3
```

Cả 3 arrow function đều **close over cùng một tham chiếu** đến biến `i`. Khi `setTimeout` thực thi callback (sau 100ms), vòng lặp đã kết thúc từ lâu và `i` đã bằng `3`.

### Tại sao `let` in ra `0, 1, 2`?

`let` có **block scope**. Mỗi lần lặp của vòng `for`, JavaScript tạo ra một **binding (biến) `j` mới** riêng biệt cho block đó.

```
Lần lặp 0 → j₀ = 0, callback₀ closes over j₀
Lần lặp 1 → j₁ = 1, callback₁ closes over j₁
Lần lặp 2 → j₂ = 2, callback₂ closes over j₂
   ↓ (200ms trôi qua)
callback₀ chạy → đọc j₀ = 0  ✅
callback₁ chạy → đọc j₁ = 1  ✅
callback₂ chạy → đọc j₂ = 2  ✅
```

Mỗi callback giữ tham chiếu đến một biến `j` **độc lập**, nên không bị ảnh hưởng lẫn nhau.

---

Câu A3:

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1
nums.filter(n => n % 2 === 0)

// 2
nums.map(n => n \* 3)

// 3
nums.reduce((acc, n) => acc + n, 0)

// 4
nums.find(n => n > 7)

// 5
nums.some(n => n > 10)

// 6
nums.every(n => n > 0)

// 7
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`)

// 8
[...nums].reverse()

Câu A4:

---

## Output từng dòng

```js
console.log(name, price, ram, color); // "iPhone 16" 25990000 8 "Titan"
console.log(specs); // ReferenceError: specs is not defined
console.log(updated.price); // 23990000
console.log(updated.sale); // true
console.log(product.price); // 25990000  (gốc KHÔNG đổi)
console.log(product.specs.ram); // 16
```

---

## Giải thích

### 1. `console.log(name, price, ram, color)` → `"iPhone 16" 25990000 8 "Titan"`

Destructuring nested object: `specs: { ram, color }` có nghĩa là **giải nén `specs` lấy ra `ram` và `color`**, nhưng **không tạo ra biến tên `specs`**.

---

### 2. `console.log(specs)` → `ReferenceError: specs is not defined`

Cú pháp `specs: { ram, color }` chỉ là **alias để đi sâu vào nested object**, không khai báo biến `specs` trong scope. Muốn giữ cả `specs` lẫn destructure bên trong thì phải viết:

```js
const {
  specs,
  specs: { ram, color },
} = product;
```

---

### 3. `console.log(updated.price)` → `23990000`

Spread `{ ...product, price: 23990000 }` copy toàn bộ `product` trước, sau đó **property phía sau ghi đè** property cùng tên phía trước.

---

### 4. `console.log(updated.sale)` → `true`

`sale: true` là property mới, không có trong `product` nên được thêm vào `updated` bình thường.

---

### 5. `console.log(product.price)` → `25990000` (gốc KHÔNG đổi)

Spread tạo ra **shallow copy** — object `updated` hoàn toàn mới. Thay đổi primitive property (`price`) trên `updated` không ảnh hưởng đến `product`.

---

### 6. `console.log(product.specs.ram)` → `16` ⚠️

Đây là **shallow copy gotcha**.

Spread chỉ copy **một tầng (shallow)**:

```
copy = { name: "iPhone 16", price: 25990000, specs: <cùng tham chiếu> }
                                                          ↑
                                              product.specs và copy.specs
                                              trỏ đến CÙNG 1 object trong bộ nhớ
```

Khi gán `copy.specs.ram = 16`, ta đang **đột biến trực tiếp object `specs` gốc** — vì `copy.specs` và `product.specs` là cùng một tham chiếu.

## PHẦN C

Câu C1:

Sửa lại code:

```javascript
const processOrders = (orders) =>
  orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
      id,
      customer,
      total,
      discount: total * 0.1,
      finalTotal: total * 0.9,
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

Câu C2:

```javascript
const miniArray = {
  map: (arr, fn) => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr));
    }

    return result;
  },

  filter: (arr, fn) => {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      if (fn(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }

    return result;
  },

  reduce: (arr, fn, initialValue) => {
    let acc;
    let startIndex;

    if (initialValue !== undefined) {
      acc = initialValue;
      startIndex = 0;
    } else {
      acc = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      acc = fn(acc, arr[i], i, arr);
    }

    return acc;
  },
};

// TEST
console.log(miniArray.map([1, 2, 3], (x) => x * 2));
// [2,4,6]

console.log(miniArray.filter([1, 2, 3, 4], (x) => x > 2));
// [3,4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// 10

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b));
// 10
```

## PHAN D:

link video: https://drive.google.com/file/d/1wUD50-2V-lfeRKFxHMuGIQsBbhP1_gNb/view?usp=sharing
