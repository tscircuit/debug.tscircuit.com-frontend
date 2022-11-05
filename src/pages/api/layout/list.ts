import { withRouteSpec } from "lib/with-route-spec"
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

  const layout_group_name =
    req.query?.layout_group_name ?? req.body?.layout_group_name
  if (layout_group_name) {
    query = query.where("layout_group_name", "=", layout_group_name)
  }

  const layouts = await query.execute()

  res.status(200).json({ layouts })
})
