import express from 'express';
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

const activityService = new ActivityService(new ActivityRepository());

/**
 * @summary Submete atividade para correção(envia para fila)
 */
app.post('/activities/send', async (req, res) => {
    const server = new RabbitmqServer('amqp://guest:guest@localhost:5672')
    await server.start();

    try {
        const activities = await activityService.findFinishedActivities();
        if (!activities) {
            throw new Error('Nenhuma atividade encontrada!');
        }

        await server.publishInQueue('atividades', JSON.stringify(activities));
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }


    res.json({ message: 'Atividades enviadas!' });
});

/**
 * @summary Cria uma atividade
 * @returns {Object} activity
 */
app.post('/activities/', async (req, res) => {
    const {
        idStudent,
        idCourse,
        deadline,
        question
    } = req.body;

    const deadlineFromDate: Date = new Date(deadline);

    const activity = {
        id: null,
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

/**
 * @param {string} idStudent
 * @returns {Array} activities
 * @summary retorna todas as atividades
 */
app.get('/activities', async (req, res) => {
    const activities = await activityService.getAll();
    res.json(activities);
});

/**
 * @param {string} id
 * @returns {Object} activity
 * @summary busca atividade por id
 */
app.get('/activities/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await activityService.findById(id);
        if (!activity) throw new Error('Atividade não encontrada');

        res.status(200).json(activity);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * @param {string} id
 * @returns {Object} activity
 * @summary submete atividade(responde a questão)
 */
app.put('/activities/:id', async (req, res) => {
    const { id } = req.params;
    const { answer } = req.body;

    try {
        const activity = await activityService.submitActivity(id, answer);
        if (!activity) throw new Error('Atividade não encontrada');

        res.json(activity);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
});

/**
 * @param {string} idStudent
 * @returns {Array} activities
 * @summary lista todas as atividades não finalizadas(não respondidas) de um aluno
 */
app.get('/activities/unfinished/:idStudent', async (req, res) => {
    const { idStudent } = req.params;
    const unfinishedActivities = await activityService.findUnfinishedActivitiesByStudent(idStudent);
    res.json(unfinishedActivities);
});

/**
 * @param {string} idStudent
 * @returns {Array} activities
 * @summary lista todas as atividades finalizadas(respondidas) de um aluno
 */
app.get('/activities/finished/:idStudent', async (req, res) => {
    const { idStudent } = req.params;
    const finishedActivities = await activityService.findFinishedActivitiesByStudent(idStudent);
    res.json(finishedActivities);
});

app.listen(3000, () => {
    console.log('atividades-api iniciado na porta 3000 🚀🚀🚀');
});