import { Request, Response } from "express"
import Joi from "joi"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client"
import prisma from "../db/index"
import { StatusCodes } from "http-status-codes"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
function getCryptoHash(data: string) {
  return crypto.createHash("sha256").update(data, "utf8").digest("hex")
}
function createToken(user: User) {
  return jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  })
}
async function sendSuccess(res: Response, data: any, status: number = 200) {
  try {
    const resp = typeof data === "string" ? { message: data } : data
    res.status(status).json(resp)
  } catch (error) {
    console.error("Error in sendSuccess:", error)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    await prisma.$disconnect()
  }
}
async function sendError(res: Response, error: any, status: number = 500) {
  try {
    const errorMessage = typeof error === "string" ? { error: error } : error
    res.status(status).json(errorMessage)
  } catch (err) {
    console.error("Error in sendError:", err)
    res.status(500).json({ error: "Internal server error" })
  } finally {
    await prisma.$disconnect()
  }
}

function generateCertificate(
  res: Response,
  studentName: string,
  courseName: string
) {
  const doc = new PDFDocument()
  const fileName = `${studentName}-certificate.pdf`
  res.setHeader("Content-Type", "application/pdf")
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
  doc.pipe(res)
  // Add content to the PDF
  doc.fontSize(20).text("Certificate of Completion", { align: "center" })
  doc.moveDown()
  doc.fontSize(14).text(`This certifies that`, { align: "center" })
  doc.moveDown()
  doc.fontSize(18).text(studentName, { align: "center" })
  doc.moveDown()
  doc.fontSize(14).text(`has completed the course:`, { align: "center" })
  doc.moveDown()
  doc.fontSize(18).text(courseName, { align: "center" })
  doc.moveDown()
  doc.text("Issued by: Your Organization", { align: "center" })

  // Finalize the PDF and send it to the client
  doc.end()
}
const Utils = {
  getCryptoHash,
  createToken,
  sendSuccess,
  sendError,
  generateCertificate,
}
export default Utils
