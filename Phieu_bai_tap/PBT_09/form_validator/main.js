document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');
    const fullname = document.getElementById('fullname');
    const nameStatus = document.getElementById('name-status');
    
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    
    const password = document.getElementById('password');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');
    
    const confirmPassword = document.getElementById('confirm-password');
    const confirmError = document.getElementById('confirm-password-error');
    
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phone-error');
    
    const submitBtn = document.getElementById('submit-btn');
    
    // Modal elements
    const modal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');
    
    // Track valid state of each field
    const validity = { name: false, email: false, pwd: false, match: false, tel: false };

    function updateSubmitButton() {
        submitBtn.disabled = !Object.values(validity).every(v => v === true);
    }

    // 1. Validate Name (2-50 chars)
    fullname.addEventListener('input', () => {
        const val = fullname.value.trim();
        if (val.length === 0) {
            nameStatus.textContent = '';
            validity.name = false;
        } else if (val.length >= 2 && val.length <= 50) {
            nameStatus.textContent = '✅';
            validity.name = true;
        } else {
            nameStatus.textContent = '❌';
            validity.name = false;
        }
        updateSubmitButton();
    });

    // 2. Validate Email
    email.addEventListener('input', () => {
        const val = email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (val.length === 0) {
            emailError.textContent = 'Vui lòng nhập email';
            validity.email = false;
        } else if (!val.includes('@')) {
            emailError.textContent = "Email phải chứa ký tự '@'";
            validity.email = false;
        } else if (!regex.test(val)) {
            emailError.textContent = 'Email không hợp lệ (VD: example@email.com)';
            validity.email = false;
        } else {
            emailError.textContent = '';
            validity.email = true;
        }
        updateSubmitButton();
    });

    // 3. Password Strength Meter
    password.addEventListener('input', () => {
        const val = password.value;
        strengthBar.className = '';
        strengthLabel.className = '';

        if (val.length === 0) {
            strengthBar.style.width = '0%';
            strengthLabel.textContent = 'Chưa nhập';
            validity.pwd = false;
        } else if (val.length < 8) {
            strengthBar.classList.add('weak-bar');
            strengthLabel.textContent = 'Yếu';
            strengthLabel.classList.add('weak-text');
            validity.pwd = false;
        } else {
            // Check letters + numbers for medium
            const hasLetter = /[a-zA-Z]/.test(val);
            const hasNumber = /\d/.test(val);
            // Check upper, lower, numbers, special for strong
            const hasUpper = /[A-Z]/.test(val);
            const hasLower = /[a-z]/.test(val);
            const hasSpecial = /[\W_]/.test(val);

            if (hasUpper && hasLower && hasNumber && hasSpecial) {
                strengthBar.classList.add('strong-bar');
                strengthLabel.textContent = 'Mạnh';
                strengthLabel.classList.add('strong-text');
                validity.pwd = true;
            } else if (hasLetter && hasNumber) {
                strengthBar.classList.add('medium-bar');
                strengthLabel.textContent = 'Trung bình';
                strengthLabel.classList.add('medium-text');
                validity.pwd = true;
            } else {
                strengthBar.classList.add('weak-bar');
                strengthLabel.textContent = 'Yếu';
                strengthLabel.classList.add('weak-text');
                validity.pwd = false;
            }
        }

        // Trigger confirm password check if it's already filled
        if (confirmPassword.value.length > 0) {
            confirmPassword.dispatchEvent(new Event('input'));
        }
        updateSubmitButton();
    });

    // 4. Confirm Password Match Check
    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value.length === 0) {
            confirmError.textContent = 'Vui lòng xác nhận mật khẩu';
            validity.match = false;
        } else if (confirmPassword.value !== password.value) {
            confirmError.textContent = 'Mật khẩu xác nhận không khớp';
            validity.match = false;
        } else {
            confirmError.textContent = '';
            validity.match = true;
        }
        updateSubmitButton();
    });

    // 5. Phone Auto-format & Validation
    phone.addEventListener('input', () => {
        let clean = phone.value.replace(/\D/g, '').substring(0, 10);
        
        // Auto-insert dashes: 0901-234-567
        let formatted = '';
        if (clean.length > 0) formatted += clean.substring(0, 4);
        if (clean.length > 4) formatted += '-' + clean.substring(4, 7);
        if (clean.length > 7) formatted += '-' + clean.substring(7, 10);
        
        phone.value = formatted;

        // Validation
        if (clean.length === 0) {
            phoneError.textContent = 'Vui lòng nhập số điện thoại';
            validity.tel = false;
        } else if (clean.length < 10) {
            phoneError.textContent = 'Số điện thoại phải đủ 10 số';
            validity.tel = false;
        } else if (!clean.startsWith('0')) {
            phoneError.textContent = 'Số điện thoại phải bắt đầu bằng số 0';
            validity.tel = false;
        } else {
            phoneError.textContent = '';
            validity.tel = true;
        }
        updateSubmitButton();
    });

    // Submit handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        document.getElementById('modal-name').textContent = fullname.value.trim();
        document.getElementById('modal-email').textContent = email.value.trim();
        document.getElementById('modal-phone').textContent = phone.value;
        
        modal.classList.add('active');
    });

    // Close modal & Reset form
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        form.reset();
        
        // Reset states
        nameStatus.textContent = '';
        strengthBar.style.width = '0%';
        strengthLabel.textContent = 'Chưa nhập';
        strengthLabel.className = '';
        
        Object.keys(validity).forEach(key => validity[key] = false);
        updateSubmitButton();
    });
});
