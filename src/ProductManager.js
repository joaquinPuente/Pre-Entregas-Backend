import fs from 'fs';

class ProductManager {
 
    constructor (filename) {
        this.filename = filename;
        this.format = 'utf-8';
        this.ultID = 0;
        this.path = './product.json'
    }

    createID () {
        this.ultID++;
        return this.ultID;
    }

    addProducts = async (title, description, price, thumbnail, code, stock,category) => {
        const list = await this.getProducts();
        const productID = list.length > 0 ? list[list.length - 1].id + 1 : 1;
    
        const newProduct = {
            id: productID,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: true,
            category: category
        };
    
        list.push(newProduct);
        await fs.promises.writeFile(this.filename, JSON.stringify(list));
    };


    
    getProducts = async () => {
    try {
      //Leer el archivo
      const data = await fs.promises.readFile(this.filename, this.format);
      const dataObj = JSON.parse(data);

      return dataObj;
    } 
    catch (err) {
      //Sino existe el archivo
      console.log(`Error: ${err}`);
      return [];
    }
    };

    getProductsByID = async (id) => {
        try {
          const data = await fs.promises.readFile(this.filename, this.format);
          const products = JSON.parse(data);
      
          const product = products.find((product) => product.id === id);
      
          if (product) {
            return product;
          } else {
            console.log("ID no encontrado");
            return null;
          }
        } catch (err) {
          console.log(`Error: ${err}`);
          return null;
        }
      };
      

    updateProduct = async (id, title, description, price, thumbnail, code, stock,category ) => {
        try {
            const products = await this.getProducts();
    
            // Buscar el producto por su ID
            const index = products.findIndex(product => product.id === id);
    
            if (index !== -1) {
                // Actualizar las propiedades del producto
                products[index] = {...products[index],...{title, description, price, thumbnail, code, stock,category}};
    
                // Guardar la lista de productos actualizada en el archivo
                await fs.promises.writeFile(this.filename, JSON.stringify(products));
    
                console.log('Producto actualizado exitosamente.');
            } else {
                console.log('ID de producto no encontrado.');
            }
        } 
        catch (err) {
            console.log(`Error: ${err}`);
        }
    };

    deleteProductByID = async (id) => {
        try {
          let products = await this.getProducts();
      
          // Buscar el índice del producto con el ID dado en la lista de productos
          const index = products.findIndex(product => product.id === id);
      
          if (index !== -1) {
            // Eliminar el producto de la lista
            products.splice(index, 1);
      
            // Guardar la lista de productos actualizada en el archivo
            await fs.promises.writeFile(this.filename, JSON.stringify(products));
      
            console.log(`Producto con ID ${id} eliminado exitosamente.`);
      
            return true;
          } else {
            console.log(`Producto con ID ${id} no encontrado.`);
            return false;
          }
        } catch (err) {
          console.log(`Error: ${err}`);
          return false;
        }
    };

}

export default ProductManager