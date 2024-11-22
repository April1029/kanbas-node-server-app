import db from "../Database/index.js"

let { users } = db;

export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);
export const findUserByUsername = (username) => users.find((user) => user.username === username);
export const findUserByCredentials = (username, password) => users.find((user) => user.username === username && user.password === password);
export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
export const createUser = (user) => {
    const newUser = { ...user, _id: Date.now() };

    users = [...users, newUser];

    return newUser;
};
export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
export function deleteCourse(courseId) {
    const { courses, enrollments } = Database;

    Database.courses = courses.filter((course) => course._id !== courseId);
    Database.enrollments = enrollments.filter(
        (enrollment) => enrollment.course !== courseId
    );
}
