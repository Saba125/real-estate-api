import express from "express"
import usersController from "../controllers/auth/export"
import authMiddleware from "../middlewares/auth"
import propertyController from "../controllers/property/export"
import upload from "../config/multer"
import roleMiddleware from "../middlewares/permission"
import favoritesController from "../controllers/favorites/export"
import reviewsController from "../controllers/reviews/export"
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
Router.get("/property", authMiddleware, propertyController.get_property)
// favorites
Router.post(
  "/favorites/property",
  authMiddleware,
  favoritesController.add_favorite
)
Router.get(
  "/favorites/property",
  authMiddleware,
  favoritesController.get_favorited_property
)
// reviews
Router.post("/reviews", authMiddleware, reviewsController.add_review)
Router.get("/reviews/:id", authMiddleware, reviewsController.get_review)

export default Router
