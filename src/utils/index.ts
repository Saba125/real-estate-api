import { Request, Response } from "express"
import Joi from "joi"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
function getCryptoHash(data: string) {
  return crypto.createHash("sha256").update(data, "utf8").digest("hex")
}
function createToken(user: any) {
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
  }
}
async function sendError(res: Response, error: any, status: number = 500) {
  try {
    const errorMessage = typeof error === "string" ? { error: error } : error
    res.status(status).json(errorMessage)
  } catch (err) {
    console.error("Error in sendError:", err)
    res.status(500).json({ error: "Internal server error" })
  }
}

const Utils = {
  getCryptoHash,
  createToken,
  sendSuccess,
  sendError,
}
export default Utils
