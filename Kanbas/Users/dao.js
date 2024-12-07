//import db from "../Database/index.js"
import model from "./model.js";

//let { users } = db;

export const createUser = (user) => {
    delete user._id;
    return model.create(user);
};

export const findAllUsers = () => model.find();  
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByCredentials = (username, password) => model.findOne({ username: username, password: password });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
//export const updateUser = (userId, user) => model.findByIdAndUpdate(userId, user, { new: true });
// model.updateOne({ _id: userId }, user);
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
//export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
    });
  };
  

// export function deleteCourse(courseId) {
//     const { courses, enrollments } = Database;

//     Database.courses = courses.filter((course) => course._id !== courseId);
//     Database.enrollments = enrollments.filter(
//         (enrollment) => enrollment.course !== courseId
//     );
// }
