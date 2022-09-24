export default interface IActivityRepository {
    save(activity: Activity): Promise<Activity>;
    update(activity: Activity): Promise<Activity>;
    delete(id: string): Promise<void>;
    getAll(): Promise<Activity[]>;
    findById(id: string): Promise<Activity | undefined>;
    findByStudentId(idStudent: string): Promise<Activity[]>;
}
