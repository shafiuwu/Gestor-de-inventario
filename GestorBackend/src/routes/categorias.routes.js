const { Router } = require('express');
const {
    allCategories,
    createCategorie,
    deleteCategoria,
    updatedCategoria
} = require('../controllers/categorias.controller');

const router = Router();

router.get('/categorias', allCategories);
router.post('/categorias', createCategorie); 
router.delete('/categorias/:id', deleteCategoria);
router.put('/categorias/:id', updatedCategoria)

module.exports = router;