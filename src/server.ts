import express from 'express';
import RabbitmqServer from './rabbitmq-server';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello atividades!' });
});

app.post('/atividades', async (req, res) => {
    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672')
    await server.start();
    await server.publishInQueue('atividades', JSON.stringify(req.body));

    res.json({ message: 'Atividade criada!' });
});

app.listen(3000, () => {
    console.log('atividades-api iniciado na porta 3000 🚀🚀🚀');
});