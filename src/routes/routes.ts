import express from "express"
import usersController from "../controllers/auth/export"
import courseController from "../controllers/courses/export"
import lessonsController from "../controllers/lessons/export"
import authMiddleware from "../middlewares/auth"
import adminMiddleware from "../middlewares/permission"
import { Roles } from "@prisma/client"
import roleMiddleware from "../middlewares/permission"
import upload from "../config/multer"
import quizesController from "../controllers/quizes/export"
import certificate from "../controllers/auth/certificate/index"
const Router = express.Router()
// auth routes
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
Router.route("/users/:id")
  .get(
    authMiddleware,
    adminMiddleware(Roles.Admin),
    usersController.get_single_user
  )
  .delete(
    authMiddleware,
    adminMiddleware(Roles.Admin),
    usersController.delete_user
  )
Router.put(
  "/users/:id/role",
  authMiddleware,
  adminMiddleware(Roles.Admin),
  usersController.update_user_role
)
// course routes
Router.route("/courses")
  .post(
    authMiddleware,
    roleMiddleware(Roles.Instructor),
    courseController.add_course
  )
  .get(authMiddleware, courseController.get_courses)
Router.route("/courses/:id")
  .get(authMiddleware, courseController.get_single_course)
  .delete(
    authMiddleware,
    roleMiddleware(Roles.Instructor),
    courseController.delete_course
  )
  .put(
    authMiddleware,
    roleMiddleware(Roles.Instructor),
    courseController.edit_course
  )
// lessons routes
Router.post(
  "/lessons",
  authMiddleware,
  roleMiddleware(Roles.Instructor),
  upload.single("videoUrl"),
  lessonsController.add_lesson
)
Router.get(
  "/courses/:id/lessons",
  authMiddleware,
  lessonsController.get_lessons
)
Router.put(
  "/lessons/:id",
  authMiddleware,
  roleMiddleware(Roles.Instructor),
  lessonsController.edit_lesson
)
// quiz routes
Router.post("/quiz", authMiddleware, quizesController.add_quiz)
Router.post("/quiz/submit", authMiddleware, quizesController.submit_quiz)
Router.get("/quiz/:lessonId", authMiddleware, quizesController.get_quiz)
// certificate
Router.get("/courses/:courseId/certificate", authMiddleware, certificate)
export default Router
