import { withRouteSpec } from "lib/middleware"
import { z } from "zod"

export default withRouteSpec({
  methods: ["GET", "POST"],
  auth: "none",
  commonParams: z.object({}),
  jsonResponse: z.object({
    layout_groups: z.array(
      z.object({
        layout_group_name: z.string(),
      })
    ),
  }),
} as const)(async (req, res) => {
  const layout_groups = await req.db
    .selectFrom("layout")
    .select("layout_group_name")
    .distinct()
    .execute()

  res.status(200).json({ layout_groups })
})
