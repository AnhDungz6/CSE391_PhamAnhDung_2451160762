const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// --- KHỞI TẠO CÁC BIẾN ĐỂ LƯU TRỮ THỐNG KÊ ---
let rankCount = { Giỏi: 0, Khá: 0, "Trung bình": 0, Yếu: 0 };

let highestStudent = null;
let lowestStudent = null;

let totalMath = 0;
let totalPhysics = 0;
let totalCS = 0;

let totalMaleGPA = 0;
let maleCount = 0;
let totalFemaleGPA = 0;
let femaleCount = 0;

// Mảng mới để lưu thông tin sau khi tính ĐTB và Xếp loại để in bảng
let processedStudents = [];

// --- VÒNG LẶP XỬ LÝ CHÍNH ---
for (let i = 0; i < students.length; i++) {
  let s = students[i];

  // 1. Tính điểm trung bình (áp dụng công thức trọng số)
  let gpa = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;
  // Làm tròn 1 chữ số thập phân cho đẹp
  gpa = Math.round(gpa * 10) / 10;

  // 2. Xếp loại
  let rank = "";
  if (gpa >= 8.0) {
    rank = "Giỏi";
  } else if (gpa >= 6.5) {
    rank = "Khá";
  } else if (gpa >= 5.0) {
    rank = "Trung bình";
  } else {
    rank = "Yếu";
  }

  // Đếm số lượng mỗi xếp loại
  rankCount[rank]++;

  // Lưu thông tin vào mảng tạm để tí nữa in bảng kết quả
  processedStudents.push({
    stt: i + 1,
    name: s.name,
    gpa: gpa.toFixed(1),
    rank: rank,
  });

  // 3. Tìm thủ khoa và á khoa (Điểm TB cao nhất / thấp nhất)
  if (highestStudent === null || gpa > highestStudent.gpa) {
    highestStudent = { name: s.name, gpa: gpa };
  }
  if (lowestStudent === null || gpa < lowestStudent.gpa) {
    lowestStudent = { name: s.name, gpa: gpa };
  }

  // 4. Cộng dồn điểm để tính TB môn toàn lớp
  totalMath += s.math;
  totalPhysics += s.physics;
  totalCS += s.cs;

  // 5. Thống kê theo giới tính (Bonus)
  if (s.gender === "M") {
    totalMaleGPA += gpa;
    maleCount++;
  } else if (s.gender === "F") {
    totalFemaleGPA += gpa;
    femaleCount++;
  }
}

// --- IN KẾT QUẢ RA CONSOLE ---

// Yêu cầu 1: In bảng kết quả dạng Table
console.log("=== BẢNG KẾT QUẢ HỌC TẬP ===");
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < processedStudents.length; i++) {
  let p = processedStudents[i];
  // Hàm padEnd/padStart giúp căn lề các cột thẳng hàng giống như Markdown
  let sttStr = p.stt.toString().padEnd(3);
  let nameStr = p.name.padEnd(6);
  let gpaStr = p.gpa.padEnd(4);
  let rankStr = p.rank.padEnd(11);
  console.log(`| ${sttStr} | ${nameStr} | ${gpaStr} | ${rankStr} |`);
}
console.log("\n----------------------------------------\n");

// Yêu cầu 2: Đếm số SV mỗi xếp loại
console.log("=== THỐNG KÊ XẾP LOẠI ===");
console.log(`- Giỏi: ${rankCount["Giỏi"]} SV`);
console.log(`- Khá: ${rankCount["Khá"]} SV`);
console.log(`- Trung bình: ${rankCount["Trung bình"]} SV`);
console.log(`- Yếu: ${rankCount["Yếu"]} SV`);
console.log("\n----------------------------------------\n");

// Yêu cầu 3: Tìm SV có điểm TB cao nhất và thấp nhất
console.log("=== THỦ KHOA & Á KHOA ===");
console.log(
  `- SV điểm TB cao nhất: ${highestStudent.name} (${highestStudent.gpa.toFixed(1)})`,
);
console.log(
  `- SV điểm TB thấp nhất: ${lowestStudent.name} (${lowestStudent.gpa.toFixed(1)})`,
);
console.log("\n----------------------------------------\n");

// Yêu cầu 4: Tính điểm TB toàn lớp cho từng môn
let avgMath = (totalMath / students.length).toFixed(2);
let avgPhysics = (totalPhysics / students.length).toFixed(2);
let avgCS = (totalCS / students.length).toFixed(2);

console.log("=== ĐIỂM TRUNG BÌNH TOÀN LỚP THEO MÔN ===");
console.log(`- Toán (Math): ${avgMath}`);
console.log(`- Vật lý (Physics): ${avgPhysics}`);
console.log(`- Tin học (CS): ${avgCS}`);
console.log("\n----------------------------------------\n");

// Yêu cầu 5 (Bonus): Tính điểm TB theo giới tính
let avgMaleGPA = maleCount > 0 ? (totalMaleGPA / maleCount).toFixed(2) : 0;
let avgFemaleGPA =
  femaleCount > 0 ? (totalFemaleGPA / femaleCount).toFixed(2) : 0;

console.log("=== ĐIỂM TRUNG BÌNH THEO GIỚI TÍNH ===");
console.log(`- Điểm TB các bạn Nam (M): ${avgMaleGPA}`);
console.log(`- Điểm TB các bạn Nữ (F): ${avgFemaleGPA}`);
