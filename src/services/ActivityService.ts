import IActivityRepository from "../repositories/IActivityRepository";

export default class ActivityService {
    private activityRepository: IActivityRepository;

    constructor(activityRepository: IActivityRepository) {
        this.activityRepository = activityRepository;
    }

    public async createActivity(activity: Activity): Promise<Activity> {
        const activityCreated = await this.activityRepository.save(activity);
        return activityCreated;
    }

    public async update(activity: Activity): Promise<Activity> {
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

    public async findById(id: string): Promise<Activity> {
        const activity = await this.activityRepository.findById(id);
        return activity;
    }

    public async findByStudentId(
        idStudent: string
    ): Promise<Activity[]> {
        const activities = await this.activityRepository.findByStudentId(
            idStudent
        );
        return activities;
    }

    public async findUnfinishedActivities(idStudent: string): Promise<Activity[]> {
        const activities = await this.activityRepository.findByStudentId(
            idStudent
        );
        const unfinishedActivities = activities.filter(
            (activity) => activity.answer === null || activity.submissionDate === null
        );
        return unfinishedActivities;
    }

    public async findFinishedActivities(idStudent: string): Promise<Activity[]> {
        const activities = await this.activityRepository.findByStudentId(
            idStudent
        );
        const finishedActivities = activities.filter(
            (activity) => activity.answer !== null && activity.submissionDate !== null
        );
        return finishedActivities;
    }

    public async submitActivity(idStudent: string, idActivity: string, answer: string): Promise<Activity> {
        const activity: Activity = await this.activityRepository.findById(idActivity);

        const a = {
            ...activity,
            answer,
            submissionDate: new Date()
        }
        return await this.activityRepository.update(a)
    }
} 