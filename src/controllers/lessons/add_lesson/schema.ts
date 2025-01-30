import Joi from "joi"
const lessonSchema = Joi.object({
  title: Joi.string().required(),
  videoUrl: Joi.string().optional(),
  duration: Joi.number().required(),
  content: Joi.string().required(),
  course_id: Joi.string().required(),
})
export default lessonSchema
