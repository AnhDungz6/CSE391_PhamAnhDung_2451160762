class TodoApp {
  constructor() {
    this.todos = [];
    this.currentFilter = "all";
    this.isEditing = null;

    // DOM Elements
    this.todoInput = document.getElementById("todoInput");
    this.addBtn = document.getElementById("addBtn");
    this.todoList = document.getElementById("todoList");
    this.itemsLeft = document.getElementById("itemsLeft");
    this.filterBtns = document.querySelectorAll(".filter-btn");
    this.clearCompletedBtn = document.getElementById("clearCompleted");

    // Initialize
    this.loadFromLocalStorage();
    this.render();
    this.attachEventListeners();
  }

  // ========== EVENT LISTENERS ==========
  attachEventListeners() {
    // Add todo
    this.addBtn.addEventListener("click", () => this.addTodo());
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTodo();
    });

    // Filter buttons
    this.filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.setFilter(e.target.dataset.filter),
      );
    });

    // Clear completed
    this.clearCompletedBtn.addEventListener("click", () =>
      this.clearCompleted(),
    );

    // Event delegation for todo list
    this.todoList.addEventListener("click", (e) => this.handleTodoListClick(e));
    this.todoList.addEventListener("dblclick", (e) =>
      this.handleTodoListDoubleClick(e),
    );
  }

  // ========== EVENT DELEGATION ==========
  handleTodoListClick(e) {
    const todoItem = e.target.closest(".todo-item");
    if (!todoItem) return;

    // Toggle completed on checkbox circle or text click
    if (
      e.target.classList.contains("check-circle") ||
      e.target.classList.contains("todo-text")
    ) {
      const id = parseInt(todoItem.dataset.id);
      this.toggleCompleted(id);
    }

    // Delete button
    if (e.target.classList.contains("delete-btn")) {
      const id = parseInt(todoItem.dataset.id);
      this.deleteTodo(id);
    }
  }

  handleTodoListDoubleClick(e) {
    if (e.target.classList.contains("todo-text")) {
      const todoItem = e.target.closest(".todo-item");
      const id = parseInt(todoItem.dataset.id);
      this.startEdit(id);
    }
  }

  // ========== TODO OPERATIONS ==========
  addTodo() {
    const text = this.todoInput.value.trim();
    if (!text) return;

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    this.todos.unshift(todo);
    this.todoInput.value = "";
    this.saveToLocalStorage();
    this.render();
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
    this.render();
  }

  toggleCompleted(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
      this.render();
    }
  }

  startEdit(id) {
    if (this.isEditing) return;
    this.isEditing = id;

    const todo = this.todos.find((t) => t.id === id);
    const todoItem = document.querySelector(`[data-id="${id}"]`);
    const todoText = todoItem.querySelector(".todo-text");

    // Create edit input
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = todo.text;

    // Replace text with input
    todoText.replaceWith(editInput);
    editInput.focus();
    editInput.select();

    // Save on Enter or blur
    const saveEdit = () => {
      const newText = editInput.value.trim();
      if (newText) {
        todo.text = newText;
      }
      this.isEditing = null;
      this.saveToLocalStorage();
      this.render();
    };

    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") saveEdit();
    });

    editInput.addEventListener("blur", saveEdit);
  }

  clearCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveToLocalStorage();
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;

    // Update active button
    this.filterBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter);
    });

    this.render();
  }

  // ========== FILTERING ==========
  getFilteredTodos() {
    if (this.currentFilter === "all") return this.todos;
    if (this.currentFilter === "active")
      return this.todos.filter((t) => !t.completed);
    if (this.currentFilter === "completed")
      return this.todos.filter((t) => t.completed);
    return this.todos;
  }

  // ========== RENDERING ==========
  render() {
    this.renderTodos();
    this.updateItemsLeft();
  }

  renderTodos() {
    // Clear list
    this.todoList.innerHTML = "";

    const filteredTodos = this.getFilteredTodos();

    filteredTodos.forEach((todo) => {
      const todoItem = this.createTodoElement(todo);
      this.todoList.appendChild(todoItem);
    });
  }

  createTodoElement(todo) {
    // Create main li element
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;
    li.dataset.id = todo.id;

    // Create checkbox circle
    const checkCircle = document.createElement("div");
    checkCircle.className = "check-circle";

    // Create todo text
    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.setAttribute("aria-label", "Delete todo");

    // Append all to li
    li.appendChild(checkCircle);
    li.appendChild(todoText);
    li.appendChild(deleteBtn);

    return li;
  }

  updateItemsLeft() {
    const activeCount = this.todos.filter((todo) => !todo.completed).length;
    const itemText = activeCount === 1 ? "item" : "items";
    this.itemsLeft.textContent = `${activeCount} ${itemText} left`;
  }

  // ========== LOCAL STORAGE ==========
  saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  loadFromLocalStorage() {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        this.todos = JSON.parse(saved);
      } catch (e) {
        this.todos = [];
      }
    }
  }
}

// ========== INITIALIZE APP ==========
document.addEventListener("DOMContentLoaded", () => {
  new TodoApp();
});
