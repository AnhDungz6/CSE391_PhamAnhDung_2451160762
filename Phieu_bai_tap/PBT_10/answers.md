# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

---

## Câu A1 (5đ) — Sync vs Async

### Thứ tự output:

```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```

### Giải thích Event Loop:

JavaScript single-threaded, Event Loop điều phối 3 tầng:

**Call Stack** → Code đồng bộ, chạy ngay, ưu tiên cao nhất.

**Microtask Queue** → `Promise.then()`. Chạy **hết toàn bộ** trước khi sang macrotask.

**Macrotask Queue** → `setTimeout()`. Mỗi vòng Event Loop chỉ lấy **1 task**, rồi kiểm tra lại microtask.

**Lý do thứ tự trên:**

1. `"1 - Start"` và `"4 - End"` là sync → chạy ngay.
2. Hai Promise callback (`3`, `6`) vào Microtask Queue → chạy hết trước setTimeout.
3. Trong khi chạy `"6 - Promise 2"`, `setTimeout "7"` được đăng ký vào Macrotask Queue.
4. Macrotask chạy theo thứ tự đăng ký: `2 (0ms)` → `7 (0ms, đăng ký sau)` → `5 (100ms)`.

---

## Câu A2 (5đ) — Fetch API

```js
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed:", error.message);
    return null;
  }
}
```

**1. `await fetch(...)`**
`fetch()` trả về `Promise<Response>`. Cần `await` để chờ network respond và lấy `Response` object thật — không `await` thì `response` chỉ là Promise, không dùng được.

**2. `response.ok` khi nào `false`?**
`response.ok = true` chỉ khi status **200–299**. Ba status codes trả về `false`:

- `404 Not Found`
- `401 Unauthorized`
- `500 Internal Server Error`

> `fetch()` **không tự throw** khi 404/500 — vẫn resolve bình thường. Phải check `response.ok` thủ công.

**3. `response.json()` tại sao cần `await` lần nữa?**
Vì data từ network đến dưới dạng **stream**. `response.json()` phải đọc hết stream rồi mới parse — nó cũng trả về `Promise`, nên cần `await` lần 2.

**4. `try...catch` bắt những lỗi gì?**

| Lỗi                            | Bị catch?                                                    |
| ------------------------------ | ------------------------------------------------------------ |
| Network error (mất mạng, CORS) | ✅ — `fetch()` tự throw                                      |
| HTTP 4xx/5xx                   | ✅ — nhưng **chỉ vì ta tự** `throw new Error(...)`           |
| JSON parse error               | ✅ — `response.json()` throw nếu body không phải JSON hợp lệ |

---

## Câu A3 (5đ) — Promise States & Callback Hell

### Sơ đồ 3 trạng thái:

```
              ┌─────────────┐
              │   PENDING   │  ← Trạng thái khởi đầu
              └──────┬──────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
  ┌──────────────┐     ┌──────────────┐
  │  FULFILLED   │     │   REJECTED   │
  │  (thành công)│     │  (thất bại)  │
  │ .then() chạy │     │ .catch() chạy│
  └──────────────┘     └──────────────┘
```

Một khi đã Fulfilled hoặc Rejected → **không thể đổi trạng thái**.

---

### Callback Hell là gì?

Là các callback lồng nhau quá sâu khiến code khó đọc, khó xử lý lỗi, khó maintain — trông như hình kim tự tháp nghiêng.

**4 cấp Callback Hell:**

```js
getUser(userId, function (err, user) {
  getProfile(user.id, function (err, profile) {
    getPosts(profile.id, function (err, posts) {
      getComments(posts[0].id, function (err, comments) {
        // Xử lý ở đây — đã lồng 4 cấp
      });
    });
  });
});
```

**Refactor thành async/await:**

```js
async function getUserData(userId) {
  try {
    const user = await getUser(userId);
    const profile = await getProfile(user.id);
    const posts = await getPosts(profile.id);
    const comments = await getComments(posts[0].id);
    return { user, profile, posts, comments };
  } catch (err) {
    console.error(err);
  }
}
```

Code phẳng, xử lý lỗi 1 chỗ duy nhất.
