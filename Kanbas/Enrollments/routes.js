import * as enrollmentsDao from "./dao.js"

export default function EnrollmentsRoutes(app) {
    app.get("/api/enrollments/all", async (req, res) => {
        const enrollments = await enrollmentsDao.fetchEnrollments();

        res.send(enrollments);
    });
    app.get("/api/enrollments/my/:userId", async (req, res) => {
        const { userId } = req.params;

        const enrollments = await enrollmentsDao.fetchMyEnrollments(userId);

        res.send(enrollments);
    });
    app.post("/api/enrollments/add/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;

        enrollmentsDao.enrollUserInCourse(userId, courseId);

        res.sendStatus(200);
    });
    app.post("/api/enrollments/remove/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;

        enrollmentsDao.unenrollUserFromCourse(userId, courseId);

        res.sendStatus(200);
    });
    app.post("/api/enrollments/remove/:courseId", (req, res) => {
        const { courseId } = req.params;

        enrollmentsDao.unenrollUsersFromCourse(courseId);

        res.sendStatus(200);
    });
}
