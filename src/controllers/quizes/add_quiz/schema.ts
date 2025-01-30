import Joi from "joi"
const quizSchema = Joi.object({
  question: Joi.string().required(),
  options: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      text: Joi.string().required(),
    })
  ),
  correct_answer: Joi.string().required(),
  category: Joi.string().required(),
  difficulty: Joi.string().valid("medium", "easy", "hard"),
  lessonId: Joi.number().required(),
})
export default quizSchema
