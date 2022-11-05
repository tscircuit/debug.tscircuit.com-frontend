import { withRouteSpec } from "lib/middleware"
import { z } from "zod"

export default withRouteSpec({
  methods: ["GET", "POST"],
  auth: "none",
  commonParams: z.object({
    layout_group_name: z.string().optional(),
  }),
  jsonResponse: z.object({
    layouts: z.array(
      z.object({
        layout_name: z.string(),
        layout_group_name: z.string(),
        layout: z.object({}),
      })
    ),
  }),
} as const)(async (req, res) => {
  let query = req.db.selectFrom("layout").selectAll()

  const { layout_group_name } = req.commonParams
  if (layout_group_name) {
    query = query.where("layout_group_name", "=", layout_group_name)
  }

  const layouts = (await query.execute()).map((layout) => ({
    ...layout,
    layout: JSON.parse(layout.layout),
  }))

  res.status(200).json({ layouts })
})
