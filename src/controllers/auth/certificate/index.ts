import Utils from "../../../utils/index"
import prisma from "../../../db/index"
import { Request, Response } from "express"
export default async function certificate(req: Request, res: Response) {
  const courseId = parseInt(req.params.courseId)
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      user: true,
    },
  })
  if (!course) {
    Utils.sendError(res, {
      status: "message",
      message: `Course with id ${courseId} is not found`,
    })
    return
  }
  Utils.generateCertificate(res, course.user.email, course.title)
}
