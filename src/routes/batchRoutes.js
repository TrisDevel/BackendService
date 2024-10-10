const express = require('express');
const batchKoiController = require('../controllers/BatchKoiController');

const router = express.Router();

// Định nghĩa các route
router.get('/get', batchKoiController.getAllBatchKoiFish);
router.get('/:id', batchKoiController.getBatchKoiFishById);
router.post('/create', batchKoiController.createBatchKoiFish);
router.put('/update/:id',batchKoiController.updateBatchKoiFish);
router.delete('/delete/:id', batchKoiController.deleteBatchKoiFish)




module.exports = router;

