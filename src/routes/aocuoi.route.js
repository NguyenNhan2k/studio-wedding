const express = require('express');
const router = express.Router();
const { AocuoiController } = require('../controllers');
router.get('/', AocuoiController.index);
router.get('/detail/:id', AocuoiController.detail);
module.exports = router;
