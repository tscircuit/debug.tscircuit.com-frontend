import { MigrationProvider, Migrator, Migration } from "kysely"
import { getDb } from "./get-db"
import * as initialMigration from "./migrations/initial"

const provider: MigrationProvider = {
  async getMigrations() {
    return {
      initial: initialMigration,
    }
  },
}

export const migrateDb = async () => {
  const migrator = new Migrator({ db: await getDb(), provider })
  await migrator.migrateToLatest()
}
