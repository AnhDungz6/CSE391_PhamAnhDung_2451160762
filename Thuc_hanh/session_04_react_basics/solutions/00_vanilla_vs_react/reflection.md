# Reflection — DOM thuần vs React

## 1. Ở Phần A, mỗi lần thêm/xóa/toggle 1 todo, bạn phải gọi bao nhiêu hàm? Liệt kê.

Ở Phần A, mỗi lần thao tác với todo thì phải gọi hàm xử lý tương ứng, sau đó phải gọi thêm `renderTodos()` để cập nhật lại giao diện.

Cụ thể:

- Khi thêm todo:
  - Gọi `addTodo()`
  - Trong `addTodo()` gọi tiếp `renderTodos()`

- Khi toggle todo:
  - Gọi `toggleTodo(id)`
  - Trong `toggleTodo(id)` gọi tiếp `renderTodos()`

- Khi xóa todo:
  - Gọi `deleteTodo(id)`
  - Trong `deleteTodo(id)` gọi tiếp `renderTodos()`

Như vậy, mỗi thao tác thường phải gọi 2 hàm: hàm xử lý dữ liệu và hàm render lại giao diện.

---

## 2. Ở Phần B, khi `setTodos(...)` chạy, React tự động làm gì giúp bạn?

Khi `setTodos(...)` chạy, React sẽ tự động cập nhật state mới cho danh sách `todos`.

Sau đó React tự render lại component `TodoApp`, so sánh giao diện cũ và giao diện mới, rồi cập nhật phần DOM cần thay đổi trên trình duyệt.

Nhờ vậy, em không cần tự dùng `document.getElementById`, không cần tự gán `innerHTML`, và cũng không cần tự gọi hàm render thủ công như ở Vanilla JS.

---

## 3. Nếu Portfolio của Minh có 50 project, cách nào quản lý danh sách an toàn hơn? Tại sao?

Nếu Portfolio của Minh có 50 project thì dùng React sẽ an toàn hơn.

Lý do là vì React quản lý dữ liệu bằng state. Khi danh sách project thay đổi, em chỉ cần cập nhật state bằng `setProjects(...)`, sau đó React tự động render lại giao diện.

Cách này an toàn hơn vì:

- Không phải sửa DOM thủ công.
- Ít bị quên render lại giao diện.
- Code dễ đọc và dễ bảo trì hơn.
- Khi danh sách nhiều project, việc thêm, xóa, lọc, hiển thị sẽ rõ ràng hơn.
- Dữ liệu và giao diện được đồng bộ tốt hơn.

---

## 4. Kết nối Portfolio: Tưởng tượng `ProjectCard` thay cho `TodoItem` — mỗi project cũng cần hiển thị, lọc theo category, xóa bỏ. Bạn thấy `useState` + `.map()` + `.filter()` sẽ áp dụng như thế nào cho Portfolio?

Trong Portfolio, em có thể dùng `useState` để lưu danh sách project.

Ví dụ:

```js
const [projects, setProjects] = useState([]);
```

Để hiển thị danh sách project, em dùng .map():

{projects.map((project) => (
<ProjectCard key={project.id} project={project} />
))}

Để lọc project theo category, em dùng .filter():

```js
const webProjects = projects.filter((project) => project.category === "Web");
```

Để xóa một project, em cũng dùng .filter():

```js
setProjects(projects.filter((project) => project.id !== id));
```

Như vậy, useState dùng để quản lý dữ liệu project, .map() dùng để render danh sách project ra giao diện, còn .filter() dùng để lọc hoặc xóa project.

Cách làm này giống Todo List, chỉ khác là thay TodoItem bằng ProjectCard.
