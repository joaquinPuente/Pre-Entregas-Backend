import Express from "express";
import cartRouter from "./router/cartRouter.js";
import productRouter from "./router/productRouter.js"

const app = Express();
app.use(Express.json())

app.get('/h', (req, res) => {
  res.send(`<h1>Esta es la página principal</h1>`);
});

app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

app.listen(8080);

//RUTAS PARA POSTMAN

//PRODUCTS

//127.0.0.1:8080/api/products (GET)
//127.0.0.1:8080/api/products/3 (GET FOR ID)
//127.0.0.1:8080/api/products/  (POST: {"title": "Prueba3Post","description": "Descripción del nuevo producto","price": 1000,"thumbnail": "ruta/imagen.jpg","code": "ABC100","stock": 10,"category":"urbanas"} )
//127.0.0.1:8080/api/products/delete/13 (DELETE FOR ID)
//127.0.0.1:8080/products/put/12 (PUT FOR ID: {"title": "Prueba2Put","description": "Descripción del nuevo producto","price": 1000,"thumbnail": "ruta/imagen.jpg","code": "ABC100","stock": 10,"category":"urbanas"} )

//CARTS

//127.0.0.1:8080/api/carts/ (POST)
//127.0.0.1:8080/api/carts/2 (GET)
//127.0.0.1:8080/api/carts/2/product/3 (POST)


