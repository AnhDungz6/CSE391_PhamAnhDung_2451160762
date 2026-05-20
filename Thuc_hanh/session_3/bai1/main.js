// ===== DOM Elements =====
const btnAdd = document.getElementById('btnAdd');
const popup = document.getElementById('popup');
const btnClose = document.getElementById('btnClose');
const btnSave = document.getElementById('btnSave');
const formTitle = document.getElementById('formTitle');
const totalCount = document.getElementById('totalCount');
const avgScore = document.getElementById('avgScore');
const studentTableBody = document.getElementById('studentTableBody');

// ===== Cập nhật thống kê =====
function updateStatistics() {
  const rows = studentTableBody.querySelectorAll('tr');
  const total = rows.length;
  totalCount.textContent = total;

  if (total === 0) {
    avgScore.textContent = '0';
    return;
  }

  let sum = 0;
  rows.forEach(function (row) {
    const gpa = parseFloat(row.querySelectorAll('td')[4].textContent);
    if (!isNaN(gpa)) sum += gpa;
  });

  avgScore.textContent = (sum / total).toFixed(2);
}

// Form inputs
const inputMaSV = document.getElementById('maSV');
const inputHoTen = document.getElementById('hoTen');
const inputNgaySinh = document.getElementById('ngaySinh');
const inputLop = document.getElementById('lop');
const inputDiemTB = document.getElementById('diemTB');
const inputEmail = document.getElementById('email');
// Biến lưu hàng đang sửa (null = thêm mới)
let editingRow = null;

// ===== Open Modal (Thêm) =====
btnAdd.addEventListener('click', function () {
  inputMaSV.value = '';
  inputHoTen.value = '';
  inputNgaySinh.value = '';
  inputLop.value = '';
  inputDiemTB.value = '';
  inputEmail.value = '';

  editingRow = null;
  formTitle.textContent = 'Thêm sinh viên';
  popup.classList.add('active');
});

// ===== Hàm format ngày yyyy-mm-dd → dd/mm/yyyy =====
function formatDate(dateStr) {
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }
  return dateStr;
}

// ===== Nút Lưu =====
btnSave.addEventListener('click', function () {
  // Lấy giá trị
  const maSV = inputMaSV.value.trim();
  const hoTen = inputHoTen.value.trim();
  const ngaySinh = inputNgaySinh.value;
  const lop = inputLop.value.trim();
  const diemTB = inputDiemTB.value.trim();
  const email = inputEmail.value.trim();

  // Validate
  if (!maSV || !hoTen || !ngaySinh || !lop || !diemTB || !email) {
    return;
  }

  const ngayFormatted = formatDate(ngaySinh);

  if (editingRow) {
    // === Sửa hàng đã có ===
    const cells = editingRow.querySelectorAll('td');
    cells[0].textContent = maSV;
    cells[1].textContent = hoTen;
    cells[2].textContent = ngayFormatted;
    cells[3].textContent = lop;
    cells[4].textContent = diemTB;
    cells[5].textContent = email;
  } else {
    // === Thêm hàng mới ===
    const newRow = document.createElement('tr');
    newRow.innerHTML =
      '<td>' + maSV + '</td>' +
      '<td>' + hoTen + '</td>' +
      '<td>' + ngayFormatted + '</td>' +
      '<td>' + lop + '</td>' +
      '<td>' + diemTB + '</td>' +
      '<td>' + email + '</td>' +
      '<td>' +
        '<button class="editBtn">Sửa</button>' +
        '<button class="deleteBtn">Xóa</button>' +
      '</td>';
    newRow.style.animation = 'fadeInUp 0.4s ease-out';
    studentTableBody.appendChild(newRow);
  }

  updateStatistics();
  popup.classList.remove('active');
  editingRow = null;
});

// ===== Edit & Delete Buttons =====
studentTableBody.addEventListener('click', function (e) {
  // --- Nút Sửa ---
  if (e.target.classList.contains('editBtn')) {
    const row = e.target.closest('tr');
    const cells = row.querySelectorAll('td');

    inputMaSV.value = cells[0].textContent.trim();
    inputHoTen.value = cells[1].textContent.trim();

    // Chuyển ngày từ dd/mm/yyyy sang yyyy-mm-dd cho input date
    const dateParts = cells[2].textContent.trim().split('/');
    if (dateParts.length === 3) {
      const day = dateParts[0].padStart(2, '0');
      const month = dateParts[1].padStart(2, '0');
      const year = dateParts[2];
      inputNgaySinh.value = year + '-' + month + '-' + day;
    }

    inputLop.value = cells[3].textContent.trim();
    inputDiemTB.value = cells[4].textContent.trim();
    inputEmail.value = cells[5].textContent.trim();

    formTitle.textContent = 'Sửa sinh viên';
    editingRow = row;
    popup.classList.add('active');
  }

  // --- Nút Xóa ---
  if (e.target.classList.contains('deleteBtn')) {
    const row = e.target.closest('tr');
    if (!row) return;

    let removed = false;

    function removeRow() {
      if (removed) return;
      removed = true;
      row.remove();
      updateStatistics();
    }

    row.style.animation = 'rowFadeOut 0.3s ease forwards';
    row.addEventListener('animationend', removeRow, { once: true });
    setTimeout(removeRow, 350);
  }
});

// ===== Close Modal =====
btnClose.addEventListener('click', function () {
  popup.classList.remove('active');
});

// Click outside formBox to close
popup.addEventListener('click', function (e) {
  if (e.target === popup) {
    popup.classList.remove('active');
  }
});

// Press Escape to close
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && popup.classList.contains('active')) {
    popup.classList.remove('active');
  }
});

// ===== Khởi tạo thống kê khi load trang =====
updateStatistics();
