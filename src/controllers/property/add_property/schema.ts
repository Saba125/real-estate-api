import Joi from "joi"
const addPropertySchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  type: Joi.string().required(),
  location: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  status: Joi.string().valid("active", "pending", "sold").required(),
})
export default addPropertySchema
