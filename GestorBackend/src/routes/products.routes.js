const { Router } = require('express');
const {allProducts,
    createProducts,
    deleteProduct,
    updatedProduct,
    getStockPorCategoria
} = require('../controllers/productos.controller');


const router = Router();

router.get('/productos', allProducts);
router.get('/productosPorCategoria', getStockPorCategoria);
router.post('/productos', createProducts); 
router.delete('/productos/:id', deleteProduct);
router.put('/productos/:id', updatedProduct);

module.exports = router;