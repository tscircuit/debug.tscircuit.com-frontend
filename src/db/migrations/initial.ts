import { Kysely } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("layout")
    .addColumn("layout_name", "text", (col) => col.notNull().primaryKey())
    .addColumn("layout_group_name", "text", (col) => col.notNull())
    .addColumn("layout", "json", (col) => col.notNull())
    .execute()
}
