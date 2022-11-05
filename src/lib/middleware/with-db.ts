import { DatabaseConnection, getDb } from "db"
import { migrateDb } from "db/migrate"
import { Middleware } from "nextlove"

export const withDb: Middleware<{ db: DatabaseConnection }> =
  (next) => async (req, res) => {
    req.db = await getDb()

    migrateDb()

    return next(req, res)
  }
