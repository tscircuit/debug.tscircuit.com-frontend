import { withRouteSpec } from "lib/middleware"
import { z } from "zod"

export default withRouteSpec({
  methods: ["POST", "PATCH"],
  auth: "none",
  jsonBody: z.object({
    layout_group_name: z.string(),
    layout_name: z.string(),
    layout: z.any(),
  }),
} as const)(async (req, res) => {
  await req.db
    .insertInto("layout")
    .values({
      layout_group_name: req.body.layout_group_name,
      layout_name: req.body.layout_name,
      layout: JSON.stringify(req.body.layout),
    })
    .onConflict((b) =>
      b.doUpdateSet({
        layout_group_name: req.body.layout_group_name,
        layout_name: req.body.layout_name,
        layout: JSON.stringify(req.body.layout),
      })
    )
    .execute()

  return res.status(200).json({})
})
