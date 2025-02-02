import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
const Router = express.Router()
// users
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
Router.post("/auth/verifyEmail", usersController.verifyEmail)
Router.get("/auth/aboutMe", authMiddleware, usersController.aboutMe)
export default Router
