for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}

function customFizzBuzz(n, rules) {
  for (let i = 1; i <= n; i++) {
    let result = "";

    for (let rule of rules) {
      if (i % rule.divisor === 0) {
        result += rule.word;
      }
    }

    console.log(result || i);
  }
}

customFizzBuzz(30, [
  { divisor: 3, word: "Fizz" },
  { divisor: 5, word: "Buzz" },
  { divisor: 7, word: "Jazz" },
]);
