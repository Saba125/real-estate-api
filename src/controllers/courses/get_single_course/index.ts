import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function get_single_course(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const course = await prisma.course.findUnique({
    where: { id },
  })
  return Utils.sendSuccess(res, {
    course,
  })
}
