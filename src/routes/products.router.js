const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

//para inciar el manager

const productManager = new ProductManager();

//para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

//para obtener un producto por id
router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const product = await productManager.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

//crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnail } = req.body;

        //validacion de los datos
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        const newProduct = await productManager.addProduct({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail: thumbnail || [],
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

//actualizar un producto por id
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updateData = req.body;
        const updatedProduct = await productManager.updateProduct(id, updateData);
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado para ser actualizado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});

//eliminar un producto.
router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid); 
        const deleted = await productManager.deleteProduct(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Producto no encontrado para ser eliminado' });
        }
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});

module.exports = router;
