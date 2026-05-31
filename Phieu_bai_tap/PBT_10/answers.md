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

# PHẦN C

---

## Câu C1 (10đ) — Error Handling Strategy

### 1. Network Errors (mất mạng giữa chừng)

`fetch()` tự throw khi mất kết nối → dùng `try/catch` bắt.

```js
try {
  const response = await fetch("/api/products");
} catch (error) {
  // error.name === "TypeError" khi mất mạng
  console.error("Mất kết nối:", error.message);
  showToast("Không có mạng. Vui lòng kiểm tra kết nối.");
}
```

---

### 2. API Errors (xử lý từng loại)

```js
async function handleApiErrors(response) {
  if (response.ok) return response;

  switch (response.status) {
    case 404:
      throw new Error("Không tìm thấy sản phẩm.");
    case 429:
      // Too Many Requests — đợi rồi thử lại
      const retryAfter = response.headers.get("Retry-After") || 5;
      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      throw new Error("Quá nhiều request. Đang thử lại...");
    case 500:
      throw new Error("Lỗi server. Vui lòng thử lại sau.");
    default:
      throw new Error(`Lỗi HTTP: ${response.status}`);
  }
}
```

---

### 3. Timeout — `fetchWithTimeout(url, ms)`

```js
async function fetchWithTimeout(url, ms = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Request timeout sau ${ms}ms`);
    }
    throw error;
  }
}

// Dùng:
const response = await fetchWithTimeout("/api/orders", 10000);
```

**Giải thích:** `AbortController` tạo signal để hủy fetch. Sau `ms` milliseconds, `setTimeout` gọi `abort()` → fetch bị hủy → catch bắt `AbortError`.

---

### 4. Retry Logic — `fetchWithRetry(url, maxRetries)`

```js
async function fetchWithRetry(url, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, 10000);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      console.warn(`Lần thử ${attempt}/${maxRetries} thất bại:`, error.message);

      if (attempt < maxRetries) {
        // Exponential backoff: 1s, 2s, 4s
        await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)));
      }
    }
  }

  throw new Error(`Thất bại sau ${maxRetries} lần: ${lastError.message}`);
}

// Dùng:
try {
  const response = await fetchWithRetry("/api/cart");
  const data = await response.json();
} catch (error) {
  showToast("Không thể kết nối. Vui lòng thử lại sau.");
}
```

**Giải thích:** Mỗi lần thất bại đợi lâu hơn (1s → 2s → 4s) — gọi là **exponential backoff** — tránh spam server liên tục.

---

## Câu C2 (10đ) — Promise.all vs allSettled vs race vs any

### Bảng so sánh:

| Method          | Khi nào resolve?                      | Khi nào reject?             | Use case                                          |
| --------------- | ------------------------------------- | --------------------------- | ------------------------------------------------- |
| `.all()`        | Khi **tất cả** resolve                | Ngay khi **1 cái** reject   | Các request phụ thuộc nhau, cần đủ hết            |
| `.allSettled()` | Khi **tất cả** hoàn thành (kể cả lỗi) | **Không bao giờ** reject    | Gọi nhiều API độc lập, muốn biết từng cái thế nào |
| `.race()`       | Khi **cái đầu tiên** resolve          | Khi **cái đầu tiên** reject | Timeout, fallback server                          |
| `.any()`        | Khi **1 cái** resolve                 | Khi **tất cả** reject       | Thử nhiều nguồn, lấy cái nhanh nhất thành công    |

---

### Ví dụ thực tế:

**`Promise.all()` — Tải trang chi tiết sản phẩm (cần đủ hết mới hiển thị)**

```js
async function loadProductPage(productId) {
  // Cần cả 3: thiếu 1 cái không hiển thị được trang
  const [product, reviews, inventory] = await Promise.all([
    fetch(`/api/products/${productId}`).then((r) => r.json()),
    fetch(`/api/reviews/${productId}`).then((r) => r.json()),
    fetch(`/api/inventory/${productId}`).then((r) => r.json()),
  ]);

  renderProductPage(product, reviews, inventory);
}
```

---

**`Promise.allSettled()` — Gửi thông báo đến nhiều kênh (không cần tất cả thành công)**

```js
async function sendOrderNotification(orderId) {
  const results = await Promise.allSettled([
    sendEmail(orderId),
    sendSMS(orderId),
    sendPushNotification(orderId),
  ]);

  results.forEach((result, i) => {
    const channel = ["Email", "SMS", "Push"][i];
    if (result.status === "fulfilled") {
      console.log(`${channel}: Gửi thành công`);
    } else {
      console.warn(`${channel}: Thất bại —`, result.reason.message);
    }
  });
}
```

---

**`Promise.race()` — Timeout cho API chậm**

```js
async function fetchWithRaceTimeout(url, ms = 5000) {
  const fetchPromise = fetch(url).then((r) => r.json());
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout!")), ms),
  );

  // Cái nào xong trước thì thắng
  return Promise.race([fetchPromise, timeoutPromise]);
}

const data = await fetchWithRaceTimeout("/api/recommendations", 5000);
```

---

**`Promise.any()` — Gọi nhiều CDN, lấy cái phản hồi nhanh nhất**

```js
async function fetchFromFastestCDN(path) {
  const cdnUrls = [
    `https://cdn1.example.com/${path}`,
    `https://cdn2.example.com/${path}`,
    `https://cdn3.example.com/${path}`,
  ];

  // Lấy response đầu tiên thành công, bỏ qua các CDN lỗi
  const response = await Promise.any(cdnUrls.map((url) => fetch(url)));

  return response.json();
}
```

---
