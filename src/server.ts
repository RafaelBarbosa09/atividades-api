import express from 'express';
import { uuid } from 'uuidv4';
import RabbitmqServer from './rabbitmq-server';
import ActivityRepository from './repositories/impl/ActivityRepository';
import ActivityService from './services/ActivityService';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello atividades!' });
});

const activityService = new ActivityService(new ActivityRepository());

app.post('/atividades', async (req, res) => {
    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672')
    await server.start();
    await server.publishInQueue('atividades', JSON.stringify(req.body));

    res.json({ message: 'Atividade criada!' });
});

app.post('/activity/', async (req, res) => {
    const {
        idStudent,
        idSubject,
        question,
        answer
    } = req.body;

    const activity = {
        id: uuid(),
        idStudent,
        idSubject,
        deadline: new Date(),
        question,
        answer,
        submissionDate: new Date()
    };

    const activityCreated = await activityService.createActivity(activity);
    res.json(activityCreated);
});

app.get('/activities', async (req, res) => {
    const activities = await activityService.getAll();
    res.json(activities);
});

app.listen(3000, () => {
    console.log('atividades-api iniciado na porta 3000 🚀🚀🚀');
});