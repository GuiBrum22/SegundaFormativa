const express = require('express');
const LivrosController = require('../controllers/livrosController');

const router = express.Router();

router.post('/livros', LivrosController.create);
router.get('/livros', LivrosController.findAll);
router.get('/livros/:id', LivrosController.findById);
router.put('/livros/:id', LivrosController.update);
router.delete('/livros/:id', LivrosController.delete);

module.exports = router;
