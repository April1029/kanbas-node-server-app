import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.post("/api/assignment", async (req, res) => {
        const newAssignment = await dao.createAssignment(req.body);

        res.send(newAssignment);
    });
    app.get("/api/assignment/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.retrieveCourseAssignments(courseId);

        res.send(assignments);
    });
    app.get("/api/assignment/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await dao.retrieveAssignment(assignmentId);

        res.send(assignment);
    });
    app.put("/api/assignment/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;

        await dao.updateAssignment(assignmentId, req.body);

        res.sendStatus(204);
    });
    app.delete("/api/assignment/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;

        await dao.deleteAssignment(assignmentId);

        res.sendStatus(204);
    });
}
