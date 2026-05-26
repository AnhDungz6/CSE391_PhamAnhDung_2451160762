// higher_order.js

// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
  return function (input) {
    return fns.reduce(function (result, fn) {
      return fn(result);
    }, input);
  };
}

const process = pipe(
  (x) => x * 2,
  (x) => x + 10,
  (x) => x.toString(),
  (x) => "Kết quả: " + x,
);

console.log(process(5)); // Kết quả: 20

// 2. memoize() — Cache kết quả
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  };
}

const expensiveCalc = memoize(function (n) {
  console.log("Đang tính...");

  let result = 0;

  for (let i = 0; i < n; i++) {
    result += i;
  }

  return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      fn(...args);
    }, delay);
  };
}

const search = debounce(function (query) {
  console.log("Searching:", query);
}, 500);

// Test debounce
search("i");
search("ip");
search("iph");
search("iphone");

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.log("Lỗi lần " + attempt + ", đang thử lại...");

      if (attempt === maxAttempts) {
        throw lastError;
      }
    }
  }
}

// Test retry
let count = 0;

async function unstableTask() {
  count++;

  if (count < 3) {
    throw new Error("Task thất bại");
  }

  return "Task thành công";
}

retry(unstableTask, 3)
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.log("Thất bại hoàn toàn:", error.message);
  });
