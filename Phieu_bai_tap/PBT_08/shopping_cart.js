function createCart() {
  // Private data
  let items = [];
  let discount = {
    type: null,
    value: 0,
  };

  return {
    // Thêm sản phẩm
    addItem(product, quantity = 1) {
      const existingItem = items.find(function (item) {
        return item.id === product.id;
      });

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({
          ...product,
          quantity: quantity,
        });
      }
    },

    // Xóa sản phẩm theo id
    removeItem(productId) {
      items = items.filter(function (item) {
        return item.id !== productId;
      });
    },

    // Cập nhật số lượng
    updateQuantity(productId, newQuantity) {
      const item = items.find(function (item) {
        return item.id === productId;
      });

      if (item) {
        if (newQuantity <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = newQuantity;
        }
      }
    },

    // Tính tổng tiền
    getTotal() {
      let total = items.reduce(function (sum, item) {
        return sum + item.price * item.quantity;
      }, 0);

      // Giảm theo %
      if (discount.type === "percent") {
        total = total - total * discount.value;
      }

      // Giảm tiền trực tiếp
      if (discount.type === "fixed") {
        total = total - discount.value;
      }

      return total;
    },

    // Áp dụng mã giảm giá
    applyDiscount(code) {
      switch (code) {
        case "SALE10":
          discount = {
            type: "percent",
            value: 0.1,
          };
          console.log("Áp dụng giảm giá 10%");
          break;

        case "SALE20":
          discount = {
            type: "percent",
            value: 0.2,
          };
          console.log("Áp dụng giảm giá 20%");
          break;

        case "FREESHIP":
          discount = {
            type: "fixed",
            value: 30000,
          };
          console.log("Áp dụng mã FREESHIP");
          break;

        default:
          console.log("Mã giảm giá không hợp lệ");
      }
    },

    // In giỏ hàng
    printCart() {
      console.log("\n=== SHOPPING CART ===");

      const tableData = items.map(function (item, index) {
        return {
          "#": index + 1,
          "Sản phẩm": item.name,
          SL: item.quantity,
          "Đơn giá": item.price.toLocaleString("vi-VN") + "đ",
          Tổng: (item.price * item.quantity).toLocaleString("vi-VN") + "đ",
        };
      });

      console.table(tableData);

      console.log("Tổng cộng:", this.getTotal().toLocaleString("vi-VN") + "đ");
    },

    // Tổng số sản phẩm
    getItemCount() {
      return items.reduce(function (total, item) {
        return total + item.quantity;
      }, 0);
    },

    // Xóa toàn bộ giỏ hàng
    clearCart() {
      items = [];
      discount = {
        type: null,
        value: 0,
      };

      console.log("Đã xóa toàn bộ giỏ hàng");
    },
  };
}

// === TEST ===

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

// In giỏ hàng
cart.printCart();

// Áp dụng mã giảm giá
cart.applyDiscount("SALE10");

cart.printCart();

// Tổng số sản phẩm
console.log("Số SP:", cart.getItemCount());

// Xóa sản phẩm
cart.removeItem(3);

console.log("Sau xóa:", cart.getItemCount());

// Cập nhật số lượng
cart.updateQuantity(1, 5);

cart.printCart();

// Xóa toàn bộ
cart.clearCart();

cart.printCart();
