const randomNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;
let maxAttempts = 7;

let guessedNumbers = [];

while (attempts < maxAttempts) {
  let input = prompt("Nhập số từ 1 - 100:");

  let guess = Number(input);

  // Validate input
  if (
    input === null ||
    input.trim() === "" ||
    isNaN(guess) ||
    guess < 1 ||
    guess > 100
  ) {
    alert("Vui lòng nhập số từ 1 đến 100!");
    continue;
  }

  // Kiểm tra trùng số
  if (guessedNumbers.includes(guess)) {
    alert("Bạn đã đoán số này rồi!");
    continue;
  }

  guessedNumbers.push(guess);

  attempts++;

  // Kiểm tra kết quả
  if (guess === randomNumber) {
    alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
    break;
  } else if (guess < randomNumber) {
    alert("Cao hơn!");
  } else {
    alert("Thấp hơn!");
  }

  // Hết lượt
  if (attempts === maxAttempts) {
    alert(`Bạn đã thua! Đáp án là ${randomNumber}`);
  }
}
