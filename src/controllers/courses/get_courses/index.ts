import { Request, Response } from "express"
import Utils from "../../../utils/index"
import prisma from "../../../db/index"
export default async function get_courses(req: Request, res: Response) {
  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "asc",
    },
  })
  return Utils.sendSuccess(res, {
    courses,
  })
}
