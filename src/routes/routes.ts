import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
import propertyController from "../controllers/property/export"
import upload from "../config/multer"
import roleMiddleware from "../middlewares/permission"
export enum Roles {
  Buyer = "buyer",
  Seller = "seller",
  Admin = "admin",
}

const Router = express.Router()
// users
Router.post("/auth/register", usersController.register)
Router.post("/auth/login", usersController.login)
Router.post("/auth/verifyEmail", usersController.verifyEmail)
Router.get("/auth/aboutMe", authMiddleware, usersController.aboutMe)
// property
Router.post(
  "/property",
  authMiddleware,
  roleMiddleware(Roles.Seller),
  upload.array("images"),
  propertyController.add_property
)
Router.put(
  "/property/:id",
  authMiddleware,
  roleMiddleware(Roles.Seller),
  upload.array("images"),
  propertyController.edit_property
)
Router.delete(
  "/property/:id",
  authMiddleware,
  roleMiddleware(Roles.Seller),
  propertyController.delete_property
)
Router.get(
  "/property/:id",
  authMiddleware,
  propertyController.get_single_property
)
export default Router
