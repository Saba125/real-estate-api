import Joi from "joi"
const editPropertySchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  type: Joi.string().optional(),
  location: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid("active", "pending", "sold").optional(),
})
export default editPropertySchema
