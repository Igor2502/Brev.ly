import { randomUUID } from "node:crypto";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	compactUrl: text("compact_url").notNull().unique(),
	originalUrl: text("original_url").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	accessCount: integer("access_count").notNull().default(0),
});
