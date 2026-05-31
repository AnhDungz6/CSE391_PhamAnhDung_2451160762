function createCart() {
  let items = [];
  return {
    addItem(name, price) {
      items.push({ name, price });
      console.log(`Đã thêm: ${name} - ${price}đ`);
    },
    removeItem(name) {
      items = items.filter((item) => item.name !== name);
      console.log(`Đã xóa: ${name}`);
    },
    getTotal() {
      return items.reduce((sum, item) => sum + item.price, 0);
    },
    printCart() {
      console.log("===== GIỎ HÀNG =====");
      if (items.length === 0) {
        console.log("Giỏ hàng đang trống");
        return;
      }
      items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - ${item.price}đ`);
      });
      console.log("Tổng tiền:", this.getTotal() + "đ");
    },
  };
}

const cart = createCart();
cart.addItem("Áo thun", 120000);
cart.addItem("Quần jean", 300000);
cart.addItem("Giày sneaker", 500000);
cart.printCart();
console.log("Tổng tiền hiện tại:", cart.getTotal() + "đ");

cart.removeItem("Quần jean");
cart.printCart();
console.log("Tổng tiền sau khi xóa:", cart.getTotal() + "đ");

console.log(cart.items);
