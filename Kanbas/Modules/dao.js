import model from "./model.js";
import * as courseDao from "../Courses/dao.js";
import mongoose from "mongoose";

export async function findModulesForCourse(courseId) {
    const course = await courseDao.findCourseById(courseId);
    if (course === undefined) {
        return [];
    }
    console.log('course', course);
    return model.find({ course: course });
}

export function createModule(module) {
    delete module._id;

    return model.create(module);
}

export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}
