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

    public async findById(id: string): Promise<Activity | undefined> {
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
} 