// Dữ liệu sản phẩm (Khai báo trong JS, KHÔNG hardcode HTML)
const products = [
    { 
        id: 1, 
        name: "iPhone 16 Pro", 
        price: 28990000, 
        category: "phone", 
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80", 
        rating: 4.8, 
        inStock: true,
        specs: {
            "Màn hình": "6.3 inch, Super Retina XDR OLED",
            "Chip xử lý": "Apple A18 Pro (3nm)",
            "Camera": "Chính 48MP, Siêu rộng 48MP, Tele 12MP (5x)",
            "Pin": "3577 mAh, Sạc nhanh 30W"
        }
    },
    { 
        id: 2, 
        name: "Samsung Galaxy S24 Ultra", 
        price: 26990000, 
        category: "phone", 
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&q=80", 
        rating: 4.7, 
        inStock: true,
        specs: {
            "Màn hình": "6.8 inch, Dynamic AMOLED 2X, 120Hz",
            "Chip xử lý": "Snapdragon 8 Gen 3 for Galaxy",
            "Camera": "200MP + 50MP + 12MP + 10MP",
            "Pin": "5000 mAh, Sạc nhanh 45W"
        }
    },
    { 
        id: 3, 
        name: "Google Pixel 9 Pro", 
        price: 23990000, 
        category: "phone", 
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=400&q=80", 
        rating: 4.6, 
        inStock: false,
        specs: {
            "Màn hình": "6.3 inch, LTPO OLED, 120Hz",
            "Chip xử lý": "Google Tensor G4",
            "Camera": "Chính 50MP, Siêu rộng 48MP, Tele 48MP (5x)",
            "Pin": "4700 mAh, Sạc nhanh 27W"
        }
    },
    { 
        id: 4, 
        name: "MacBook Pro M3 14\"", 
        price: 39990000, 
        category: "laptop", 
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80", 
        rating: 4.9, 
        inStock: true,
        specs: {
            "Màn hình": "14.2 inch, Liquid Retina XDR, 120Hz",
            "Chip xử lý": "Apple M3 (8-core CPU, 10-core GPU)",
            "RAM/SSD": "16GB RAM / 512GB SSD",
            "Trọng lượng": "1.55 kg"
        }
    },
    { 
        id: 5, 
        name: "Dell XPS 13 9340", 
        price: 34990000, 
        category: "laptop", 
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=400&q=80", 
        rating: 4.5, 
        inStock: true,
        specs: {
            "Màn hình": "13.4 inch, FHD+ InfinityEdge, 120Hz",
            "Chip xử lý": "Intel Core Ultra 7 155H",
            "RAM/SSD": "16GB LPDDR5x / 512GB PCIe 4.0",
            "Trọng lượng": "1.19 kg"
        }
    },
    { 
        id: 6, 
        name: "ASUS ROG Zephyrus G14", 
        price: 42990000, 
        category: "laptop", 
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80", 
        rating: 4.8, 
        inStock: true,
        specs: {
            "Màn hình": "14 inch, ROG Nebula OLED 3K, 120Hz",
            "Chip xử lý": "AMD Ryzen 9 8945HS",
            "Đồ họa": "NVIDIA GeForce RTX 4060 8GB GDDR6",
            "RAM/SSD": "32GB LPDDR5X / 1TB SSD NVMe"
        }
    },
    { 
        id: 7, 
        name: "iPad Pro M4 11\"", 
        price: 25490000, 
        category: "tablet", 
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80", 
        rating: 4.9, 
        inStock: true,
        specs: {
            "Màn hình": "11 inch, Ultra Retina Tandem OLED",
            "Chip xử lý": "Apple M4 (9-core CPU, 10-core GPU)",
            "Bộ nhớ": "256GB SSD",
            "Trọng lượng": "444 grams"
        }
    },
    { 
        id: 8, 
        name: "Samsung Galaxy Tab S9 Ultra", 
        price: 21990000, 
        category: "tablet", 
        image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?auto=format&fit=crop&w=400&q=80", 
        rating: 4.6, 
        inStock: true,
        specs: {
            "Màn hình": "14.6 inch, Dynamic AMOLED 2X, 120Hz",
            "Chip xử lý": "Snapdragon 8 Gen 2 for Galaxy",
            "Bộ nhớ": "12GB RAM / 256GB ROM",
            "Phụ kiện": "Đi kèm bút S-Pen cao cấp"
        }
    },
    { 
        id: 9, 
        name: "Lenovo Tab P12", 
        price: 8990000, 
        category: "tablet", 
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=400&q=80", 
        rating: 4.2, 
        inStock: false,
        specs: {
            "Màn hình": "12.7 inch, LTPS LCD 3K (2944 x 1840)",
            "Chip xử lý": "MediaTek Dimensity 7050",
            "Bộ nhớ": "8GB RAM / 128GB ROM",
            "Pin": "10200 mAh, sạc nhanh 30W"
        }
    },
    { 
        id: 10, 
        name: "AirPods Max (Lightning)", 
        price: 12490000, 
        category: "audio", 
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80", 
        rating: 4.4, 
        inStock: true,
        specs: {
            "Loại tai nghe": "Over-ear (Chụp tai)",
            "Chống ồn": "Chống ồn chủ động (ANC) & Xuyên âm",
            "Kết nối": "Bluetooth 5.0, Chip Apple H1",
            "Thời lượng pin": "Lên đến 20 giờ sử dụng liên tục"
        }
    },
    { 
        id: 11, 
        name: "Sony WH-1000XM5", 
        price: 8490000, 
        category: "audio", 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80", 
        rating: 4.7, 
        inStock: true,
        specs: {
            "Loại tai nghe": "Over-ear (Chụp tai)",
            "Chống ồn": "Công nghệ chống ồn Auto NC Optimizer",
            "Kết nối": "Bluetooth 5.2, Hỗ trợ Hi-Res Audio (LDAC)",
            "Thời lượng pin": "Tối đa 30 giờ (bật ANC), 40 giờ (tắt ANC)"
        }
    },
    { 
        id: 12, 
        name: "Apple Watch Ultra 2", 
        price: 21990000, 
        category: "audio", 
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80", 
        rating: 4.8, 
        inStock: true,
        specs: {
            "Màn hình": "1.92 inch, OLED Retina Always-On, 3000 nits",
            "Chất liệu": "Vỏ Titanium, mặt kính Sapphire",
            "Kết nối": "GPS + Cellular (eSIM)",
            "Kháng nước": "Độ sâu 100m, chứng nhận chuẩn quân đội"
        }
    },
    { 
        id: 13, 
        name: "Bàn phím cơ Keychron K2 V2", 
        price: 2490000, 
        category: "audio", 
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80", 
        rating: 4.5, 
        inStock: true,
        specs: {
            "Kích thước": "Layout 75% (84 phím)",
            "Kết nối": "Bluetooth 5.1 (3 thiết bị) hoặc cáp Type-C",
            "Switch": "Gateron G-Pro (Blue/Brown/Red)",
            "Pin": "4000 mAh (Dùng đến 240 giờ tắt LED)"
        }
    }
];

// Trạng thái ứng dụng
let activeCategory = "all";
let searchQuery = "";
let sortBy = "price-asc";
let cartCount = 0;

// Các Category hiển thị danh nghĩa
const categoriesMap = {
    all: "Tất cả",
    phone: "Điện thoại",
    laptop: "Laptop",
    tablet: "Máy tính bảng",
    audio: "Âm thanh"
};

// SVG Icons để giao diện trông premium và sinh động
const icons = {
    search: `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    cart: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    sun: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></svg>`,
    moon: `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
    star: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    starEmpty: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    close: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
};

// Khởi động giao diện 100% bằng JavaScript
function initApp() {
    const app = document.getElementById("app");
    if (!app) return;

    // --- 1. Tạo Header ---
    const header = document.createElement("header");
    header.className = "main-header";
    
    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";
    logoContainer.innerHTML = `<span class="logo-text">AURA</span><span class="logo-subtext">Store</span>`;
    
    const headerActions = document.createElement("div");
    headerActions.className = "header-actions";
    
    // Nút Dark Mode Toggle
    const themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle-btn";
    themeBtn.setAttribute("aria-label", "Toggle theme");
    themeBtn.innerHTML = icons.moon;
    themeBtn.addEventListener("click", () => toggleDarkMode(themeBtn));
    
    // Giỏ hàng Badge
    const cartWrapper = document.createElement("div");
    cartWrapper.className = "cart-badge-wrapper";
    cartWrapper.innerHTML = `
        <div class="cart-icon">${icons.cart}</div>
        <span class="cart-badge" id="cart-counter">0</span>
    `;
    
    headerActions.appendChild(themeBtn);
    headerActions.appendChild(cartWrapper);
    header.appendChild(logoContainer);
    header.appendChild(headerActions);
    app.appendChild(header);

    // --- 2. Tạo Hero Section ---
    const hero = document.createElement("section");
    hero.className = "hero-section";
    hero.innerHTML = `
        <div class="hero-content">
            <h1>Thế Giới Công Nghệ AURA</h1>
            <p>Trải nghiệm mua sắm hiện đại, tương tác mượt mà và các sản phẩm công nghệ hàng đầu thế giới.</p>
        </div>
    `;
    app.appendChild(hero);

    // --- 3. Tạo Controls Panel (Search, Filter, Sort) ---
    const controls = document.createElement("div");
    controls.className = "controls-panel";
    
    // Ô tìm kiếm Realtime
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";
    
    const searchIcon = document.createElement("span");
    searchIcon.className = "search-icon-inside";
    searchIcon.innerHTML = icons.search;
    
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.className = "search-input";
    searchInput.placeholder = "Tìm kiếm sản phẩm...";
    searchInput.addEventListener("input", (e) => searchProducts(e.target.value));
    
    searchWrapper.appendChild(searchIcon);
    searchWrapper.appendChild(searchInput);
    controls.appendChild(searchWrapper);
    
    // Bộ lọc Category (dạng Button group)
    const categoryContainer = document.createElement("div");
    categoryContainer.className = "category-filters";
    
    Object.keys(categoriesMap).forEach(key => {
        const btn = document.createElement("button");
        btn.className = `category-btn ${key === activeCategory ? 'active' : ''}`;
        btn.textContent = categoriesMap[key];
        btn.addEventListener("click", () => filterByCategory(key, btn));
        categoryContainer.appendChild(btn);
    });
    controls.appendChild(categoryContainer);
    
    // Bộ Sắp xếp (Sort dropdown)
    const sortWrapper = document.createElement("div");
    sortWrapper.className = "sort-wrapper";
    
    const sortSelect = document.createElement("select");
    sortSelect.className = "sort-select";
    sortSelect.innerHTML = `
        <option value="price-asc">Giá: Thấp đến Cao</option>
        <option value="price-desc">Giá: Cao đến Thấp</option>
        <option value="name-az">Tên: A - Z</option>
        <option value="rating-desc">Đánh giá cao nhất</option>
    `;
    sortSelect.addEventListener("change", (e) => sortProducts(e.target.value));
    sortWrapper.appendChild(sortSelect);
    controls.appendChild(sortWrapper);
    
    app.appendChild(controls);

    // --- 4. Tạo Grid danh sách sản phẩm ---
    const gridContainer = document.createElement("main");
    gridContainer.className = "products-grid-container";
    
    const grid = document.createElement("div");
    grid.className = "products-grid";
    grid.id = "products-grid";
    gridContainer.appendChild(grid);
    app.appendChild(gridContainer);

    // --- 5. Tạo Footer ---
    const footer = document.createElement("footer");
    footer.className = "main-footer";
    footer.innerHTML = `
        <p>© 2026 AURA Store. Phát triển hoàn toàn bằng JavaScript DOM tương tác.</p>
    `;
    app.appendChild(footer);

    // --- 6. Tạo Container cho Toast thông báo ---
    const toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);

    // Render danh sách sản phẩm lần đầu tiên
    renderProducts();
}

// Định dạng giá tiền tệ VNĐ
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Tạo chuỗi sao đánh giá (sử dụng SVG sắc nét)
function renderRatingStars(rating) {
    const starsContainer = document.createElement("div");
    starsContainer.className = "stars-rating";
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        if (i <= fullStars) {
            star.innerHTML = icons.star;
            star.className = "star full";
        } else if (i === fullStars + 1 && hasHalfStar) {
            // Hiển thị sao nửa, ở đây làm đơn giản là cho star có class half
            star.innerHTML = icons.star;
            star.className = "star half";
        } else {
            star.innerHTML = icons.starEmpty;
            star.className = "star empty";
        }
        starsContainer.appendChild(star);
    }
    
    const textNode = document.createElement("span");
    textNode.className = "rating-value";
    textNode.textContent = rating;
    starsContainer.appendChild(textNode);
    
    return starsContainer;
}

// Hàm render sản phẩm (Từ array JS → Tạo HTML cards bằng createElement → Append vào DOM)
function renderProducts() {
    const grid = document.getElementById("products-grid");
    if (!grid) return;
    
    // Clear danh sách cũ
    grid.innerHTML = "";
    
    // Lọc sản phẩm theo category & từ khóa search
    let filtered = products.filter(product => {
        const matchesCategory = activeCategory === "all" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    // Sắp xếp sản phẩm
    if (sortBy === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rating-desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // Trường hợp không có sản phẩm nào khớp
    if (filtered.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "empty-state";
        emptyState.innerHTML = `
            <h3>Không tìm thấy sản phẩm nào</h3>
            <p>Vui lòng thử lại với từ khóa hoặc danh mục khác.</p>
        `;
        grid.appendChild(emptyState);
        return;
    }
    
    // Tạo HTML cards cho từng sản phẩm và append vào DOM
    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        // Trạng thái hết hàng
        if (!product.inStock) {
            card.classList.add("out-of-stock-card");
        }
        
        // Ảnh sản phẩm & Badge trạng thái kho hàng
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "product-img-wrapper";
        
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.loading = "lazy";
        imgWrapper.appendChild(img);
        
        const badge = document.createElement("span");
        if (product.inStock) {
            badge.className = "stock-badge instock";
            badge.textContent = "Còn hàng";
        } else {
            badge.className = "stock-badge outstock";
            badge.textContent = "Hết hàng";
        }
        imgWrapper.appendChild(badge);
        card.appendChild(imgWrapper);
        
        // Nội dung chi tiết
        const info = document.createElement("div");
        info.className = "product-info";
        
        const categoryTag = document.createElement("span");
        categoryTag.className = "product-category-tag";
        categoryTag.textContent = categoriesMap[product.category];
        info.appendChild(categoryTag);
        
        const title = document.createElement("h3");
        title.className = "product-title";
        title.textContent = product.name;
        info.appendChild(title);
        
        // Thêm Đánh giá
        const ratingElement = renderRatingStars(product.rating);
        info.appendChild(ratingElement);
        
        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = formatCurrency(product.price);
        info.appendChild(price);
        
        // Nút mua hàng
        const actionWrapper = document.createElement("div");
        actionWrapper.className = "product-actions";
        
        const btnAdd = document.createElement("button");
        btnAdd.className = "btn-add-cart";
        btnAdd.textContent = "Thêm giỏ";
        if (!product.inStock) {
            btnAdd.disabled = true;
            btnAdd.textContent = "Tạm hết";
        }
        
        // Ngăn chặn sự kiện nổi bọt để tránh click vào card mở Modal khi ấn Thêm giỏ
        btnAdd.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(product);
        });
        
        actionWrapper.appendChild(btnAdd);
        info.appendChild(actionWrapper);
        
        card.appendChild(info);
        
        // Click vào card (ngoại trừ nút thêm giỏ) -> Hiện modal chi tiết sản phẩm
        card.addEventListener("click", () => {
            openModal(product);
        });
        
        grid.appendChild(card);
    });
}

// Chức năng: Filter by category (Click buttons category → Chỉ hiển thị category đó)
function filterByCategory(category, clickedButton) {
    activeCategory = category;
    
    // Cập nhật class active cho buttons
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    if (clickedButton) {
        clickedButton.classList.add("active");
    } else {
        // Fallback tìm button tương ứng để set active
        const targetBtn = Array.from(buttons).find(btn => btn.textContent === categoriesMap[category]);
        if (targetBtn) targetBtn.classList.add("active");
    }
    
    renderProducts();
}

// Chức năng: Search realtime (Gõ vào ô search → Lọc sản phẩm ngay lập tức)
function searchProducts(query) {
    searchQuery = query;
    renderProducts();
}

// Chức năng: Sort (Dropdown sort by: Giá tăng, Giá giảm, Tên A-Z, Đánh giá cao nhất)
function sortProducts(criteria) {
    sortBy = criteria;
    renderProducts();
}

// Chức năng: Add to cart badge (Click "Thêm giỏ" → Badge số lượng tăng lên)
function addToCart(product) {
    if (!product.inStock) return;
    
    cartCount++;
    const badge = document.getElementById("cart-counter");
    if (badge) {
        badge.textContent = cartCount;
        
        // Thêm hiệu ứng nháy giật (animation) để báo hiệu cho người dùng
        badge.classList.remove("bounce");
        void badge.offsetWidth; // Trigger reflow để reset animation
        badge.classList.add("bounce");
    }
    
    // Hiển thị thông báo Toast thành công ở góc phải
    showToast(`Đã thêm <strong>${product.name}</strong> vào giỏ hàng thành công!`);
}

// Tạo hiệu ứng Toast Notification đẹp đẽ
function showToast(message) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close-btn">&times;</button>
    `;
    
    // Sự kiện đóng toast nhanh
    toast.querySelector(".toast-close-btn").addEventListener("click", () => {
        toast.classList.add("toast-fade-out");
        toast.addEventListener("transitionend", () => toast.remove());
    });
    
    container.appendChild(toast);
    
    // Tự động biến mất sau 3 giây
    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.add("toast-fade-out");
            toast.addEventListener("transitionend", () => toast.remove());
        }
    }, 3000);
}

// Chức năng: Card click → Modal (Click sản phẩm → Hiện modal chi tiết được tạo bằng JS)
function openModal(product) {
    // Tạo backdrop mờ và tối
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    
    // Header Modal
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    
    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Chi tiết sản phẩm";
    
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close-btn";
    closeBtn.innerHTML = icons.close;
    closeBtn.addEventListener("click", () => closeModal(modalOverlay));
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    
    // Body Modal
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    
    // Cột bên trái: Ảnh sản phẩm và Badge
    const imgCol = document.createElement("div");
    imgCol.className = "modal-img-col";
    
    const bigImg = document.createElement("img");
    bigImg.src = product.image;
    bigImg.alt = product.name;
    imgCol.appendChild(bigImg);
    modalBody.appendChild(imgCol);
    
    // Cột bên phải: Thông số, giá và các chức năng khác
    const detailsCol = document.createElement("div");
    detailsCol.className = "modal-details-col";
    
    const categoryTag = document.createElement("span");
    categoryTag.className = "product-category-tag";
    categoryTag.textContent = categoriesMap[product.category];
    detailsCol.appendChild(categoryTag);
    
    const prodName = document.createElement("h3");
    prodName.className = "modal-product-name";
    prodName.textContent = product.name;
    detailsCol.appendChild(prodName);
    
    // Đánh giá sao
    const stars = renderRatingStars(product.rating);
    detailsCol.appendChild(stars);
    
    // Giá tiền
    const priceText = document.createElement("div");
    priceText.className = "modal-product-price";
    priceText.textContent = formatCurrency(product.price);
    detailsCol.appendChild(priceText);
    
    // Khối thông số kỹ thuật (Specs)
    if (product.specs) {
        const specsWrapper = document.createElement("div");
        specsWrapper.className = "specs-wrapper";
        
        const specsTitle = document.createElement("h4");
        specsTitle.textContent = "Thông số kỹ thuật:";
        specsWrapper.appendChild(specsTitle);
        
        const specsList = document.createElement("ul");
        specsList.className = "specs-list";
        
        Object.entries(product.specs).forEach(([key, val]) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${key}:</strong> ${val}`;
            specsList.appendChild(li);
        });
        
        specsWrapper.appendChild(specsList);
        detailsCol.appendChild(specsWrapper);
    }
    
    // Nút hành động trong Modal
    const modalActions = document.createElement("div");
    modalActions.className = "modal-actions";
    
    const btnAddModal = document.createElement("button");
    btnAddModal.className = "btn-add-cart-modal";
    btnAddModal.textContent = product.inStock ? "Thêm vào giỏ hàng" : "Tạm hết hàng";
    if (!product.inStock) {
        btnAddModal.disabled = true;
    } else {
        btnAddModal.addEventListener("click", () => {
            addToCart(product);
            closeModal(modalOverlay);
        });
    }
    modalActions.appendChild(btnAddModal);
    detailsCol.appendChild(modalActions);
    
    modalBody.appendChild(detailsCol);
    modalContent.appendChild(modalBody);
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Khóa cuộn trang chính khi mở modal
    document.body.style.overflow = "hidden";
    
    // Trigger animation pop-in
    setTimeout(() => {
        modalOverlay.classList.add("active");
    }, 10);
    
    // Click ngoài khung modal thì đóng modal
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    // Nhấn phím Escape thì đóng modal
    const escListener = (e) => {
        if (e.key === "Escape") {
            closeModal(modalOverlay);
            document.removeEventListener("keydown", escListener);
        }
    };
    document.addEventListener("keydown", escListener);
}

// Đóng modal với hiệu ứng thu nhỏ mờ dần
function closeModal(overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = ""; // Mở lại cuộn trang chính
    
    // Chờ hiệu ứng chuyển động hoàn tất rồi xóa element khỏi DOM
    overlay.addEventListener("transitionend", () => {
        overlay.remove();
    });
}

// Chức năng: Dark mode toggle (Thêm/xóa class dark-mode trên <body>)
function toggleDarkMode(button) {
    const isDark = document.body.classList.toggle("dark-mode");
    
    // Thay đổi biểu tượng nút
    if (isDark) {
        button.innerHTML = icons.sun;
        button.classList.add("dark");
    } else {
        button.innerHTML = icons.moon;
        button.classList.remove("dark");
    }
}

// Khởi chạy ứng dụng khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", initApp);
