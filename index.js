import "dotenv/config";
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import session from "express-session";

import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import EnrollmentsRoutes from "./Kanbas/Enrollments/routes.js";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS
const allowedOrigins = [
    process.env.NETLIFY_URL || "http://localhost:3000",
    "http://localhost:4000" // Include your dev server for flexibility
];

app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.error(`Blocked by CORS: ${origin}`);
                callback(new Error("Not allowed by CORS"));
            }
        }
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
);

Hello(app);
Lab5(app);
AssignmentRoutes(app);
CourseRoutes(app);
EnrollmentsRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000)
