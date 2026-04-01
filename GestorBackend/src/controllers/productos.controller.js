const db = require('../db');
const { v4: uuidv4 } = require('uuid');
const generateSKU = require('../utils/skuGenerator');

// En tu controlador de obtener productos
const allProducts = async (req, res) => {
    const query = `
            SELECT 
                p.*, 
                c.nombre AS categoria_nombre 
            FROM productos p
            INNER JOIN categorias c ON p.categoria_id = c.id
            WHERE p.activo = true AND c.activo = true
            ORDER BY p.id ASC
        `;
    const result = await db.query(query);
    res.json(result.rows);
};

const getStockPorCategoria = async (req, res) => {
  const query = `
    SELECT c.nombre, SUM(p.stock_actual) as stock
    FROM productos p
    INNER JOIN categorias c ON p.categoria_id = c.id
    GROUP BY c.nombre;
  `;
  const result = await db.query(query);
  res.json(result.rows);
};

const createProducts = async (req, res, next) => {
    const idnueva = uuidv4();
    const { nombre, stock_actual, precio_venta, categoria_id, marca } = req.body;

    try {
        const catResult = await db.query('SELECT nombre FROM categorias WHERE id = $1', [categoria_id]);
        
        if (catResult.rowCount === 0) {
            return res.status(404).json({ message: "La categoría seleccionada no existe" });
        }

        const categoriaNombre = catResult.rows[0].nombre;

        const skuFinal = generateSKU(categoriaNombre, nombre, marca);
        await db.query(
            'INSERT INTO productos (id, nombre, sku, stock_actual, precio_venta, categoria_id, marca) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
            [idnueva, nombre, skuFinal, stock_actual, precio_venta, categoria_id, marca]
        );

        res.status(201).json({ 
            mensaje: "Producto registrado", 
            id: idnueva,
            sku: skuFinal
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("error en el servidor");
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params; 
        
        const query = 'UPDATE productos SET activo = false WHERE id = $1 RETURNING *';
        const resultado = await db.query(query, [id]); 

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrada' });
        }

        return res.status(200).json({
            message: 'Producto desactivado correctamente',
            id: id
        });
    } catch (error) {
        next(error);
    }
};

const updatedProduct = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const { nombre, stock_actual, precio_venta, marca, categoria_id } = req.body; 

        const catResult = await db.query('SELECT nombre FROM categorias WHERE id = $1', [categoria_id]);
        
        if (catResult.rowCount === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }
        
        const categoriaNombre = catResult.rows[0].nombre;
        const skuFinal = generateSKU(categoriaNombre, nombre, marca);

        const query = `
            UPDATE productos 
            SET nombre = $1, 
                stock_actual = $2, 
                precio_venta = $3, 
                marca = $4, 
                categoria_id = $5, 
                sku = $6
            WHERE id = $7
            RETURNING *;
        `;

        const resultado = await db.query(query, 
            [nombre, stock_actual, precio_venta, marca, categoria_id, skuFinal, id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json({
            message: 'Producto actualizado correctamente',
            producto: resultado.rows[0]
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    allProducts,
    createProducts,
    deleteProduct,
    updatedProduct,
    getStockPorCategoria
}