import { createWithRouteSpec } from "nextlove"
import { withDb } from "./with-db"

export const withRouteSpec = createWithRouteSpec({
  apiName: "@tscircuit/layout-tester",
  productionServerUrl: "",
  authMiddlewareMap: {},
  globalMiddlewares: [withDb],
} as const)
