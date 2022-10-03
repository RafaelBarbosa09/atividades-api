import { uuid } from "uuidv4";
import IActivityRepository from "../repositories/IActivityRepository";

export default class ActivityService {
    private activityRepository: IActivityRepository;

    constructor(activityRepository: IActivityRepository) {
        this.activityRepository = activityRepository;
    }

    public async createActivity(activity: Activity): Promise<Activity> {
        activity.id = uuid();
        const activityCreated = await this.activityRepository.save(activity);
        return activityCreated;
    }

    public async update(activity: Activity): Promise<Activity | null> {
        const activityUpdated = await this.activityRepository.update(activity);
        return activityUpdated;
    }

    public async delete(id: string): Promise<void> {
        await this.activityRepository.delete(id);
    }

    public async getAll(): Promise<Activity[]> {
        const activities = await this.activityRepository.getAll();
        return activities;
    }

    public async findById(id: string): Promise<Activity | undefined> {
        return await this.activityRepository.findById(id);
    }

    public async findByStudentId(
        idStudent: string
    ): Promise<Activity[]> {
        const activities = await this.activityRepository.findByStudentId(
            idStudent
        );
        return activities;
    }

    public async findUnfinishedActivitiesByStudent(idStudent: string): Promise<Activity[]> {
        const activities = await this.activityRepository.findByStudentId(
            idStudent
        );
        const unfinishedActivities = activities.filter(
            (activity) => activity.answer === null || activity.submissionDate === null
        );
        return unfinishedActivities;
    }

    public async findFinishedActivitiesByStudent(idStudent: string): Promise<Activity[]> {
        const activities = await this.activityRepository.findByStudentId(
            idStudent
        );
        const finishedActivities = activities.filter(
            (activity) => activity.answer !== null && activity.submissionDate !== null
        );
        return finishedActivities;
    }

    public async findUnfinishedActivities(): Promise<Activity[]> {
        const activities = await this.activityRepository.getAll();
        const unfinishedActivities = activities.filter(
            (activity) => activity.answer === null || activity.submissionDate === null
        );
        return unfinishedActivities;
    }

    public async findFinishedActivities(): Promise<Activity[]> {
        const activities = await this.activityRepository.getAll();
        const finishedActivities = activities.filter(
            (activity) => activity.answer !== null && activity.submissionDate !== null
        );
        return finishedActivities;
    }

    public async submitActivity(idActivity: string, answer: string): Promise<Activity | undefined> {
        const activity = await this.activityRepository.findById(idActivity);

        if (!activity) {
            return undefined;
        }

        activity.answer = answer;
        activity.submissionDate = new Date();

        return await this.activityRepository.update(activity)
    }
} 