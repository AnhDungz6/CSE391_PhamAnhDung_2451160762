## PHẦN A

Câu 1:
| Kích thước | `< 768px` | `768px - 991px` | `≥ 992px` |
| ---------- | -------------- | --------------- | ------------ |
| Số cột | 1 cột | 2 cột | 4 cột |
| Box layout | Mỗi box 1 hàng | 2 box / hàng | 4 box / hàng |

`col-md-6` nghĩa là:

- `md` = breakpoint medium (`≥768px`)
- `6` = chiếm 6/12 cột của Bootstrap Grid System

Điều này có nghĩa là từ kích thước tablet trở lên, mỗi box sẽ chiếm một nửa chiều rộng hàng, nên sẽ có 2 box trên 1 hàng.

Không cần viết code col-sm-12 vì :

Bootstrap sử dụng cơ chế **Mobile-First**.

Nếu không khai báo kích thước cho màn hình nhỏ hơn thì phần tử sẽ tự động:

```css
width: 100%;
```

Câu 2:

1. Giải thích class `d-none d-md-block`

```html
<div class="d-none d-md-block"></div>
```

- `d-none` → ẩn element (`display: none`)
- `d-md-block` → từ breakpoint `md` (`≥768px`) trở lên thì hiển thị dạng `block`

Kết quả

| Kích thước màn hình | Trạng thái |
| ------------------- | ---------- |
| `<768px`            | Ẩn         |
| `≥768px`            | Hiển thị   |

Ý nghĩa thực tế

Thường dùng để:

- Ẩn sidebar trên mobile
- Ẩn ảnh lớn ở màn hình nhỏ
- Chỉ hiển thị menu desktop trên tablet/desktop

---

2. 5 spacing utilities và giải thích

Bootstrap dùng spacing utilities để chỉnh margin và padding nhanh.

Cú pháp chung

```text
{property}{side}-{size}
```

Trong đó:

- `m` = margin
- `p` = padding
- `t` = top
- `b` = bottom
- `s` = start (trái)
- `e` = end (phải)
- `x` = trái + phải
- `y` = trên + dưới

---

Ví dụ 1 — `mt-3`

```html
<div class="mt-3"></div>
```

- `m` = margin
- `t` = top
- `3` = mức spacing

→ Thêm margin phía trên.

---

Ví dụ 2 — `px-4`

```html
<div class="px-4"></div>
```

- `p` = padding
- `x` = trái + phải
- `4` = mức spacing

→ Thêm padding trái và phải.

---

Ví dụ 3 — `mb-auto`

```html
<div class="mb-auto"></div>
```

- `m` = margin
- `b` = bottom
- `auto` = tự động

→ Margin-bottom tự động.

---

Ví dụ 4 — `py-2`

```html
<div class="py-2"></div>
```

- `p` = padding
- `y` = trên + dưới

→ Thêm padding phía trên và dưới.

---

Ví dụ 5 — `ms-5`

```html
<div class="ms-5"></div>
```

- `m` = margin
- `s` = start (trái)

→ Thêm margin bên trái.

---

3. Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`

`.container`

```html
<div class="container"></div>
```

- Có chiều rộng cố định theo từng breakpoint
- Tự căn giữa
- Là container phổ biến nhất

Đặc điểm

- Mobile → gần full width
- Desktop → có giới hạn chiều rộng

---

`.container-fluid`

```html
<div class="container-fluid"></div>
```

- Luôn chiếm 100% chiều rộng màn hình
- Không giới hạn max-width

Thường dùng cho:

- Hero section
- Banner toàn màn hình
- Layout full width

---

`.container-md`

```html
<div class="container-md"></div>
```

Hoạt động

- `<768px` → full width
- `≥768px` → hoạt động giống `.container`

Ý nghĩa

Chỉ bắt đầu giới hạn chiều rộng từ breakpoint `md`.

## PHẦN C

Câu C1:

#Đổi màu `$primary` từ xanh mặc định sang `#E63946`

Bootstrap 5 được viết bằng **SASS/SCSS**, nên muốn đổi màu theme chuẩn thì cần:

- Node.js
- npm
- Bootstrap source SCSS
- Sass compiler

Quy trình tùy biến Bootstrap

Bước 1 — Cài Bootstrap bằng npm

```bash
npm init -y
npm install bootstrap
Bước 2 — Cài Sass
npm install sass
Bước 3 — Tạo file SCSS riêng
```

Ví dụ:

```text
project/
│
├── scss/
│   └── custom.scss
├── css/
└── node_modules/
```

Bước 4 — Override variable trước khi import Bootstrap

Trong custom.scss:

```css
// Override Bootstrap variables

$primary: #E63946;

// Import Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";
Bước 5 — Compile SCSS thành CSS
npx sass scss/custom.scss css/style.css
```

Sau khi compile:

css/style.css

sẽ chứa Bootstrap với màu primary mới.

Bước 6 — Gắn file CSS vào HTML\

`<link rel="stylesheet" href="css/style.css">`
Kết quả

Toàn bộ component dùng primary sẽ đổi màu tự động:

.btn-primary
.bg-primary
.text-primary
.border-primary
alerts
cards
forms
pagination
links

Tất cả đều đồng bộ sang màu #E63946.

Tại sao KHÔNG nên:
.btn-primary {
background: red;
}
Vì cách này chỉ sửa "bề ngoài" của một class

Nó KHÔNG sửa hệ thống theme của Bootstrap.

Ví dụ:

`.bg-primary` vẫn màu xanh
`.text-primary` vẫn màu xanh
hover/focus states có thể lỗi
border không đồng bộ
dark/light variations không đổi

=> UI bị inconsistency (không đồng nhất).

Lợi ích của dùng SASS Variables

1. Đồng bộ toàn framework

Chỉ cần:

$primary: #E63946;

Bootstrap sẽ tự generate lại:

hover colors
active colors
border colors
utilities
alerts
badges
buttons
links

2. Dễ maintain

Muốn đổi theme:

$primary: #000;

compile lại là xong.

Không cần sửa hàng chục class CSS thủ công.

3. Không phá cấu trúc Bootstrap

Override trực tiếp CSS dễ gây:

specificity conflict
bị Bootstrap đè ngược
khó debug
khó nâng cấp version

SASS variable là cách Bootstrap thiết kế sẵn để custom.

Kết luận

Nên custom Bootstrap bằng:

SCSS
variables ($primary, $danger, $success, ...)

Không nên sửa trực tiếp:

.btn-primary { ... }

vì chỉ sửa một component riêng lẻ và làm mất tính đồng bộ của theme.

Câu C2:

1. Viết CSS thuần để tạo navbar responsive

```html
<nav class="navbar">
  <div class="logo">MyShop</div>

  <input type="checkbox" id="menu-toggle" />
  <label for="menu-toggle" class="menu-icon">☰</label>

  <ul class="nav-links">
    <li><a href="#">Trang chủ</a></li>
    <li><a href="#">Sản phẩm</a></li>
    <li><a href="#">Giới thiệu</a></li>
    <li><a href="#">Liên hệ</a></li>
  </ul>
</nav>
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  background-color: #212529;
  color: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 24px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover {
  color: #ffc107;
}

#menu-toggle {
  display: none;
}

.menu-icon {
  display: none;
  font-size: 28px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    background-color: #212529;
    flex-direction: column;
    text-align: center;
    padding: 16px 0;
  }

  #menu-toggle:checked ~ .nav-links {
    display: flex;
  }

  .nav-links li {
    padding: 12px 0;
  }
}
```

2. Viết CSS thuần để tạo product card

```html
<div class="product-card">
  <img src="https://via.placeholder.com/300x200" alt="Product" />
  <div class="product-content">
    <h3>Áo thun nam</h3>
    <p>Áo thun chất liệu cotton, thoáng mát, phù hợp mặc hằng ngày.</p>
    <span class="price">199.000đ</span>
    <button>Mua ngay</button>
  </div>
</div>
```

```css
.product-card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card img {
  width: 100%;
  display: block;
}

.product-content {
  padding: 16px;
}

.product-content h3 {
  margin-bottom: 8px;
  font-size: 20px;
}

.product-content p {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.price {
  display: block;
  color: #e63946;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
}

.product-content button {
  width: 100%;
  padding: 10px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.product-content button:hover {
  background-color: #c92f3b;
}
```

3. Bootstrap version

```html
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">MyShop</a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#mainNavbar"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="mainNavbar">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#">Trang chủ</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Sản phẩm</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Giới thiệu</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Liên hệ</a></li>
      </ul>
    </div>
  </div>
</nav>
```

Product card bằng Bootstrap

```html
<div class="card shadow" style="width: 18rem;">
  <img
    src="https://via.placeholder.com/300x200"
    class="card-img-top"
    alt="Product"
  />

  <div class="card-body">
    <h5 class="card-title">Áo thun nam</h5>
    <p class="card-text">
      Áo thun chất liệu cotton, thoáng mát, phù hợp mặc hằng ngày.
    </p>
    <p class="text-danger fw-bold">199.000đ</p>
    <a href="#" class="btn btn-danger w-100">Mua ngay</a>
  </div>
</div>
```

    4. So sánh CSS thuần và Bootstrap

| Tiêu chí             | CSS thuần                                                  | Bootstrap                                       |
| -------------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| Số dòng CSS cần viết | Nhiều hơn, khoảng 70 - 100 dòng cho navbar + card          | Ít hơn, gần như không cần viết CSS riêng        |
| Thời gian phát triển | Lâu hơn vì phải tự viết layout, responsive, hover, spacing | Nhanh hơn vì Bootstrap có sẵn class             |
| Khả năng tùy biến    | Cao, muốn sửa gì cũng được                                 | Nhanh nhưng bị phụ thuộc vào class có sẵn       |
| Responsive           | Phải tự viết media query                                   | Có sẵn grid, navbar responsive, breakpoint      |
| Độ đồng bộ giao diện | Phụ thuộc vào người viết CSS                               | Đồng bộ hơn vì Bootstrap có hệ thống design sẵn |
| Dễ học ban đầu       | Dễ hiểu bản chất CSS hơn                                   | Cần nhớ nhiều class Bootstrap                   |
| Phù hợp với dự án    | Dự án cần giao diện riêng, độc đáo                         | Dự án cần làm nhanh, layout phổ biến            |

5. Khi nào NÊN dùng Bootstrap?

Nên dùng Bootstrap khi:

Cần làm website nhanh

Làm bài tập, demo, prototype

Giao diện không yêu cầu quá độc đáo

Muốn responsive nhanh

Cần các component có sẵn như navbar, modal, card, carousel, form

Làm admin dashboard hoặc trang quản lý

6. Khi nào KHÔNG NÊN dùng Bootstrap?

Không nên dùng Bootstrap khi:

Website cần thiết kế rất riêng

Muốn tối ưu dung lượng CSS

Không muốn phụ thuộc framework

Dự án nhỏ chỉ cần vài dòng CSS

Muốn luyện CSS thuần để hiểu bản chất

Giao diện cần animation hoặc layout phức tạp riêng

.
