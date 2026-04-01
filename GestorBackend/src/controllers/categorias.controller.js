const db = require('../db');
const { v4: uuidv4 } = require('uuid');

//Obtener categorias
const allCategories = async (req, res, next) => {    
    try {
        const allCategories = await db.query('SELECT * FROM categorias WHERE activo = true  ;');
        res.json(allCategories.rows);
    } catch (error) {
        next(error);
    }
};

//hacer para obtener categoria en especifico

const createCategorie = async (req, res, next) => {
    const idnueva = uuidv4();
    const { nombre } = req.body;
    
    try {
        await db.query(
            'INSERT INTO categorias (id, nombre) VALUES ($1, $2)', 
            [idnueva, nombre]
        );

        res.status(201).json({ 
            mensaje: "Categoria registrada", 
            id: idnueva 
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("error en el servidor");
    }
};


//eliminar categorias
const deleteCategoria = async (req, res, next) => {
    try {
        const { id } = req.params; 

        const checkQuery = 'SELECT COUNT(*) FROM productos WHERE categoria_id = $1 AND activo = true';
        const checkResultado = await db.query(checkQuery, [id]);
        
        const cantidadProductos = parseInt(checkResultado.rows[0].count);

        if (cantidadProductos > 0) {
            return res.status(400).json({ 
                message: `No se puede eliminar: existen ${cantidadProductos} productos asociados a esta categoría.` 
            });
        }
        const query = 'UPDATE categorias SET activo = false WHERE id = $1 RETURNING *';
        const resultado = await db.query(query, [id]); 

        if (resultado.rowCount === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        return res.status(200).json({
            message: 'Categoría desactivada correctamente',
            id: id
        });
    } catch (error) {
        next(error);
    }
};

const updatedCategoria = async (req, res, next) => {
    try{
        const { id } = req.params; 
        const {nombre } = req.body; 

        const resultado = await db.query(
            'UPDATE categorias SET nombre = $1 WHERE id = $2',
            [nombre, id]
        )
        if (resultado.rowCount === 0) {
            return res.status(404).json({
                message: 'Categoria no encontrada'
            });
        }

        return res.status(200).json({
            message: 'Categoria actualizada correctamente'
        });
    }catch{
        next(error);
    }
}


module.exports = {
    allCategories,
    createCategorie,
    deleteCategoria,
    updatedCategoria
};