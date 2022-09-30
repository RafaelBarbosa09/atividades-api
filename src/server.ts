import express from 'express';
import { uuid } from 'uuidv4';
import RabbitmqServer from './rabbitmq-server';
import ActivityRepository from './repositories/impl/ActivityRepository';
import ActivityService from './services/ActivityService';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(bodyParser.json());

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

app.post('/activities/', async (req, res) => {
    const {
        idStudent,
        idCourse,
        deadline,
        question
    } = req.body;

    const deadlineFromDate: Date = new Date(deadline);

    const activity = {
        id: uuid(),
        idStudent,
        idCourse,
        deadline: deadlineFromDate,
        question,
        answer: null,
        submissionDate: null
    };

    const activityCreated = await activityService.createActivity(activity);
    res.status(201).json(activityCreated);
});

app.get('/activities', async (req, res) => {
    const activities = await activityService.getAll();
    res.json(activities);
});

app.listen(3000, () => {
    console.log('atividades-api iniciado na porta 3000 🚀🚀🚀');
});