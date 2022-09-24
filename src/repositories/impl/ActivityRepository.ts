import IActivityRepository from "../IActivityRepository";

export default class ActivityRepository implements IActivityRepository {
    // crud in memory
    private activities: Activity[] = [];

    public async save(activity: Activity): Promise<Activity> {
        this.activities.push(activity);
        return activity;
    }

    public async update(activity: Activity): Promise<Activity> {
        const index = this.activities.findIndex(
            (activity) => activity.id === activity.id
        );
        this.activities[index] = activity;
        return activity;
    }

    public async delete(id: string): Promise<void> {
        const index = this.activities.findIndex((activity) => activity.id === id);
        this.activities.splice(index, 1);
    }

    public async getAll(): Promise<Activity[]> {
        return this.activities;
    }

    public async findById(id: string): Promise<Activity | undefined> {
        const activity = this.activities.find((activity) => activity.id === id);
        return activity;
    }

    public async findByStudentId(
        idStudent: string
    ): Promise<Activity[]> {
        const activities = this.activities.filter(
            (activity) => activity.idStudent === idStudent
        );
        return activities;
    }
}