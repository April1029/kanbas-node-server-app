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

app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:3000"
    })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "xr7kHlX6IX6HQHI",
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
