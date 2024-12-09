import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        name: String,
        number: String,
        credits: Number,
        startDate: String,
        endDate: String,
        department: String,
        description: String,
    },
    { collection: "courses" }
);

export default courseSchema;
