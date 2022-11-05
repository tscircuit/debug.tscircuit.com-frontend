import { withRouteSpec } from "lib/with-route-spec"
import { z } from "zod"

export default withRouteSpec({
  methods: ["POST", "PATCH"],
  auth: "none",
  jsonBody: z.object({
    layout_group_name: z.string(),
    layout_name: z.string(),
    layout: z.object({}),
  }),
} as const)(async (req, res) => {
  await req.db
    .insertInto("layout")
    .values({
      layout_group_name: req.body.layout_group_name,
      layout_name: req.body.layout_name,
      layout: req.body.layout,
    })
    .execute()

  return res.status(200).json({})
})
