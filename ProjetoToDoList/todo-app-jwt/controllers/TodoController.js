import Todo from "@/models/Todo";
import connectMongo from "@/utils/dbConnect";


//carregar Todos
export const getTodos = async (req, res) => {
    await connectMongo();
    try {
        const todos = await Todo.find({ UserId: req.user.userId });
        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ error });
    }
}


//Criar Tarefa
export const addTodo = async (req, res) => {
    const { title } = req.body;
    await connectMongo();
    try {
        const newTodo = new Todo({
            title,
            userId: req.user.userId, // Associa a tarefa ao usuário logado
        });
        await newTodo.save();
        res.status(201).json({ todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar tarefa' });
    }
};


//Atualizar Tarefa
export const updateTodo = async (req, res) => {
    const { id } = req.query;
    const data = req.body;
    await connectMongo();


    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: id, userId: req.user.userId},
            { data },
            { new: true }
        );
        if (!updatedTodo) return res.status(404).json({
            message: 'Tarefa não encontrada'
        });
        res.status(200).json({ todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
};


// delete Tarefa
export const deleteTodo = async (req, res) => {
    const { id } = req.query;
    await connectMongo();


    try {
        const deletedTodo = await Todo.findOneAndDelete({
            _id: id, userId: req.user.userId
        });
        if (!deletedTodo) return res.status(404).json({
            message: 'Tarefa não encontrada'
        });
        res.status(200).json({
            message: 'Tarefa deletada com sucesso'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao deletar tarefa'
        });
    }
};