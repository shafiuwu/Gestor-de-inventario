const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const allMove = async (req, res, next) => {    
    try {
        const query = `SELECT m.*, p.nombre as nombre_producto
                       FROM movimientos m
                       INNER JOIN productos p 
                       ON m.producto_id = p.id
                       WHERE m.activo = true`
        const result = await db.query(query);
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
};

const createMovimiento = async (req, res, next) => {
    const { producto_id, tipo, cantidad } = req.body; 
    const id = uuidv4();

    try {
        await db.query('BEGIN');

        const qMov = 'INSERT INTO movimientos (id, producto_id, tipo, cantidad) VALUES ($1, $2, $3, $4) RETURNING *';
        const resMov = await db.query(qMov, [id, producto_id, tipo, cantidad]);

        const operador = (tipo === 'ENTRADA') ? '+' : '-';
        const qProd = `UPDATE productos SET stock_actual = stock_actual ${operador} $1 WHERE id = $2`;

        await db.query(qProd, [cantidad, producto_id]);

        await db.query('COMMIT');
        res.status(201).json(resMov.rows[0]);

    } catch (error) {
        await db.query('ROLLBACK');
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params; 
        
        const query = 'UPDATE movimientos SET activo = false WHERE id = $1 RETURNING *';
        const resultado = await db.query(query, [id]); 

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Movimiento no encontrado' });
        }

        return res.status(200).json({
            message: 'Movimiento desactivado correctamente',
            id: id
        });
    } catch (error) {
        next(error);
    }
};

const updateMovimiento = async (req, res, next) => {
    const { id } = req.params;
    const { nueva_cantidad } = req.body;

    try {
        await db.query('BEGIN');
        const movOriginal = await db.query('SELECT * FROM movimientos WHERE id = $1', [id]);
        if (movOriginal.rowCount === 0) throw new Error("Movimiento no encontrado");
        
        const { producto_id, tipo, cantidad, activo } = movOriginal.rows[0];
        if (!activo) throw new Error("No puedes editar un movimiento ya anulado");

        const opReverso = (tipo === 'ENTRADA') ? '-' : '+';
        await db.query(`UPDATE productos SET stock_actual = stock_actual ${opReverso} $1 WHERE id = $2`, [cantidad, producto_id]);

        const opNuevo = (tipo === 'ENTRADA') ? '+' : '-';
        await db.query(`UPDATE productos SET stock_actual = stock_actual ${opNuevo} $1 WHERE id = $2`, [nueva_cantidad, producto_id]);

        await db.query('UPDATE movimientos SET cantidad = $1 WHERE id = $2', [nueva_cantidad, id]);

        await db.query('COMMIT');
        res.json({ message: "Historial actualizado y stock recalculado" });

    } catch (error) {
        await db.query('ROLLBACK');
        next(error);
    }
};

module.exports = {
    allMove,
    createMovimiento,
    deleteProduct,
    updateMovimiento
};