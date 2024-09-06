const { MongoClient } = require('mongodb');

class Database {
    constructor() {
        this.uri = "mongodb://localhost:27017";
        this.client = new MongoClient(this.uri);
        this.dbName = 'biblioteca';
    }

    async connect() {
        try {
            // Conecte-se ao MongoDB se ainda não estiver conectado
            if (!this.client.topology || !this.client.topology.isConnected()) {
                await this.client.connect();
                console.log('Conectado ao MongoDB');
            }

            // Retorne a instância do banco de dados
            return this.client.db(this.dbName);
        } catch (err) {
            console.error('Erro ao conectar ao MongoDB:', err);
            throw err;
        }
    }

    async disconnect() {
        try {
            // Verifique se há uma conexão ativa e desconecte
            if (this.client.topology && this.client.topology.isConnected()) {
                await this.client.close();
                console.log('Desconectado do MongoDB');
            }
        } catch (err) {
            console.error('Erro ao desconectar do MongoDB:', err);
            throw err;
        }
    }
}

module.exports = new Database();
