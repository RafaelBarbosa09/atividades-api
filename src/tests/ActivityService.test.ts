import ActivityRepository from "../repositories/impl/ActivityRepository";
import ActivityService from "../services/ActivityService";

const activity = {
    id: null,
    idStudent: "1",
    idCourse: "1",
    deadline: new Date(),
    question: "Qual a capital do Brasil?",
} as Activity;

describe("ActivityService", () => {
    it("should be able to save an activity", async () => {
        const activityRepository = new ActivityRepository();
        const activityService = new ActivityService(activityRepository);

        const activitySaved = await activityService.createActivity(activity);
        expect(activitySaved.id).not.toBeNull();
    });

    it("should be able to update an activity", async () => {
        const activityRepository = new ActivityRepository();
        const activityService = new ActivityService(activityRepository);

        const activitySaved = await activityService.createActivity(activity);

        activitySaved.question = "Qual a capital da Inglaterra?";
        const activityToBeUpdated = {
            ...activitySaved,
        } as Activity;

        const activityUpdated = await activityService.update(activitySaved);
        expect(activityToBeUpdated).toEqual(activityUpdated);
    });

    it("should be able to submit an activity", async () => {
        const activityRepository = new ActivityRepository();
        const activityService = new ActivityService(activityRepository);

        const activitySaved = await activityService.createActivity(activity);
        const activitySubmited = await activityService.submitActivity(activitySaved.id as string, "Brasília");

        expect(activitySubmited?.id).not.toBeNull();
    });
});