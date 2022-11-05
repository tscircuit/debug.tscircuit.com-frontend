import Database from "better-sqlite3"

import {
  Kysely,
  SqliteDialect,
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
  DialectAdapterBase,
} from "kysely"

interface LayoutTable {
  layout_id: string

  layout_name: string
  layout_group_name: string

  layout: Object
}

interface Database {
  layout: LayoutTable
}

export type DatabaseConnection = Kysely<Database>

let singletonDb: DatabaseConnection | null = null
export const getDb = async (): Promise<DatabaseConnection> => {
  if (singletonDb) return singletonDb

  singletonDb = new Kysely({
    dialect: new SqliteDialect({
      database: new Database("layout_tester.sqlite"),
    }),
  })

  return singletonDb
}
