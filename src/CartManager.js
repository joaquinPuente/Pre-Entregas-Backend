import fs from 'fs';

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  createID() {
    const data = this.readData();
    const lastID = data.length > 0 ? data[data.length - 1].id : 0;
    const id = lastID + 1;
    return id;
  }

  readData() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  writeData(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(this.filePath, jsonData, 'utf8');
  }

  addCart(cartObj) {
    const data = this.readData();
    console.log("data",data)
    data.push(cartObj);
    this.writeData(data);
  }

  getCartById(cartId) {
    const data = this.readData();
    const parsedCartId = parseInt(cartId);
    return data.find(cart => cart.id === parsedCartId);
  }

  updateCart(cart) {
    const data = this.readData();
    const index = data.findIndex(item => item.id === cart.id);
    if (index !== -1) {
      data[index] = cart;
      this.writeData(data);
    }
  }
}

export default CartManager;
