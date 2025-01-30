import Joi from "joi"
const editLessonSchema = Joi.object({
  title: Joi.string().optional(),
  videoUrl: Joi.string().optional(),
  duration: Joi.number().optional(),
  content: Joi.string().optional(),
})
export default editLessonSchema
