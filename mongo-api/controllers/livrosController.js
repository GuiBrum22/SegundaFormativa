const Livro = require('../models/livro');

class LivrosController {
    async create(req, res) {
        try {
            const novoLivro = req.body;
            const livroCriado = await Livro.create(novoLivro);
            res.status(201).send(livroCriado);
        } catch (error) {
            res.status(500).send({ message: 'Erro ao criar livro', error });
        }
    }

    async findAll(res) {
        try {
            const livros = await Livro.findAll();
            res.send(livros);
        } catch (error) {
            res.status(500).send({ message: 'Erro ao buscar livros', error });
        }
    }

    async findById(req, res) {
        try {
            const id = req.params.id;
            const livro = await Livro.findById(id);
            if (livro) {
                res.send(livro);
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao buscar livro', error });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const dadosAtualizados = req.body;
            const atualizado = await Livro.updateById(id, dadosAtualizados);
            if (atualizado) {
                res.send({ message: 'Livro atualizado' });
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao atualizar livro', error });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletado = await Livro.deleteById(id);
            if (deletado) {
                res.send({ message: 'Livro deletado' });
            } else {
                res.status(404).send({ message: 'Livro não encontrado' });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao deletar livro', error });
        }
    }
}

module.exports = new LivrosController();
