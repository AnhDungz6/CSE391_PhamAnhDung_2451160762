function calculate(num1, operator, num2) {
  // 1. Kiểm tra Edge Case: Input không phải số
  // Sử dụng typeof để kiểm tra kiểu dữ liệu của num1 và num2
  if (
    typeof num1 !== "number" ||
    typeof num2 !== "number" ||
    Number.isNaN(num1) ||
    Number.isNaN(num2)
  ) {
    return "Lỗi: Input không phải số";
  }

  // 2. Kiểm tra Edge Case: Chia cho 0
  // Bao gồm cả phép chia lấy dư (%) và phép chia thường (/)
  if ((operator === "/" || operator === "%") && num2 === 0) {
    return "Lỗi: Không thể chia cho 0";
  }

  // 3. Xử lý các phép toán hợp lệ bằng switch-case
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    case "%":
      return num1 % num2;
    case "**":
      return num1 ** num2; // Phép toán lũy thừa (ES6)

    // 4. Kiểm tra Edge Case: Operator không hợp lệ
    default:
      return `Lỗi: Operator '${operator}' không hợp lệ`;
  }
}

// --- KHU VỰC TEST RUN ---
console.log(calculate(10, "+", 5)); // Kết quả: 15
console.log(calculate(10, "/", 0)); // Kết quả: Lỗi: Không thể chia cho 0
console.log(calculate(10, "^", 5)); // Kết quả: Lỗi: Operator '^' không hợp lệ
console.log(calculate("abc", "+", 5)); // Kết quả: Lỗi: Input không phải số
console.log(calculate(2, "**", 10)); // Kết quả: 1024
console.log(calculate(15, "%", 4)); // Kết quả: 3 (Kiểm tra thêm phép chia lấy dư)
