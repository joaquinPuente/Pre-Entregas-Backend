import { Router } from 'express';
import ProductManager from '../ProductManager.js';
import CartManager from '../CartManager.js';
import express from 'express';

const cartRouter = Router();
cartRouter.use(express.json());

const cartManager = new CartManager('C:/Users/JPUENTE/Desktop/primerPreEntrega/src/carrito.json');
const productManager = new ProductManager('C:/Users/JPUENTE/Desktop/primerPreEntrega/src/product.json');

cartRouter.post('/', (req, res) => {
  try {
    let iD = cartManager.createID();
    const cart = {
      id: iD,
      products: []
    };
    cartManager.addCart(cart)
    res.status(201).json({ success: true, message: 'Nuevo carrito creado', cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

cartRouter.get('/:cid', (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = cartManager.getCartById(cid);
    if (cart) {
      res.json({ products: cart.products });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

cartRouter.post('/:cid/product/:pid', (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    let quantity = 1;

    const cart = cartManager.getCartById(cid);
    console.log("este es el cart",cart)
    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado' });
      return;
    }

    const product = productManager.getProductsByID(pid);
    console.log(product)
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const existingProduct = cart.products.find((item) => item.product === pid);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({
        product: pid,
        quantity
      });
    }

    cartManager.updateCart(cart);

    res.status(201).json({ success: true, message: `Producto ${pid} agregado al carrito ${cid}`, cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default cartRouter;



