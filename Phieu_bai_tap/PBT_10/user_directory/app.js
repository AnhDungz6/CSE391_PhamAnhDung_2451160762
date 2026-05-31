// Local State
let userList = [];
let userToDeleteId = null;

// API Layer
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const response = await fetch(`${this.baseURL}/users`);
        if (!response.ok) throw new Error(`Không thể lấy danh sách (Lỗi ${response.status})`);
        return await response.json();
    },
    
    async getUser(id) {
        const response = await fetch(`${this.baseURL}/users/${id}`);
        if (!response.ok) throw new Error(`Không thể lấy thông tin nhân sự (Lỗi ${response.status})`);
        return await response.json();
    },
    
    async createUser(data) {
        const response = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) throw new Error(`Không thể tạo nhân sự mới (Lỗi ${response.status})`);
        return await response.json();
    },
    
    async updateUser(id, data) {
        // JSONPlaceholder only has users 1-10 on server. If id > 10, simulate success locally
        if (id > 10) {
            return { id, ...data };
        }
        
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) throw new Error(`Không thể cập nhật nhân sự (Lỗi ${response.status})`);
        return await response.json();
    },
    
    async deleteUser(id) {
        // JSONPlaceholder only has users 1-10. If id > 10, simulate success locally
        if (id > 10) {
            return {};
        }
        
        const response = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Không thể xóa nhân sự (Lỗi ${response.status})`);
        return {};
    }
};

// UI Layer
const ui = {
    renderUsers(users) {
        const usersGrid = document.getElementById('users-grid');
        usersGrid.innerHTML = '';
        
        if (users.length === 0) {
            usersGrid.innerHTML = `
                <div class="state-container" style="grid-column: 1 / -1; min-height: 200px;">
                    <span style="font-size: 2.5rem;">🔍</span>
                    <p class="state-message">Không tìm thấy nhân sự phù hợp.</p>
                </div>
            `;
            return;
        }
        
        users.forEach(user => {
            // Get initials for avatar
            const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
            
            // Format website link
            const website = user.website || '';
            const websiteUrl = website.startsWith('http') ? website : `https://${website}`;
            
            // Company name
            const companyName = user.company && typeof user.company === 'object' ? user.company.name : (user.company || 'N/A');

            const card = document.createElement('div');
            card.className = 'user-card';
            card.setAttribute('data-id', user.id);
            card.innerHTML = `
                <div class="user-card-header">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-meta">
                        <h4 class="user-name" title="${user.name}">${user.name}</h4>
                        <span class="user-username">@${user.username || 'username'}</span>
                    </div>
                </div>
                <div class="user-card-body">
                    <div class="info-item">
                        <span class="info-icon">✉️</span>
                        <span class="info-value" title="${user.email}">${user.email}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">📞</span>
                        <span class="info-value">${user.phone || 'N/A'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-icon">🏢</span>
                        <span class="info-value" title="${companyName}">${companyName}</span>
                    </div>
                    ${website ? `
                    <div class="info-item">
                        <span class="info-icon">🌐</span>
                        <span class="info-value"><a href="${websiteUrl}" target="_blank" rel="noopener">${website}</a></span>
                    </div>
                    ` : ''}
                </div>
                <div class="user-card-actions">
                    <button class="btn btn-secondary btn-edit" onclick="openEditModal(${user.id})">
                        ✏️ Sửa
                    </button>
                    <button class="btn btn-danger btn-delete" onclick="openDeleteConfirm(${user.id}, '${user.name.replace(/'/g, "\\'")}')">
                        🗑️ Xóa
                    </button>
                </div>
            `;
            usersGrid.appendChild(card);
        });
    },
    
    showLoading() {
        const usersGrid = document.getElementById('users-grid');
        usersGrid.innerHTML = '';
        
        // Render 6 skeleton cards
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton-card';
            skeleton.innerHTML = `
                <div class="skeleton-header">
                    <div class="skeleton-avatar skeleton-shimmer"></div>
                    <div class="skeleton-meta">
                        <div class="skeleton-text skeleton-title skeleton-shimmer"></div>
                        <div class="skeleton-text skeleton-subtitle skeleton-shimmer"></div>
                    </div>
                </div>
                <div class="skeleton-body">
                    <div class="skeleton-line skeleton-shimmer"></div>
                    <div class="skeleton-line skeleton-shimmer"></div>
                    <div class="skeleton-line skeleton-shimmer"></div>
                </div>
                <div class="skeleton-actions">
                    <div class="skeleton-btn skeleton-shimmer"></div>
                    <div class="skeleton-btn skeleton-shimmer"></div>
                </div>
            `;
            usersGrid.appendChild(skeleton);
        }
    },
    
    hideLoading() {
        // Explicit loading state hide (already naturally overwritten by renderUsers)
    },
    
    showError(message) {
        showToast(message, 'error');
    },
    
    showSuccess(message) {
        showToast(message, 'success');
    }
};

// Toast system function
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Auto remove after animation completes
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Initial Fetch
async function loadUsers() {
    ui.showLoading();
    try {
        const data = await api.getUsers();
        userList = data;
        ui.renderUsers(userList);
    } catch (error) {
        ui.showError(error.message);
        // Show error UI in grid
        document.getElementById('users-grid').innerHTML = `
            <div class="state-container" style="grid-column: 1 / -1; min-height: 200px;">
                <span style="font-size: 3rem;">⚠️</span>
                <p class="state-message" style="color: #ef4444;">${error.message}</p>
                <button class="btn btn-primary" onclick="loadUsers()" style="margin-top: 12px;">Thử lại</button>
            </div>
        `;
    }
}

// Add User and Edit User Modals handling
const userModal = document.getElementById('user-modal');
const userForm = document.getElementById('user-form');
const modalTitle = document.getElementById('modal-title');
const formUserId = document.getElementById('form-user-id');

// Reset Form & Fields
function resetForm() {
    userForm.reset();
    formUserId.value = '';
}

// Close Modal
function closeModal() {
    userModal.classList.remove('active');
}

// Open Add Modal
document.getElementById('add-user-btn').addEventListener('click', () => {
    resetForm();
    modalTitle.textContent = 'Thêm nhân sự mới';
    userModal.classList.add('active');
});

// Close buttons
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
userModal.addEventListener('click', (e) => {
    if (e.target === userModal) closeModal();
});

// Edit mode filler
function openEditModal(id) {
    const user = userList.find(u => u.id === id);
    if (!user) return;
    
    resetForm();
    modalTitle.textContent = 'Cập nhật thông tin';
    formUserId.value = user.id;
    
    document.getElementById('form-name').value = user.name || '';
    document.getElementById('form-email').value = user.email || '';
    document.getElementById('form-username').value = user.username || '';
    document.getElementById('form-phone').value = user.phone || '';
    document.getElementById('form-company').value = user.company && typeof user.company === 'object' ? user.company.name : (user.company || '');
    document.getElementById('form-website').value = user.website || '';
    
    userModal.classList.add('active');
}

// Form Submit (Create & Update)
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = formUserId.value;
    const data = {
        name: document.getElementById('form-name').value.trim(),
        email: document.getElementById('form-email').value.trim(),
        username: document.getElementById('form-username').value.trim() || 'username',
        phone: document.getElementById('form-phone').value.trim() || 'N/A',
        company: {
            name: document.getElementById('form-company').value.trim() || 'N/A'
        },
        website: document.getElementById('form-website').value.trim() || ''
    };
    
    closeModal();
    
    if (id) {
        // UPDATE Operation
        const numId = parseInt(id);
        try {
            const updatedUser = await api.updateUser(numId, data);
            
            // Sync with local list
            userList = userList.map(u => u.id === numId ? { ...u, ...updatedUser } : u);
            ui.showSuccess(`Đã cập nhật thông tin cho ${data.name}`);
            
            // Apply search filter if active
            applyFilter();
        } catch (error) {
            ui.showError(error.message);
        }
    } else {
        // CREATE Operation
        try {
            const createdUser = await api.createUser(data);
            
            // Generate a unique client-side ID to avoid key conflicts
            const maxId = userList.reduce((max, u) => u.id > max ? u.id : max, 0);
            createdUser.id = Math.max(maxId, 10) + 1;
            
            userList.unshift(createdUser);
            ui.showSuccess(`Đã thêm nhân sự mới: ${data.name}`);
            
            // Apply search filter if active
            applyFilter();
        } catch (error) {
            ui.showError(error.message);
        }
    }
});

// Delete Modal handling
const confirmModal = document.getElementById('confirm-modal');
const deleteUserName = document.getElementById('delete-user-name');

function openDeleteConfirm(id, name) {
    userToDeleteId = id;
    deleteUserName.textContent = name;
    confirmModal.classList.add('active');
}

function closeDeleteConfirm() {
    confirmModal.classList.remove('active');
    userToDeleteId = null;
}

document.getElementById('delete-cancel-btn').addEventListener('click', closeDeleteConfirm);
confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) closeDeleteConfirm();
});

document.getElementById('delete-confirm-btn').addEventListener('click', async () => {
    if (!userToDeleteId) return;
    
    const id = userToDeleteId;
    const user = userList.find(u => u.id === id);
    const userName = user ? user.name : 'Nhân sự';
    
    closeDeleteConfirm();
    
    try {
        await api.deleteUser(id);
        userList = userList.filter(u => u.id !== id);
        ui.showSuccess(`Đã xóa thành công ${userName}`);
        applyFilter();
    } catch (error) {
        ui.showError(error.message);
    }
});

// Client-side Search and Filter logic
const searchInput = document.getElementById('search-input');

function applyFilter() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        ui.renderUsers(userList);
        return;
    }
    
    const filtered = userList.filter(user => {
        const name = (user.name || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        return name.includes(query) || email.includes(query);
    });
    
    ui.renderUsers(filtered);
}

searchInput.addEventListener('input', applyFilter);

// Load data on start
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});
