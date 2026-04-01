const { Router } = require('express');
const {
    allMove,
    createMovimiento,
    deleteProduct,
    updateMovimiento
} = require('../controllers/movimientos.controllers');

const router = Router();

router.get('/movimientos', allMove);
router.post('/movimientos', createMovimiento); 
router.delete('/movimientos/:id', deleteProduct); 
router.put('/movimientos/:id', updateMovimiento); 

module.exports = router;