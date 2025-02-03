import { Request, Response } from "express"
import { IDbTools } from "../../../../interfaces"
import Utils from "../../../utils"

export default async function get_property(req: Request, res: Response) {
  const db: IDbTools = req.app.locals.db
  const { title, price, type, location, status } = req.query

  // Base query
  let query = "SELECT * FROM property"
  const conditions: string[] = []
  const params: any[] = []

  // Add filters based on query parameters
  if (title) {
    conditions.push(`title ILIKE $${params.length + 1}`)
    params.push(`%${title}%`)
  }
  if (price) {
    conditions.push(`price = $${params.length + 1}`)
    params.push(price)
  }
  if (type) {
    conditions.push(`type = $${params.length + 1}`)
    params.push(type)
  }
  if (location) {
    conditions.push(`location ILIKE $${params.length + 1}`)
    params.push(`%${location}%`)
  }
  if (status) {
    conditions.push(`status = $${params.length + 1}`)
    params.push(status)
  }

  // Append conditions to the query if any exist
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ")
  }

  try {
    // Execute the query with parameters
    const properties = await db.select(query, params)
    res.status(200).json(properties)
  } catch (error) {
    console.error("Error fetching properties:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}
