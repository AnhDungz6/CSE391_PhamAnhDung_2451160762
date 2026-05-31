// ============================================================================
// 1. DATA MANAGEMENT (Mảng dữ liệu mẫu)
// ============================================================================
let students = [
  {
    maSV: '2451160762',
    hoTen: 'Phạm Anh Dũng',
    ngaySinh: '2006-10-12',
    lop: 'K65-CS2',
    diemTB: 9.2,
    email: 'anhdung@gmail.com',
    matKhau: '123456'
  },
  {
    maSV: '2451160012',
    hoTen: 'Nguyễn Văn Hùng',
    ngaySinh: '2005-04-18',
    lop: 'K64-IT1',
    diemTB: 7.5,
    email: 'vanhung@gmail.com',
    matKhau: 'hung1234'
  },
  {
    maSV: '2451160987',
    hoTen: 'Lê Thị Thu Hương',
    ngaySinh: '2006-08-30',
    lop: 'K65-SE',
    diemTB: 4.8,
    email: 'thuhuong.le@gmail.com',
    matKhau: 'huongpass'
  }
];

// Biến lưu MSSV đang sửa (null nếu đang thêm mới)
let editingMaSV = null;

// Biến lưu MSSV chờ xóa
let pendingDeleteMaSV = null;


// ============================================================================
// 2. DOM ELEMENTS SELECTION
// ============================================================================
const studentTableBody = document.getElementById('studentTableBody');
const noDataMessage = document.getElementById('noDataMessage');

// Form inputs
const form = document.getElementById('studentForm');
const inputMaSV = document.getElementById('maSV');
const inputHoTen = document.getElementById('hoTen');
const inputNgaySinh = document.getElementById('ngaySinh');
const inputLop = document.getElementById('lop');
const inputDiemTB = document.getElementById('diemTB');
const inputEmail = document.getElementById('email');
const inputMatKhau = document.getElementById('matKhau');
const inputConfirmMatKhau = document.getElementById('confirmMatKhau');

// Error message displays
const errMaSV = document.getElementById('errMaSV');
const errHoTen = document.getElementById('errHoTen');
const errNgaySinh = document.getElementById('errNgaySinh');
const errLop = document.getElementById('errLop');
const errDiemTB = document.getElementById('errDiemTB');
const errEmail = document.getElementById('errEmail');
const errMatKhau = document.getElementById('errMatKhau');
const errConfirmMatKhau = document.getElementById('errConfirmMatKhau');

// Modals and Alerts
const popup = document.getElementById('popup');
const formTitle = document.getElementById('formTitle');
const confirmDialog = document.getElementById('confirmDialog');
const confirmMsg = document.getElementById('confirmMsg');
const toastContainer = document.getElementById('toastContainer');

// Buttons
const btnAdd = document.getElementById('btnAdd');
const btnClose = document.getElementById('btnClose');
const btnCloseTop = document.getElementById('btnCloseTop');
const btnConfirmYes = document.getElementById('btnConfirmYes');
const btnConfirmNo = document.getElementById('btnConfirmNo');

// Stat values
const totalCountEl = document.getElementById('totalCount');
const avgScoreEl = document.getElementById('avgScore');
const excellentCountEl = document.getElementById('excellentCount');


// ============================================================================
// 3. CORE VALIDATION LOGIC (Tách biệt xử lý dữ liệu)
// ============================================================================

/**
 * Kiểm tra mã sinh viên: Bắt buộc, 10 chữ số, có thể bắt đầu bằng 245
 */
function kiemTraMaSV(val) {
  if (!val) return 'Mã sinh viên không được để trống.';
  if (!/^\d{10}$/.test(val)) return 'Mã sinh viên phải gồm đúng 10 chữ số.';
  
  // Kiểm tra trùng mã sinh viên khi thêm mới
  if (editingMaSV === null) {
    const exists = students.some(s => s.maSV === val);
    if (exists) return 'Mã sinh viên này đã tồn tại trong hệ thống.';
  }
  return '';
}

/**
 * Kiểm tra họ tên: Bắt buộc, từ 2 đến 50 ký tự, không chứa ký số đặc biệt
 */
function kiemTraHoTen(val) {
  if (!val) return 'Họ tên không được để trống.';
  if (val.length < 2) return 'Họ tên phải có ít nhất 2 ký tự.';
  if (val.length > 50) return 'Họ tên không được vượt quá 50 ký tự.';
  
  // Kiểm tra tên hợp lệ (chữ và khoảng trắng)
  const regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔƠƯưăâêôơưẠ-ỹ\s]+$/;
  if (!regex.test(val)) return 'Họ tên chỉ được chứa chữ cái và khoảng trắng.';
  
  return '';
}

/**
 * Kiểm tra ngày sinh: Bắt buộc, hợp lệ, tuổi từ 16 đến 100, không ở tương lai
 */
function kiemTraNgaySinh(val) {
  if (!val) return 'Ngày sinh không được để trống.';
  
  const birthDate = new Date(val);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (isNaN(birthDate.getTime())) return 'Ngày sinh không hợp lệ.';
  if (birthDate > today) return 'Ngày sinh không được ở tương lai.';
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  if (age < 16) return 'Sinh viên phải từ 16 tuổi trở lên.';
  if (age > 100) return 'Sinh viên quá giới hạn tuổi (tối đa 100).';
  
  return '';
}

/**
 * Kiểm tra lớp: Bắt buộc, tối đa 15 ký tự
 */
function kiemTraLop(val) {
  if (!val) return 'Lớp học không được để trống.';
  if (val.length < 2) return 'Tên lớp quá ngắn.';
  if (val.length > 15) return 'Tên lớp không được vượt quá 15 ký tự.';
  return '';
}

/**
 * Kiểm tra điểm trung bình: Bắt buộc, số từ 0.0 đến 10.0
 */
function kiemTraDiemTB(val) {
  if (val === '') return 'Điểm trung bình không được để trống.';
  
  const score = parseFloat(val);
  if (isNaN(score)) return 'Điểm phải là một số hợp lệ.';
  if (score < 0 || score > 10) return 'Điểm phải nằm trong khoảng từ 0.0 đến 10.0.';
  return '';
}

/**
 * Kiểm tra email: Bắt buộc, đúng định dạng email
 */
function kiemTraEmail(val) {
  if (!val) return 'Email không được để trống.';
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(val)) return 'Địa chỉ email không đúng định dạng.';
  return '';
}

/**
 * Kiểm tra mật khẩu: Bắt buộc, tối thiểu 6 ký tự
 */
function kiemTraMatKhau(val) {
  if (!val) return 'Mật khẩu không được để trống.';
  if (val.length < 6) return 'Mật khẩu phải có độ dài tối thiểu 6 ký tự.';
  return '';
}

/**
 * Kiểm tra xác nhận mật khẩu: Phải khớp với mật khẩu
 */
function kiemTraConfirmMatKhau(val, passwordVal) {
  if (!val) return 'Vui lòng xác nhận lại mật khẩu.';
  if (val !== passwordVal) return 'Mật khẩu xác nhận không trùng khớp.';
  return '';
}


// ============================================================================
// 4. INTERFACE MANAGEMENT FUNCTIONS (Hiển thị UI)
// ============================================================================

/**
 * Hiển thị/Ẩn lỗi cho một ô nhập liệu cụ thể
 */
function displayFieldError(inputEl, errorEl, errorMsg) {
  if (errorMsg) {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    errorEl.textContent = errorMsg;
    errorEl.classList.add('active');
  } else {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    errorEl.textContent = '';
    errorEl.classList.remove('active');
  }
}

/**
 * Xóa toàn bộ trạng thái lỗi và màu viền trên form
 */
function clearAllErrors() {
  const inputs = [inputMaSV, inputHoTen, inputNgaySinh, inputLop, inputDiemTB, inputEmail, inputMatKhau, inputConfirmMatKhau];
  const errors = [errMaSV, errHoTen, errNgaySinh, errLop, errDiemTB, errEmail, errMatKhau, errConfirmMatKhau];
  
  inputs.forEach(input => {
    input.classList.remove('is-invalid', 'is-valid');
  });
  
  errors.forEach(err => {
    err.textContent = '';
    err.classList.remove('active');
  });
}

/**
 * Hiển thị thông báo Toast
 */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '✅';
  if (type === 'error') icon = '❌';
  if (type === 'info') icon = 'ℹ️';
  
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  // Tự động đóng sau 3 giây
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

/**
 * Format date từ YYYY-MM-DD sang DD/MM/YYYY để hiển thị đẹp mắt
 */
function formatNgayHienThi(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

/**
 * Cập nhật bảng thống kê
 */
function updateStatistics() {
  const total = students.length;
  totalCountEl.textContent = total;
  
  if (total === 0) {
    avgScoreEl.textContent = '0.00';
    excellentCountEl.textContent = '0';
    return;
  }
  
  // Tính điểm trung bình lớp
  const sum = students.reduce((acc, curr) => acc + curr.diemTB, 0);
  avgScoreEl.textContent = (sum / total).toFixed(2);
  
  // Đếm số sinh viên Giỏi/Xuất sắc (GPA >= 8.0)
  const excellent = students.filter(s => s.diemTB >= 8.0).length;
  excellentCountEl.textContent = excellent;
}

/**
 * Lấy class màu sắc dựa trên mức điểm GPA để trang trí
 */
function getGpaClass(gpa) {
  if (gpa >= 8.0) return 'gpa-high';
  if (gpa >= 5.0) return 'gpa-mid';
  return 'gpa-low';
}

/**
 * Render toàn bộ danh sách sinh viên ra bảng
 */
function renderTable() {
  studentTableBody.innerHTML = '';
  
  if (students.length === 0) {
    noDataMessage.classList.remove('hidden');
    return;
  }
  
  noDataMessage.classList.add('hidden');
  
  students.forEach(s => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-id', s.maSV);
    
    tr.innerHTML = `
      <td class="td-mssv">${s.maSV}</td>
      <td style="font-weight: 500;">${s.hoTen}</td>
      <td>${formatNgayHienThi(s.ngaySinh)}</td>
      <td>${s.lop}</td>
      <td class="td-gpa ${getGpaClass(s.diemTB)}">${s.diemTB.toFixed(1)}</td>
      <td class="td-email">${s.email}</td>
      <td class="td-actions">
        <button class="action-btn edit-btn" onclick="openEditModal('${s.maSV}')">Sửa</button>
        <button class="action-btn delete-btn" onclick="openDeleteConfirm('${s.maSV}')">Xóa</button>
      </td>
    `;
    
    studentTableBody.appendChild(tr);
  });
}


// ============================================================================
// 5. EVENT HANDLERS & CRUD OPERATIONS
// ============================================================================

// --- Validation trực tiếp trong khi gõ (Realtime validation) ---
inputMaSV.addEventListener('input', () => {
  displayFieldError(inputMaSV, errMaSV, kiemTraMaSV(inputMaSV.value.trim()));
});

inputHoTen.addEventListener('input', () => {
  displayFieldError(inputHoTen, errHoTen, kiemTraHoTen(inputHoTen.value.trim()));
});

inputNgaySinh.addEventListener('input', () => {
  displayFieldError(inputNgaySinh, errNgaySinh, kiemTraNgaySinh(inputNgaySinh.value));
});

inputLop.addEventListener('input', () => {
  displayFieldError(inputLop, errLop, kiemTraLop(inputLop.value.trim()));
});

inputDiemTB.addEventListener('input', () => {
  displayFieldError(inputDiemTB, errDiemTB, kiemTraDiemTB(inputDiemTB.value.trim()));
});

inputEmail.addEventListener('input', () => {
  displayFieldError(inputEmail, errEmail, kiemTraEmail(inputEmail.value.trim()));
});

inputMatKhau.addEventListener('input', () => {
  displayFieldError(inputMatKhau, errMatKhau, kiemTraMatKhau(inputMatKhau.value.trim()));
  
  // Validate lại Confirm Password nếu đã nhập
  if (inputConfirmMatKhau.value) {
    displayFieldError(inputConfirmMatKhau, errConfirmMatKhau, kiemTraConfirmMatKhau(inputConfirmMatKhau.value.trim(), inputMatKhau.value.trim()));
  }
});

inputConfirmMatKhau.addEventListener('input', () => {
  displayFieldError(inputConfirmMatKhau, errConfirmMatKhau, kiemTraConfirmMatKhau(inputConfirmMatKhau.value.trim(), inputMatKhau.value.trim()));
});


// --- Mở form thêm sinh viên mới ---
btnAdd.addEventListener('click', () => {
  editingMaSV = null;
  form.reset();
  clearAllErrors();
  
  // MSSV được phép nhập khi thêm mới
  inputMaSV.disabled = false;
  
  formTitle.textContent = 'Thêm sinh viên mới';
  popup.classList.add('active');
  
  // Tự động focus vào ô đầu tiên
  setTimeout(() => inputMaSV.focus(), 100);
});

// --- Đóng modal form ---
function closeFormModal() {
  popup.classList.remove('active');
  form.reset();
  clearAllErrors();
}

btnClose.addEventListener('click', closeFormModal);
btnCloseTop.addEventListener('click', closeFormModal);

// Click ngoài modal content để đóng
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    closeFormModal();
  }
});

// Phím Escape để đóng nhanh
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeFormModal();
    closeDeleteDialog();
  }
});


// --- Xử lý Submit Form (Lưu thêm mới hoặc Sửa) ---
form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Lấy các giá trị
  const maSV = inputMaSV.value.trim();
  const hoTen = inputHoTen.value.trim();
  const ngaySinh = inputNgaySinh.value;
  const lop = inputLop.value.trim();
  const diemTB = inputDiemTB.value.trim();
  const email = inputEmail.value.trim();
  const matKhau = inputMatKhau.value.trim();
  const confirmMatKhau = inputConfirmMatKhau.value.trim();
  
  // Thực hiện validate tất cả các trường
  const errorMa = kiemTraMaSV(maSV);
  const errorTen = kiemTraHoTen(hoTen);
  const errorNgay = kiemTraNgaySinh(ngaySinh);
  const errorLopValue = kiemTraLop(lop);
  const errorDiem = kiemTraDiemTB(diemTB);
  const errorEmailValue = kiemTraEmail(email);
  const errorMatKhauValue = kiemTraMatKhau(matKhau);
  const errorConfirmMatKhauValue = kiemTraConfirmMatKhau(confirmMatKhau, matKhau);
  
  // Hiển thị lỗi ra giao diện
  displayFieldError(inputMaSV, errMaSV, errorMa);
  displayFieldError(inputHoTen, errHoTen, errorTen);
  displayFieldError(inputNgaySinh, errNgaySinh, errorNgay);
  displayFieldError(inputLop, errLop, errorLopValue);
  displayFieldError(inputDiemTB, errDiemTB, errorDiem);
  displayFieldError(inputEmail, errEmail, errorEmailValue);
  displayFieldError(inputMatKhau, errMatKhau, errorMatKhauValue);
  displayFieldError(inputConfirmMatKhau, errConfirmMatKhau, errorConfirmMatKhauValue);
  
  // Kiểm tra tổng quát xem có lỗi nào tồn tại không
  const hasError = errorMa || errorTen || errorNgay || errorLopValue || errorDiem || errorEmailValue || errorMatKhauValue || errorConfirmMatKhauValue;
  
  if (hasError) {
    showToast('Vui lòng sửa các lỗi nhập liệu trước khi lưu!', 'error');
    return;
  }
  
  // Không có lỗi → Tiến hành lưu dữ liệu
  const diemNumber = parseFloat(diemTB);
  
  if (editingMaSV !== null) {
    // === CHẾ ĐỘ SỬA ===
    const index = students.findIndex(s => s.maSV === editingMaSV);
    if (index !== -1) {
      students[index] = {
        maSV: editingMaSV, // giữ nguyên MSSV
        hoTen,
        ngaySinh,
        lop,
        diemTB: diemNumber,
        email,
        matKhau
      };
      showToast('Cập nhật thông tin sinh viên thành công!');
    }
  } else {
    // === CHẾ ĐỘ THÊM MỚI ===
    students.push({
      maSV,
      hoTen,
      ngaySinh,
      lop,
      diemTB: diemNumber,
      email,
      matKhau
    });
    showToast('Đã thêm sinh viên mới thành công!');
  }
  
  // Cập nhật lại UI
  renderTable();
  updateStatistics();
  closeFormModal();
});


// --- Mở modal sửa thông tin ---
window.openEditModal = function(maSV) {
  const student = students.find(s => s.maSV === maSV);
  if (!student) return;
  
  editingMaSV = maSV;
  clearAllErrors();
  
  // Đổ dữ liệu cũ vào input
  inputMaSV.value = student.maSV;
  inputHoTen.value = student.hoTen;
  inputNgaySinh.value = student.ngaySinh;
  inputLop.value = student.lop;
  inputDiemTB.value = student.diemTB;
  inputEmail.value = student.email;
  inputMatKhau.value = student.matKhau;
  inputConfirmMatKhau.value = student.matKhau; // nhập sẵn để khớp mật khẩu
  
  // Khóa ô MSSV vì đây là khóa chính không được chỉnh sửa
  inputMaSV.disabled = true;
  
  formTitle.textContent = `Chỉnh sửa sinh viên: ${student.hoTen}`;
  popup.classList.add('active');
  
  showToast(`Đang chỉnh sửa sinh viên có MSSV: ${maSV}`, 'info');
};


// --- Mở Dialog xác nhận xóa ---
window.openDeleteConfirm = function(maSV) {
  const student = students.find(s => s.maSV === maSV);
  if (!student) return;
  
  pendingDeleteMaSV = maSV;
  confirmMsg.innerHTML = `Bạn có chắc chắn muốn xóa sinh viên <strong>${student.hoTen}</strong> (MSSV: <strong>${student.maSV}</strong>) không?<br>Hành động này không thể hoàn tác.`;
  confirmDialog.classList.add('active');
};

// --- Đóng Dialog xác nhận xóa ---
function closeDeleteDialog() {
  confirmDialog.classList.remove('active');
  pendingDeleteMaSV = null;
}

btnConfirmNo.addEventListener('click', closeDeleteDialog);
confirmDialog.addEventListener('click', (e) => {
  if (e.target === confirmDialog) {
    closeDeleteDialog();
  }
});

// --- Thực hiện xóa sinh viên ---
btnConfirmYes.addEventListener('click', () => {
  if (pendingDeleteMaSV === null) return;
  
  const studentToDelete = students.find(s => s.maSV === pendingDeleteMaSV);
  const targetName = studentToDelete ? studentToDelete.hoTen : pendingDeleteMaSV;
  
  // Xóa khỏi mảng dữ liệu
  students = students.filter(s => s.maSV !== pendingDeleteMaSV);
  
  // Hiệu ứng xóa dòng mượt mà trên UI trước khi render lại hoàn toàn
  const rowEl = document.querySelector(`tr[data-id="${pendingDeleteMaSV}"]`);
  if (rowEl) {
    rowEl.style.animation = 'rowDelete 0.3s ease forwards';
    setTimeout(() => {
      renderTable();
      updateStatistics();
      showToast(`Đã xóa thành công sinh viên "${targetName}"!`, 'success');
      closeDeleteDialog();
    }, 300);
  } else {
    renderTable();
    updateStatistics();
    showToast(`Đã xóa thành công sinh viên "${targetName}"!`, 'success');
    closeDeleteDialog();
  }
});


// ============================================================================
// 6. INITIALIZATION WHEN LOADED
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  updateStatistics();
});
