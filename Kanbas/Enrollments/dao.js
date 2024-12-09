import model from "./model.js";
import { ObjectId } from 'mongodb';

export async function fetchEnrollments() {
    const enrollments = await model.find();

    return enrollments;
}

export async function fetchMyEnrollments(userId) {
    const enrollments = await model.find({ user: userId })

    return enrollments;
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");

    return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");

    return enrollments.map((enrollment) => enrollment.user);
}

export async function enrollUserInCourse(user, course) {
    return await model.create({ user, course });
}

export async function unenrollUserFromCourse(user, course) {
    return await model.deleteOne({ user, course });
}

export async function unenrollUsersFromCourse(course) {
    const objectId = new ObjectId(course);

    return await model.deleteMany({ course: objectId })
}
