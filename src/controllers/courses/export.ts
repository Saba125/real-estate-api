import add_course from "./add_course/index"
import delete_course from "./delete_course"
import edit_course from "./edit_course"
import get_courses from "./get_courses"
import get_single_course from "./get_single_course"
const courseController = {
  add_course,
  get_courses,
  get_single_course,
  delete_course,
  edit_course,
}
export default courseController
