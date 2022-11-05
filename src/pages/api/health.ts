import { withRouteSpec } from "lib/middleware"
import { z } from "zod"

export default withRouteSpec({
  methods: ["GET", "POST"],
  auth: "none",
  commonParams: z.object({}),
  jsonResponse: z.object({}),
} as const)(async (req, res) => {
  res.status(200).json({})
})
