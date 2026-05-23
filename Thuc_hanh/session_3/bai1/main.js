// ========================================
//  LẤY CÁC PHẦN TỬ DOM
// ========================================
var btnAdd = document.getElementById('btnAdd');
var popup = document.getElementById('popup');
var btnClose = document.getElementById('btnClose');
var btnSave = document.getElementById('btnSave');
var formTitle = document.getElementById('formTitle');
var totalCount = document.getElementById('totalCount');
var avgScore = document.getElementById('avgScore');
var studentTableBody = document.getElementById('studentTableBody');
var toastContainer = document.getElementById('toastContainer');

// Confirm dialog
var confirmDialog = document.getElementById('confirmDialog');
var confirmMsg = document.getElementById('confirmMsg');
var btnConfirmYes = document.getElementById('btnConfirmYes');
var btnConfirmNo = document.getElementById('btnConfirmNo');

// Các ô input trong form
var inputMaSV = document.getElementById('maSV');
var inputHoTen = document.getElementById('hoTen');
var inputNgaySinh = document.getElementById('ngaySinh');
var inputLop = document.getElementById('lop');
var inputDiemTB = document.getElementById('diemTB');
var inputEmail = document.getElementById('email');

// Các span hiển thị lỗi
var errMaSV = document.getElementById('errMaSV');
var errHoTen = document.getElementById('errHoTen');
var errNgaySinh = document.getElementById('errNgaySinh');
var errLop = document.getElementById('errLop');
var errDiemTB = document.getElementById('errDiemTB');
var errEmail = document.getElementById('errEmail');

// Biến lưu hàng đang sửa (null = đang thêm mới)
var editingRow = null;

// Biến lưu hàng chờ xóa
var pendingDeleteRow = null;


// ========================================
//  PHẦN 1: CÁC HÀM VALIDATION
//  (Tách riêng - chỉ kiểm tra dữ liệu, không đụng giao diện)
// ========================================

// Kiểm tra mã sinh viên: bắt buộc, đúng 10 chữ số
function kiemTraMaSV(value) {
  if (value === '') return 'Vui lòng nhập mã sinh viên.';
  if (!/^\d{10}$/.test(value)) return 'Mã SV phải gồm đúng 10 chữ số.';
  return ''; // Hợp lệ
}

// Kiểm tra họ tên: bắt buộc, 2-50 ký tự
function kiemTraHoTen(value) {
  if (value === '') return 'Vui lòng nhập họ tên.';
  if (value.length < 2) return 'Họ tên phải có ít nhất 2 ký tự.';
  if (value.length > 50) return 'Họ tên không được quá 50 ký tự.';
  return '';
}

// Kiểm tra ngày sinh: bắt buộc, không ở tương lai
function kiemTraNgaySinh(value) {
  if (value === '') return 'Vui lòng chọn ngày sinh.';

  var ngay = new Date(value);
  var homNay = new Date();
  homNay.setHours(0, 0, 0, 0);

  if (ngay > homNay) return 'Ngày sinh không được ở tương lai.';

  var tuoi = homNay.getFullYear() - ngay.getFullYear();
  if (tuoi < 16) return 'Sinh viên phải từ 16 tuổi trở lên.';

  return '';
}

// Kiểm tra lớp: bắt buộc, tối đa 10 ký tự
function kiemTraLop(value) {
  if (value === '') return 'Vui lòng nhập lớp.';
  if (value.length > 10) return 'Tên lớp không được quá 10 ký tự.';
  return '';
}

// Kiểm tra điểm: bắt buộc, là số, từ 0 đến 10
function kiemTraDiem(value) {
  if (value === '') return 'Vui lòng nhập điểm.';

  var diem = parseFloat(value);
  if (isNaN(diem)) return 'Điểm phải là một số hợp lệ.';
  if (diem < 0 || diem > 10) return 'Điểm phải từ 0 đến 10.';

  return '';
}

// Kiểm tra email: bắt buộc, đúng định dạng
function kiemTraEmail(value) {
  if (value === '') return 'Vui lòng nhập email.';

  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(value)) return 'Email không đúng định dạng.';

  return '';
}


// ========================================
//  PHẦN 2: CÁC HÀM XỬ LÝ GIAO DIỆN
// ========================================

// --- Hiển thị lỗi dưới 1 ô input ---
function hienThiLoi(inputEl, errEl, loiText) {
  if (loiText !== '') {
    // Có lỗi → viền đỏ + hiện thông báo
    inputEl.classList.add('input-error');
    inputEl.classList.remove('input-valid');
    errEl.textContent = loiText;
    errEl.classList.add('visible');
  } else {
    // Hợp lệ → viền xanh + ẩn thông báo
    inputEl.classList.remove('input-error');
    inputEl.classList.add('input-valid');
    errEl.textContent = '';
    errEl.classList.remove('visible');
  }
}

// --- Xóa hết lỗi trên form ---
function xoaHetLoi() {
  var inputs = [inputMaSV, inputHoTen, inputNgaySinh, inputLop, inputDiemTB, inputEmail];
  var errors = [errMaSV, errHoTen, errNgaySinh, errLop, errDiemTB, errEmail];

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove('input-error', 'input-valid');
    errors[i].textContent = '';
    errors[i].classList.remove('visible');
  }
}

// --- Hiển thị toast thông báo ---
function hienThongBao(noiDung, loai) {
  // loai: 'success', 'error', 'info'
  var icon = '✅';
  if (loai === 'error') icon = '❌';
  if (loai === 'info') icon = 'ℹ️';

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + loai;
  toast.innerHTML = '<span class="toast-icon">' + icon + '</span><span>' + noiDung + '</span>';
  toastContainer.appendChild(toast);

  // Tự mất sau 3 giây
  setTimeout(function () {
    toast.classList.add('removing');
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, 3000);
}

// --- Cập nhật thống kê ---
function capNhatThongKe() {
  var rows = studentTableBody.querySelectorAll('tr');
  var total = rows.length;
  totalCount.textContent = total;

  if (total === 0) {
    avgScore.textContent = '0';
    return;
  }

  var tong = 0;
  for (var i = 0; i < rows.length; i++) {
    var diem = parseFloat(rows[i].querySelectorAll('td')[4].textContent);
    if (!isNaN(diem)) tong += diem;
  }
  avgScore.textContent = (tong / total).toFixed(2);
}

// --- Format ngày yyyy-mm-dd → dd/mm/yyyy ---
function formatNgay(dateStr) {
  var parts = dateStr.split('-');
  if (parts.length === 3) {
    return parts[2] + '/' + parts[1] + '/' + parts[0];
  }
  return dateStr;
}


// ========================================
//  PHẦN 3: XỬ LÝ SỰ KIỆN
// ========================================

// --- Validate realtime khi người dùng đang gõ ---
inputMaSV.addEventListener('input', function () {
  if (inputMaSV.value.trim() !== '' || inputMaSV.classList.contains('input-error')) {
    hienThiLoi(inputMaSV, errMaSV, kiemTraMaSV(inputMaSV.value.trim()));
  }
});

inputHoTen.addEventListener('input', function () {
  if (inputHoTen.value.trim() !== '' || inputHoTen.classList.contains('input-error')) {
    hienThiLoi(inputHoTen, errHoTen, kiemTraHoTen(inputHoTen.value.trim()));
  }
});

inputNgaySinh.addEventListener('input', function () {
  hienThiLoi(inputNgaySinh, errNgaySinh, kiemTraNgaySinh(inputNgaySinh.value));
});

inputLop.addEventListener('input', function () {
  if (inputLop.value.trim() !== '' || inputLop.classList.contains('input-error')) {
    hienThiLoi(inputLop, errLop, kiemTraLop(inputLop.value.trim()));
  }
});

inputDiemTB.addEventListener('input', function () {
  if (inputDiemTB.value.trim() !== '' || inputDiemTB.classList.contains('input-error')) {
    hienThiLoi(inputDiemTB, errDiemTB, kiemTraDiem(inputDiemTB.value.trim()));
  }
});

inputEmail.addEventListener('input', function () {
  if (inputEmail.value.trim() !== '' || inputEmail.classList.contains('input-error')) {
    hienThiLoi(inputEmail, errEmail, kiemTraEmail(inputEmail.value.trim()));
  }
});


// --- Mở popup thêm sinh viên ---
btnAdd.addEventListener('click', function () {
  // Reset form
  inputMaSV.value = '';
  inputHoTen.value = '';
  inputNgaySinh.value = '';
  inputLop.value = '';
  inputDiemTB.value = '';
  inputEmail.value = '';

  xoaHetLoi();
  editingRow = null;
  formTitle.textContent = 'Thêm sinh viên';
  popup.classList.add('active');
  inputMaSV.focus();
});


// --- Nút Lưu: validate rồi mới lưu ---
btnSave.addEventListener('click', function () {
  // Lấy giá trị
  var maSV = inputMaSV.value.trim();
  var hoTen = inputHoTen.value.trim();
  var ngaySinh = inputNgaySinh.value;
  var lop = inputLop.value.trim();
  var diemTB = inputDiemTB.value.trim();
  var email = inputEmail.value.trim();

  // Validate từng trường
  var loiMaSV = kiemTraMaSV(maSV);
  var loiHoTen = kiemTraHoTen(hoTen);
  var loiNgaySinh = kiemTraNgaySinh(ngaySinh);
  var loiLop = kiemTraLop(lop);
  var loiDiem = kiemTraDiem(diemTB);
  var loiEmail = kiemTraEmail(email);

  // Hiển thị lỗi dưới từng ô
  hienThiLoi(inputMaSV, errMaSV, loiMaSV);
  hienThiLoi(inputHoTen, errHoTen, loiHoTen);
  hienThiLoi(inputNgaySinh, errNgaySinh, loiNgaySinh);
  hienThiLoi(inputLop, errLop, loiLop);
  hienThiLoi(inputDiemTB, errDiemTB, loiDiem);
  hienThiLoi(inputEmail, errEmail, loiEmail);

  // Nếu còn bất kỳ lỗi nào → không cho submit
  var coLoi = loiMaSV || loiHoTen || loiNgaySinh || loiLop || loiDiem || loiEmail;

  if (coLoi) {
    hienThongBao('Vui lòng kiểm tra lại thông tin!', 'error');
    return; // Dừng, không lưu
  }

  // ===== Dữ liệu hợp lệ → Tiến hành lưu =====
  var ngayFormatted = formatNgay(ngaySinh);

  if (editingRow) {
    // --- Sửa hàng cũ ---
    var cells = editingRow.querySelectorAll('td');
    cells[0].textContent = maSV;
    cells[1].textContent = hoTen;
    cells[2].textContent = ngayFormatted;
    cells[3].textContent = lop;
    cells[4].textContent = diemTB;
    cells[5].textContent = email;
    hienThongBao('Cập nhật thành công!', 'success');
  } else {
    // --- Thêm hàng mới ---
    var newRow = document.createElement('tr');
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
    hienThongBao('Thêm sinh viên thành công!', 'success');
  }

  capNhatThongKe();
  popup.classList.remove('active');
  editingRow = null;
});


// --- Nút Sửa và Xóa trong bảng (Event Delegation) ---
studentTableBody.addEventListener('click', function (e) {

  // === Nút Sửa ===
  if (e.target.classList.contains('editBtn')) {
    var row = e.target.closest('tr');
    var cells = row.querySelectorAll('td');

    // Đổ dữ liệu vào form
    inputMaSV.value = cells[0].textContent.trim();
    inputHoTen.value = cells[1].textContent.trim();

    // Chuyển dd/mm/yyyy → yyyy-mm-dd cho input date
    var dateParts = cells[2].textContent.trim().split('/');
    if (dateParts.length === 3) {
      inputNgaySinh.value = dateParts[2] + '-' + dateParts[1].padStart(2, '0') + '-' + dateParts[0].padStart(2, '0');
    }

    inputLop.value = cells[3].textContent.trim();
    inputDiemTB.value = cells[4].textContent.trim();
    inputEmail.value = cells[5].textContent.trim();

    xoaHetLoi();
    formTitle.textContent = 'Sửa sinh viên';
    editingRow = row;
    popup.classList.add('active');
    hienThongBao('Đang sửa: ' + cells[1].textContent.trim(), 'info');
  }

  // === Nút Xóa → mở confirm dialog ===
  if (e.target.classList.contains('deleteBtn')) {
    var row = e.target.closest('tr');
    if (!row) return;

    var tenSV = row.querySelectorAll('td')[1].textContent.trim();
    var maSV = row.querySelectorAll('td')[0].textContent.trim();

    pendingDeleteRow = row;
    confirmMsg.textContent = 'Bạn có chắc muốn xóa "' + tenSV + '" (MSSV: ' + maSV + ')?';
    confirmDialog.classList.add('active');
  }
});


// --- Confirm: Nút Xóa ---
btnConfirmYes.addEventListener('click', function () {
  if (pendingDeleteRow) {
    var tenSV = pendingDeleteRow.querySelectorAll('td')[1].textContent.trim();

    // Animation rồi xóa
    pendingDeleteRow.style.animation = 'rowFadeOut 0.3s ease forwards';

    var row = pendingDeleteRow;
    setTimeout(function () {
      row.remove();
      capNhatThongKe();
    }, 300);

    hienThongBao('Đã xóa "' + tenSV + '"!', 'success');
    pendingDeleteRow = null;
  }
  confirmDialog.classList.remove('active');
});

// --- Confirm: Nút Hủy ---
btnConfirmNo.addEventListener('click', function () {
  pendingDeleteRow = null;
  confirmDialog.classList.remove('active');
});

// Click bên ngoài confirm dialog để đóng
confirmDialog.addEventListener('click', function (e) {
  if (e.target === confirmDialog) {
    pendingDeleteRow = null;
    confirmDialog.classList.remove('active');
  }
});


// --- Đóng popup form ---
btnClose.addEventListener('click', function () {
  popup.classList.remove('active');
  xoaHetLoi();
});

// Click bên ngoài form để đóng
popup.addEventListener('click', function (e) {
  if (e.target === popup) {
    popup.classList.remove('active');
    xoaHetLoi();
  }
});

// Nhấn Escape để đóng
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (confirmDialog.classList.contains('active')) {
      pendingDeleteRow = null;
      confirmDialog.classList.remove('active');
    } else if (popup.classList.contains('active')) {
      popup.classList.remove('active');
      xoaHetLoi();
    }
  }
});


// --- Khởi tạo thống kê khi load trang ---
capNhatThongKe();
