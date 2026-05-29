function calculate() {
    if (op === "+") {
        return a+b;
    }else if (op === "-") {
        return a-b;
    }else if (op === "*") {
        return a*b;
    }else if (op === "/") {
        if (b === 0) {
            return "Khong the chia cho 0";
        }
        return a/b;
    } else{
        return "Phep toan khong hop le";
    }
    console.log(calculate(10, "+", 5)); console.log(calculate(10, "-", 5)); console.log(calculate(10, "*", 5)); console.log(calculate(10, "/", 5)); console.log(calculate(10, "/", 0)); console.log(calculate(10, "%", 5));
}
