const express = require('express');
const invidualKoiController = require('../controllers/InvidualKoiController');

const router = express.Router();

// Định nghĩa các route
router.get('/get',invidualKoiController.getAllKoiFish);
router.get('/get/:id', invidualKoiController.getKoiFishById);
router.post('/create', invidualKoiController.createKoiFish);
router.put('/update/:id',invidualKoiController.updateKoiFish);
router.delete('/delete/:id', invidualKoiController.deleteKoiFish)



module.exports = router;

