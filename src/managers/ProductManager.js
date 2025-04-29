const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.productsFilePath = path.join(__dirname, '../data/products.json'); // Ruta absoluta al archivo
    }

    // Método para leer productos del archivo
    async getProducts() {
        try {
            if (fs.existsSync(this.productsFilePath)) {
                const data = await fs.promises.readFile(this.productsFilePath, 'utf-8');
                return JSON.parse(data);
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error leyendo los productos:', error);
            return [];
        }
    }

    // Método para guardar productos
    async saveProducts(products) {
        try {
            await fs.promises.writeFile(this.productsFilePath, JSON.stringify(products, null, 2));
        } catch (error) {
            console.error('Error guardando los productos:', error);
        }
    }

    // Método para agregar un producto nuevo
    async addProduct(productData) {
        try {
            const products = await this.getProducts();

            // Generar un ID
            const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            const newProduct = {
                id: newId,
                status: true,
                ...productData,
            };

            products.push(newProduct);
            await this.saveProducts(products);
            return newProduct;
        } catch (error) {
            console.error('Error agregando el producto:', error);
            return null;
        }
    }

    // Método para obtener un producto por ID
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            return products.find(product => product.id === id);
        } catch (error) {
            console.error('Error obteniendo el producto por ID:', error);
            return null;
        }
    }

    // Método para actualizar un producto
    async updateProduct(id, updateData) {
        try {
            const products = await this.getProducts();
            const index = products.findIndex(product => product.id === id);

            if (index === -1) {
                return null;
            }

            // No permitir cambiar el ID
            products[index] = { ...products[index], ...updateData, id };
            await this.saveProducts(products);
            return products[index];
        } catch (error) {
            console.error('Error actualizando el producto:', error);
            return null;
        }
    }

    // Método para eliminar un producto
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const newProducts = products.filter(product => product.id !== id);

            if (products.length === newProducts.length) {
                return false;
            }

            await this.saveProducts(newProducts);
            return true;
        } catch (error) {
            console.error('Error eliminando el producto:', error);
            return false;
        }
    }
}

module.exports = ProductManager;

