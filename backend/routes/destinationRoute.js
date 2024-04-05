const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController');

router.post('/', destinationController.create);
router.get('/', destinationController.findAll);
router.get('/:id', destinationController.findOne);
router.put('/:id', destinationController.update);
router.delete('/:id', destinationController.delete);
router.get('/region/:regionName', destinationController.findByRegion);

module.exports = router;