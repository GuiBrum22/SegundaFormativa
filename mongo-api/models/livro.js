const { ObjectId } = require('mongodb');
const db = require('../config/database');

class Livro {
    constructor() {
        this.collection = db.connect().then(database => database.collection('livros'));
    }

    async create(livro) {
        const collection = await this.collection;
        const resultado = await collection.insertOne(livro);
        return resultado.ops[0];
    }

    async findAll() {
        const collection = await this.collection;
        return collection.find().toArray();
    }

    async findById(id) {
        const collection = await this.collection;
        return collection.findOne({ _id: new ObjectId(id) });
    }

    async updateById(id, dadosAtualizados) {
        const collection = await this.collection;
        const resultado = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: dadosAtualizados }
        );
        return resultado.matchedCount > 0;
    }

    async deleteById(id) {
        const collection = await this.collection;
        const resultado = await collection.deleteOne({ _id: new ObjectId(id) });
        return resultado.deletedCount > 0;
    }
}

module.exports = new Livro();
