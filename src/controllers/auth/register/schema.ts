import Joi from "joi"
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid("Admin", "Instructor", "Student"),
  password: Joi.string().required(),
})
export default registerSchema
