import delete_user from "./delete_user"
import get_single_user from "./get_single_user"
import login from "./login/index"
import register from "./register/index"
import update_user_role from "./update_user_role"
const usersController = {
  register,
  login,
  get_single_user,
  update_user_role,
  delete_user,
}
export default usersController
